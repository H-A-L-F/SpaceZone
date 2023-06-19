import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCUrx_R1Pg286ZYWCOobOixvKkvtVFhziA",
    authDomain: "spacezone-72da1.firebaseapp.com",
    projectId: "spacezone-72da1",
    storageBucket: "spacezone-72da1.appspot.com",
    messagingSenderId: "591872295746",
    appId: "1:591872295746:web:ae18ea4158baafe21b3edb",
    measurementId: "G-5VGNE60V8J"
};

const FB = initializeApp(firebaseConfig);
const FB_DB = getFirestore(FB)
const FB_STORAGE = getStorage(FB)
const FB_AUTH = getAuth(FB)

export { FB, FB_DB, FB_STORAGE, FB_AUTH };
