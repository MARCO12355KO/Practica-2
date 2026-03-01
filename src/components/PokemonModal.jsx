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
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex justify-center items-center z-50 p-4 transition-all duration-300">
      
      {/* Contenedor del Modal con efecto cristal */}
      <div className="relative bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-8 w-full max-w-md text-center shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/60 mt-12 overflow-hidden group">
        
        {/* Fondos de colores difuminados (Blobs) */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse z-0"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse z-0 delay-75"></div>

        {/* Contenido principal sobre el fondo */}
        <div className="relative z-10">
          
          {/* Botón de Cerrar modernizado */}
          <button
            onClick={onClose}
            className="absolute -top-2 -right-2 w-10 h-10 flex items-center justify-center bg-white/50 hover:bg-white text-slate-500 hover:text-red-500 rounded-full shadow-sm hover:shadow-md hover:shadow-red-500/20 transition-all transform hover:scale-110 active:scale-95 focus:outline-none backdrop-blur-md"
            title="Cerrar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Imagen de alta calidad sobresaliendo */}
          <div className="relative -mt-28 mb-4 flex justify-center">
            {/* Brillo detrás del Pokémon */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/40 to-white/10 rounded-full scale-110 blur-xl"></div>
            <img
              src={pokemon.sprites.other["official-artwork"].front_default || pokemon.sprites.front_default}
              alt={pokemon.name}
              className="relative w-48 h-48 object-contain drop-shadow-[0_20px_20px_rgba(0,0,0,0.3)] hover:-translate-y-4 hover:scale-110 transition-all duration-500 ease-out"
            />
          </div>

          {/* Nombre y Número */}
          <div className="flex flex-col items-center mb-5">
            <span className="bg-white/60 text-slate-500 text-[11px] font-black px-4 py-1 rounded-full tracking-widest uppercase mb-2 shadow-sm">
              Nº {pokemon.id.toString().padStart(3, '0')}
            </span>
            <h2 className="capitalize font-black text-3xl text-slate-800 bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-500">
              {pokemon.name}
            </h2>
          </div>
          
          {/* Tipos dinámicos */}
          <div className="flex justify-center gap-2 mb-8">
            {pokemon.types.map((typeInfo) => {
              const typeName = typeInfo.type.name;
              const colorClass = typeColors[typeName] || "bg-gray-500";
              return (
                <span
                  key={typeName}
                  className={`${colorClass} px-5 py-1.5 rounded-full text-xs font-bold text-white uppercase tracking-widest shadow-md hover:scale-105 transition-transform`}
                >
                  {typeName}
                </span>
              );
            })}
          </div>

          {/* Cuadrícula de Estadísticas (Efecto Glass/Pastel) */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-white/50 border border-red-100 p-4 rounded-2xl flex flex-col items-center shadow-sm hover:shadow-lg hover:shadow-red-500/10 hover:-translate-y-1 transition-all backdrop-blur-sm">
              <span className="text-red-500 text-[10px] font-black uppercase mb-1 tracking-wider">❤️ HP</span>
              <span className="font-black text-xl text-red-600">{getStat("hp")}</span>
            </div>
            <div className="bg-white/50 border border-orange-100 p-4 rounded-2xl flex flex-col items-center shadow-sm hover:shadow-lg hover:shadow-orange-500/10 hover:-translate-y-1 transition-all backdrop-blur-sm">
              <span className="text-orange-500 text-[10px] font-black uppercase mb-1 tracking-wider">⚔️ Ataque</span>
              <span className="font-black text-xl text-orange-600">{getStat("attack")}</span>
            </div>
            <div className="bg-white/50 border border-blue-100 p-4 rounded-2xl flex flex-col items-center shadow-sm hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-1 transition-all backdrop-blur-sm">
              <span className="text-blue-500 text-[10px] font-black uppercase mb-1 tracking-wider">🛡️ Defensa</span>
              <span className="font-black text-xl text-blue-600">{getStat("defense")}</span>
            </div>
            <div className="bg-white/50 border border-yellow-100 p-4 rounded-2xl flex flex-col items-center shadow-sm hover:shadow-lg hover:shadow-yellow-500/10 hover:-translate-y-1 transition-all backdrop-blur-sm">
              <span className="text-yellow-600 text-[10px] font-black uppercase mb-1 tracking-wider">⚡ Velocidad</span>
              <span className="font-black text-xl text-yellow-600">{getStat("speed")}</span>
            </div>
            <div className="bg-white/50 border border-purple-100 p-4 rounded-2xl flex flex-col items-center shadow-sm hover:shadow-lg hover:shadow-purple-500/10 hover:-translate-y-1 transition-all backdrop-blur-sm">
              <span className="text-purple-500 text-[10px] font-black uppercase mb-1 tracking-wider">📏 Altura</span>
              <span className="font-black text-xl text-purple-600">{pokemon.height / 10} m</span>
            </div>
            <div className="bg-white/50 border border-green-100 p-4 rounded-2xl flex flex-col items-center shadow-sm hover:shadow-lg hover:shadow-green-500/10 hover:-translate-y-1 transition-all backdrop-blur-sm">
              <span className="text-green-500 text-[10px] font-black uppercase mb-1 tracking-wider">⚖️ Peso</span>
              <span className="font-black text-xl text-green-600">{pokemon.weight / 10} kg</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}