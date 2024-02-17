// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {addDoc, collection, getFirestore} from "@firebase/firestore";
import type {WorkoutData} from "~/models/formData/workoutData";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBOmGpZ38BrTlcUT83o7p3MR8utO3dh2As",
    authDomain: "sport-database-552b0.firebaseapp.com",
    projectId: "sport-database-552b0",
    storageBucket: "sport-database-552b0.appspot.com",
    messagingSenderId: "407838315524",
    appId: "1:407838315524:web:887262c56006be19f25151"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

async function addWorkoutDataToFirestore(workoutData: WorkoutData) {
    try {
        const docRef = await addDoc(collection(db, "WorkoutSet"), workoutData);
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}