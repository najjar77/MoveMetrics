import {onAuthStateChange} from "~/firebase/authServices";
import type {User} from "firebase/auth";

const user = ref<User | null>(null);

// Authentifizierungsstatus beim Start der Anwendung überwachen
onAuthStateChange((firebaseUser) => {
    user.value = firebaseUser;
});

export const useAuth = () => {
    return {user};
};