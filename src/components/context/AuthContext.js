import React, { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { db } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { createContext, useContext } from "react";
import { doc, setDoc } from "firebase/firestore";

const authContext = createContext();

export const AuthContext = ({ children }) => {
  const [user, setUser] = useState({});

  const signUp = (email, pass) => {
    return createUserWithEmailAndPassword(auth, email, pass);
    setDoc(doc(db, "users", email), { cartItems: [] });
  };

  const signIn = (email, pass) => {
    return signInWithEmailAndPassword(auth, email, pass);
  };

  const logOut = () => {
    signOut(auth);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser);
      setUser(currentUser);
    });
  }, []);

  return (
    <authContext.Provider value={{ user, signUp, signIn, logOut }}>
      {children}
    </authContext.Provider>
  );
};

export const UseAuthContext = () => useContext(authContext);
