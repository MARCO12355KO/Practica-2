import React from "react";

export default function TeamPanel({ team, onRemove }) {
  const totalHP = team.reduce((acc, p) => {
    const hpStat = p.stats.find(s => s.stat.name === "hp")?.base_stat || 0;
    return acc + hpStat;
  }, 0);

  const avgAttack = team.length > 0 
    ? Math.round(team.reduce((acc, p) => {
        const attackStat = p.stats.find(s => s.stat.name === "attack")?.base_stat || 0;
        return acc + attackStat;
      }, 0) / team.length)
    : 0;

  return (
    <div className="relative bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-lg p-4 sm:p-5 w-full border border-white/60 overflow-hidden group">
      
      {/* Luces de fondo (Blobs) más pequeñas para no romper el layout */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-pink-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 z-0"></div>
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 z-0"></div>

      <div className="relative z-10 w-full">
        {/* Cabecera */}
        <div className="text-center mb-5 flex flex-col items-center">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center mb-2 shadow-inner border border-white">
            <span className="text-xl">⚡</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 tracking-tight whitespace-nowrap">
            MI EQUIPO
          </h2>
          <span className="bg-white/80 text-purple-600 text-[11px] font-bold px-3 py-1 rounded-full mt-1.5 shadow-sm border border-purple-100 whitespace-nowrap">
            {team.length} / 6 Pokémon
          </span>
        </div>
        
        {/* Estado Vacío */}
        {team.length === 0 ? (
          <div className="text-center py-8 bg-white/40 rounded-2xl border-2 border-dashed border-purple-200">
            <span className="text-3xl block mb-2 opacity-50">🎒</span>
            <p className="text-purple-700 font-bold text-sm">Tu equipo está vacío</p>
          </div>
        ) : (
          /* Lista de Pokémon ajustada para no desbordar */
          <ul className="space-y-2.5">
            {team.map((pokemon, index) => (
              <li 
                key={pokemon.id} 
                className="bg-white/60 backdrop-blur-md border border-purple-100 p-2 rounded-xl flex justify-between items-center transition-all shadow-sm hover:shadow-md"
              >
                <div className="flex items-center gap-2.5 min-w-0 flex-1">
                  <div className="bg-white shadow-sm w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                    <img 
                      src={pokemon.sprites.front_default} 
                      alt={pokemon.name} 
                      className="w-8 h-8 object-contain" 
                    />
                  </div>
                  {/* min-w-0 y truncate evitan que nombres largos rompan la caja */}
                  <div className="flex flex-col min-w-0 flex-1">
                    <span className="text-[9px] font-black text-purple-400 uppercase tracking-wider">#{index + 1}</span>
                    <span className="capitalize text-xs sm:text-sm font-black text-slate-700 truncate pr-2">
                      {pokemon.name}
                    </span>
                  </div>
                </div>
                
                <button 
                  onClick={() => onRemove(pokemon.id)}
                  className="w-7 h-7 flex-shrink-0 rounded-full bg-white hover:bg-red-50 text-slate-300 hover:text-red-500 flex items-center justify-center transition-all shadow-sm border border-slate-100"
                  title="Eliminar"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* Resumen de Estadísticas */}
        {team.length > 0 && (
          <div className="mt-5 pt-4 border-t border-purple-100 grid grid-cols-2 gap-2 sm:gap-3">
            
            <div className="bg-white/60 border border-red-100 p-2 sm:p-3 rounded-xl flex flex-col items-center shadow-sm text-center overflow-hidden">
              <span className="text-red-500 text-sm mb-1">❤️</span>
              <span className="text-red-500 text-[9px] font-black uppercase tracking-wider mb-0.5 whitespace-nowrap">HP Total</span>
              <span className="text-lg sm:text-xl font-black text-slate-800 leading-none mt-1">{totalHP}</span>
            </div>

            <div className="bg-white/60 border border-orange-100 p-2 sm:p-3 rounded-xl flex flex-col items-center shadow-sm text-center overflow-hidden">
              <span className="text-orange-500 text-sm mb-1">⚔️</span>
              <span className="text-orange-500 text-[9px] font-black uppercase tracking-wider mb-0.5 whitespace-nowrap">Ataque</span>
              <span className="text-lg sm:text-xl font-black text-slate-800 leading-none mt-1">{avgAttack}</span>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}