// DBController.ts
import {addDoc, collection, deleteDoc, doc, getDocs, query, Timestamp, updateDoc, where} from "firebase/firestore";
import {db} from '~/firebase/init';
import type {WorkoutData} from "~/models/formData/workoutData";
import {useAuth} from "~/composables/useAuth";


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

export async function saveWorkoutDataByUserId(workoutData: any) {
    try {
        const {user} = useAuth();
        if (!user.value || !user.value.uid) {
            console.error("User not logged in");
            throw new Error("User not logged in");
        }
        const workoutDataWithUserId = {
            ...workoutData,
            userId: user.value.uid
        };
        const docRef = await addDoc(collection(db, "WorkoutSet"), workoutDataWithUserId);
        console.log("Document written with ID:", docRef.id);
        return docRef.id; // Return document ID on success
    } catch (error) {
        console.error("Error adding document:", error);
        throw new Error("Error saving workout data");
    }
}

//Fetching the data from database
export async function fetchWorkoutData(): Promise<WorkoutData[]> {
    const querySnapshot = await getDocs(collection(db, "WorkoutSet"));
    const workouts = querySnapshot.docs.map(doc => {
        //console.log(doc.id)
        const data = doc.data();
        // Ensure the date is a Date object
        const date = data.generalInformation && data.generalInformation.date
            ? new Timestamp(data.generalInformation.date.seconds, data.generalInformation.date.nanoseconds).toDate()
            : new Date();

        return {
            id: doc.id,
            ...data,
            generalInformation: {
                ...data.generalInformation,
                date: date
            },
        };
    });
    return workouts;
}


// Method to fetch workout data by userId
export async function fetchWorkoutDataByUser(userId: string): Promise<WorkoutData[]> {
    try {
        // Erstellt eine Query mit einer where-Bedingung, die nach Dokumenten sucht, bei denen userId übereinstimmt
        const workoutsQuery = query(collection(db, "WorkoutSet"), where("userId", "==", userId));
        const querySnapshot = await getDocs(workoutsQuery);

        const workouts = querySnapshot.docs.map(doc => {
            const data = doc.data();
            // Stellt sicher, dass das Datum ein Date-Objekt ist
            const date = data.generalInformation && data.generalInformation.date
                ? new Timestamp(data.generalInformation.date.seconds, data.generalInformation.date.nanoseconds).toDate()
                : new Date();

            return {
                id: doc.id,
                ...data,
                generalInformation: {
                    ...data.generalInformation,
                    date: date
                },
            };
        });

        return workouts;
    } catch (error) {
        console.error("Error fetching workouts by user ID:", error);
        throw new Error("Error fetching workout data by user");
    }
}


// Method to fetch and log all documents from the "WorkoutSet" collection
export async function fetchAndLogAllData() {
    try {
        const querySnapshot = await getDocs(collection(db, "WorkoutSet"));
        querySnapshot.forEach(doc => {
            //console.log(doc.id, " => ", doc.data());
        });
    } catch (error) {
        console.error("Error fetching documents: ", error);
    }
}

//Method to delete selected Data Entries
export async function deleteWorkoutData(documentId: string) {
    try {
        await deleteDoc(doc(db, "WorkoutSet", documentId));
        console.log("Document successfully deleted!");
    } catch (error) {
        console.error("Error removing document: ", error);
        throw new Error("Error deleting workout data");
    }
}


// Method to update a WorkoutData document by documentId without including the id in the document
export async function updateWorkoutData(documentId: string, workoutData: WorkoutData) {
    try {
        // Destructure the workoutData to exclude the id property if it exists
        const {id, ...dataToUpdate} = workoutData;

        // Get a reference to the specific document
        const docRef = doc(db, "WorkoutSet", documentId);

        // Update the document with the dataToUpdate, which excludes the id
        await updateDoc(docRef, dataToUpdate);

        console.log("Document successfully updated with ID:", documentId);
    } catch (error) {
        console.error("Error updating document:", error);
        throw new Error("Error updating workout data");
    }
}
