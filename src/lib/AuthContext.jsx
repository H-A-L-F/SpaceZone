import { createContext, useContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile,
} from "firebase/auth";
import { FB_AUTH, FB_DB } from "./Firebase";
import { useLocation } from "react-router-dom";
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { constructUser } from "../models/User";

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
        const userRef = collection(FB_DB, "user")
        const path = 'user/' + id
        const newUser = constructUser(username, email, password, path)

        return setDoc(doc(FB_DB, path), newUser)
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

    const signInAndCreateUserDocument = async (email, password, displayName) => {
        await createUserWithEmailAndPassword(FB_AUTH, email, password)
            .then((userCredential) => {
                console.log(userCredential.user.uid)
                updateProfile(FB_AUTH.currentUser, { displayName })
                    .then(() => {
                        console.log("Display name updated:", displayName);
                        const path = 'users/' + userCredential.user.uid

                        setDoc(doc(FB_DB, path), constructUser(displayName, email, password, path))
                            .then((docRef) => {
                                console.log("User document created with ID:", docRef.id);

                                return true
                            })
                            .catch((error) => {
                                console.log("Error creating user document:", error);
                            });
                    })
                    .catch((error) => {
                        console.log("Error updating display name:", error);
                    });
            })
            .catch((error) => {
                console.log("Error creating user:", error);
            });

        return false
    };


    useEffect(() => {
        if (!FB_AUTH.currentUser) return
        const unsubscribe = onAuthStateChanged(FB_AUTH, (currentUser) => {
            getDoc(doc(FB_DB, "user", currentUser.uid)).then((u) => {
                const data = { ...u.data(), id: u.id }
                setUser(data);
                window.localStorage.setItem('user', JSON.stringify(data))
            })
        });
        return unsubscribe;
    }, [location, refresh, FB_AUTH.currentUser]);

    return (
        <userAuthContext.Provider value={{ user, refreshPage, signUp, login, logout, setName, saveUser, signInAndCreateUserDocument }}>
            {children}
        </userAuthContext.Provider>
    );
}

export function useUserAuth() {
    return useContext(userAuthContext);
}