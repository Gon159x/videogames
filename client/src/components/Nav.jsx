import React from 'react';

import SearchBar from './SearchBar.jsx'; //podria usar un searchbar desde otro componente
import './Nav.css';
import {Link} from 'react-router-dom';  

function Nav() {
    return (
    //   <nav>
    //     <Link to ='/home'>
    //       <span>
    //         {/* <img id="logoHenry" src={Logo} width="30" height="30" className="d-inline-block align-top" alt="" /> */}
    //         Henry - VideoGames
    //       </span>
    //     </Link>
    //     <Link  to = '/landing'>
    //       <span>
    //         Landing Page
    //       </span>
    //     </Link>
        
    //       {/* <SearchBar
    //           onSearch={onSearch}
    //         /> */}
        
          
    //   </nav>
    <nav>
        <Link to = "/home">
            <h2>Henry - VideoGames</h2>
        </Link>
        
        <ul>
            <li>
                <Link to ='/home'>Home</Link>
            </li>
            <li>
                <Link to ='/landing'>LandingPage</Link>
            </li>
        
            <li><a href="#">Item 2</a></li>
            <li><a href="#"><SearchBar/></a></li>
        </ul>
    </nav>



    );
  };
  
  export default Nav;
  