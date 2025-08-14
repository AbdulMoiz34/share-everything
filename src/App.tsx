import { Toaster } from "react-hot-toast";
import Router from "./config/Router";
import { NetworkStatus, Header, MainCard, Footer } from "./components";
import { analytics, auth, onAuthStateChanged } from "./firebase";
import { AuthContext } from "./context";
import type { User } from "./context/AuthContext";
import { useEffect, useState } from "react";
import { Spin } from "antd";
import { logEvent } from "firebase/analytics";


export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    logEvent(analytics, "page_view");
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({ email: user?.email, uid: user?.uid });
      } else {
        setUser(null);
      }
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div className="h-screen w-screen flex justify-center items-center">
      <Spin size="large" />
    </div>
  }

  const authContextValue = {
    user,
    setUser,
    loading,
  }
  
  return (
    <>
      <Toaster position="top-center" />
      <NetworkStatus />
      <div className="w-4/5 mx-auto mt-4 pb-12">
        <AuthContext.Provider value={authContextValue}>
          <Header />
          <MainCard>
            <Router />
          </MainCard>
        </AuthContext.Provider>
        <Footer />
      </div>
    </>
  );
}