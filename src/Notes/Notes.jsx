import React, {useState, useEffect, useRef} from "react";
import './notes.css'

function Notes(){
    const [notes, setNotes] = useState([
        {
            title: "Progress Report",
            content:"This notes app has made considerable progress if we do not count the many breaks and pauses that have been taken.",
            date: "2 days ago",
            group:"",
        },{
            title: "Progress Report",
            content:"This notes app has made considerable progress if we do not count the many breaks and pauses that have been taken.",
            date: "2 days ago",
            group:"",
        },{
            title: "Progress Report",
            content:"This notes app has made considerable progress if we do not count the many breaks and pauses that have been taken.",
            date: "2 days ago",
            group:"",
        },{
            title: "Progress Report",
            content:"This notes app has made considerable progress if we do not count the many breaks and pauses that have been taken.",
            date: "2 days ago",
            group:"",
        },{
            title: "Progress Report",
            content:"This notes app has made considerable progress if we do not count the many breaks and pauses that have been taken.",
            date: "2 days ago",
            group:"",
        },{
            title: "Progress Report",
            content:"This notes app has made considerable progress if we do not count the many breaks and pauses that have been taken.",
            date: "2 days ago",
            group:"",
        },{
            title: "Progress Report",
            content:"This notes app has made considerable progress if we do not count the many breaks and pauses that have been taken.",
            date: "2 days ago",
            group:"",
        },{
            title: "Progress Report",
            content:"This notes app has made considerable progress if we do not count the many breaks and pauses that have been taken.",
            date: "2 days ago",
            group:"",
        },
    ]);
    const [groups, setGroups]= useState([
        {
            name:'Development',
            containedNotesIndexes:[],
        },
    ])
    return(
        <>
            <div className="notes-view">
                <nav className="sections">
                    <div className="left-nav">
                        <span className="nav-option">Notes</span>
                        <span className="nav-option">Favourites</span>
                    </div>
                    <div className="right-nav">
                        <figure className="nav-option">
                            <div>Filter Icon</div>
                        </figure>
                        <figure className="nav-option">
                            <div>Another ICON</div>
                        </figure>
                    </div>
                </nav>
                <div className="notes-grid">
                    {notes.map((note, i)=>
                        <div className="note" key={i}>
                            <h1>{note.title}</h1>
                            <p>{note.content}</p>
                            <span>{note.date}</span>
                            <div className="note-bottom">
                                <span>{note.group ? note.group : "No Group" }</span>
                                <div className="note-buttons">
                                    <figure>
                                        Trash Icon
                                    </figure>
                                    <figure>
                                        Favourite Icon
                                    </figure>
                                </div>
                            </div>
                            
                        </div>
                    )}
                </div>
            </div>
            <div className="edit-note-view">
                <button className="close-edit-view-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M21 11H6.414l5.293-5.293-1.414-1.414L2.586 12l7.707 7.707 1.414-1.414L6.414 13H21z"></path></svg>
                </button>
                <input type="text" placeholder="Enter a title..."/>
                <textarea name="" id="" placeholder="Your Note..."></textarea>
                <button className="finish-edit-view-btn">Done</button>
            </div>
        </>
    )

}

export default Notes
