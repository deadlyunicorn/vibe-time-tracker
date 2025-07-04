"use client";
import { ReactNode, useEffect, useState } from "react";
import { Authenticate } from "./Authenticate";
import { UserService } from "@/lib/services/users";

export const AuthenticatedView = ({ children }: { children: ReactNode }) => {
  // This is not an application that includes sensitive data.
  // For this reason - we will not implement a real authentication system.

  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const authenticated = UserService.getCurrentUserId();
    setIsAuthenticated(!!authenticated);
  }, []);

  if (isAuthenticated === null) {
    return null;
  }

  if (isAuthenticated === false) {
    return <Authenticate />;
  }

  return children;
};
