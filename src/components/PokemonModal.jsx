import { useEffect, useState } from "react";
const typeColors = {
  normal: "bg-stone-400", fire: "bg-red-500", water: "bg-blue-500", electric: "bg-yellow-400 text-yellow-900", 
  grass: "bg-emerald-500", ice: "bg-cyan-300 text-cyan-900", fighting: "bg-orange-700", poison: "bg-purple-500", 
  ground: "bg-yellow-600", flying: "bg-indigo-400", psychic: "bg-pink-500", bug: "bg-lime-500", rock: "bg-yellow-800", 
  ghost: "bg-purple-700", dragon: "bg-indigo-700", dark: "bg-slate-800", steel: "bg-slate-400", fairy: "bg-pink-400"
};

export default function PokemonModal({ url, onClose }) {
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then(setPokemon);
  }, [url]);

  if (!pokemon) return null;

  // Función segura para obtener las estadísticas por nombre
  const getStat = (statName) => pokemon.stats.find(s => s.stat.name === statName)?.base_stat;

  return (
    <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-md flex justify-center items-center z-50 p-4 transition-all">
      <div className="bg-gradient-to-br from-white via-blue-50 to-purple-50 rounded-3xl p-8 relative w-full max-w-sm text-center shadow-2xl mt-12 ring-2 ring-blue-200 hover:ring-purple-300 transition-all">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-full text-white shadow-lg hover:shadow-red-500/50 transition-all transform hover:scale-110 active:scale-95 focus:outline-none"
          title="Cerrar"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>

        {/* Imagen de alta calidad sobresaliendo */}
        <div className="relative -mt-24 mb-3">
          <img
            src={pokemon.sprites.other["official-artwork"].front_default || pokemon.sprites.front_default}
            alt={pokemon.name}
            className="mx-auto w-40 h-40 object-contain drop-shadow-xl"
          />
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
                className={`${colorClass} px-4 py-1.5 rounded-full text-xs font-semibold text-white uppercase tracking-wider shadow`}
              >
                {typeName}
              </span>
            );
          })}
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-300 p-4 rounded-xl flex flex-col hover:shadow-lg hover:scale-105 transition-all">
            <span className="text-red-600 text-xs font-bold uppercase mb-1">❤️ HP</span>
            <span className="font-extrabold text-lg text-red-700">{getStat("hp")}</span>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-300 p-4 rounded-xl flex flex-col hover:shadow-lg hover:scale-105 transition-all">
            <span className="text-orange-600 text-xs font-bold uppercase mb-1">⚔️ Ataque</span>
            <span className="font-extrabold text-lg text-orange-700">{getStat("attack")}</span>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-300 p-4 rounded-xl flex flex-col hover:shadow-lg hover:scale-105 transition-all">
            <span className="text-blue-600 text-xs font-bold uppercase mb-1">🛡️ Defensa</span>
            <span className="font-extrabold text-lg text-blue-700">{getStat("defense")}</span>
          </div>
          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-2 border-yellow-300 p-4 rounded-xl flex flex-col hover:shadow-lg hover:scale-105 transition-all">
            <span className="text-yellow-600 text-xs font-bold uppercase mb-1">⚡ Velocidad</span>
            <span className="font-extrabold text-lg text-yellow-700">{getStat("speed")}</span>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-300 p-4 rounded-xl flex flex-col hover:shadow-lg hover:scale-105 transition-all">
            <span className="text-purple-600 text-xs font-bold uppercase mb-1">📏 Altura</span>
            <span className="font-extrabold text-lg text-purple-700">{pokemon.height / 10} m</span>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-300 p-4 rounded-xl flex flex-col hover:shadow-lg hover:scale-105 transition-all">
            <span className="text-green-600 text-xs font-bold uppercase mb-1">⚖️ Peso</span>
            <span className="font-extrabold text-lg text-green-700">{pokemon.weight / 10} kg</span>
          </div>
        </div>

      </div>
    </div>
  );
}