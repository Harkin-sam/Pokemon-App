import { useEffect } from "react";
import Wrapper from "../sections/Wrapper";
import { useAppDispatch, useAppSelector } from "../redux-store/hook";
import { getInitialPokemonData } from "../redux-store/reducers/getInitialPokemonData";
import { getPokemonData } from "../redux-store/reducers/getPokemonData";

function Search() {
  const dispatch = useAppDispatch();
  const allPokemon = useAppSelector((state) => state.pokemon.allPokemon);

  useEffect(() => {
    dispatch(getInitialPokemonData()); // loaded all pokemon from API
  }, [dispatch]);

  useEffect(() => {
    //allPokemon will initially be undefined
    if (allPokemon) {
      const clonedPokemons = [...allPokemon];
      
      // random pokem generation  and 20 limit
      const randomPokemonId = clonedPokemons
        .sort(() => Math.random() - Math.random())
        .slice(0, 20);

    //   console.log(randomPokemonId);

        dispatch(getPokemonData(randomPokemonId))
    }
  }, [allPokemon, dispatch]);

  return <div>Search</div>;
}

export default Wrapper(Search);
