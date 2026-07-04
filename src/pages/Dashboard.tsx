import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getErrorMessage } from "../api/response";
import { useUserStore } from "../app/userStore";
import { Button } from "../components/ui/Button";
import { useToast } from "../components/ui/Toast";
import authService from "../services/auth.service";

export default function Dashboard() {
  const user = useUserStore((state) => state.user);
  const clearUser = useUserStore((state) => state.logout);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleLogout = async () => {
    setLoading(true);
    try {
      const response = await authService.logout();
      showToast(response.message, "success");
    } catch (error: unknown) {
      showToast(getErrorMessage(error, "Could not contact the server. You have been signed out locally."), "error");
    } finally {
      clearUser();
      navigate("/login", { replace: true });
      setLoading(false);
    }
  };

  return <main className="dashboard"><div className="dashboard-card"><p className="eyebrow">Dashboard</p><h1>Welcome, {user?.name}</h1><p>Your authenticated coaching workspace is ready.</p><Button type="button" loading={loading} onClick={handleLogout}>Sign out</Button></div></main>;
}
