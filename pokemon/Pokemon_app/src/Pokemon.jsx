import { useEffect, useState } from "react";
import "./Pokemon.css"
import { PokemonCards } from "./PokemonCards";

export const Pokemon = () =>{

    const [pokemon, setPokemon] = useState([]);
    const [loading, setLoading] = useState(false);
    

    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");
    const API  = "https://pokeapi.co/api/v2/pokemon/?limit=200";


    const fetchApi = async() => {

        try {
            const res = await fetch(API);
            const data = await res.json();
            
            const fetchedPokemonData = data.results.map( async (curElem) =>{
                const res = await fetch(curElem.url);
                const data = await res.json();
                return data;
            })

            const detailedResponse = await Promise.all(fetchedPokemonData);
            setPokemon(detailedResponse);
            console.log(detailedResponse)
            setLoading(false);

            
          } catch (error) {
            console.log(error);
            setLoading(true);
            setError(error);
        }
    }

    

    useEffect(() =>{
        fetchApi();
    },[]);

    
    if(loading){
        return <h1>Loading...</h1>
    }
    if(error){
        return <h1>{error.message}</h1>
    }

    //! function to search for the current user pokemon, and this will be passed to the ul, or the further components.
    const searchPokemon = pokemon.filter((curElem) => curElem.name.toLowerCase().
       includes(search.toLowerCase()));


    return <>
    <div className="pokemon-container">
      <h1 className="header">Catch Pokemon's</h1>

      <div className="input-div">
        <input 
          type="text" 
          placeholder="Search Pokemon..." 
          value={search} 
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {searchPokemon.length === 0 && search !== "" ? (
        <div className="no-results">
          <p>No Pokemon found matching "{search}"</p>
        </div>
      ) : (
        <ul className="list-poke">
          {searchPokemon.map((curElem) => {
            return (
              <PokemonCards data={curElem} key={curElem.id}/>
            )
          })}
        </ul>
      )}
    </div>
  </>
}