import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/FB_AUTH";
import { FB_AUTH, FB } from "Firebase";
import { useLocation } from "react-router-dom";
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { constructUser } from "./application/models/user";

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState("");
  const [refresh, setRefresh] = useState(true);

  const location = useLocation();

  function refreshPage() {
    if (refresh) {
      setRefresh(false);
    } else {
      setRefresh(true);
    }
  }

  function signUp(email, password) {
    return createUserWithEmailAndPassword(FB_AUTH, email, password);
  }

  function saveUser(id, email, password, username) {
    const userRef = collection(FB, "user")
    const path = 'user/' + id
    const newUser = constructUser(username, email, password, path)

    return setDoc(doc(FB, path), newUser)
  }

  function setName(uname) {
    return updateProfile(FB_AUTH.currentUser, { displayName: uname });
  }

  function logout() {
    localStorage.removeItem("user")
    return signOut(FB_AUTH);
  }

  function login(email, password) {
    return signInWithEmailAndPassword(FB_AUTH, email, password);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FB_AUTH, (currentUser) => {
      getDoc(doc(FB, "user", currentUser.uid)).then((u) => {
        const data = { ...u.data(), id: u.id }
        setUser(data);
        window.localStorage.setItem('user', JSON.stringify(data))
      })
    });
    return unsubscribe;
  }, [location, refresh]);

  return (
    <userAuthContext.Provider value={{ user, refreshPage, signUp, login, logout, setName, saveUser }}>
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}