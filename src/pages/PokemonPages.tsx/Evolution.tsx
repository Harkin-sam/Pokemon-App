import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux-store/hook";
import { getPokemonData } from "../../redux-store/reducers/getPokemonData";
import PokemonCardGrid from "../../components/PokemonCardGrid";

function Evolution() {
  const dispatch = useAppDispatch();
  const [isloaded, setIsLoaded] = useState(false);
  const {currentPokemon, randomPokemons}  = useAppSelector(
    (state) => state.pokemon
  );


  useEffect(() => {
    const fetchData = async () => {
      const pokemonEV = currentPokemon?.evolution.map(({ pokemon }) => pokemon);
      console.log(pokemonEV)
      await dispatch(getPokemonData(pokemonEV!));
      setIsLoaded(true);
    };
    fetchData();
  }, [dispatch]);

  return (
    <div className="page">
      {isloaded && <PokemonCardGrid pokemons={randomPokemons!} />}
    </div>
  );
}

export default Evolution;
