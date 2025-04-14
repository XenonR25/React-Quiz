import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import "../firebase";

const AuthContext = React.createContext();

export function useAuth() { //ekhon amra jekono jaigai useAuth likhe jekono jaiga theke eta access korte parbo
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user); //it is for the user State change.whenever they try to login,signup or logout, this event handler will be called and change the user state
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  //signup function

  async function signup(email, password, username) {
    const auth = getAuth(); //uthentication korar jonne proyojonio auth j object die user der k authenticate korbe
    await createUserWithEmailAndPassword(auth, email, password);

    //update profile
    await updateProfile(auth.currentUser, {
      //signup er por user er information auth.currentUser e die dei
      displayName: username,
    }); //this updateProfile updates the username of the user

    const user = auth.currentUser; //update the user in local storage

    setCurrentUser({ ...user });
  }

  //login function

  function login(email, password) {
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, email, password);
  }
  //logout function

  function logout() {
    const auth = getAuth();
    return signOut(auth);
  }

  const value = {
    currentUser,
    signup,
    login,
    logout,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
