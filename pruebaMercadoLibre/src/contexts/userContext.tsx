import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { User, UserContextType } from "../types/user.types";
import { fetchUser } from "../services/services";

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        const data = await fetchUser();
        if (!data) {
          setUser(null);
          return;
        }
        setUser({
          id: data.id,
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          country_id: data.country_id,
          address: { address: data.address?.address ?? "" },
        });
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
