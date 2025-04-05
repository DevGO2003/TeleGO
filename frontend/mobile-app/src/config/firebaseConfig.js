// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// Import other Firebase modules as needed

const firebaseConfig = {
    apiKey: "AIzaSyA_hd_OmexwhliLTHlZY5KYdgDhqxT1vVQ",
    authDomain: "devgo2003-telego.firebaseapp.com",
    projectId: "devgo2003-telego",
    storageBucket: "devgo2003-telego.firebasestorage.app",
    messagingSenderId: "354641411477",
    appId: "1:354641411477:web:25492f787144c82b8aca9c",
    measurementId: "G-F1RPKWLTWL"
  };

// Khởi tạo Firebase App
const app = initializeApp(firebaseConfig);

// Lấy các instance của dịch vụ (export để sử dụng trong các component khác)
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);
// Export other Firebase service instances as needed
export default app;