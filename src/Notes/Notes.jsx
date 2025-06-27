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
    return(
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
                                    Share Icon
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
    )

}

export default Notes
