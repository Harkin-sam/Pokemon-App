import { createAsyncThunk } from "@reduxjs/toolkit";
import { genericPokemonType, generatedPokemonType } from "../../utils/Types";
import axios from "axios";
import { defaultImages, images } from "../../utils/getPokemonImages";
import { pokemonTypes } from "../../utils/pokemonTypes";

export const getPokemonData = createAsyncThunk(
  "pokemon/randomPokemon",
  async (pokemons: genericPokemonType[]) => {
    try {
      const pokemonsData: generatedPokemonType[] = [];

      // loop over each pokemon url to get individual details
      for await (const pokemon of pokemons) {
        const {
          data,
        }: { data: { id: number; types: { type: generatedPokemonType }[] } } =
          await axios.get(pokemon.url);

        // console.log(data, pokemonsData);
        // console.log({ defaultImages, images });

        const types = data.types.map(
          ({ type: { name } }: { type: { name: string } }) => ({
            // @ts-expect-error
            [name]: pokemonTypes[name],
          })
        );

        let image: string = images[data.id];
        if (!image) {
          image = defaultImages[data.id];
        }
        if (image) {
          pokemonsData.push({
            name: pokemon.name,
            id: data.id,
            image,
            types,
          });
        } else {
          console.log("no image");
        }
      }
      console.log({ pokemonsData });
      return pokemonsData;
    } catch (err) {
      console.log(err);
    }
  }
);
