import { useAppSelector } from "../../redux-store/hook";
import PokemonContainer from "../../components/PokemonContainer";
import Info from "../../components/Info";

function Description() {
  const currentPokemon = useAppSelector(
    (state) => state.pokemon.currentPokemon
  );

  return (
    <div>
      {currentPokemon && (
        <>
          <Info data={currentPokemon} />
          <PokemonContainer image={currentPokemon?.image!} />
        </>
      )}
    </div>
  );
}

export default Description;
