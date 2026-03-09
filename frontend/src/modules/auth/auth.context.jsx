import { createContext, useState, useEffect } from "react";
import { authApi } from "./services/auth.api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAndSetCurrentUser = async () => {
      try {
        const res = await authApi.getCurrentUser();
        setUser(res.data);
        setLoading(false);
      } catch {
        setUser(null);
        setLoading(false);
      }
    };

    getAndSetCurrentUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading, setLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
