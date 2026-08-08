import AuthLayout from "../../components/auth/AuthLayout";
import LeftBanner from "../../components/auth/LeftBanner";
import LoginForm from "../../components/auth/LoginForm";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
    const { user } = useAuth();

    if (user) {
        window.location.href = "/dashboard";
        return null;
    }

    return (
        <AuthLayout left={<LeftBanner />}>
            <LoginForm />
        </AuthLayout>
    );
}