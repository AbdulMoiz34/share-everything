import { Toaster } from "react-hot-toast";
import Router from "./config/Router";
import { NetworkStatus } from "./components";

export default function App() {
  return (
    <>
      <Toaster position="top-center" />
      <NetworkStatus />
      <Router />
    </>
  );
}