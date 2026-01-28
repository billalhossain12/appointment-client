import type { ReactNode } from "react";
import { useAppSelector } from "../redux/hooks";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { token } = useAppSelector((state) => state.auth);
  if (!token) {
    return <Navigate to="/" replace />;
  }
  return children;
};
