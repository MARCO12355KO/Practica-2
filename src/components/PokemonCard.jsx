import React from "react";

export default function PokemonCard({ url, name, onVer, isFav, onFav, onAdd }) {

  const id = url.split("/").filter(Boolean).pop();
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

  return (
    <div className="group relative bg-gradient-to-br from-white via-blue-50 to-purple-50 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-5 border-2 border-blue-200 hover:border-purple-400 flex flex-col items-center overflow-hidden hover:scale-105">
      
      {/* Botón de Favorito */}
      <button
        onClick={onFav}
        className="absolute top-3 right-3 text-3xl hover:scale-125 transition-all duration-200 z-10 focus:outline-none drop-shadow-lg"
        title={isFav ? "Quitar de favoritos" : "Añadir a favoritos"}
      >
        {isFav ? "⭐" : <span className="text-gray-400 hover:text-yellow-400 drop-shadow-md">★</span>}
      </button>

      {/* Círculo decorativo de fondo e Imagen */}
      <div className="relative w-full flex justify-center mt-2 mb-4">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full scale-75 group-hover:from-purple-200 group-hover:to-pink-200 transition-all duration-300 blur-sm"></div>
        <img
          src={imageUrl}
          alt={name}
          className="relative w-32 h-32 object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-300"
          loading="lazy"
        />
      </div>

      {/* ID y Nombre del Pokémon */}
      <span className="text-xs font-bold text-slate-400 mb-1 tracking-wider">Nº {id.padStart(3, '0')}</span>
      <h2 className="capitalize font-extrabold text-xl text-slate-700 mb-5">{name}</h2>

      {/* Botones de Acción */}
      <div className="flex w-full gap-2 mt-auto">
        <button
          onClick={onVer}
          className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-2 py-2.5 rounded-lg text-xs font-bold transition-all shadow-md hover:shadow-lg hover:shadow-blue-500/50 active:scale-95 flex justify-center items-center gap-1.5 transform hover:scale-110"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Ver
        </button>

        <button
          onClick={onAdd}
          className="flex-1 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-2 py-2.5 rounded-lg text-xs font-bold transition-all shadow-md hover:shadow-lg hover:shadow-emerald-500/50 active:scale-95 flex justify-center items-center gap-1.5 transform hover:scale-110"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          +
        </button>
      </div>
    </div>
  );
}