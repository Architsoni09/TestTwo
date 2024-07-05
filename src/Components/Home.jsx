import React, {useEffect, useRef} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useDispatch, useSelector} from "react-redux";
import {addToAlbum, fetchAlbumError, fetchAlbumsStart, fetchAlbumsSuccess} from "../Redux/Reducer/AlbumReducer";
import Card from "./Card";

function Home(props) {
    const dispatch=useDispatch();
    const {albums}=useSelector(state =>{
        return state.albumReducer
    });
    const inputRef=useRef();
    const fetchAlbums=async ()=>{
        try{
            dispatch(fetchAlbumsStart());
            const response=await fetch('https://jsonplaceholder.typicode.com/albums');
            const data=await response.json();
            dispatch(fetchAlbumsSuccess(data));
            console.log(albums);
        }
        catch (err){
            console.log(err);
            dispatch(fetchAlbumError(err));
        }
    }
    const addToAlbumHandler=async (e)=>{
        if(inputRef.current.value==='')return;
        const data = {
            title:inputRef.current.value,
           id:albums.length+1
        };
        try{
            const response=await fetch('https://jsonplaceholder.typicode.com/albums'
            ,{
                method:'POST',
                    headers:{
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });
            dispatch(addToAlbum(data));
            inputRef.current.value='';
        }
        catch (err){
            console.log(err);
        }
    }

    useEffect(()=>{
        fetchAlbums();
    },[])

    return (
        <div className="w-100 bg-black m-2 flex-wrap m-2 p-2 d-flex" style={{marginTop: '56px'}}>
            <div  className="w-100 h-25 input-group mb-5 mt-5">
                <input type="text" ref={inputRef} className="form-control" placeholder="Recipient's username"
                       aria-label="Recipient's username" aria-describedby="basic-addon2"/>
                <button onClick={()=>addToAlbumHandler()} className="input-group-text bg-primary text-white" id="basic-addon2">Add To Album</button>
            </div>
            {albums.length > 0 && albums.map((title) => <Card id={title.id} title={title.title}/>)}
        </div>
    );
}

export default Home;
