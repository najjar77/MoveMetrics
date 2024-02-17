// DBController.ts
import {addDoc, collection} from "firebase/firestore";
import {db} from '~/firebase/init';

// Function to add WorkoutData to Firestore
export async function saveWorkoutData(workoutData: any) {
    try {
        const docRef = await addDoc(collection(db, "WorkoutSet"), workoutData);
        console.log("Document written with ID:", docRef.id);
        return docRef.id; // Return document ID on success
    } catch (error) {
        console.error("Error adding document:", error);
        throw new Error("Error saving workout data");
    }
}
