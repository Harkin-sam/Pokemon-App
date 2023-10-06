import { useAppSelector } from "../../redux-store/hook";

function Location() {
  const currentPokemon = useAppSelector(
    (state) => state.pokemon.currentPokemon
  );
  return (
    <div className="pokemon-locations">
      <ul className="pokemon-locations-list">
        {currentPokemon?.encounters.map((encounter: string) => (
          <li key={encounter} className="pokemon-location">
            {encounter}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Location;
