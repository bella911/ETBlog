import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "blog-page-7d96b.firebaseapp.com",
  projectId: "blog-page-7d96b",
  storageBucket: "blog-page-7d96b.appspot.com",
  messagingSenderId: "907114819303",
  appId: "1:907114819303:web:aff9e7e1015a240dad7c42"
};

export const app = initializeApp(firebaseConfig);
