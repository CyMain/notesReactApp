import React, {useState, useEffect, useRef, useContext} from "react";
import { nameContext } from "../MainComponent/MainComponent.jsx";
import './notes.css'

function Notes(){
    const [isEditView, setIsEditView] = useState(true);
    const date = new Date;
    const {name, editView, notesView, headerRef} = useContext(nameContext);
    const [notes, setNotes] = useState([
        {
            id:1,
            title: "Progress Report",
            content:"This notes app has made considerable progress if we do not count the many breaks and pauses that have been taken.",
            yearCreated: 2024,
            monthCreated:2,
            dayCreated:23,
            hourCreated:12,
            minuteCreated:20,
            group:"",
            fav: false,
        },{
            id:2,
            title: "Progress Report",
            content:"This notes app has made considerable progress if we do not count the many breaks and pauses that have been taken.",
            yearCreated: 2025,
            monthCreated:5,
            dayCreated:28,
            hourCreated:22,
            minuteCreated:33,
            group:"",
            fav: true,
        },
    ]);
    const [currNotes, setCurrNotes] = useState([...notes]);
    const [groups, setGroups]= useState([
        {
            name:'Development',
            containedNotesIndexes:[],
        },
    ]);

    useEffect(() => {
        if (headerRef && headerRef.current) {
            document.querySelector("#root").style.setProperty(
                '--header-width',
                headerRef.current.offsetWidth + 'px'
            );
        }
    }, [headerRef]);

    function getDateString(year, month, day, hours, mins){
        if(date.getFullYear() == year){
            if(date.getMonth() == month){
                if(date.getDate() == day){
                    if(date.getHours()== hours){
                        if(date.getMinutes()==mins){
                            return `just now`;
                        }else{
                            return `${date.getMinutes() - mins} minute(s) ago`;
                        }
                    }else{
                        return `${date.getHours() - hours}hour(s) ago`;
                    }
                }else{
                    return `${date.getDate()- day} day(s) ago`
                }
            }else{
                return `${date.getMonth() - month} month(s) ago`
            }
        }else{
            return `${date.getFullYear() - year} year(s) ago`
        }
    }

    useEffect(()=>{
        window.addEventListener("resize", toggleHeader);

        return ()=>{
            window.removeEventListener("resize", toggleHeader);
        }
    }, []);

    function filterAll(){
        setCurrNotes(c => [...notes]);
    }
    function filterFavs(){
        setCurrNotes(c => notes.filter((note)=> note.fav ==true));
    }

    function favouriteNote(id) {
        setNotes(prevNotes => {
            const newNotes = prevNotes.map(note =>
                note.id === id ? { ...note, fav: !note.fav } : note
            );
            // If currNotes is filtered, re-apply the filter after updating notes
            setCurrNotes(curr => {
                // If showing all notes
                if (curr.length === prevNotes.length) {
                    return newNotes;
                }
                // If showing only favourites
                return newNotes.filter(note => note.fav);
            });
            return newNotes;
        });
    }

    function toggleHeader(){
        if(editView.current.style.display == "flex"){
            if(window.innerWidth>400){
                headerRef.current.style.display = "flex";
            }else{
                headerRef.current.style.display = "none";
            }
        }
    }

    

    function toggleEditView(title = "", content = "") {
        const titleInput = document.querySelector('#title-input');
        const contentInput = document.querySelector('#content-txtarea');
        if (!editView.current || !notesView.current || !headerRef.current) return;

        if (isEditView) {
            // Hide edit, show notes
            setIsEditView(false);
            if (headerRef.current){
                headerRef.current.style.display = "flex";
            }
        } else {
            // Show edit, hide notes
            setIsEditView(true);
            titleInput.value = title;
            contentInput.value = content;
            if (headerRef.current && window.innerWidth <=400.5){
                headerRef.current.style.display = "none";
            }
        }
    }


    return(
        <>
            <div
                className="notes-view"
                ref={notesView}
                style={{ display: isEditView ? "none" : "flex" }}
            >
                <nav className="sections">
                    <div className="left-nav">
                        <span className="nav-option" onClick={filterAll}>Notes</span>
                        <span className="nav-option" onClick={filterFavs}>Favourites</span>
                    </div>
                    <div className="right-nav">
                        <figure className="nav-option">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="m6 20 4-4H7V4H5v12H2zm5-12h9v2h-9zm0 4h7v2h-7zm0-8h11v2H11zm0 12h5v2h-5z"></path></svg>
                        </figure>
                        <figure className="nav-option">
                            <div>Another ICON</div>
                        </figure>
                    </div>
                </nav>
                <div className="notes-grid">
                    {currNotes.map((note)=>
                        <div className="note" key={note.id} onClick={()=>toggleEditView(note.title, note.content)}>
                            <h1>{note.title}</h1>
                            <p>{note.content}</p>
                            <span>{getDateString(note.yearCreated, note.monthCreated, note.dayCreated, note.hourCreated, note.minuteCreated)}</span>
                            <div className="note-bottom">
                                <span>{note.group ? note.group : "No Group" }</span>
                                <div className="note-buttons">
                                    <figure>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M5 20a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8h2V6h-4V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2H3v2h2zM9 4h6v2H9zM8 8h9v12H7V8z"></path><path d="M9 10h2v8H9zm4 0h2v8h-2z"></path></svg>
                                    </figure>
                                    <figure className="fav-icon" onClick={e => { e.stopPropagation(); favouriteNote(note.id); }}>
                                        {note.fav? 
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.205 4.791a5.938 5.938 0 0 0-4.209-1.754A5.906 5.906 0 0 0 12 4.595a5.904 5.904 0 0 0-3.996-1.558 5.942 5.942 0 0 0-4.213 1.758c-2.353 2.363-2.352 6.059.002 8.412L12 21.414l8.207-8.207c2.354-2.353 2.355-6.049-.002-8.416z"></path></svg>
                                        :
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 4.595a5.904 5.904 0 0 0-3.996-1.558 5.942 5.942 0 0 0-4.213 1.758c-2.353 2.363-2.352 6.059.002 8.412l7.332 7.332c.17.299.498.492.875.492a.99.99 0 0 0 .792-.409l7.415-7.415c2.354-2.354 2.354-6.049-.002-8.416a5.938 5.938 0 0 0-4.209-1.754A5.906 5.906 0 0 0 12 4.595zm6.791 1.61c1.563 1.571 1.564 4.025.002 5.588L12 18.586l-6.793-6.793c-1.562-1.563-1.561-4.017-.002-5.584.76-.756 1.754-1.172 2.799-1.172s2.035.416 2.789 1.17l.5.5a.999.999 0 0 0 1.414 0l.5-.5c1.512-1.509 4.074-1.505 5.584-.002z"></path></svg>
                                        }
                                    </figure>
                                </div>
                            </div>
                            
                        </div>
                    )}
                </div>
            </div>
            <div
                className="edit-note-view"
                ref={editView}
                style={{ display: isEditView ? "flex" : "none" }}
            >
                <button className="close-edit-view-btn" onClick={()=>toggleEditView("", "")}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M21 11H6.414l5.293-5.293-1.414-1.414L2.586 12l7.707 7.707 1.414-1.414L6.414 13H21z"></path></svg>
                </button>
                <input type="text" id="title-input" placeholder="Enter a title..."/>
                <textarea name="" id="content-txtarea" placeholder="Your Note..."></textarea>
                <button className="finish-edit-view-btn">Done</button>
            </div>
        </>
    )

}

export default Notes
