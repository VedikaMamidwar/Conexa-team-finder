import AuthLayout from "../../components/auth/AuthLayout";
import LeftBanner from "../../components/auth/LeftBanner";
import LoginForm from "../../components/auth/LoginForm";

export default function Login() {
    return (
        <AuthLayout left={<LeftBanner />}>
            <LoginForm />
        </AuthLayout>
    );
}