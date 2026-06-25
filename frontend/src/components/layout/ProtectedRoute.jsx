import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    // Show a loading screen or spinner while checking authentication state
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-accent" />
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}
