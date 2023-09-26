import { userPokemonsType } from "../utils/Types";
import { FaPlus } from "react-icons/fa";
import { pokemonTypeInterface, pokemonStatType } from "../utils/Types";
import { pokemonTypes } from "../utils/pokemonTypes";

function CompareContainer({
  pokemonEl = undefined,
  isEmpty = false,
}: {
  pokemonEl?: userPokemonsType;
  isEmpty?: boolean;
}) {

    const createStatsArray = (
        types: pokemonTypeInterface[],
        statType: pokemonStatType
      ) => {
        const statsArray: { name: string; image: string }[] = [];
        const statsSet = new Set<string>();
        types.forEach((type: pokemonTypeInterface) => {
          const key = Object.keys(type)[0];
          type[key][statType].forEach((stat: string) => {
            if (!statsSet.has(stat)) {
              // @ts-ignore
              statsArray.push({ name: stat, image: pokemonTypes[stat].image });
              statsSet.add(stat);
            }
          });
        });
        return statsArray;
      };

  const getStats = () => {
    return (
      <>
        <div className="pokemon-types">
          <h4 className="pokemon-type-title">Strength</h4>
          <div className="pokemon-type-icons">
            {createStatsArray(pokemonEl?.types!, "strength").map(
              (stat: { image: string }) => (
                <div className="pokemon-type">
                  <img src={stat.image} alt="" className="pokemon-type-image" />
                </div>
              )
            )}
          </div>
        </div>
        <div className="pokemon-types">
          <h4 className="pokemon-type-title">Weakness</h4>
          <div className="pokemon-type-icons">
            {createStatsArray(pokemonEl?.types!, "weakness").map(
              (stat: { image: string }) => (
                <div className="pokemon-type">
                  <img src={stat.image} alt="" className="pokemon-type-image" />
                </div>
              )
            )}
          </div>
        </div>
        <div className="pokemon-types">
          <h4 className="pokemon-type-title">Resistance</h4>
          <div className="pokemon-type-icons">
            {createStatsArray(pokemonEl?.types!, "resistance").map(
              (stat: { image: string }) => (
                <div className="pokemon-type">
                  <img src={stat.image} alt="" className="pokemon-type-image" />
                </div>
              )
            )}
          </div>
        </div>
        <div className="pokemon-types">
          <h4 className="pokemon-type-title">Vulnerable</h4>
          <div className="pokemon-type-icons">
            {createStatsArray(pokemonEl?.types!, "vulnerable").map(
              (stat: { image: string }) => (
                <div className="pokemon-type">
                  <img src={stat.image} alt="" className="pokemon-type-image" />
                </div>
              )
            )}
          </div>
        </div>
      </>
    );
  };

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
                          <img
                            src={type[keys[0]].image}
                            alt="pokemon type"
                            className="pokemon-type-image"
                          />
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
              {getStats()}
            </div>
          </div>
          <div className="compare-action-buttons">
            <button className="compare-btn">Add</button>
            <button className="compare-btn">View</button>
            <button className="compare-btn">Remove</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CompareContainer;
