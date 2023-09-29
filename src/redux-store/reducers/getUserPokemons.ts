import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { getDoc, getDocs, query } from "firebase/firestore";
import { pokemonListRef } from "../../utils/FirebaseConfig";
import { where } from "firebase/firestore";
import { userPokemonsType } from "../../utils/Types";
import { pokemonTypes } from "../../utils/pokemonTypes";
import { defaultImages, images } from "../../utils/getPokemonImages";

export const getUserPokemons = createAsyncThunk(
  "pokemon/userList",
  async (args, { getState }) => {
    try {
      const {
        app: { userInfo },
      } = getState() as RootState;

      if (!userInfo?.email) {
        return;
      }
      const firestoreQuery = query(
        pokemonListRef,
        where("email", "==", userInfo.email)
      );
      const fetchedPokemons = await getDocs(firestoreQuery);
      if (fetchedPokemons.docs.length) {
        const userPokemons: userPokemonsType[] = [];

        fetchedPokemons.forEach(async (pokemon) => {
          const pokemons = await pokemon.data().pokemon;

          // @ts-ignore
          let image = images[pokemons.id];
          if (!image) {
            //@ts-ignore
            image = defaultImages[pokemons.id];
          }
          const types = pokemons.types.map((name: string) => ({
            //@ts-ignore
            [name]: pokemonTypes[name],
          }));

          userPokemons.push({
            ...pokemons,
            firebaseId: pokemon.id, // id frm firebase query fetch
            image,
            types,
          });
        });
        return userPokemons;
      }
      // if fetchedPokemons.length  === 0 return empty array
      return [];
    } catch (err) {
      console.log(err);
    }
  }
);
