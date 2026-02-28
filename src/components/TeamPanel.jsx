
export default function TeamPanel({ team, onRemove }) {
  const totalHP = team.reduce((acc, p) => acc + p.stats[0].base_stat, 0);
  const avgAttack = team.length > 0 
    ? Math.round(team.reduce((acc, p) => acc + p.stats[1].base_stat, 0) / team.length)
    : 0;

  return (
    <div className="bg-gradient-to-br from-white via-purple-50 to-pink-50 rounded-2xl shadow-xl p-6 w-full md:w-1/3 h-fit border-2 border-purple-300 hover:border-pink-400 transition-all">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">⚔️ MI EQUIPO ⚔️</h2>
        <p className="text-purple-500 font-bold mt-1">{team.length} / 6 Pokémon</p>
      </div>
      
      {team.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-3xl mb-2">🎯</p>
          <p className="text-purple-600 font-semibold">Agrega Pokémon a tu equipo</p>
          <p className="text-sm text-gray-500 mt-1">Máximo 6 Pokémon</p>
        </div>
      ) : (
        <ul className="space-y-2">
          {team.map((pokemon, index) => (
            <li key={pokemon.id} className="bg-gradient-to-r from-purple-100 to-pink-100 border-2 border-purple-200 hover:border-pink-400 p-3 rounded-xl flex justify-between items-center transition-all hover:shadow-lg hover:scale-105">
              <div className="flex items-center gap-3">
                <span className="font-bold text-purple-700 text-sm">#{index + 1}</span>
                <img src={pokemon.sprites.front_default} alt={pokemon.name} className="w-8 h-8 drop-shadow" />
                <span className="capitalize text-sm font-bold text-purple-800">{pokemon.name}</span>
              </div>
              <button 
                onClick={() => onRemove(pokemon.id)}
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shadow-md hover:shadow-lg transition-all transform hover:scale-110 active:scale-95"
                title="Eliminar"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}

      {team.length > 0 && (
        <div className="mt-6 pt-6 border-t-2 border-purple-300 grid grid-cols-2 gap-3">
          <div className="bg-gradient-to-br from-red-100 to-red-200 border-2 border-red-300 p-3 rounded-lg text-center">
            <p className="text-2xl">❤️</p>
            <p className="text-xs text-red-600 font-bold mt-1">HP Total</p>
            <p className="text-lg font-black text-red-700">{totalHP}</p>
          </div>
          <div className="bg-gradient-to-br from-orange-100 to-orange-200 border-2 border-orange-300 p-3 rounded-lg text-center">
            <p className="text-2xl">⚔️</p>
            <p className="text-xs text-orange-600 font-bold mt-1">Ataque Prom.</p>
            <p className="text-lg font-black text-orange-700">{avgAttack}</p>
          </div>
        </div>
      )}
    </div>
  );
}
