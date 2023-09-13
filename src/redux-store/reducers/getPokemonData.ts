import { createAsyncThunk } from "@reduxjs/toolkit";
import { genericPokemonType } from "../../utils/Types";
import axios from "axios";
import { defaultImages, images } from "../../utils/getPokemonImages";

export const getPokemonData = createAsyncThunk(
  "pokemon/randomPokemon",
  async (pokemons: genericPokemonType[]) => {
    try {
      const pokemonsData: genericPokemonType[] = [];

      // loop over each pokemon url to get individual details
      for await (const pokemon of pokemons) {
        const { data } = await axios.get(pokemon.url);
        // console.log(data);

        console.log({defaultImages, images})
      }
    } catch (err) {
      console.log(err);
    }
  }
);
