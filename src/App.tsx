import { Toaster } from "react-hot-toast";
import Router from "./config/Router";
import { NetworkStatus, Header, MainCard } from "./components";

export default function App() {
  return (
    <>
      <Toaster position="top-center" />
      <NetworkStatus />
      <div className="w-4/5 mx-auto mt-4 pb-12">
        <Header />
        <MainCard>
          <Router />
        </MainCard>
      </div>
    </>
  );
}