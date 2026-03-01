import React from "react";

export default function TeamPanel({ team, onRemove }) {
  // Mejorado: Buscar la estadística por nombre es mucho más seguro que por índice [0] o [1]
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
    <div className="relative bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-7 w-full md:w-1/3 h-fit border border-white/60 overflow-hidden group">
      
      {/* Luces de fondo (Blobs) */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse z-0"></div>
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse z-0 delay-75"></div>

      <div className="relative z-10">
        {/* Cabecera */}
        <div className="text-center mb-8 flex flex-col items-center">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center mb-3 shadow-inner border border-white">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-purple-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
            </svg>
          </div>
          <h2 className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 tracking-tight">
            MI EQUIPO
          </h2>
          <span className="bg-white/60 text-purple-600 text-xs font-bold px-4 py-1.5 rounded-full mt-2 shadow-sm border border-purple-100 backdrop-blur-sm">
            {team.length} / 6 Pokémon
          </span>
        </div>
        
        {/* Estado Vacío */}
        {team.length === 0 ? (
          <div className="text-center py-10 bg-white/40 rounded-3xl border-2 border-dashed border-purple-200 backdrop-blur-sm">
            <div className="w-16 h-16 mx-auto bg-purple-50 rounded-full flex items-center justify-center mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-purple-300">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-5.834L6.166 6.256" />
              </svg>
            </div>
            <p className="text-purple-700 font-black text-lg">Tu equipo está vacío</p>
            <p className="text-sm text-purple-400 font-medium mt-1 px-4">Añade hasta 6 compañeros para tu aventura</p>
          </div>
        ) : (
          /* Lista de Pokémon */
          <ul className="space-y-3">
            {team.map((pokemon, index) => (
              <li 
                key={pokemon.id} 
                className="bg-white/50 backdrop-blur-md border border-purple-100 hover:border-pink-300 p-2.5 pr-4 rounded-2xl flex justify-between items-center transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 hover:-translate-y-1 group"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-white shadow-sm w-12 h-12 rounded-xl flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-50 opacity-50"></div>
                    <img 
                      src={pokemon.sprites.front_default} 
                      alt={pokemon.name} 
                      className="w-10 h-10 relative z-10 drop-shadow-md group-hover:scale-110 transition-transform duration-300" 
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-purple-400 uppercase tracking-wider">#{index + 1}</span>
                    <span className="capitalize text-sm font-black text-slate-700 group-hover:text-purple-600 transition-colors">
                      {pokemon.name}
                    </span>
                  </div>
                </div>
                
                <button 
                  onClick={() => onRemove(pokemon.id)}
                  className="w-8 h-8 rounded-full bg-white hover:bg-red-50 text-slate-300 hover:text-red-500 flex items-center justify-center transition-all duration-300 shadow-sm hover:shadow-md hover:shadow-red-500/20 active:scale-95"
                  title="Eliminar del equipo"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* Resumen de Estadísticas */}
        {team.length > 0 && (
          <div className="mt-8 pt-6 border-t border-purple-100 grid grid-cols-2 gap-4 relative">
            
            <div className="bg-white/50 border border-red-100 p-4 rounded-2xl flex flex-col items-center shadow-sm backdrop-blur-sm hover:-translate-y-1 hover:shadow-md hover:shadow-red-500/10 transition-all">
              <div className="w-8 h-8 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                </svg>
              </div>
              <span className="text-red-500 text-[10px] font-black uppercase tracking-wider mb-0.5">HP Total</span>
              <span className="text-xl font-black text-slate-800">{totalHP}</span>
            </div>

            <div className="bg-white/50 border border-orange-100 p-4 rounded-2xl flex flex-col items-center shadow-sm backdrop-blur-sm hover:-translate-y-1 hover:shadow-md hover:shadow-orange-500/10 transition-all">
              <div className="w-8 h-8 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M12.963 2.286a.75.75 0 00-1.071-.136 9.742 9.742 0 00-3.539 6.177A7.547 7.547 0 016.648 6.61a.75.75 0 00-1.152.082A9 9 0 1015.68 4.534a7.46 7.46 0 01-2.717-2.248zM15.75 14.25a3.75 3.75 0 11-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 011.925-3.545 3.75 3.75 0 013.255 3.717z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-orange-500 text-[10px] font-black uppercase tracking-wider mb-0.5">Ataque Prom.</span>
              <span className="text-xl font-black text-slate-800">{avgAttack}</span>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}