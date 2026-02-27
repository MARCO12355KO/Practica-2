
   /*import { useEffect, useState } from "react";

export default function PokemonModal({ url, onClose }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then(setData);
  }, [url]);

  if (!data) return null;

  // 🔹 Función para obtener cualquier stat
  const getStat = (name) =>
    data.stats.find((s) => s.stat.name === name)?.base_stat;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded w-80 text-center relative">

        <button
          className="absolute top-2 right-2"
          onClick={onClose}
        >
          ✖
        </button>

        <h2 className="text-2xl font-bold capitalize mb-2">
          {data.name}
        </h2>

        <img
          src={data.sprites.front_default}
          className="mx-auto"
        />

        {/* Características básicas ZZZZ/}
        <p>📏 Altura: {data.height}</p>
        <p>⚖️ Peso: {data.weight}</p>

        {/* ⭐ Nuevas estadísticas ZZZ/}
        <div className="mt-2 space-y-1 text-sm">
          <p>❤️ HP: {getStat("hp")}</p>
          <p>⚡ Velocidad: {getStat("speed")}</p>
        </div>

        {/* Tipos ZZZZ/}
        <div className="flex gap-2 justify-center mt-3">
          {data.types.map((t) => (
            <span
              key={t.type.name}
              className="bg-gray-200 px-2 rounded capitalize"
            >
              {t.type.name}
            </span>
          ))}
        </div>

      </div>
    </div>
  );
}*/

import { useEffect, useState } from "react";

export default function PokemonModal({ url, onClose }) {
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then(setPokemon);
  }, [url]);

  if (!pokemon) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 relative w-72 text-center shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-2xl font-bold text-gray-500 hover:text-black"
        >
          ×
        </button>

        <h2 className="capitalize font-bold text-2xl mt-2">{pokemon.name}</h2>
        
        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          className="mx-auto w-24 h-24"
        />

        <div className="flex flex-col items-center gap-1.5 text-base mt-2">
          <p>❤️ HP: {pokemon.stats[0].base_stat}</p>
          <p>⚔️ Ataque: {pokemon.stats[1].base_stat}</p>
          <p>🛡️ Defensa: {pokemon.stats[2].base_stat}</p>
          <p>⚡ Velocidad: {pokemon.stats[5].base_stat}</p>
          <p>📏 Altura: {pokemon.height}</p>
          <p>⚖️ Peso: {pokemon.weight}</p>
        </div>

        <div className="flex justify-center gap-2 mt-4">
          {pokemon.types.map((typeInfo) => (
            <span
              key={typeInfo.type.name}
              className="bg-gray-100 border border-gray-200 px-3 py-1 rounded text-sm capitalize"
            >
              {typeInfo.type.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
} 
