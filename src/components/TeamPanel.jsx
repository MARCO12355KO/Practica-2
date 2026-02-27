
export default function TeamPanel({ team, onRemove }) {
  const totalHP = team.reduce((acc, p) => acc + p.stats[0].base_stat, 0);
  const avgAttack = team.length > 0 
    ? Math.round(team.reduce((acc, p) => acc + p.stats[1].base_stat, 0) / team.length)
    : 0;

  return (
    <div className="bg-white rounded-lg shadow p-4 w-full md:w-1/3 h-fit">
      <h2 className="text-xl font-bold mb-4">Equipo ({team.length}/6)</h2>
      
      {team.length === 0 ? (
        <p className="text-gray-500 text-sm">No hay Pokémon en el equipo</p>
      ) : (
        <ul className="divide-y">
          {team.map((pokemon) => (
            <li key={pokemon.id} className="py-2 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <img src={pokemon.sprites.front_default} alt={pokemon.name} className="w-8 h-8" />
                <span className="capitalize text-sm">{pokemon.name}</span>
              </div>
              <button 
                onClick={() => onRemove(pokemon.id)}
                className="text-red-400 hover:text-red-600 text-sm"
              >
                Quitar
              </button>
            </li>
          ))}
        </ul>
      )}

      {team.length > 0 && (
        <div className="mt-4 pt-4 border-t text-sm">
          <p>❤️ HP total: {totalHP}</p>
          <p>⚔️ Ataque promedio: {avgAttack}</p>
        </div>
      )}
    </div>
  );
}
