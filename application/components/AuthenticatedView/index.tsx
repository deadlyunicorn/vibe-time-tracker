"use client";
import { ReactNode } from "react";
import { Authenticate } from "./Authenticate";
import { useAuthentication } from "@/lib/hooks/useAuthentication";

export const AuthenticatedView = ({ children }: { children: ReactNode }) => {
  // This is not an application that includes sensitive data.
  // For this reason - we will not implement a real authentication system.

  const isAuthenticated = useAuthentication();

  if (isAuthenticated === null) {
    return null;
  }

  if (isAuthenticated === false) {
    return <Authenticate />;
  }

  return children;
};
