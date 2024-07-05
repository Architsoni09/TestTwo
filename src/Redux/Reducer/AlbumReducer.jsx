import {createSlice} from "@reduxjs/toolkit";

const InitialState = {
    albums: [],
    isLoading: false,
    error: null
}

const AlbumSlice = createSlice({
    initialState: InitialState,
    name: "album",
    reducers: {
        fetchAlbumsSuccess: (state, action) => {
            state.albums = [...state.albums, ...action.payload];
            state.isLoading = false;
            state.error = false;
        },
        fetchAlbumError: (state, action) => {
            state.error = true;
        },
        fetchAlbumsStart: (state, action) => {
            state.isLoading = true;
        },
        addToAlbum: (state, action) => {
            state.albums = [action.payload, ...state.albums];
            state.isLoading = false;
            state.error = false;
        },
        deleteFromAlbum: (state, action) => {
            state.albums = state.albums.filter(album => album.id !== action.payload);
            state.isLoading = false;
            state.error = false;
        },
        editAlbum: (state, action) => {
            state.albums=state.albums.map((album)=>{
                if(album.id===action.payload.id) album.title=action.payload.title;
                return album;
            });
            state.isLoading = false;
            state.error = false;
        }
    }
});
export const albumReducer = AlbumSlice.reducer;
export const {fetchAlbumsStart,editAlbum, fetchAlbumsSuccess, deleteFromAlbum, fetchAlbumError, addToAlbum} = AlbumSlice.actions;