import React, {useState, useEffect, useRef, useContext} from "react"
import { nameContext } from "../MainComponent/MainComponent.jsx"
import pfp from '../assets/mypfp2.jpg';
import './menu.css'

function Menu(){
    const [newGroupName, setNewGroupName] = useState("");
    const {name, editView, notesView, headerRef, notes, setNotes, currNotes, setCurrNotes, currFilter, setCurrFilter, isEditView, setIsEditView, editingNoteId, setEditingNoteId, editTitle, setEditTitle, editContent, setEditContent, date, groups, setGroups, editGroup, setEditGroup, createNoteAndEdit, filterGroup, filterNotes, handleDeleteGroup} = useContext(nameContext);
    const [searchQuery, setSearchQuery] = useState("");
    const crossTextStyle = {
        textDecoration: "line-through",
        background:"rgb(40, 42, 83)",
    }
    function closePopUp(){
        const popUp = document.querySelector(".menu-pop-up-container");
        popUp.style.transform = "translateY(100%)";
    }
    function openPopUp(){
        const popUp = document.querySelector(".menu-pop-up-container");
        popUp.style.transform = "translateY(0%)";
    }

    function toggleGroupDropDown(){
        const groupsList = document.querySelector(".groups-list");
        if(groupsList.style.transform == "translateY(0%)" ){
            console.log("attempt to close");
            groupsList.style.transform ="translateY(-100%)";
            groupsList.style.opacity = 0;
            groupsList.style.pointerEvents = "none";
        }else{
            console.log("attempt to open");
            groupsList.style.transform ="translateY(0%)";
            groupsList.style.opacity = 1;
            groupsList.style.pointerEvents = "all";
        }
    }

    function handleSearch(query) {
        let filtered = notes;

        // Filter by group/trash/all
        if (currFilter === "Trash") {
            filtered = filtered.filter(note => note.trashed);
        } else if (currFilter === "favourites") {
            filtered = filtered.filter(note => note.fav && !note.trashed);
        } else if (currFilter === "All") {
            filtered = filtered.filter(note => !note.trashed);
        } else {
            filtered = filtered.filter(note => note.group === currFilter && !note.trashed);
        }

        // Filter by search query (case-insensitive)
        if (query.trim() !== "") {
            const q = query.trim().toLowerCase();
            filtered = filtered.filter(
                note =>
                    note.title.toLowerCase().includes(q) ||
                    note.content.toLowerCase().includes(q)
            );
        }

        setCurrNotes(filtered);
    }

    useEffect(() => {
        handleSearch(searchQuery);
        // eslint-disable-next-line
    }, [currFilter, notes]);

    return(
        <header ref = {headerRef}>
            <div className="menu-pop-up-container">
                <div className="menu-pop-up">
                    <figure className="close-pop-up" onClick={closePopUp}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path></svg>
                    </figure>
                    <div className="create-group-pop-up pop-up">
                        <input
                            type="text"
                            value={newGroupName}
                            onChange={e => setNewGroupName(e.target.value)}
                            placeholder="New group name"
                        />
                        <button className="creatge-group-button" onClick={() => {
                            if (newGroupName.trim() && !groups.some(g => g.name === newGroupName.trim())) {
                                setGroups([...groups, { name: newGroupName.trim() }]);
                                setNewGroupName("");
                            }
                            }}
                        >Create Group</button>
                    </div>
                </div>
            </div>
            <div className="header-top">
                <div className="profile">
                    <figure className="pfp">
                        <img src={pfp} alt="" />
                    </figure>
                    <div className="greetings">
                        <p className="name">{name}</p>
                        <p className="greeting">Good day</p>
                    </div>
                </div>
                <input
                     type="text"
                    className="input-search"
                    placeholder="Find Anything"
                    value={searchQuery}
                    onChange={e => {
                        const value = e.target.value;
                        setSearchQuery(value);
                        handleSearch(value);
                    }}
                 />
            </div>
            <div className="header-bottom">
                <div className="options-mobile">
                    <div className="options-mobile-left">
                        <figure className="sm-menu-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19.045 7.401c.378-.378.586-.88.586-1.414s-.208-1.036-.586-1.414l-1.586-1.586c-.378-.378-.88-.586-1.414-.586s-1.036.208-1.413.585L4 13.585V18h4.413L19.045 7.401zm-3-3 1.587 1.585-1.59 1.584-1.586-1.585 1.589-1.584zM6 16v-1.585l7.04-7.018 1.586 1.586L7.587 16H6zm-2 4h16v2H4z"></path></svg>
                        </figure>
                        <figure className="sm-menu-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M21.842 6.218a1.977 1.977 0 0 0-.424-.628A1.99 1.99 0 0 0 20 5H8c-.297 0-.578.132-.769.359l-5 6c-.309.371-.309.91 0 1.281l5 6c.191.228.472.36.769.36h12a1.977 1.977 0 0 0 1.41-.582A1.99 1.99 0 0 0 22 17V7c0-.266-.052-.525-.158-.782z"></path></svg>
                        </figure>
                    </div>
                    <button className="add-note-btn" onClick={createNoteAndEdit}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path></svg>
                    </button>
                    <div className="options-mobile-right">
                        <figure className="sm-menu-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M7 11h2v2H7zm0 4h2v2H7zm4-4h2v2h-2zm0 4h2v2h-2zm4-4h2v2h-2zm0 4h2v2h-2z"></path><path d="M5 22h14c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2h-2V2h-2v2H9V2H7v2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2zM19 8l.001 12H5V8h14z"></path></svg>
                        </figure>
                        <figure className="sm-menu-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 16c2.206 0 4-1.794 4-4s-1.794-4-4-4-4 1.794-4 4 1.794 4 4 4zm0-6c1.084 0 2 .916 2 2s-.916 2-2 2-2-.916-2-2 .916-2 2-2z"></path><path d="m2.845 16.136 1 1.73c.531.917 1.809 1.261 2.73.73l.529-.306A8.1 8.1 0 0 0 9 19.402V20c0 1.103.897 2 2 2h2c1.103 0 2-.897 2-2v-.598a8.132 8.132 0 0 0 1.896-1.111l.529.306c.923.53 2.198.188 2.731-.731l.999-1.729a2.001 2.001 0 0 0-.731-2.732l-.505-.292a7.718 7.718 0 0 0 0-2.224l.505-.292a2.002 2.002 0 0 0 .731-2.732l-.999-1.729c-.531-.92-1.808-1.265-2.731-.732l-.529.306A8.1 8.1 0 0 0 15 4.598V4c0-1.103-.897-2-2-2h-2c-1.103 0-2 .897-2 2v.598a8.132 8.132 0 0 0-1.896 1.111l-.529-.306c-.924-.531-2.2-.187-2.731.732l-.999 1.729a2.001 2.001 0 0 0 .731 2.732l.505.292a7.683 7.683 0 0 0 0 2.223l-.505.292a2.003 2.003 0 0 0-.731 2.733zm3.326-2.758A5.703 5.703 0 0 1 6 12c0-.462.058-.926.17-1.378a.999.999 0 0 0-.47-1.108l-1.123-.65.998-1.729 1.145.662a.997.997 0 0 0 1.188-.142 6.071 6.071 0 0 1 2.384-1.399A1 1 0 0 0 11 5.3V4h2v1.3a1 1 0 0 0 .708.956 6.083 6.083 0 0 1 2.384 1.399.999.999 0 0 0 1.188.142l1.144-.661 1 1.729-1.124.649a1 1 0 0 0-.47 1.108c.112.452.17.916.17 1.378 0 .461-.058.925-.171 1.378a1 1 0 0 0 .471 1.108l1.123.649-.998 1.729-1.145-.661a.996.996 0 0 0-1.188.142 6.071 6.071 0 0 1-2.384 1.399A1 1 0 0 0 13 18.7l.002 1.3H11v-1.3a1 1 0 0 0-.708-.956 6.083 6.083 0 0 1-2.384-1.399.992.992 0 0 0-1.188-.141l-1.144.662-1-1.729 1.124-.651a1 1 0 0 0 .471-1.108z"></path></svg>
                        </figure>
                    </div>
                </div>
                <div className="options-lg">
                    <div className="lg-menu-top-half">
                        <nav>
                            <ul>
                                <li style={crossTextStyle}>
                                    <figure className="lg-menu-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12.71 2.29a1 1 0 0 0-1.42 0l-9 9a1 1 0 0 0 0 1.42A1 1 0 0 0 3 13h1v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7h1a1 1 0 0 0 1-1 1 1 0 0 0-.29-.71zM6 20v-9.59l6-6 6 6V20z"></path></svg>
                                    </figure>
                                    Home
                                </li>
                                <li onClick={(e)=>{e.preventDefault();filterGroup("All")}}>
                                    <figure className="lg-menu-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19.045 7.401c.378-.378.586-.88.586-1.414s-.208-1.036-.586-1.414l-1.586-1.586c-.378-.378-.88-.586-1.414-.586s-1.036.208-1.413.585L4 13.585V18h4.413L19.045 7.401zm-3-3 1.587 1.585-1.59 1.584-1.586-1.585 1.589-1.584zM6 16v-1.585l7.04-7.018 1.586 1.586L7.587 16H6zm-2 4h16v2H4z"></path></svg>
                                    </figure>
                                    Notes
                                </li>
                                <li onClick={()=>openPopUp()}>
                                    <figure className="lg-menu-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M13 9h-2v3H8v2h3v3h2v-3h3v-2h-3z"></path><path d="M20 5h-8.586L9.707 3.293A.996.996 0 0 0 9 3H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V7c0-1.103-.897-2-2-2zM4 19V7h16l.002 12H4z"></path></svg>
                                    </figure>
                                    Create New Group
                                </li>
                                <li style={crossTextStyle}>
                                    <figure className="lg-menu-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M7 11h2v2H7zm0 4h2v2H7zm4-4h2v2h-2zm0 4h2v2h-2zm4-4h2v2h-2zm0 4h2v2h-2z"></path><path d="M5 22h14c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2h-2V2h-2v2H9V2H7v2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2zM19 8l.001 12H5V8h14z"></path></svg>
                                    </figure>
                                    Calender
                                </li>
                                <li style={crossTextStyle}>
                                    <figure className="lg-menu-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M7.5 6.5C7.5 8.981 9.519 11 12 11s4.5-2.019 4.5-4.5S14.481 2 12 2 7.5 4.019 7.5 6.5zM20 21h1v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h17z"></path></svg>
                                    </figure>
                                    Shared with me
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div className="lg-menu-bottom-half">
                        <nav className="lg-menu-bottom-top">
                            <span className="groups-tag" onClick={()=>toggleGroupDropDown()}>
                                <figure className="lg-menu-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20 3H4a2 2 0 0 0-2 2v2a2 2 0 0 0 1 1.72V19a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.72A2 2 0 0 0 22 7V5a2 2 0 0 0-2-2zM4 5h16v2H4zm1 14V9h14v10z"></path><path d="M8 11h8v2H8z"></path></svg>
                                </figure>
                                Groups
                                <figure className="icon-dropdown">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path></svg>
                                </figure>
                            </span>
                            <div className="groups-list-container">
                                <ul className="groups-list">
                                    {groups.map((group, i)=>
                                        <li
                                            key={i}
                                            className="group"
                                            onClick={
                                                (e)=>{
                                                    e.preventDefault();
                                                    filterGroup(group.name)
                                                }}
                                        >
                                            <span className="group-name">{group.name}</span>
                                            <button
                                                className="delete-group-btn"
                                                onClick={() => handleDeleteGroup(group.name)}
                                                title="Delete group"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path></svg>
                                            </button>
                                        </li>
                                    )}
                                </ul>
                            </div>
                            
                        </nav>
                        <nav className="lg-menu-bottom-bottom">
                            <ul>
                                <li style={crossTextStyle}><a href="" onClick = {(e)=>{e.preventDefault()}}>
                                    <figure className="lg-menu-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 16c2.206 0 4-1.794 4-4s-1.794-4-4-4-4 1.794-4 4 1.794 4 4 4zm0-6c1.084 0 2 .916 2 2s-.916 2-2 2-2-.916-2-2 .916-2 2-2z"></path><path d="m2.845 16.136 1 1.73c.531.917 1.809 1.261 2.73.73l.529-.306A8.1 8.1 0 0 0 9 19.402V20c0 1.103.897 2 2 2h2c1.103 0 2-.897 2-2v-.598a8.132 8.132 0 0 0 1.896-1.111l.529.306c.923.53 2.198.188 2.731-.731l.999-1.729a2.001 2.001 0 0 0-.731-2.732l-.505-.292a7.718 7.718 0 0 0 0-2.224l.505-.292a2.002 2.002 0 0 0 .731-2.732l-.999-1.729c-.531-.92-1.808-1.265-2.731-.732l-.529.306A8.1 8.1 0 0 0 15 4.598V4c0-1.103-.897-2-2-2h-2c-1.103 0-2 .897-2 2v.598a8.132 8.132 0 0 0-1.896 1.111l-.529-.306c-.924-.531-2.2-.187-2.731.732l-.999 1.729a2.001 2.001 0 0 0 .731 2.732l.505.292a7.683 7.683 0 0 0 0 2.223l-.505.292a2.003 2.003 0 0 0-.731 2.733zm3.326-2.758A5.703 5.703 0 0 1 6 12c0-.462.058-.926.17-1.378a.999.999 0 0 0-.47-1.108l-1.123-.65.998-1.729 1.145.662a.997.997 0 0 0 1.188-.142 6.071 6.071 0 0 1 2.384-1.399A1 1 0 0 0 11 5.3V4h2v1.3a1 1 0 0 0 .708.956 6.083 6.083 0 0 1 2.384 1.399.999.999 0 0 0 1.188.142l1.144-.661 1 1.729-1.124.649a1 1 0 0 0-.47 1.108c.112.452.17.916.17 1.378 0 .461-.058.925-.171 1.378a1 1 0 0 0 .471 1.108l1.123.649-.998 1.729-1.145-.661a.996.996 0 0 0-1.188.142 6.071 6.071 0 0 1-2.384 1.399A1 1 0 0 0 13 18.7l.002 1.3H11v-1.3a1 1 0 0 0-.708-.956 6.083 6.083 0 0 1-2.384-1.399.992.992 0 0 0-1.188-.141l-1.144.662-1-1.729 1.124-.651a1 1 0 0 0 .471-1.108z"></path></svg>
                                    </figure>
                                    Settings
                                </a></li>
                                <li><a href="" onClick={(e)=>{e.preventDefault();filterGroup("Trash")}}>
                                    <figure className="lg-menu-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M5 20a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8h2V6h-4V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2H3v2h2zM9 4h6v2H9zM8 8h9v12H7V8z"></path><path d="M9 10h2v8H9zm4 0h2v8h-2z"></path></svg>
                                    </figure>
                                    Trash
                                </a></li>
                            </ul>
                            
                            
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Menu
