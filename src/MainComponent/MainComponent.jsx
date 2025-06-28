import React, {useState, useEffect, useRef, useContext, createContext} from "react";
import Menu from '../Menu/Menu.jsx';
import Notes from "../Notes/Notes.jsx";
import './mc.css';

export const nameContext = createContext();

function MainComponent(){

    const [hasName, setHasName] = useState();
    const name = useRef(null);
    const editView = useRef(null);
    const notesView = useRef(null);
    const headerRef = useRef(null);



    function handleNameEntry(){
        const nameEntryInp = document.querySelector('.name-entry-inp');
        name.current = nameEntryInp.value;
        if(name.curremt !== null && name.current !== ""){
            setHasName(true);
            localStorage.setItem('username', name.current);
        } else{
            setHasName(false);
        }
    }

    useEffect(()=>{
        if(localStorage.getItem('username')){
            setHasName(true);
            name.current = localStorage.getItem('username');
        }

        return()=>{
            
        }
    },[])
    

    if(hasName==false || hasName == null || hasName == undefined){
        console.log(hasName);
        console.log('name entering');
        return(
            <div className="intro-element">
                <h2>What would you like to be called?</h2>
                <input type="text" className="name-entry-inp" placeholder="Enter a name..." ref={name}/>
                <button className="enter-name-btn" onClick={handleNameEntry}>Enter</button>
            </div>
        )
    }else{
        console.log(name.current)
        return(
            <>
                <nameContext.Provider value = {{name: name.current, editView, notesView, headerRef}}>
                    <Menu/>
                    <Notes/>
                </nameContext.Provider>
            </>
        )
    }
}

export default MainComponent
