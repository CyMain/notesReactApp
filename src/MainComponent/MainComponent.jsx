import React, {useState, useEffect, useRef, useContext, createContext} from "react";
import Menu from '../Menu/Menu.jsx';
import Notes from "../Notes/Notes.jsx";
import './mc.css';

export const nameContext = createContext();

function MainComponent(){

    
    const [hasName, setHasName] = useState();
    const [username, setUsername] = useState("");
    const editView = useRef(null);
    const notesView = useRef(null);
    const headerRef = useRef(null);
    const [currNotes, setCurrNotes] = useState([]);

    const [currFilter, setCurrFilter] = useState("All");
    const [isEditView, setIsEditView] = useState(false);
    const [editingNoteId, setEditingNoteId] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const [editContent, setEditContent] = useState("");
    const date = new Date;
    const [notes, setNotes] = useState(() => {
        const stored = localStorage.getItem("storedNotes");
        return stored ? JSON.parse(stored) : [
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
                trashed:false,
            },
            {
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
                trashed:true,
            },
        ];
    });
    const [groups, setGroups]= useState(() => {
        const stored = localStorage.getItem("storedGroups");
        return stored ? JSON.parse(stored) : [
            {
                name:"Sonic Heroes",
            },{
                name:"Shadow Heroes",
            }
        ]
    });
    const [editGroup, setEditGroup] = useState("");

    useEffect(()=>{
        localStorage.setItem("storedGroups", JSON.stringify(groups));

    }, [groups]);

    
    function filterGroup(group){
        setCurrNotes(c=> filterNotes(notes, group));
    }
    function filterNotes(notesList, filterword) {
        if (filterword === "Trash") {
            return notesList.filter(note => note.trashed);
        } else if (filterword === "favourites") {
            return notesList.filter(note => note.fav && !note.trashed);
        } else if (filterword === "All") {
            return notesList.filter(note => !note.trashed);
        } else {
            return notesList.filter(note => note.group === filterword && !note.trashed);
        }
    }

    function createNoteAndEdit() {
        const date = new Date();
        const newNote = {
            id: Date.now(),
            title: "",
            content: "",
            yearCreated: date.getFullYear(),
            monthCreated: date.getMonth(),
            dayCreated: date.getDate(),
            hourCreated: date.getHours(),
            minuteCreated: date.getMinutes(),
            group: "",
            fav: false,
        };
        setNotes(prevNotes => [newNote, ...prevNotes]);
        setEditTitle("");
        setEditContent("");
        setEditingNoteId(newNote.id);
        setIsEditView(true);
        if (headerRef.current && window.innerWidth <= 400.5) {
            headerRef.current.style.display = "none";
        }
    }

    function handleNameEntry() {
        const nameEntryInp = document.querySelector('.name-entry-inp');
        const enteredName = nameEntryInp.value.trim();
        if (enteredName !== "") {
            setUsername(enteredName);
            setHasName(true);
            localStorage.setItem('username', enteredName);
        } else {
            setHasName(false);
        }
    }
    function handleDeleteGroup(groupName) {
        // Remove group from groups array
        setGroups(prevGroups => prevGroups.filter(g => g.name !== groupName));
        // Remove group from notes
        setNotes(prevNotes =>
            prevNotes.map(note =>
                note.group === groupName ? { ...note, group: "" } : note
            )
        );
    }

    useEffect(() => {
        const storedName = localStorage.getItem('username');
        if (storedName && storedName.trim() !== "") {
            setUsername(storedName);
            setHasName(true);
        } else {
            setHasName(false);
        }
    }, []);
    

    if(!hasName){
        console.log(hasName);
        console.log('name entering');
        return(
            <div className="intro-element">
                <h2>What would you like to be called?</h2>
                <input
                    type="text"
                    className="name-entry-inp"
                    placeholder="Enter a name..."
                    defaultValue={username}
                />
                <button className="enter-name-btn" onClick={handleNameEntry}>Enter</button>
            </div>
        )
    }else{
        console.log(name.current)
        return(
            <>
                <nameContext.Provider value = {{name: username, editView, notesView, headerRef, notes, setNotes, currNotes, setCurrNotes, currFilter, setCurrFilter, isEditView, setIsEditView, editingNoteId, setEditingNoteId, editTitle, setEditTitle, editContent, setEditContent, date, groups, setGroups, editGroup, setEditGroup, createNoteAndEdit, filterGroup, filterNotes, handleDeleteGroup}}>
                    <Menu/>
                    <Notes/>
                </nameContext.Provider>
            </>
        )
    }
}

export default MainComponent
