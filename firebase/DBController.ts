// DBController.ts
import {addDoc, collection, getDocs, Timestamp} from "firebase/firestore";
import {db} from '~/firebase/init';
import type {WorkoutData} from "~/models/formData/workoutData";

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

export async function fetchWorkoutData(): Promise<WorkoutData[]> {
    const querySnapshot = await getDocs(collection(db, "WorkoutSet"));
    const workouts = querySnapshot.docs.map(doc => {
        const data = doc.data();
        // Ensure the date is a Date object
        const date = data.generalInformation && data.generalInformation.date
            ? new Timestamp(data.generalInformation.date.seconds, data.generalInformation.date.nanoseconds).toDate()
            : new Date();

        return {
            ...data,
            generalInformation: {
                ...data.generalInformation,
                date: date
            },
        };
    });
    return workouts;
}

// Method to fetch and log all documents from the "WorkoutSet" collection
export async function fetchAndLogAllData() {
    try {
        const querySnapshot = await getDocs(collection(db, "WorkoutSet"));
        querySnapshot.forEach(doc => {
            console.log(doc.id, " => ", doc.data());
        });
    } catch (error) {
        console.error("Error fetching documents: ", error);
    }
}
