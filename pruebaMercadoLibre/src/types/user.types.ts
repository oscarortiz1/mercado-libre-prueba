export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  country_id: string;
  address: {
    address: string;
  };
}

export interface UserContextType {
  user: User | null;
  loading: boolean;
}