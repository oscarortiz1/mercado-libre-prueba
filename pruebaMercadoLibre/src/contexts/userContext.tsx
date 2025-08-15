import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { User, UserContextType } from "../types/user.types";
import { fetchUser } from "../services/services";

const UserContext = createContext<UserContextType | undefined>(undefined);

const CACHE_KEY = "user_cache";
const TTL_MS = 5 * 60 * 1000;

function getCachedUser(): User | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { data, exp } = JSON.parse(raw);
    if (Date.now() > exp) {
      localStorage.removeItem(CACHE_KEY);
      return null;
    }
    return data;
  } catch {
    return null;
  }
}

function saveCachedUser(user: User) {
  localStorage.setItem(
    CACHE_KEY,
    JSON.stringify({ data: user, exp: Date.now() + TTL_MS })
  );
}

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(getCachedUser());
  const [loading, setLoading] = useState(!getCachedUser());

  const calledOnce = useRef(false);

  useEffect(() => {
    if (calledOnce.current) return;
    calledOnce.current = true;

    async function loadUser() {
      try {
        const cached = getCachedUser();
        if (cached) {
          setUser(cached);
          setLoading(false);
          return;
        }

        const data = await fetchUser();
        if (!data) {
          setUser(null);
          return;
        }

        const filtered: User = {
          id: data.id,
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          country_id: data.country_id,
          address: { address: data.address?.address ?? "" },
          phone: { number: data.phone?.number ?? "" },
        };

        saveCachedUser(filtered);
        setUser(filtered);
      } catch (e) {
        console.error(e);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, loading }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser debe usarse dentro de UserProvider");
  return ctx;
}
