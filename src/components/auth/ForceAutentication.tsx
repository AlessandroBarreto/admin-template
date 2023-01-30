import Head from "next/head";
import Image from "next/image";
import Router from "next/router";
import loadingGif from "../../../public/images/loading.gif";
import useAuth from "../../hooks/useAuth";

export default function ForceAutentication(props) {
  const { user, loading } = useAuth();

  const renderContent = () => {
    return <> {props.children}</>;
  };

  const renderLoading = () => {
    return (
      <div className="flex justify-center items-center h-screen">
        <Image src={loadingGif} alt="loading" />
      </div>
    );
  };

  if (!loading && user?.email) return renderContent();

  if (loading) return renderLoading();

  Router.push("/autentication");
  return null;
}
