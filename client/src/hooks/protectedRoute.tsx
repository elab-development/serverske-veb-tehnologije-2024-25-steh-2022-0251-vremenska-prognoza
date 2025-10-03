import NotFound from "@/pages/notFound/NotFound";
import { useAuthContext } from "./useAuth";

type ProtectedRouteProps = {
  children: JSX.Element;
  allowedRoles?: string[];
};

export function ProtectedRoute({
  children,
  allowedRoles,
}: ProtectedRouteProps) {
  const { user, isLoading } = useAuthContext();

  if (isLoading) {
    return (
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-secondary border-t-transparent"></div>
    );
  }

  if (!user) {
    return <NotFound />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <NotFound />;
  }

  return children;
}
