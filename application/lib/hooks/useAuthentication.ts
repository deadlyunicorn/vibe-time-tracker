import { useEffect, useState } from "react";
import { UserService } from "@/lib/client-service/users";

export const useAuthentication = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const authenticated = UserService.getCurrentUserId();
    setIsAuthenticated(!!authenticated);
  }, []);

  return isAuthenticated;
};
