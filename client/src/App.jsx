import { useCallback, useState } from "react";
import { AnimatePresence } from "framer-motion";
import AIChatbot from "./components/Chatbot/AIChatbot";
import SplashScreen from "./components/splash/SplashScreen";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashComplete = useCallback(() => {
    setShowSplash(false);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {showSplash && (
          <SplashScreen
            onComplete={handleSplashComplete}
          />
        )}
      </AnimatePresence>

      <AIChatbot />

      {!showSplash && <AppRoutes />}
    </>
  );
} 