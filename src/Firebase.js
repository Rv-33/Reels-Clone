// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';
import { collection } from "firebase/firestore";
import { doc, setDoc, Timestamp } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    // apiKey: "AIzaSyAQ8QY_zklLTKxB3IzIvQe1pXTZ-n-r6fQ",
    // authDomain: "reels-4fa74.firebaseapp.com",
    // projectId: "reels-4fa74",
    // storageBucket: "reels-4fa74.appspot.com",
    // messagingSenderId: "503678130993",
    // appId: "1:503678130993:web:a9ac7656e8d89ab63fee10"
    // apiKey: "AIzaSyBNGgnfEx_lw-4KdIq89XPMphraYsWq2k4",
    // authDomain: "insta-reels-e53a8.firebaseapp.com",
    // projectId: "insta-reels-e53a8",
    // storageBucket: "insta-reels-e53a8.appspot.com",
    // messagingSenderId: "717295609646",
    // appId: "1:717295609646:web:5777fefdaa8eaef7873cbf"
            apiKey: "AIzaSyCkidSUfwkmRZ-GwwfBYz48fa1-cJggLJM",
        authDomain: "instagram-reels-de85b.firebaseapp.com",
        projectId: "instagram-reels-de85b",
        storageBucket: "instagram-reels-de85b.appspot.com",
        messagingSenderId: "99746484520",
        appId: "1:99746484520:web:2ecefb5dc1c11cdd41c01d"
        // apiKey: "AIzaSyBmC1Z2m84T1HJuzktWdxi6xSYqZUpjbtI",
        // authDomain: "yt-demo-cf091.firebaseapp.com",
        // projectId: "yt-demo-cf091",
        // storageBucket: "yt-demo-cf091.appspot.com",
        // messagingSenderId: "223167510171",
        // appId: "1:223167510171:web:87c0d89d6db930a3db783e"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
//we need to add this step to initialise.
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
const firestore = firebase.firestore();
export const database = {
    users: firestore.collection("users"),
    posts: firestore.collection("posts"),
    comments:firestore.collection("comments"),
    //this will be used to sort the post based on the post timestamp
    getTimeStamp: firebase.firestore.FieldValue.serverTimestamp
}
export const storage = firebase.storage();