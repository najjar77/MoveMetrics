import {onAuthStateChange} from "~/firebase/authServices";
import type {User} from "firebase/auth";

const user = ref<User | null>(null);
const isAuthCheckComplete = ref(false);

// Monitor authentication status when starting the application
onAuthStateChange((firebaseUser) => {
    user.value = firebaseUser;
    isAuthCheckComplete.value = true;
});

export const useAuth = () => {
    return {user, isAuthCheckComplete};
};