import { useEffect } from "react";
import Wrapper from "../sections/Wrapper";
import { useAppDispatch, useAppSelector } from "../redux-store/hook";
import { getInitialPokemonData } from "../redux-store/reducers/getInitialPokemonData";
import { getPokemonData } from "../redux-store/reducers/getPokemonData";
import PokemonCardGrid from "../components/PokemonCardGrid";

function Search() {
  const dispatch = useAppDispatch();
  const allPokemon = useAppSelector((state) => state.pokemon.allPokemon);
  const randomPokemons = useAppSelector((state) => state.pokemon.randomPokemons);

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

  return <>
    <div className="search">
      <input type="text" name="" id="" />
      <PokemonCardGrid  pokemons={randomPokemons!}/>

    </div>
  </>;
}

export default Wrapper(Search);

// the exclamation mark in randomPokemons is to show that this is not empty in typescript