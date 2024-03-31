// DBController.ts
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "~/firebase/init";
import type { WorkoutData } from "~/models/formData/workoutData";
import { useAuth } from "~/composables/useAuth";

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
    const { user } = useAuth();
    if (!user.value || !user.value.uid) {
      console.error("User not logged in");
      throw new Error("User not logged in");
    }
    const workoutDataWithUserId = {
      ...workoutData,
      //userId: user.value.uid // Add the user ID to the workout data
    };
    const docRef = await addDoc(
      collection(db, `user_${user.value.uid}_workouts`),
      workoutDataWithUserId,
    );
    console.log("Document written with ID:", docRef.id);
    return docRef.id; // Return document ID on success
  } catch (error) {
    console.error("Error adding document:", error);
    throw new Error("Error saving workout data");
  }
}

export async function fetchWorkoutDataByUser(
  userId: string,
): Promise<WorkoutData[]> {
  try {
    // Verwendet die Nutzer-ID, um auf die spezifische Sammlung zuzugreifen
    const workoutsQuery = query(collection(db, `user_${userId}_workouts`));
    const querySnapshot = await getDocs(workoutsQuery);

    const workouts = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      // Datumskonvertierung bleibt gleich
      const date =
        data.generalInformation && data.generalInformation.date
          ? new Timestamp(
              data.generalInformation.date.seconds,
              data.generalInformation.date.nanoseconds,
            ).toDate()
          : new Date();

      return {
        id: doc.id,
        ...data,
        generalInformation: {
          ...data.generalInformation,
          date: date,
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
    querySnapshot.forEach((doc) => {
      //console.log(doc.id, " => ", doc.data());
    });
  } catch (error) {
    console.error("Error fetching documents: ", error);
  }
}

//TODO: Delete and Update Methods need to be modified ==> currently not working
//Method to delete selected Data Entries
export async function deleteWorkoutData(userId: string, documentId: string) {
  try {
    await deleteDoc(doc(db, `user_${userId}_workouts`, documentId));
    console.log("Document successfully deleted!");
  } catch (error) {
    console.error("Error removing document: ", error);
    throw new Error("Error deleting workout data");
  }
}

// Method to update a WorkoutData document by documentId without including the id in the document
export async function updateWorkoutData(
  userId: string,
  documentId: string,
  workoutData: WorkoutData,
) {
  try {
    // Destructure the workoutData to exclude the id property if it exists
    const { id, ...dataToUpdate } = workoutData;

    // Get a reference to the specific document in the user's collection
    const docRef = doc(db, `user_${userId}_workouts`, documentId);

    // Update the document with the dataToUpdate, which excludes the id
    await updateDoc(docRef, dataToUpdate);

    console.log("Document successfully updated with ID:", documentId);
  } catch (error) {
    console.error("Error updating document:", error);
    throw new Error("Error updating workout data");
  }
}
