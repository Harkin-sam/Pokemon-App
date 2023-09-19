import { pokemonTypeInterface, userPokemonsType } from "../utils/Types";
import { IoGitCompare } from "react-icons/io5";
import { FaPlus, FaTrash } from "react-icons/fa";
import { useLocation } from "react-router-dom";

function PokemonCardGrid({ pokemons }: { pokemons: userPokemonsType[] }) {
  const location = useLocation();

  return (
    <div className="pokemon-card-grid-container">
      <div className="pokemon-card-grid">
        {pokemons &&
          pokemons.length > 0 &&
          pokemons.map((data: any) => {
            return (
              <div className="pokemon-card" key={data.id}>

                <div className="pokemon-card-list">
                  {location.pathname.includes("pokemon") || location.pathname.includes("/search") ? (<FaPlus className="plus" />) : 
                    (<FaTrash className="trash" />)}
                </div>

                <div className="pokemon-card-compare">
                  <IoGitCompare />
                </div>

                <h3 className="pokemon-card-title">{data.name}</h3>

                <img
                  src={`./src${data.image.substring(2)}`}
                  alt="pokemon"
                  loading="lazy"
                  className="pokemon-card-image"
                />

                <div className="pokemon-card-types">
                  {data.types.map(
                    (type: pokemonTypeInterface, index: number) => {
                      const keys = Object.keys(type);

                      return (
                        <div className="pokemon-card-types-type" key={index}>
                          
                          <img
                            src={type[keys[0]].image}
                            className="pokemon-card-types-type-image"
                            alt="pokemon type"
                            loading="lazy"
                          />

                          <h6 className="pokemon-card-types-type-text">
                            {keys[0]}
                          </h6>
                        </div>
                      );

                    }
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default PokemonCardGrid;

// substring( what used to remove character of a string)
