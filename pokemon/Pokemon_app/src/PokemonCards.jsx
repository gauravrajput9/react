import "./Pokemon.css"
export const PokemonCards = ({data}) =>{
    if(!data){
        return <h1>loading...</h1>
    }
    return <>
       <li key={data.id} className="poke-cards">
         <div>
         <img src={data.sprites.other.dream_world.front_default} alt={data.name}/>
         <h1>{data.name}</h1>
         <div className="type-wrapper">
            {data.types.map((curElem, index) => (
                <div key={index} className="type">
                    {curElem.type.name}
                </div>
            ))}
        </div>
            <div className="characteristics">
                <h1>Ability : {data.abilities[0].ability.name}</h1>
                <h1>Speed : {data.stats[5].base_stat}</h1>
            </div>
         </div>
       </li>
    </>
}