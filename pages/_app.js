import "@/styles/globals.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppWrapper } from "../utils/context";

export default function App({ Component, pageProps }) {
  return (
    <>
      <AppWrapper>
        <Component {...pageProps} />
        <ToastContainer />
      </AppWrapper>
    </>
  );
}
