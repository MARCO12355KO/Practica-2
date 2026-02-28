
import { useEffect, useState } from "react";
import PokemonCard from "./components/PokemonCard.jsx";
import PokemonModal from "./components/PokemonModal.jsx";
import TeamPanel from "./components/TeamPanel.jsx";
import SearchModal from "./components/SearchModal.jsx";
import AlertModal from "./components/AlertModal.jsx";

export default function App() {
  const [pokemons, setPokemons] = useState([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [showFavs, setShowFavs] = useState(false);
  const [team, setTeam] = useState([]);
  
  // Estados para AlertModal
  const [alert, setAlert] = useState({ isOpen: false, type: "info", title: "", message: "" });

  const showAlert = (type, title, message) => {
    setAlert({ isOpen: true, type, title, message });
  };

  // modal para búsqueda con validación de letras
  const [isSearchModalOpen, setSearchModalOpen] = useState(false);

  const openSearchModal = () => setSearchModalOpen(true);
  const closeSearchModal = () => setSearchModalOpen(false);
  const handleSearch = (term) => setSearch(term);

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
      showAlert("warning", "Equipo Lleno", "Máximo 6 Pokémon en el equipo");
      return;
    }

    const response = await fetch(url);
    const newPokemon = await response.json();

    const isDuplicate = team.some((p) => p.id === newPokemon.id);
    if (isDuplicate) {
      showAlert("warning", "Duplicado", `${newPokemon.name} ya está en el equipo`);
      return;
    }

    setTeam([...team, newPokemon]);
    showAlert("success", "¡Añadido!", `${newPokemon.name} se unió al equipo`);
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6 flex flex-col md:flex-row gap-6">
      <div className="flex-1">
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-black mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-pulse">
            ⚡ POKÉDEX ⚡
          </h1>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-8 justify-center">
          <button
            onClick={openSearchModal}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-blue-500/50 transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" /></svg>
            Buscar Pokémon
          </button>

          <button
            onClick={() => setShowFavs(!showFavs)}
            className={`px-6 py-3 rounded-xl font-bold shadow-lg transition-all transform hover:scale-105 active:scale-95 ${
              showFavs
                ? "bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white shadow-yellow-500/50"
                : "bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white shadow-gray-600/50"
            }`}
          >
            {showFavs ? "⭐ Mostrar todos" : "☆ Solo favoritos"}
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
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

      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={closeSearchModal}
        onSearch={handleSearch}
        initialValue={search}
      />

      <AlertModal
        isOpen={alert.isOpen}
        type={alert.type}
        title={alert.title}
        message={alert.message}
        onClose={() => setAlert({ ...alert, isOpen: false })}
        autoClose={true}
        duration={3500}
      />
    </div>
  );
}