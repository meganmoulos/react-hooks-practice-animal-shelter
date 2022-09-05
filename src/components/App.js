import React, { useState} from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

function App() {
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState({ type: "all" });

  function onChangeType(typeString){
    setFilters({...filters, type: typeString})
  }

  function onFindPetsClick(){
    fetch(filters.type === "all" ? "http://localhost:3001/pets" : `http://localhost:3001/pets?type=${filters.type}`)
      .then(res => res.json())
      .then(result => setPets(result))
  }

  function onAdoptPet(id){
    const newState = pets.map(pet => {
      if (pet.id === id) {
        return {...pet, isAdopted: true}
      }
      return pet
    })
    setPets(newState)
  }

  return (
    <div className="ui container">
      <header>
        <h1 className="ui dividing header">React Animal Shelter</h1>
      </header>
      <div className="ui container">
        <div className="ui grid">
          <div className="four wide column">
            <Filters onChangeType={onChangeType} onFindPetsClick={onFindPetsClick}/>
          </div>
          <div className="twelve wide column">
            <PetBrowser pets={pets} onAdoptPet={onAdoptPet}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
