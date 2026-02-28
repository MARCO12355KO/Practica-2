import { useEffect, useState } from "react";

// Diccionario de colores de Tailwind para cada tipo de Pokémon
const typeColors = {
  normal: "bg-stone-400", fire: "bg-red-500", water: "bg-blue-500", electric: "bg-yellow-400 text-yellow-900", 
  grass: "bg-emerald-500", ice: "bg-cyan-300 text-cyan-900", fighting: "bg-orange-700", poison: "bg-purple-500", 
  ground: "bg-yellow-600", flying: "bg-indigo-400", psychic: "bg-pink-500", bug: "bg-lime-500", rock: "bg-yellow-800", 
  ghost: "bg-purple-700", dragon: "bg-indigo-700", dark: "bg-slate-800", steel: "bg-slate-400", fairy: "bg-pink-400"
};

export default function PokemonModal({ url = "", onClose = () => {} }) {
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    if (!url) return;
    const controller = new AbortController();
    setLoading(true);
    setError(null);
    setPokemon(null);

    fetch(url, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error("Respuesta no válida");
        return res.json();
      })
      .then((data) => {
        setPokemon(data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === 'AbortError') return;
        console.error("Error cargando detalles:", err);
        setError("No se pudieron cargar los datos");
        setLoading(false);
      });

    return () => controller.abort();
  }, [url]);

  if (!url) return null;

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    // Fondo oscuro con desenfoque
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex justify-center items-center z-50 p-4 transition-all">
      
      {/* Contenedor principal de la tarjeta */}
      <div className="bg-white rounded-3xl p-6 relative w-full max-w-sm text-center shadow-2xl mt-12">
        
        {/* Botón de cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-slate-100 rounded-full text-slate-500 hover:text-red-500 hover:bg-red-50 transition-colors focus:outline-none"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>

        <h2 className="capitalize font-bold text-2xl mt-2">{pokemon?.name}</h2>
        
        <img
          src={pokemon?.sprites?.front_default}
          alt={pokemon?.name}
          className="mx-auto w-24 h-24"
        />

        <div className="flex flex-col items-center gap-1.5 text-base mt-2">
          <p>❤️ HP: {pokemon?.stats?.[0]?.base_stat ?? "-"}</p>
          <p>⚔️ Ataque: {pokemon?.stats?.[1]?.base_stat ?? "-"}</p>
          <p>🛡️ Defensa: {pokemon?.stats?.[2]?.base_stat ?? "-"}</p>
          <p>⚡ Velocidad: {pokemon?.stats?.[5]?.base_stat ?? "-"}</p>
          <p>📏 Altura: {pokemon?.height ?? "-"}</p>
          <p>⚖️ Peso: {pokemon?.weight ?? "-"}</p>
        </div>

        {/* Nombre y Número */}
        <span className="text-sm font-bold text-slate-400 tracking-widest uppercase">Nº {pokemon.id.toString().padStart(3, '0')}</span>
        <h2 className="capitalize font-black text-3xl text-slate-800 mt-1 mb-4">{pokemon.name}</h2>
        
        {/* Tipos dinámicos */}
        <div className="flex justify-center gap-2 mb-6">
          {pokemon.types.map((typeInfo) => {
            const typeName = typeInfo.type.name;
            const colorClass = typeColors[typeName] || "bg-gray-500";
            return (
              <span
                key={typeName}
                className={`${colorClass} px-4 py-1.5 rounded-full text-xs font-bold text-white uppercase tracking-wider shadow-sm`}
              >
                {typeName}
              </span>
            );
          })}
        </div>

        {/* Cuadrícula de Estadísticas (Requisito de la práctica) */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="bg-slate-50 border border-slate-100 p-3 rounded-2xl flex flex-col">
            <span className="text-slate-400 text-xs font-bold uppercase mb-1">❤️ HP</span>
            <span className="font-extrabold text-lg text-slate-700">{getStat("hp")}</span>
          </div>
          <div className="bg-slate-50 border border-slate-100 p-3 rounded-2xl flex flex-col">
            <span className="text-slate-400 text-xs font-bold uppercase mb-1">⚔️ Ataque</span>
            <span className="font-extrabold text-lg text-slate-700">{getStat("attack")}</span>
          </div>
          <div className="bg-slate-50 border border-slate-100 p-3 rounded-2xl flex flex-col">
            <span className="text-slate-400 text-xs font-bold uppercase mb-1">🛡️ Defensa</span>
            <span className="font-extrabold text-lg text-slate-700">{getStat("defense")}</span>
          </div>
          <div className="bg-slate-50 border border-slate-100 p-3 rounded-2xl flex flex-col">
            <span className="text-slate-400 text-xs font-bold uppercase mb-1">⚡ Velocidad</span>
            <span className="font-extrabold text-lg text-slate-700">{getStat("speed")}</span>
          </div>
          <div className="bg-slate-50 border border-slate-100 p-3 rounded-2xl flex flex-col">
            <span className="text-slate-400 text-xs font-bold uppercase mb-1">📏 Altura</span>
            <span className="font-extrabold text-lg text-slate-700">{pokemon.height / 10} m</span>
          </div>
          <div className="bg-slate-50 border border-slate-100 p-3 rounded-2xl flex flex-col">
            <span className="text-slate-400 text-xs font-bold uppercase mb-1">⚖️ Peso</span>
            <span className="font-extrabold text-lg text-slate-700">{pokemon.weight / 10} kg</span>
          </div>
        </div>
      </div>
    </div>
  );
}

PokemonModal.propTypes = {
  url: PropTypes.string,
  onClose: PropTypes.func,
};