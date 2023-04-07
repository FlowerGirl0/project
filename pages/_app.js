import Layout from "@/components/Layout";
import "@/styles/globals.css";
import { getSessionToken } from "@/utils";
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function App({ Component, pageProps }) {
  const router = useRouter()
  useEffect(() => {
    if (!getSessionToken()) {
      router.push("/login");
    }
  }, []);
  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
