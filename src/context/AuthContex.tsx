import Router from "next/router";
import { createContext, useEffect, useState } from "react";
import firebase from "../firebase/config";
import User from "../model/User";
import Cookies from "js-cookie";

interface AuthContextProps {
  user?: User;
  loading?: boolean;
  loginGoogle?: () => Promise<void>;
  logout?: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({});

const getUser = async (firebaseUser: firebase.User): Promise<User> => {
  const token = await firebaseUser.getIdToken();
  return {
    uid: firebaseUser.uid,
    name: firebaseUser.displayName,
    email: firebaseUser.email,
    token,
    provider: firebaseUser.providerData[0].providerId,
    imgUrl: firebaseUser.photoURL,
  };
};

const cookieManager = (isLogged: boolean) => {
  if (isLogged) {
    Cookies.set("admin-template", isLogged, { expires: 7 });
  } else {
    Cookies.remove("admin-template");
  }
};

export function AuthProvider(props) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User>(null);

  const sessionConfig = async (firebaseUser: firebase.User) => {
    try {
      const user = await getUser(firebaseUser);
      setUser(user);
      cookieManager(true);
      setLoading(false);
      return user.email;
    } catch {
      setUser(null);
      cookieManager(false);
      setLoading(false);
      return false;
    }
  };

  const loginGoogle = async () => {
    try {
      setLoading(true);
      const response = await firebase
        .auth()
        .signInWithPopup(new firebase.auth.GoogleAuthProvider());

      sessionConfig(response.user);
      Router.push("/");
    } finally {
      setLoading(false);
    }
  };
  const logout = async () => {
    try {
      setLoading(true);
      await firebase.auth().signOut();
      await sessionConfig(null);
      Router.push("/autentication");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (Cookies.get("admin-template")) {
      const cancel = firebase.auth().onIdTokenChanged(sessionConfig);
      return () => cancel();
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, loginGoogle, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
