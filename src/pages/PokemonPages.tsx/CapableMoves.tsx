import { useAppSelector } from "../../redux-store/hook";

function CapableMoves() {
  const currentPokemon = useAppSelector(
    (state) => state.pokemon.currentPokemon
  );
  return (
    <div className="capable-moves">
      <h1 className="capable-moves-title">Abilities</h1>
      <ul className="capable-moves-list ability">
        {currentPokemon?.pokemonAbilities?.abilities?.map((ability: string) => (
          <li key={ability} className="move">
            {ability}
          </li>
        ))}
      </ul>

      <h1 className="capable-moves-title">Moves</h1>
      <ul className="capable-moves-list ">
        {currentPokemon?.pokemonAbilities?.moves?.map((move: string) => (
          <li key={move} className="move">
            {move}
          </li>
        ))}
      </ul>

    </div>
  );
}

export default CapableMoves;
