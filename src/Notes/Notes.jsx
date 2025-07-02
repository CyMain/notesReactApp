import React, { useState, useEffect, useRef, useContext } from "react";
import { nameContext } from "../MainComponent/MainComponent.jsx";
import './notes.css'

function Notes() {
    const {name, editView, notesView, headerRef, notes, setNotes, currNotes, setCurrNotes, currFilter, setCurrFilter, isEditView, setIsEditView, editingNoteId, setEditingNoteId, editTitle, setEditTitle, editContent, setEditContent, date, groups, setGroups, editGroup, setEditGroup, createNoteAndEdit, filterGroup, filterNotes, handleDeleteGroup} = useContext(nameContext);

    useEffect(() => {
        localStorage.setItem("storedNotes", JSON.stringify(notes))
    }, [notes]);
    useEffect(() => {
        setCurrNotes(filterNotes(notes, currFilter));
    }, [notes, currFilter]);
    useEffect(() => {
        if (headerRef && headerRef.current) {
            document.querySelector("#root").style.setProperty(
                '--header-width',
                headerRef.current.offsetWidth + 'px'
            );
        }
    }, [headerRef]);

    function getDateString(year, month, day, hours, mins) {
        if (date.getFullYear() == year) {
            if (date.getMonth() == month) {
                if (date.getDate() == day) {
                    if (date.getHours() == hours) {
                        if (date.getMinutes() == mins) {
                            return `just now`;
                        } else {
                            return `${date.getMinutes() - mins} minute(s) ago`;
                        }
                    } else {
                        return `${date.getHours() - hours} hour(s) ago`;
                    }
                } else {
                    return `${date.getDate() - day} day(s) ago`
                }
            } else {
                return `${date.getMonth() - month} month(s) ago`
            }
        } else {
            return `${date.getFullYear() - year} year(s) ago`
        }
    }

    useEffect(() => {
        window.addEventListener("resize", toggleHeader);

        return () => {
            window.removeEventListener("resize", toggleHeader);
        }
    }, []);

    function filterAll() {
        setCurrNotes(c => filterNotes(c, "All"));
    }
    function filterFavs() {
        setCurrNotes(c => filterNotes(c, "favourites"));
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

    function toggleHeader() {
        if (isEditView == true) {
            if (window.innerWidth > 450) {
                headerRef.current.style.display = "flex";
            } else {
                if (isEditView == true) {
                    headerRef.current.style.display = "none";
                }
            }
        }
    }

    function trashNote(id) {
        setNotes(prevNotes => {
            const newNotes = prevNotes.map(note =>
                note.id === id
                    ? { ...note, trashed: !note.trashed } // toggle trashed
                    : note
            );
            // If currently viewing trash, update currNotes to only trashed notes
            if (currFilter === "Trash") {
                setCurrNotes(newNotes.filter(note => note.trashed));
            } else {
                setCurrNotes(filterNotes(newNotes, currFilter));
            }
            return newNotes;
        });
    }

    function deleteNotePermanently(id) {
        setNotes(prevNotes => {
            const newNotes = prevNotes.filter(note => note.id !== id);
            if (currFilter === "Trash") {
                setCurrNotes(newNotes.filter(note => note.trashed));
            } else {
                setCurrNotes(filterNotes(newNotes, currFilter));
            }
            return newNotes;
        });
    }

    function restoreNote(id) {
        setNotes(prevNotes => {
            const newNotes = prevNotes.map(note =>
                note.id === id
                    ? { ...note, trashed: false }
                    : note
            );
            setCurrNotes(newNotes.filter(note => note.trashed));
            return newNotes;
        });
    }


    function toggleEditView(title = "", content = "") {
        if (!editView.current || !notesView.current || !headerRef.current) return;
        if (isEditView) {
            // Hide edit, show notes
            setIsEditView(false);
            console.log("closing-edit-view");
            if (headerRef.current) {
                headerRef.current.style.display = "flex";
            }
        } else {
            // Show edit, hide notes
            setIsEditView(true);
            console.log("opening-edit-view");
            if (headerRef.current && window.innerWidth <= 450.5) {
                headerRef.current.style.display = "none";
            }
        }
    }

    function editNote(title, content, id) {
        setEditTitle(title);
        setEditContent(content);
        setEditingNoteId(id);
        setIsEditView(true);
        if (headerRef.current && window.innerWidth <= 450.5) {
            headerRef.current.style.display = "none";
        }
    }
    function handleDoneEdit() {
        setNotes(n => {
            const newNotes = n.map(note =>
                note.id === editingNoteId
                    ? { ...note,
                        title: editTitle,
                        content: editContent,
                        yearCreated: date.getFullYear(),
                        monthCreated: date.getMonth(),
                        dayCreated: date.getDate(),
                        hourCreated: date.getHours(),
                        minuteCreated: date.getMinutes(),
                        group : editGroup,
                    }
                    : note
            );
            setCurrNotes(curr => filterNotes(newNotes, currFilter));
            return newNotes;
        });
        setIsEditView(false);
        setEditingNoteId(null);
        setEditTitle("");
        setEditContent("");
        if (headerRef.current) headerRef.current.style.display = "flex";
    }


    function decideNoteSize(title,text) {
        if(title.length>= 200){
            if (text.length >= 100){
                return "note-lg note";
            }
            else if(text.length>= 50){
                return "note-medium note";
            } else{
                return "note-small note";
            }    
        } else{
            if (text.length >= 180){
                return "note-lg note";
            }
            else if(text.length>= 100){
                return "note-medium note";
            } else{
                return "note-small note";
            }
        }
        
    }

    return (
        <>
            <div
                className="notes-view"
                ref={notesView}
                style={{ display: isEditView ? "none" : "flex" }}
            >
                <nav className="sections">
                    <div className="left-nav">
                        <span className="nav-option" onClick={(e)=>{e.preventDefault();filterGroup("All")}}>Notes</span>
                        <span className="nav-option" onClick={filterFavs}>Favourites</span>
                    </div>
                    <div className="right-nav">
                        <figure className="nav-option">
                            <span>Reset Notes</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 16c1.671 0 3-1.331 3-3s-1.329-3-3-3-3 1.331-3 3 1.329 3 3 3z"></path><path d="M20.817 11.186a8.94 8.94 0 0 0-1.355-3.219 9.053 9.053 0 0 0-2.43-2.43 8.95 8.95 0 0 0-3.219-1.355 9.028 9.028 0 0 0-1.838-.18V2L8 5l3.975 3V6.002c.484-.002.968.044 1.435.14a6.961 6.961 0 0 1 2.502 1.053 7.005 7.005 0 0 1 1.892 1.892A6.967 6.967 0 0 1 19 13a7.032 7.032 0 0 1-.55 2.725 7.11 7.11 0 0 1-.644 1.188 7.2 7.2 0 0 1-.858 1.039 7.028 7.028 0 0 1-3.536 1.907 7.13 7.13 0 0 1-2.822 0 6.961 6.961 0 0 1-2.503-1.054 7.002 7.002 0 0 1-1.89-1.89A6.996 6.996 0 0 1 5 13H3a9.02 9.02 0 0 0 1.539 5.034 9.096 9.096 0 0 0 2.428 2.428A8.95 8.95 0 0 0 12 22a9.09 9.09 0 0 0 1.814-.183 9.014 9.014 0 0 0 3.218-1.355 8.886 8.886 0 0 0 1.331-1.099 9.228 9.228 0 0 0 1.1-1.332A8.952 8.952 0 0 0 21 13a9.09 9.09 0 0 0-.183-1.814z"></path></svg>
                        </figure>
                    </div>
                </nav>
                <div className="notes-grid">
                    {currNotes.map((note) =>
                        <div
                            className={decideNoteSize(note.title,note.content) +
                                (currFilter === "All" && note.trashed ? " trashed-note" : "")}
                            key={note.id}
                            onClick={() => editNote(note.title, note.content, note.id)}
                        >
                            <h1>{note.title}</h1>
                            <p>{note.content}</p>
                            <span className="note-creation-date">{getDateString(note.yearCreated, note.monthCreated, note.dayCreated, note.hourCreated, note.minuteCreated)}</span>
                            <div className="note-bottom">
                                <span>{note.group ? note.group : "No Group"}</span>
                                <div className="note-buttons">
                                    {currFilter === "Trash" ? (
                                        <>
                                            <button className="restore-note-btn btn" onClick={e => {e.stopPropagation();restoreNote(note.id);}}>Restore</button>
                                            <button className="delete-note-btn btn" onClick={ e => {e.stopPropagation();deleteNotePermanently(note.id);}}>Delete Forever</button>
                                        </>
                                    ) : (
                                        <button className="trash-note-btn btn" onClick={e => {e.stopPropagation();trashNote(note.id);}}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M5 20a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8h2V6h-4V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2H3v2h2zM9 4h6v2H9zM8 8h9v12H7V8z"></path><path d="M9 10h2v8H9zm4 0h2v8h-2z"></path></svg>
                                        </button>
                                    )}
                                    <figure className="fav-icon" onClick={e => { e.stopPropagation(); favouriteNote(note.id); }}>
                                        {note.fav ?
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
                <button className="add-note-lg" onClick={createNoteAndEdit}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path></svg>
                </button>
            </div>
            <div
                className="edit-note-view"
                ref={editView}
                style={{ display: isEditView ? "flex" : "none" }}
            >
                <button className="close-edit-view-btn" onClick={() => toggleEditView("", "")}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M21 11H6.414l5.293-5.293-1.414-1.414L2.586 12l7.707 7.707 1.414-1.414L6.414 13H21z"></path></svg>
                </button>
                <input
                    type="text"
                    id="title-input"
                    placeholder="Enter a title..."
                    value={editTitle}
                    onChange={e => setEditTitle(e.target.value)}
                />
                <textarea
                    id="content-txtarea"
                    placeholder="Your Note..."
                    value={editContent}
                    onChange={e => setEditContent(e.target.value)}
                ></textarea>
                <label className="group-select-container">
                    Group:
                    <select
                        className="group-select"
                        value={editGroup}
                        onChange={e => setEditGroup(e.target.value)}
                    >
                        <option value="">No Group</option>
                        {groups.map((g, i) => (
                        <option key={i} value={g.name}>{g.name}</option>
                        ))}
                    </select>
                </label>
                <button className="finish-edit-view-btn" onClick={handleDoneEdit}>Done</button>
            </div>
        </>
    )

}

export default Notes
