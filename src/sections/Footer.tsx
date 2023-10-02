import {signOut } from "firebase/auth"
import {MdOutlinePowerSettingsNew} from'react-icons/md'
import { firebaseAuth } from "../utils/FirebaseConfig";
import { useAppDispatch } from "../redux-store/hook";
import { setToast, setUserStatus } from "../redux-store/slices/AppSlice";
import { pokemonTabs } from "../utils/Constants";


function Footer() {

  const dispatch = useAppDispatch();

  const handleLogout = () => {
    signOut(firebaseAuth);

    dispatch(setUserStatus(undefined))
    dispatch(setToast("Logged Out Successfully from Firebase."))
  }


  const routes = [
    {
      name: pokemonTabs.description,
      value: "Description",
    },
    {
      name: pokemonTabs.evolution,
      value: "Evolution",
    },
    {
      name: pokemonTabs.locations,
      value: "Catching",
    },
    {
      name: pokemonTabs.moves,
      value: "Capable Moves",
    },
  ];

  return (
    <footer>
        <div className="block"></div>

        <div className="data"></div>

        <div className="block">
            <MdOutlinePowerSettingsNew  onClick={handleLogout}/>
        </div>
    </footer>
  )
}

export default Footer