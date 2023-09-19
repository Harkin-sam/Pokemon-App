import { createSlice } from "@reduxjs/toolkit";
import { PokemonTypeInitialState } from "../../utils/Types"
import { getInitialPokemonData} from "../reducers/getInitialPokemonData";
import { getPokemonData } from "../reducers/getPokemonData";

const initialState: PokemonTypeInitialState = {
    allPokemon: undefined,
    randomPokemons: undefined
};

export const PokemonSlice = createSlice({
    name: "pokemon",
    initialState,
    reducers:{

    },
    extraReducers: (builder) => {
        // add case thunk state ie fulfilled, pending or rejected
        builder.addCase(getInitialPokemonData.fulfilled, (state, action)=>{
            state.allPokemon = action.payload; // adding data.result array from API to the state
        });
        builder.addCase(getPokemonData.fulfilled, (state, action)=>{
            state.randomPokemons = action.payload; // adding data.result array from API to the state
        })
    }

})

export const { } = PokemonSlice.actions;