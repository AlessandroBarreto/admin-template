import { useState } from "react";
import AuthInput from "../components/auth/AuthInput";
import useAuth from "../hooks/useAuth";
import { Google, Warning } from "../icons";

type AutenticationMode = "login" | "signup";

export default function autentication() {
  const [mode, setMode] = useState<AutenticationMode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { login, register, loginGoogle } = useAuth();

  const submit = async () => {
    try {
      if (mode == "login") {
        await login(email, password);
      } else {
        await register(email, password);
      }
    } catch (e) {
      showError(e?.message ?? "something went wrong!");
    }
  };

  const showError = (msg, time = 5000) => {
    setError(msg);
    setTimeout(() => setError(null), time);
  };

  const title =
    mode == "login" ? "Login with your account" : "Register on the plataform";

  const btnAuthText = mode == "login" ? "Login" : "Signup";

  return (
    <div className="flex h-screen items-center justify-center ">
      <div className="hidden md:block w-1/2 lg:w-2/3">
        <img
          src="https://source.unsplash.com/random"
          alt="random image"
          className="h-screen w-full object-cover "
        />
      </div>
      <div className="m-10 w-full md:w-1/2 lg:w-1/3">
        <h1 className="text-3xl font-bold mb-5">{title}</h1>
        {error && (
          <div className=" flex items-center bg-red-400 text-white py-3 px-5 my-2 border border-red-700 rounded-lg">
            {Warning()}
            <span className="ml-3">{error}</span>
          </div>
        )}

        <AuthInput
          label="Email"
          type="email"
          value={email}
          changeValue={setEmail}
          required
        />
        <AuthInput
          label="Password"
          type="password"
          value={password}
          changeValue={setPassword}
          required
        />
        <button
          className="w-full bg-indigo-500 hover:bg-indigo-400 text-white rounded-lg px-4 py-3 mt-6"
          onClick={submit}
        >
          {btnAuthText}
        </button>
        <hr className="my-6 border-gray-300 w-full" />
        <button
          className="flex justify-center items-center w-full bg-red-500 hover:bg-red-400 text-white rounded-lg px-4 py-3 "
          onClick={loginGoogle}
        >
          <span>Login with Google</span>
          <div className="flex justify-center items-center ml-2 w-7 h-7 bg-white rounded-full">
            {Google}
          </div>
        </button>
        {mode == "login" ? (
          <p className="mt-8">
            New here?
            <a
              className="text-blue-500 hover:text-blue-700 font-semibold cursor-pointer"
              onClick={() => setMode("signup")}
            >
              {" "}
              Create a free account
            </a>
          </p>
        ) : (
          <p className="mt-8">
            Already in our community?
            <a
              className="text-blue-500 hover:text-blue-700 font-semibold cursor-pointer"
              onClick={() => setMode("login")}
            >
              {" "}
              Login with your credentials
            </a>
          </p>
        )}
      </div>
    </div>
  );
}
