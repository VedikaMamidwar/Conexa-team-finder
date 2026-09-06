import AuthLayout from "../../components/auth/AuthLayout";
import LeftBanner from "../../components/auth/LeftBanner";
import RegisterForm from "../../components/auth/RegisterForm";

export default function Register() {
    return (
        <AuthLayout
            left={<LeftBanner />}
        >
            <RegisterForm />
        </AuthLayout>
    );
}