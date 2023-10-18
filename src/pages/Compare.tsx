import CompareContainer from "../components/CompareContainer";
import { useAppSelector } from "../redux-store/hook";
import Wrapper from "../sections/Wrapper";

function Compare() {
  const compareQueue = useAppSelector((state) => state.pokemon.compareQueue);
  return (
    <div className="compare">
      <CompareContainer
      //@ts-ignore
        pokemonEl={compareQueue[0]}
        isEmpty={compareQueue.length < 1}
      />
      <CompareContainer
      //@ts-ignore
        pokemonEl={compareQueue[1]}
        isEmpty={compareQueue.length < 2}
      />
    </div>
  );
}

export default Wrapper(Compare);
