import Router from "next/router";
import { createContext, useState } from "react";
import firebase from "../firebase/config";
import User from "../model/User";

interface AuthContextProps {
  user?: User;
  loginGoogle?: () => Promise<void>;
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

export function AuthProvider(props) {
  const [user, setUser] = useState<User>(null);

  const loginGoogle = async () => {
    const response = await firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider());

    if (response.user?.email) {
      const userResponse = await getUser(response.user);
      setUser(userResponse);
      Router.push("/");
    }
  };

  return (
    <AuthContext.Provider value={{ user, loginGoogle }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
