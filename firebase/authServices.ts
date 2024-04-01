import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "~/firebase/init";

export const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const router = useRouter();
  try {
    await signInWithPopup(auth, provider);
    await router.push("/dashboard");
  } catch (error) {
    console.error("Login Error: ", error);
  }
};

export const logoutFromGoogle = async () => {
  try {
    await signOut(auth);
    window.location.reload();
  } catch (error) {
    console.error("Logout Error: ", error);
  }
};
