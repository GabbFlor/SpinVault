import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDXJKRyTHe6aJa85YoIb8rz0lr82HYtGOM",
    authDomain: "spinvault-b899a.firebaseapp.com",
    projectId: "spinvault-b899a",
    storageBucket: "spinvault-b899a.firebasestorage.app",
    messagingSenderId: "955001789055",
    appId: "1:955001789055:web:132733447668a1dbf53d4a"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);