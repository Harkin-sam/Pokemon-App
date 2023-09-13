import { createSlice } from "@reduxjs/toolkit";
import { PokemonTypeInitialState } from "../../utils/Types"
import { getInitialPokemonData } from "../reducers/getInitialPokemonData";

const initialState: PokemonTypeInitialState = {
    allPokemon: undefined,
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
        })
    }

})

export const { } = PokemonSlice.actions;