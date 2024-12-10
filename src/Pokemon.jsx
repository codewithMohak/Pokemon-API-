import React, { useEffect, useState } from "react";
import "./index.css";
import PokemonCards from "./PokemonCards";

export const Pokemon = () => {
  const [pokemon, serPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const API = "https://pokeapi.co/api/v2/pokemon?limit=124";
  const fetchPokemon = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      // console.log(data);

      const deailedPokemonData = data.results.map(async (currPokemon) => {
        // console.log(currPokemon.url);
        const res = await fetch(currPokemon.url);
        const data = await res.json();
        // console.log(data);
        return data;
      });
      //   console.log(deailedPokemonData);

      const detailedRespones = await Promise.all(deailedPokemonData);
      console.log(detailedRespones);
      serPokemon(detailedRespones);
      setLoading(false);
      setError(error);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchPokemon();
  }, []);

  const searchData = pokemon.filter((currPokemon) =>
    currPokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }
  if (error) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }
  return (
    <>
      <section className="container">
        <header>
          <h1>Lets Catch Pokemon</h1>
        </header>
        <div className="pokemon-search">
          <input
            type="text"
            placeholder="Search Pokemon"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div>
          <ul className="cards">
            {/* {pokemon.map((currPokemon) => { */}
            {searchData.map((currPokemon) => {
              return (
                <PokemonCards key={currPokemon.id} PokemonData={currPokemon} />
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
};
