import { useEffect, useState } from "react";
import PokemonCard from "./components/PokemonCard.jsx";
import PokemonModal from "./components/PokemonModal.jsx";
import TeamPanel from "./components/TeamPanel.jsx";
import SearchModal from "./components/SearchModal.jsx";
import AlertModal from "./components/AlertModal.jsx";

export default function App() {
  // ==========================================
  // 1. ESTADOS DE LA APLICACIÓN (Bien estructurados)
  // ==========================================
  
  // Datos principales
  const [pokemons, setPokemons] = useState([]);
  const [team, setTeam] = useState([]);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  // Interfaz y Búsqueda
  const [search, setSearch] = useState("");
  const [showFavs, setShowFavs] = useState(false);
  const [selected, setSelected] = useState(null);
  
  // Modales
  const [isSearchModalOpen, setSearchModalOpen] = useState(false);
  const [alert, setAlert] = useState({ isOpen: false, type: "info", title: "", message: "" });

  // NUEVO: Tema de Fondo (Personalización)
  const [bgTheme, setBgTheme] = useState("mystic");

  // ==========================================
  // 2. CONFIGURACIÓN DE TEMAS DE FONDO
  // ==========================================
  const themes = {
    mystic: { name: "Místico", style: "from-indigo-50 via-purple-100 to-pink-50", icon: "🔮" },
    ocean:  { name: "Océano", style: "from-cyan-50 via-blue-100 to-indigo-50", icon: "🌊" },
    forest: { name: "Bosque", style: "from-emerald-50 via-green-100 to-teal-50", icon: "🍃" },
    volcano:{ name: "Volcán", style: "from-orange-50 via-red-100 to-yellow-50", icon: "🌋" },
    dark:   { name: "Noche", style: "from-slate-800 via-indigo-900 to-slate-800", icon: "🌙" }
  };

  // ==========================================
  // 3. EFECTOS (Ciclo de vida)
  // ==========================================
  
  // Guardar favoritos en LocalStorage automáticamente
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Cargar Pokémon al iniciar
  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=50")
      .then((res) => res.json())
      .then((data) => setPokemons(data.results));
  }, []);

  // ==========================================
  // 4. FUNCIONES CONTROLADORAS (Handlers)
  // ==========================================
  
  const showAlert = (type, title, message) => setAlert({ isOpen: true, type, title, message });

  const toggleFavorite = (name) => {
    if (favorites.includes(name)) {
      setFavorites(favorites.filter((f) => f !== name));
    } else {
      setFavorites([...favorites, name]);
    }
  };

  const handleAddToTeam = async (url) => {
    if (team.length >= 6) {
      showAlert("warning", "Equipo Lleno", "Ya tienes 6 Pokémon en tu equipo.");
      return;
    }
    const response = await fetch(url);
    const newPokemon = await response.json();

    if (team.some((p) => p.id === newPokemon.id)) {
      showAlert("warning", "Duplicado", `${newPokemon.name} ya forma parte de tu equipo.`);
      return;
    }

    setTeam([...team, newPokemon]);
    showAlert("success", "¡Añadido!", `${newPokemon.name} se ha unido a tu aventura.`);
  };

  const handleRemoveFromTeam = (id) => setTeam(team.filter((p) => p.id !== id));

  // Lógica de filtrado
  const filteredPokemons = pokemons.filter((p) => {
    const match = p.name.includes(search.toLowerCase());
    return showFavs ? match && favorites.includes(p.name) : match;
  });

  // ==========================================
  // 5. RENDERIZADO DE LA INTERFAZ (El diseño hermoso)
  // ==========================================
  return (
    // Contenedor principal que cambia de color dinámicamente
    <div className={`min-h-screen transition-colors duration-1000 ease-in-out bg-gradient-to-br ${themes[bgTheme].style}`}>
      
      <div className="p-4 md:p-8 max-w-[1600px] mx-auto font-sans relative z-10">
        
        {/* --- HEADER Y SELECTOR DE TEMAS --- */}
        <header className="relative mb-10 flex flex-col items-center">
          
          {/* Selector de Fondos de Cristal */}
          <div className="absolute top-0 right-0 hidden md:flex gap-2 bg-white/40 backdrop-blur-md p-2 rounded-full border border-white/60 shadow-sm">
            {Object.entries(themes).map(([key, theme]) => (
              <button
                key={key}
                onClick={() => setBgTheme(key)}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-lg transition-all duration-300 ${
                  bgTheme === key ? "bg-white shadow-md scale-110" : "hover:bg-white/50 hover:scale-105 grayscale opacity-60 hover:grayscale-0 hover:opacity-100"
                }`}
                title={`Fondo ${theme.name}`}
              >
                {theme.icon}
              </button>
            ))}
          </div>

          {/* Selector para Móviles (Visible solo en pantallas pequeñas) */}
          <div className="flex md:hidden gap-2 mb-6 bg-white/40 backdrop-blur-md p-2 rounded-full border border-white/60">
             {Object.entries(themes).map(([key, theme]) => (
              <button
                key={key}
                onClick={() => setBgTheme(key)}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all ${bgTheme === key ? "bg-white shadow-md" : "grayscale opacity-50"}`}
              >
                {theme.icon}
              </button>
            ))}
          </div>

          {/* Título Principal */}
          <div className="inline-block bg-white/40 backdrop-blur-md border border-white/60 shadow-xl rounded-[2.5rem] px-12 py-8 text-center transition-all duration-500 hover:shadow-2xl hover:bg-white/50">
            <h1 className="text-5xl md:text-7xl font-black bg-clip-text text-transparent bg-gradient-to-r from-slate-700 via-purple-600 to-slate-700 tracking-tighter drop-shadow-sm">
              POKÉDEX
            </h1>
            <p className="text-slate-500 font-bold mt-3 uppercase tracking-[0.3em] text-xs md:text-sm">
              Arma tu equipo ideal
            </p>
          </div>
        </header>

        {/* --- CONTROLES DE BÚSQUEDA Y FAVORITOS --- */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center items-center">
          <button
            onClick={() => setSearchModalOpen(true)}
            className="bg-white/80 backdrop-blur-md border border-slate-200 hover:border-purple-300 hover:bg-purple-50 text-slate-700 px-8 py-4 rounded-2xl font-black shadow-sm hover:shadow-lg hover:shadow-purple-500/20 transition-all transform hover:-translate-y-1 active:scale-95 flex items-center gap-3 w-full sm:w-auto"
          >
            <span className="text-xl">🔍</span>
            {search ? "Cambiar búsqueda" : "Buscar Pokémon"}
          </button>

          <button
            onClick={() => setShowFavs(!showFavs)}
            className={`px-8 py-4 rounded-2xl font-black shadow-sm transition-all transform hover:-translate-y-1 active:scale-95 flex items-center gap-3 w-full sm:w-auto border backdrop-blur-md ${
              showFavs
                ? "bg-yellow-100/90 border-yellow-300 text-yellow-700 hover:shadow-lg hover:shadow-yellow-500/20"
                : "bg-white/80 border-slate-200 text-slate-600 hover:text-slate-800 hover:border-slate-300 hover:shadow-lg"
            }`}
          >
            <span className={`text-xl ${!showFavs && "grayscale opacity-50"}`}>⭐</span> 
            {showFavs ? "Mostrando Favoritos" : "Solo Favoritos"}
          </button>
        </div>

        {/* --- INDICADOR DE BÚSQUEDA ACTIVA --- */}
        {search && (
          <div className="flex justify-center mb-8 animate-fade-in">
            <div className="flex items-center gap-3 bg-white/60 backdrop-blur-md border border-slate-200 text-slate-700 px-6 py-2.5 rounded-full shadow-sm">
              <span className="text-sm font-bold">Filtro: <span className="italic text-purple-600">"{search}"</span></span>
              <button 
                onClick={() => setSearch("")} 
                className="w-6 h-6 flex items-center justify-center bg-slate-200 hover:bg-red-400 text-slate-600 hover:text-white rounded-full transition-colors text-xs font-bold"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* --- CONTENEDOR PRINCIPAL (Grid + Equipo) --- */}
        <div className="flex flex-col xl:flex-row gap-8 items-start">
          
          {/* Cuadrícula de Cartas */}
          <div className="flex-1 w-full">
            {filteredPokemons.length === 0 ? (
              <div className="text-center py-20 bg-white/40 backdrop-blur-md rounded-[2rem] border-2 border-dashed border-slate-300">
                <span className="text-6xl mb-4 block animate-bounce">🙈</span>
                <h3 className="text-2xl font-black text-slate-700">Ningún Pokémon encontrado</h3>
                <p className="text-slate-500 mt-2 font-medium">Intenta con otro nombre o revisa tus filtros.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
                {filteredPokemons.map((p) => (
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
            )}
          </div>

          {/* Panel Lateral (Equipo) */}
          <div className="w-full xl:w-[400px] flex-shrink-0 sticky top-8">
            <TeamPanel team={team} onRemove={handleRemoveFromTeam} />
          </div>
          
        </div>

        {/* --- MODALES COMPONENTES --- */}
        {selected && <PokemonModal url={selected} onClose={() => setSelected(null)} />}
        
        <SearchModal
          isOpen={isSearchModalOpen}
          onClose={() => setSearchModalOpen(false)}
          onSearch={setSearch}
          initialValue={search}
        />

        <AlertModal
          isOpen={alert.isOpen}
          type={alert.type}
          title={alert.title}
          message={alert.message}
          onClose={() => setAlert({ ...alert, isOpen: false })}
          duration={3500}
        />

      </div>
    </div>
  );
}