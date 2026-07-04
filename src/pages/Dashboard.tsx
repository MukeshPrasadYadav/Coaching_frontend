import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getErrorMessage } from "../api/response";
import { useUserStore } from "../app/userStore";
import { Container, Page, PageHeader } from "../components/layout";
import { Button, Card, CardContent, Heading, Text } from "../components/ui";
import { toastError, toastSuccess } from "../lib/toast";
import authService from "../services/auth.service";
export default function Dashboard() { const user = useUserStore(state => state.user); const clearUser = useUserStore(state => state.logout); const [loading, setLoading] = useState(false); const navigate = useNavigate(); const handleLogout = async () => { setLoading(true); try { toastSuccess((await authService.logout()).message); } catch (error) { toastError(getErrorMessage(error, "Could not contact the server. You have been signed out locally.")); } finally { clearUser(); navigate("/login", { replace: true }); setLoading(false); } }; return <Page><Container><PageHeader><div><Text className="font-semibold uppercase tracking-widest text-primary">Dashboard</Text><Heading className="mt-2">Welcome, {user?.name}</Heading></div><Button variant="outline" loading={loading} onClick={handleLogout}>Sign out</Button></PageHeader><Card variant="elevated"><CardContent><Text>Your authenticated coaching workspace is ready.</Text></CardContent></Card></Container></Page>; }
