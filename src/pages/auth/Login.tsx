import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import { getErrorMessage, requireApiData } from "../../api/response";
import { useUserStore } from "../../app/userStore";
import { AuthLayout } from "../../components/auth/AuthLayout";
import { Button, PasswordInput, Text, TextInput } from "../../components/ui";
import { toastError, toastSuccess } from "../../lib/toast";
import authService, { type LoginRequest } from "../../services/auth.service";
const schema = object({ contactNumber: string().trim().matches(/^\d{10}$/, "Enter a valid 10-digit contact number").required("Contact number is required"), password: string().required("Password is required") });
export default function Login() { const navigate = useNavigate(); const setUser = useUserStore(state => state.setUser); const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm<LoginRequest>({ resolver: yupResolver(schema), defaultValues: { contactNumber: "", password: "" } });
  const onSubmit = handleSubmit(async values => { try { const loginResponse = await authService.login(values); const user = requireApiData(await authService.getMe()); setUser(user); toastSuccess(loginResponse.message); navigate("/dashboard", { replace: true }); } catch (error) { const message = getErrorMessage(error, "Sign in failed. Please try again."); setError("root", { message }); toastError(message); } });
  return <AuthLayout title="Welcome back" subtitle="Enter your details to continue to your workspace.">{errors.root?.message && <div className="mb-5 rounded-md border border-danger/30 bg-danger/10 p-3 text-sm text-danger" role="alert">{errors.root.message}</div>}<form onSubmit={onSubmit} noValidate className="space-y-5"><TextInput label="Contact number" inputMode="numeric" autoComplete="tel" placeholder="1234567894" required error={errors.contactNumber?.message} {...register("contactNumber")}/><PasswordInput label="Password" autoComplete="current-password" placeholder="Enter your password" required error={errors.password?.message} {...register("password")}/><Button type="submit" loading={isSubmitting} fullWidth>Sign in</Button></form><Text variant="muted" className="mt-7 text-center">New to Coaching Management? <Link className="font-semibold text-primary hover:underline" to="/signup">Create an account</Link></Text></AuthLayout>; }
