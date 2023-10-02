import { useEffect, useCallback } from "react";
import Wrapper from "../sections/Wrapper";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../redux-store/hook";
import axios from "axios";
import { pokemonRoute, pokemonSpeciesRoute } from "../utils/Constants";
import { defaultImages, images } from "../utils/getPokemonImages";

// this package extracts color pallets from image
import { extractColors } from "extract-colors";

function Pokemon() {
  const params = useParams();
  const dispatch = useAppDispatch();


  // RECURSIVE FUNCTION 
  const getRecursiveEvolution: any = useCallback(
    (evolutionChain: any, level: number, evolutionData: any) => {
      if (!evolutionChain.evolves_to.length) {
        return evolutionData.push({
          pokemon: {
            ...evolutionChain.species,
            url: evolutionChain.species.url.replace(
              "pokemon-species",
              "pokemon"
            ),
          },
          level,
        });
      }

      evolutionData.push({
        pokemon: {
          ...evolutionChain.species,
          url: evolutionChain.species.url.replace("pokemon-species", "pokemon"),
        },
        level,
      });
      
      return getRecursiveEvolution(
        evolutionChain.evolves_to[0],
        level + 1,
        evolutionData
      );
    },
    []
  );


  
  const getEvolutionData = useCallback(
    (evolutionChain: any) => {
      const evolutionData: any[] = [];
      getRecursiveEvolution(evolutionChain, 1, evolutionData);
      return evolutionData;
    },
    [getRecursiveEvolution]
  );



  const getPokemonInfo = useCallback(
    async (image: string) => {
      const { data } = await axios.get(`${pokemonRoute}/${params.id}`);
      // console.log(data.location_area_encounters) // will print https://pokeapi.co/api/v2/pokemon/1/encounters
      
      const { data: dataEncounters } = await axios.get(
        data.location_area_encounters
      );

      const {
        data: {
          evolution_chain: { url: evolutionURL },
        },
      } = await axios.get(`${pokemonSpeciesRoute}/${data.id}`);

      // GET EVOLUTION DATA
      const { data: evolutionData } = await axios.get(evolutionURL);

      //ENCOUNTERS
      const encounters: string[] = [];
      dataEncounters.forEach((encounter: any) => {
        encounters.push(
          encounter.location_area.name.toUpperCase().split("-").join(" ")
        );
      });
      console.log({ data });

      //ABILITIES
      const pokemonAbilities: { abilities: string[]; moves: string[] } = {
        abilities: data.abilities.map(
          ({ ability }: { ability: { name: string } }) => ability.name
        ),
        moves: data.moves.map(
          ({ move }: { move: { name: string } }) => move.name
        ),
      };

      const evolution = getEvolutionData(evolutionData.chain); //NOTE

      const evolutionLevel = evolution.find(
        ({ pokemon }) => pokemon.name === data.name
      ).level;
      console.log({
        id: data.id,
        name: data.name,
        types: data.types.map(
          ({ type: { name } }: { type: { name: string } }) => name
        ),
        image,
        stats: data.stats.map(
          ({
            stat,
            base_stat,
          }: {
            stat: { name: string };
            base_stat: number;
          }) => ({
            name: stat.name,
            value: base_stat,
          })
        ),
        encounters,
        evolutionLevel,
        evolution,
        pokemonAbilities,
      });
    },
    [getEvolutionData, params.id]
  );

  useEffect(() => {
    const imageElement = document.createElement("img");
    // @ts-ignore

    const imgSrc = images[params.id];
    console.log(params.id)
    const newSrc = `/src${imgSrc.substring(2)}`
    imageElement.src = newSrc;
    console.log(imageElement.src)
    
    if (!imageElement.src) {
      // @ts-ignore
      const defaultSrc = defaultImages[params.id];
      const newDefaultSrc = `/src${defaultSrc.substring(2)}`
      imageElement.src = newDefaultSrc;
      console.log(imageElement.src)
    }

    const options = {
      pixels: 10000,
      distance: 1,
      splitPower: 10,
      colorValidator: (red: number, green: number, blue: number, alpha = 255) =>
        alpha > 250,
      saturationDistance: 0.2,
      lightnessDistance: 0.2,
      hueDistance: 0.083333333,
    };

    //extract colors from an image element, select the most dominant color of the image
    const getColor = async () => {
      const color = await extractColors(imageElement.src, options);
      const root = document.documentElement; //returns the Element that is the root element of the document (for example, the <html> element for HTML documents)
      root.style.setProperty("--accent-color", color[0].hex.split('"')[0]);
    };
    getColor();

    getPokemonInfo(imageElement.src);
  }, [params, getPokemonInfo]);

  return <div>Pokemon</div>;
}

export default Wrapper(Pokemon);


// npm i extract-colors