import React, {useState, useEffect, useRef, useContext} from "react"
import { nameContext } from "../MainComponent/MainComponent.jsx"
import pfp from '../assets/mypfp2.jpg';
import './menu.css'

function Menu(){
    const {name, editView, notesView, headerRef} = useContext(nameContext);

    return(
        <header ref = {headerRef}>
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
                <input type="text" className="input-search" placeholder="Find Anything"/>
            </div>
            <div className="header-bottom">
                <div className="options-mobile">
                    <div className="options-mobile-left">
                        <div className="icon1">-</div>
                        <div className="icon2">-</div>
                    </div>
                    <button className="add-note-btn btn">+</button>
                    <div className="options-mobile-right">
                        <div className="icon3">-</div>
                        <div className="icon4">-</div>
                    </div>
                </div>
                <div className="options-lg">
                    <div className="lg-menu-top-half">
                        <button>Find Anything</button>
                        <nav>
                            <ul>
                                <li>
                                    <figure className="lg-menu-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12.71 2.29a1 1 0 0 0-1.42 0l-9 9a1 1 0 0 0 0 1.42A1 1 0 0 0 3 13h1v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7h1a1 1 0 0 0 1-1 1 1 0 0 0-.29-.71zM6 20v-9.59l6-6 6 6V20z"></path></svg>
                                    </figure>
                                    Home
                                </li>
                                <li>
                                    <figure className="lg-menu-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19.045 7.401c.378-.378.586-.88.586-1.414s-.208-1.036-.586-1.414l-1.586-1.586c-.378-.378-.88-.586-1.414-.586s-1.036.208-1.413.585L4 13.585V18h4.413L19.045 7.401zm-3-3 1.587 1.585-1.59 1.584-1.586-1.585 1.589-1.584zM6 16v-1.585l7.04-7.018 1.586 1.586L7.587 16H6zm-2 4h16v2H4z"></path></svg>
                                    </figure>
                                    Notes

                                </li>
                                <li>
                                    <figure className="lg-menu-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M21.842 6.218a1.977 1.977 0 0 0-.424-.628A1.99 1.99 0 0 0 20 5H8c-.297 0-.578.132-.769.359l-5 6c-.309.371-.309.91 0 1.281l5 6c.191.228.472.36.769.36h12a1.977 1.977 0 0 0 1.41-.582A1.99 1.99 0 0 0 22 17V7c0-.266-.052-.525-.158-.782z"></path></svg>
                                    </figure>
                                    Tags
                                </li>
                                <li>
                                    <figure className="lg-menu-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M7 11h2v2H7zm0 4h2v2H7zm4-4h2v2h-2zm0 4h2v2h-2zm4-4h2v2h-2zm0 4h2v2h-2z"></path><path d="M5 22h14c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2h-2V2h-2v2H9V2H7v2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2zM19 8l.001 12H5V8h14z"></path></svg>
                                    </figure>
                                    Calender
                                </li>
                                <li>
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
                            <span className="groups-tag">
                                <figure className="lg-menu-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20 3H4a2 2 0 0 0-2 2v2a2 2 0 0 0 1 1.72V19a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.72A2 2 0 0 0 22 7V5a2 2 0 0 0-2-2zM4 5h16v2H4zm1 14V9h14v10z"></path><path d="M8 11h8v2H8z"></path></svg>
                                </figure>
                                Groups
                                <figure className="icon-dropdown">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path></svg>
                                </figure>
                            </span>
                            <ul>
                                <li>Group1</li>
                                <li>Group2</li>
                            </ul>
                        </nav>
                        <nav className="lg-menu-bottom-bottom">
                            <ul>
                                <li><a href="">Settings</a></li>
                                <li><a href="">Trash</a></li>
                            </ul>
                            
                            
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Menu
