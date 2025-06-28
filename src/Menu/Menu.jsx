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
                                <li>Home</li>
                                <li>Notes</li>
                                <li>Tags</li>
                                <li>Calender</li>
                                <li>Shared with me</li>
                            </ul>
                        </nav>
                    </div>
                    <div className="lg-menu-bottom-half">
                        <nav className="lg-menu-bottom-top">
                            <span className="groups-tag">
                                Groups
                                <div className="icon-dropdown">&gt;</div>
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
