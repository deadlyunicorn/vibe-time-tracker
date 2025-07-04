"use client";
import { ReactNode } from "react";
import { Authenticate } from "./Authenticate";

export const AuthenticatedView = ({ children }: { children: ReactNode }) => {
  // This is not an application that includes sensitive data.
  // For this reason - we will not implement a real authentication system.

  const authenticated = localStorage.getItem("userId");

  if (!authenticated) {
    return <Authenticate />;
  }

  return children;
};
