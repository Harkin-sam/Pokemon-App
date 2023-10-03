import { signOut } from "firebase/auth";
import { MdOutlinePowerSettingsNew } from "react-icons/md";
import { firebaseAuth } from "../utils/FirebaseConfig";
import { useAppDispatch, useAppSelector } from "../redux-store/hook";
import { setPokemonTab, setToast, setUserStatus } from "../redux-store/slices/AppSlice";
import { pokemonTabs } from "../utils/Constants";
import { useLocation } from "react-router-dom";

function Footer() {
  const location = useLocation(); //to get path name

  const dispatch = useAppDispatch();
  const currentPokemonTab = useAppSelector(state => state.app.currentPokemonTab)

  const handleLogout = () => {
    signOut(firebaseAuth);

    dispatch(setUserStatus(undefined));
    dispatch(setToast("Logged Out Successfully from Firebase."));
  };

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

      <div className="data">
        <ul>
          {/* render if only the path is /pokemon */}

          {location.pathname.includes("/pokemon") &&
            routes.map((route) => {
              return (
                <li key={route.name} className={`${currentPokemonTab === route.name ? "active" : ""}`} onClick={()=>{dispatch(setPokemonTab(route.name))}}>
                  {route.value}
                </li>
              );
            })}
        </ul>
      </div>

      <div className="block">
        <MdOutlinePowerSettingsNew onClick={handleLogout} />
      </div>
    </footer>
  );
}

export default Footer;
