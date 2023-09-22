import { createSlice } from "@reduxjs/toolkit";
import {
  PokemonTypeInitialState,
  generatedPokemonType,
} from "../../utils/Types";
import { getInitialPokemonData } from "../reducers/getInitialPokemonData";
import { getPokemonData } from "../reducers/getPokemonData";

const initialState: PokemonTypeInitialState = {
  allPokemon: undefined,
  randomPokemons: undefined,
  compareQueue: [],
};

export const PokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    addToCompare: (state, action) => {
      const index = state.compareQueue.findIndex(
        (pokemon: generatedPokemonType) => pokemon.id === action.payload.id
      );
      if (index === -1) {
        if (state.compareQueue.length === 2) {
          state.compareQueue.pop(); // remove last element of the array
        }

        state.compareQueue.unshift(action.payload); // add to the start of array
      }
    },
    removeFromCompare: (state, action) => {
      const index = state.compareQueue.findIndex(
        (pokemon: generatedPokemonType) => pokemon.id === action.payload.id
      );

      const queue = [...state.compareQueue];
      queue.splice(index, 1);

      state.compareQueue = queue;
    },
  },
  extraReducers: (builder) => {
    // add case thunk state ie fulfilled, pending or rejected
    builder.addCase(getInitialPokemonData.fulfilled, (state, action) => {
      state.allPokemon = action.payload; // adding data.result array from API to the state
    });
    builder.addCase(getPokemonData.fulfilled, (state, action) => {
      state.randomPokemons = action.payload; // adding data.result array from API to the state
    });
  },
});

export const {addToCompare, removeFromCompare} = PokemonSlice.actions;



//Extrareducer is mostly used for async calls reducer for the store
