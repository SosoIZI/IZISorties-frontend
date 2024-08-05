import styles from "../styles/Header.module.css";
import React, { useState } from "react";
import Link from 'next/link';


function Header() {

const handleConnect=()=>{
    window.location.href = '/Connexion'  // The window.location object can be used to get the current page address (URL) and to redirect the browser to a new page.

}


const handleSubscribe=()=>{
window.location.href = '/Inscription'
}







  const searchBar = () => {};
  const [searchInput, setSearchInput] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  if (searchInput.length > 0) {
    countries.filter((event) => {
      return event.name.match(searchInput); // country à changer
    });
  }

  return (
    <header className={styles.header}>
      <div className={styles.logoAndSearchContainer}>
      <Link href="/Home">
          <a>
            <img className={styles.logo} src="logo.png" alt="Logo" />
          </a>
        </Link>
      
      <input
        className={styles.searchbar}
        type="text"
        placeholder="Rechercher une sortie"
        onChange={handleChange}
        value={searchInput}
      />
      </div>
      <div>
      <button 
					onClick={() =>handleConnect()}
					className={styles.button}
				></button>
      </div>
      <div>
      <button
					onClick={() => handleSubscribe()}
					className={styles.button}
				></button>

      </div>
    
    </header>
  );
}

export default Header;
