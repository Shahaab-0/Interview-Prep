import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
export type UserRole = "admin" | "user";

export interface AuthUser {
  role: UserRole;
}
interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  login: (role: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface Props {
  children: ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(false);

  // simulate async auth check

  const login = (role: UserRole) => setUser({ role });
  const logout = () => setUser(null);

  console.log(user, 'afwefew');
  
  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};