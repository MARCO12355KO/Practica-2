
import { useEffect, useState } from "react";
import PokemonCard from "./components/PokemonCard.jsx";
import PokemonModal from "./components/PokemonModal.jsx";
import TeamPanel from "./components/TeamPanel.jsx";

export default function App() {
  const [pokemons, setPokemons] = useState([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [showFavs, setShowFavs] = useState(false);
  const [team, setTeam] = useState([]);

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=50")
      .then((res) => res.json())
      .then((data) => setPokemons(data.results));
  }, []);

  const toggleFavorite = (name) => {
    if (favorites.includes(name)) {
      setFavorites(favorites.filter((f) => f !== name));
    } else {
      setFavorites([...favorites, name]);
    }
  };

  const handleAddToTeam = async (url) => {
    if (team.length >= 6) {
      alert("Máximo 6 Pokémon");
      return;
    }

    const response = await fetch(url);
    const newPokemon = await response.json();

    const isDuplicate = team.some((p) => p.id === newPokemon.id);
    if (isDuplicate) {
      alert("Ya está en el equipo");
      return;
    }

    setTeam([...team, newPokemon]);
  };

  const handleRemoveFromTeam = (id) => {
    setTeam(team.filter((p) => p.id !== id));
  };

  const filtered = pokemons.filter((p) => {
    const match = p.name.includes(search.toLowerCase());
    if (showFavs) return match && favorites.includes(p.name);
    return match;
  });

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col md:flex-row gap-6">
      <div className="flex-1">
        <h1 className="text-3xl font-bold text-center mb-6">
          POKEDEX ⭐⚔️ "TUSCUNIBAR-SULLCATA"  
        </h1>

        <div className="flex gap-3 mb-6 justify-center">
          <input
            type="text"
            placeholder="Buscar Pokémon..."
            className="border p-2 rounded w-64"
            onChange={(e) => setSearch(e.target.value)}
          />

          <button
            onClick={() => setShowFavs(!showFavs)}
            className="bg-yellow-400 px-3 rounded font-bold"
          >
            {showFavs ? "Mostrar todos" : "Solo favoritos"}
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filtered.map((p) => (
            <PokemonCard
              key={p.name}
              url={p.url}
              name={p.name}
              onVer={() => setSelected(p.url)}
              isFav={favorites.includes(p.name)}
              onFav={() => toggleFavorite(p.name)}
              onAdd={() => handleAddToTeam(p.url)}
            />
          ))}
        </div>
      </div>

      <TeamPanel team={team} onRemove={handleRemoveFromTeam} />

      {selected && (
        <PokemonModal url={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}