import { createSlice } from "@reduxjs/toolkit";
import { AppTypeInitialState } from "../../utils/Types"

const initialState: AppTypeInitialState = {

};

export const PokemonSlice = createSlice({
    name: "pokemon",
    initialState,
    reducers:{

    } 

})

export const { } = PokemonSlice.actions;