import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { object, string } from "yup";
import { getErrorMessage } from "../../api/response";
import { AuthLayout } from "../../components/auth/AuthLayout";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { useToast } from "../../components/ui/Toast";
import authService, { type SignupRequest } from "../../services/auth.service";

const schema = object({
  name: string().trim().min(2, "Name must be at least 2 characters").max(80, "Name is too long").required("Name is required"),
  contactNumber: string().trim().matches(/^\d{10}$/, "Enter a valid 10-digit contact number").required("Contact number is required"),
  password: string().min(8, "Password must be at least 8 characters").matches(/[A-Za-z]/, "Include at least one letter").matches(/\d/, "Include at least one number").required("Password is required"),
});

export default function Signup() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [serverError, setServerError] = useState<string>();
  const formik = useFormik<SignupRequest>({
    initialValues: { name: "", contactNumber: "", password: "" },
    validationSchema: schema,
    onSubmit: async (values) => {
      setServerError(undefined);
      try {
        const response = await authService.signup({ ...values, name: values.name.trim(), contactNumber: values.contactNumber.trim() });
        showToast(response.message, "success");
        navigate("/login", { replace: true });
      } catch (error: unknown) {
        const message = getErrorMessage(error, "Account creation failed. Please try again.");
        setServerError(message);
        showToast(message, "error");
      }
    },
  });

  return (
    <AuthLayout title="Create your account" subtitle="Get started with your coaching workspace.">
      {serverError && <div className="form-alert" role="alert">{serverError}</div>}
      <form onSubmit={formik.handleSubmit} noValidate>
        <Input id="name" name="name" label="Full name" autoComplete="name" placeholder="Mohit" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.touched.name ? formik.errors.name : undefined} />
        <Input id="contactNumber" name="contactNumber" label="Contact number" inputMode="numeric" autoComplete="tel" placeholder="1234567894" value={formik.values.contactNumber} onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.touched.contactNumber ? formik.errors.contactNumber : undefined} />
        <Input id="password" name="password" label="Password" type="password" autoComplete="new-password" placeholder="At least 8 characters" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.touched.password ? formik.errors.password : undefined} />
        <Button type="submit" loading={formik.isSubmitting}>Create account</Button>
      </form>
      <p className="auth-switch">Already have an account? <Link to="/login">Sign in</Link></p>
    </AuthLayout>
  );
}
