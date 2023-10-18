import { useEffect } from "react";
import Wrapper from "../sections/Wrapper";
import { useAppDispatch, useAppSelector } from "../redux-store/hook";
import { getInitialPokemonData } from "../redux-store/reducers/getInitialPokemonData";
import { getPokemonData } from "../redux-store/reducers/getPokemonData";
import PokemonCardGrid from "../components/PokemonCardGrid";
import { debounce } from "../utils/Debounce";



function Search() {
  const dispatch = useAppDispatch();
  const allPokemon = useAppSelector((state) => state.pokemon.allPokemon);
  const randomPokemons = useAppSelector(
    (state) => state.pokemon.randomPokemons
  );

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

      dispatch(getPokemonData(randomPokemonId));
    }
  }, [allPokemon, dispatch]);


const handleChange = debounce((value: string) => getPokemon(value), 300); // this debounce function only runs the code ever 3 seconds


  // SEARCH & FILTER FEATURE 

  const getPokemon = async (value: string) => {
    if (value.length) {
      const pokemons = allPokemon?.filter((pokemon) => {
        return pokemon.name.includes(value.toLowerCase());
      });

      console.log(pokemons)
      dispatch(getPokemonData(pokemons!)); // '!' tell TS that its not empty
    } else {
      const clonedPokemons = [...(allPokemon as [])];

      const randomPokemonId = clonedPokemons
        .sort(() => Math.random() - Math.random())
        .slice(0, 20);

      dispatch(getPokemonData(randomPokemonId));
    }
  };


  return (
    <>
      <div className="search">
        <input
          type="text"
          className="pokemon-searchbar"
          placeholder="Search Pokemon"
          onChange={(e) => handleChange(e.target.value)}
        />
      
        {//@ts-ignore
          <PokemonCardGrid pokemons={randomPokemons} />
          }
      </div>
    </>
  );
}

export default Wrapper(Search);

// the exclamation mark in randomPokemons is to show that this is not empty in typescript
