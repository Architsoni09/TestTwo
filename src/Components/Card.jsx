import React, {useRef, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import {addToAlbum, deleteFromAlbum, editAlbum} from "../Redux/Reducer/AlbumReducer";
import {useDispatch} from "react-redux";
function Card(props) {
    const[hover,setHover]=useState(false);
    const[modalMode,setModalMode]=useState(false)

    const dispatch=useDispatch();
    const inputRef=useRef();
    const deleteHandler=async ()=>{
        const id=props.id;
        try{
            const response=await fetch(`https://jsonplaceholder.typicode.com/albums/${id}`
                ,{
                    method:'delete',
                });
            dispatch(deleteFromAlbum(id));
        }
        catch (err){
            console.log(err);
        }
    }
    const upadteAlbumHandler=async (e)=>{
        const data = {
            title:inputRef.current.value,
            id:props.id
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
            dispatch(editAlbum(data));
        }
        catch (err){
            console.log(err);
        }
    }

    return (
        <div className="card m-2" style={{maxHeight:'18rem'}}>
            <div className="card-header" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                {props.title}
                {hover &&
                    <>
                        <button type='button' className="btn btn-primary ms-2" onClick={() => setModalMode(true)}>
                            <i className="bi bi-pencil"></i>
                        </button>
                        <button type='button' className="ms-2 bg-danger" onClick={() => deleteHandler()}>
                            <i onClick={() => deleteHandler()} className="bi bi-trash"></i>
                        </button>
                    </>
                }
                {modalMode &&
                    <div  className="w-100 h-25 input-group mb-5 mt-5">
                        <input
                            type="text"
                            ref={inputRef}
                            className="form-control"
                            defaultValue={props.title}
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                        />
                        <button onClick={() => {
                            upadteAlbumHandler();
                            setModalMode(false);
                        }} className="input-group-text bg-primary text-white" id="basic-addon2">Add To Album
                        </button>
                    </div>
                }
            </div>
        </div>
    );
}

export default Card;