import { useAppSelector } from "../../redux-store/hook";
import { motion } from "framer-motion";

function CapableMoves() {
  const currentPokemon = useAppSelector(
    (state) => state.pokemon.currentPokemon
  );
  return (
    <div className="capable-moves">
      <h1 className="capable-moves-title">Abilities</h1>
      <ul className="capable-moves-list ability">
        {currentPokemon?.pokemonAbilities?.abilities?.map(
          (ability: string, i: number) => (
            <motion.li
              key={ability}
              className="move"
              initial={{
                opacity: 0,
                translateX: i % 2 === 0 ? -50 : 50,
                translateY: -50,
              }}
              animate={{ opacity: 1, translateX: 0, translateY: 0 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
            >
              {ability}
            </motion.li>
          )
        )}
      </ul>

      <h1 className="capable-moves-title">Moves</h1>
      <ul className="capable-moves-list ">
        {currentPokemon?.pokemonAbilities?.moves?.map(
          (move: string, i: number) => (
            <motion.li
              key={move}
              className="move"
              initial={{
                opacity: 0,
                translateX: i % 2 === 0 ? -50 : 50,
                translateY: -50,
              }}
              animate={{ opacity: 1, translateX: 0, translateY: 0 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
            >
              {move}
            </motion.li>
          )
        )}
      </ul>
    </div>
  );
}

export default CapableMoves;
