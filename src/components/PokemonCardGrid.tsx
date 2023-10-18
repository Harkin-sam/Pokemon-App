import { pokemonTypeInterface, userPokemonsType } from "../utils/Types";
import { IoGitCompare } from "react-icons/io5";
import { FaPlus, FaTrash } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux-store/hook";
import {
  addToCompare,
  setCurrentPokemon,
} from "../redux-store/slices/PokemonSlice";
import { setPokemonTab, setToast } from "../redux-store/slices/AppSlice";
import { addPokemonToList } from "../redux-store/reducers/addPokemonToList";
import { removePokemonFromUserList } from "../redux-store/reducers/removePokemonFromUserList";
import { pokemonTabs } from "../utils/Constants";

import { motion } from "framer-motion";

function PokemonCardGrid({ pokemons }: { pokemons: userPokemonsType[] }) {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return (
    <div className="pokemon-card-grid-container">
      <div className="pokemon-card-grid">
        {pokemons &&
          pokemons.length > 0 &&
          pokemons.map((data: any, i: number) => {
            return (
              <motion.div
                className="pokemon-card"
                key={data.id}
                initial={{ opacity: 0, translateX: i % 2 === 0 ? -50: 50, translateY: -50 }}
                animate={{ opacity: 1, translateX: 0, translateY: 0 }}
                transition={{ duration: 0.3, delay: i * 0.1 }} // using index i to  make stagger effect with delay object
              >
                <div className="pokemon-card-list">
                  {location.pathname.includes("pokemon") ||
                  location.pathname.includes("/search") ? (
                    <FaPlus
                      className="plus"
                      onClick={() => dispatch(addPokemonToList(data))}
                    />
                  ) : (
                    <FaTrash
                      className="trash"
                      onClick={async () => {
                        await dispatch(
                          removePokemonFromUserList({ id: data.firebaseId! })
                        );
                        dispatch(setToast("Pokemon removed successfully!"));
                      }}
                    />
                  )}
                </div>

                <div className="pokemon-card-compare">
                  <IoGitCompare
                    onClick={() => {
                      dispatch(addToCompare(data));
                      dispatch(
                        setToast(
                          `${data.name} has been added to compare Queue.`
                        )
                      );
                    }}
                  />
                </div>

                <h3 className="pokemon-card-title">{data.name}</h3>

                <img
                  src={`/src${data.image.substring(2)}`}
                  alt="pokemon"
                  loading="lazy"
                  className="pokemon-card-image"
                  onClick={() => {
                    dispatch(setPokemonTab(pokemonTabs.description));
                    dispatch(setCurrentPokemon(undefined));
                    navigate(`/pokemon/${data.id}`);
                  }}
                />

                <div className="pokemon-card-types">
                  {data.types.map(
                    (type: pokemonTypeInterface, index: number) => {
                      const keys = Object.keys(type);

                      return (
                        <div className="pokemon-card-types-type" key={index}>
                          <img
                            src={type[keys[0]].image}
                            className="pokemon-card-types-type-image"
                            alt="pokemon type"
                            loading="lazy"
                          />

                          <h6 className="pokemon-card-types-type-text">
                            {keys[0]}
                          </h6>
                        </div>
                      );
                    }
                  )}
                </div>
              </motion.div>
            );
          })}
      </div>
    </div>
  );
}

export default PokemonCardGrid;

// substring( what used to remove character of a string)
