// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "food-away.firebaseapp.com",
    projectId: "food-away",
    storageBucket: "food-away.appspot.com",
    messagingSenderId: "1060720924600",
    appId: "1:1060720924600:web:44fb25deecbc8b561f214d"
};

export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
export const db = getFirestore()
export const storage = getStorage()









