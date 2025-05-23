import { initializeApp } from "firebase/app";

//firebase config
const app = initializeApp({
  apiKey:  import.meta.env.VITE_REACT_APP_API_KEY,
  authDomain:  import.meta.env.VITE_REACT_APP_AUTH_DOMAIN,
  projectId:  import.meta.env.VITE_REACT_APP_PROJECT_ID,
  storageBucket:  import.meta.env.VITE_REACT_APP_STORAGE_BUCKET,
  messagingSenderId:  import.meta.env.VITE_REACT_APP_MESSAGING_SENDER_ID,
  appId:  import.meta.env.VITE_REACT_APP_ID,
  databaseURL:  import.meta.env.VITE_REACT_APP_DATABASE_URL,
});

export default app;
