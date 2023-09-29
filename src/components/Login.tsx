import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { firebaseAuth, userRef, firebaseDB } from "../utils/FirebaseConfig";
import { addDoc, getDocs,collection, query, where } from "firebase/firestore";
import { setUserStatus } from "../redux-store/slices/AppSlice";
import { useAppDispatch } from "../redux-store/hook";

function Login() {
  const dispatch = useAppDispatch();

  // Google singing popup function
  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();

    // get the email and user id of the user
    const {
        user: { email, uid },
      } = await signInWithPopup(firebaseAuth, provider);

    if (email) {
      // find if there's any user with the id
      const firestoreQuery = query(userRef, where("uid", "==", uid));
      const fetchedUser = await getDocs(firestoreQuery);

      // if theres no user, user is then added to user collection;
      if (fetchedUser.docs.length === 0) {
        await addDoc(collection(firebaseDB, "users"), {
            uid,
            email,
          });
      }

      // add to redux state
      dispatch(setUserStatus({ email }));
    }
  };

  return (
    <div className="login">
      <button className="login-btn" onClick={handleLogin}>
        <FcGoogle />
        Login with Google
      </button>
    </div>
  );
}

export default Login;
