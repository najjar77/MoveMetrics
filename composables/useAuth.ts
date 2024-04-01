import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "~/firebase/init";

const user = ref<User | null>(auth.currentUser);
const isAuthCheckComplete = ref(false);
console.log("auth.current = ", auth.currentUser);
// Monitor authentication status when starting the application
onAuthStateChanged(auth, async (firebaseUser) => {
  console.log("inAuth is called");
  user.value = firebaseUser;
  isAuthCheckComplete.value = !!user.value;
});

export const useAuth = () => {
  return { user, isAuthCheckComplete };
};
