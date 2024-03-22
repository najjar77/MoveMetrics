import {onAuthStateChange} from "~/firebase/authServices";
import type {User} from "firebase/auth";

const user = ref<User | null>(null);

// Monitor authentication status when starting the application
onAuthStateChange((firebaseUser) => {
    user.value = firebaseUser;
});

export const useAuth = () => {
    return {user};
};