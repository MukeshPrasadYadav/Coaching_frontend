import { useEffect, useState, type ReactNode } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useUserStore } from "./app/userStore";
import { ToastProvider } from "./components/ui/Toast";
import { FullPageLoader } from "./components/ui/loading";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import authService from "./services/auth.service";
import { requireApiData } from "./api/response";

function ProtectedRoute({ children }: { children: ReactNode }) {
  const authenticated = useUserStore((state) => state.isAuthenticated);
  return authenticated ? children : <Navigate to="/login" replace />;
}

function AppRoutes() {
  const [checkingSession, setCheckingSession] = useState(true);
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    let active = true;
    authService.getMe()
      .then((response) => { if (active) setUser(requireApiData(response)); })
      .catch(() => { if (active) setUser(null); })
      .finally(() => { if (active) setCheckingSession(false); });
    return () => { active = false; };
  }, [setUser]);

  if (checkingSession) return <FullPageLoader label="Restoring your session…" />;

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default function App() {
  return <BrowserRouter><ToastProvider><AppRoutes /></ToastProvider></BrowserRouter>;
}
