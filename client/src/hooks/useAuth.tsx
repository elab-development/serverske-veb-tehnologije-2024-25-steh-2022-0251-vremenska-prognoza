import { authClient } from "@/lib/auth-client";
import { User } from "@/lib/types";
import { createContext, useContext, useEffect, useState } from "react";

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchUser = async () => {
    try {
      const { data: session } = await authClient.getSession();
      setUser(session?.user || null);
    } catch (error) {
      console.error("Auth error:", error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
      });

      if (error) {
        throw new Error(error.message);
      }

      if (!data?.user) {
        throw new Error("Login failed, no user returned");
      }

      await fetchUser();
      return data.user;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authClient.signOut();
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      await authClient.signUp.email({ email, password, name });
      await fetchUser();
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return { user, isLoading, login, logout, signup, refetchUser: fetchUser };
};

const AuthContext = createContext<ReturnType<typeof useAuth> | undefined>(
  undefined,
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const auth = useAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
