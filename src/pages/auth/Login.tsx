import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { object, string } from "yup";
import { getErrorMessage, requireApiData } from "../../api/response";
import { useUserStore } from "../../app/userStore";
import { AuthLayout } from "../../components/auth/AuthLayout";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { useToast } from "../../components/ui/Toast";
import authService, { type LoginRequest } from "../../services/auth.service";

const schema = object({
  contactNumber: string().trim().matches(/^\d{10}$/, "Enter a valid 10-digit contact number").required("Contact number is required"),
  password: string().required("Password is required"),
});

export default function Login() {
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);
  const { showToast } = useToast();
  const [serverError, setServerError] = useState<string>();
  const formik = useFormik<LoginRequest>({
    initialValues: { contactNumber: "", password: "" },
    validationSchema: schema,
    onSubmit: async (values) => {
      setServerError(undefined);
      try {
        const loginResponse = await authService.login(values);
        const userResponse = await authService.getMe();
        const user = requireApiData(userResponse);
        setUser(user);
        showToast(loginResponse.message, "success");
        navigate("/dashboard", { replace: true });
      } catch (error: unknown) {
        const message = getErrorMessage(error, "Sign in failed. Please try again.");
        setServerError(message);
        showToast(message, "error");
      }
    },
  });

  return (
    <AuthLayout title="Welcome back" subtitle="Enter your details to continue to your workspace.">
      {serverError && <div className="form-alert" role="alert">{serverError}</div>}
      <form onSubmit={formik.handleSubmit} noValidate>
        <Input id="contactNumber" name="contactNumber" label="Contact number" inputMode="numeric" autoComplete="tel" placeholder="1234567894" value={formik.values.contactNumber} onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.touched.contactNumber ? formik.errors.contactNumber : undefined} />
        <Input id="password" name="password" label="Password" type="password" autoComplete="current-password" placeholder="Enter your password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.touched.password ? formik.errors.password : undefined} />
        <Button type="submit" loading={formik.isSubmitting}>Sign in</Button>
      </form>
      <p className="auth-switch">New to Coaching Management? <Link to="/signup">Create an account</Link></p>
    </AuthLayout>
  );
}
