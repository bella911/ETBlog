import { Button } from "flowbite-react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signIn } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
import axios from "../axios";
import { FcGoogle } from "react-icons/fc";

export default function OAuth() {
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [loading, setLoading] = useState(false);
  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    const resultsFromGoogle = await signInWithPopup(auth, provider);

    axios
      .post("/auth/google", {
        name: resultsFromGoogle.user.displayName,
        email: resultsFromGoogle.user.email,
        googlePhotoUrl: resultsFromGoogle.user.photoURL,
      }, {withCredentials:true})
      .then((res) => {
        // console.log(res.data.data);
        dispatch(signIn(res.data));
        navigate(`/`);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <button
      type="submit"
      // className="w-full flex justify-center items-center  mt-2 py-2 px-4 rounded-md text-sm font-medium bg-green-300 dark:text-gray-700"
      className="w-full flex justify-center items-center mb-3 dark:text-white bg-green-500  focus:ring-4 focus:outline-none hover:opacity-75 font-medium rounded-lg text-sm px-5 py-2 text-center "
      onClick={handleGoogleClick}
      as="div"
    >
      <FcGoogle className="w-6 h-6 mr-2" />
      <span className="ml-2 ">Continue with google</span>
    </button>
  );
}
