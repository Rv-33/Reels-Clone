import React, { useState, useEffect } from "react";
import { auth } from "../Firebase";
import { doc, setDoc, Timestamp } from "firebase/firestore";
export const AuthContext = React.createContext();

//children will be props.children
export function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }
  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }
  function logout(email, password) {
    return auth.signOut();
  }
  function reset(email) {
    return auth.sendPasswordResetEmail(email);
  }
  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });
    return () => {
      unsub();
    };
  }, []);
  const store = {
    user,
    signup,
    login,
    logout,
    reset,
  };
  return (
    <AuthContext.Provider value={store}>
      {/* if loading is false then show children */}
      {!loading && children}
    </AuthContext.Provider>
  );
}
// <comp name="john"/> name will become props in this case
//<comp>John</comp> "john" will be props.children
