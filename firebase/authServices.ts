import {GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, type User,} from "firebase/auth";
import {auth} from "~/firebase/init";


export const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
        await signInWithPopup(auth, provider);
    } catch (error) {
        console.error("Login Error: ", error);
    }
};

export const logout = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        console.error("Logout Error: ", error);
    }
};

// Monitor authentication status
export const onAuthStateChange = (callback: (user: User | null) => void) => {
    onAuthStateChanged(auth, user => {
        callback(user);
    });
};