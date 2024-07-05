import { configureStore } from '@reduxjs/toolkit'
import {albumReducer} from "./Redux/Reducer/AlbumReducer";

export const store = configureStore({
    reducer: {albumReducer},
})