import { userPokemonsType } from "../utils/Types";
import { FaPlus } from "react-icons/fa";
import { pokemonTypeInterface } from "../utils/Types";

function CompareContainer({
  pokemonEl = undefined,
  isEmpty = false,
}: {
  pokemonEl?: userPokemonsType;
  isEmpty?: boolean;
}) {


    const getStats = () => {
        
    }

  return (
    <div className="compare-container">
      {isEmpty && (
        <div className="empty">
          <button>
            <FaPlus />
          </button>
          <h3>Add Pokemon to Comparison</h3>
        </div>
      )}

      {pokemonEl && (
        <div className="compare-element">
          <div className="compare-info">
            <div className="compare-details">
              <h3>{pokemonEl?.name}</h3>
              <img
                src={`./src${pokemonEl.image.substring(2)}`}
                alt="pokemon"
                className="compare-image"
              />
            </div>

            <div className="pokemon-types-container">
              <div className="pokemon-types">
                <h4 className="pokemon-type-title">Type</h4>
                <div className="pokemon-type-icons">
                  {pokemonEl?.types.map(
                    (type: pokemonTypeInterface, index: number) => {
                      const keys = Object.keys(type);
                      return (
                        <div key={index} className="pokemon-type">
                          <img src={type[keys[0]].image} alt="pokemon type" />
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
              {/* {getStats()} */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CompareContainer;
