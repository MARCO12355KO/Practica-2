import React from "react";

export default function PokemonCard({ url, name, onVer, isFav, onFav, onAdd }) {
  const id = url.split("/").filter(Boolean).pop();
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

  return (
    <div className="group relative bg-white/80 backdrop-blur-lg rounded-[2rem] shadow-lg hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 p-6 border border-white hover:border-purple-200 flex flex-col items-center overflow-hidden hover:-translate-y-3">
      
      {/* 1. Fondos de colores difuminados que reaccionan al hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-transparent to-purple-50 opacity-50 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-0 group-hover:opacity-60 transition-all duration-700 z-0"></div>
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-0 group-hover:opacity-60 transition-all duration-700 z-0"></div>

      {/* Contenedor principal por encima de los fondos */}
      <div className="relative z-10 flex flex-col items-center w-full h-full">
        
        {/* Botón de Favorito */}
        <button
          onClick={onFav}
          className="absolute -top-2 -right-2 text-3xl hover:scale-125 transition-transform duration-300 focus:outline-none drop-shadow-md z-20"
          title={isFav ? "Quitar de favoritos" : "Añadir a favoritos"}
        >
          {isFav ? (
            <span className="text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.8)]">⭐</span>
          ) : (
            <span className="text-gray-300 hover:text-yellow-400 transition-colors duration-300">★</span>
          )}
        </button>

        {/* 2. Imagen del Pokémon con efecto de "flotar" */}
        <div className="relative w-full flex justify-center mt-6 mb-8">
          {/* Círculo base que cambia de color */}
          <div className="absolute inset-0 bg-slate-100 rounded-full scale-75 group-hover:scale-110 group-hover:bg-gradient-to-tr from-purple-200 to-blue-200 transition-all duration-500 blur-md"></div>
          <img
            src={imageUrl}
            alt={name}
            className="relative w-36 h-36 object-contain drop-shadow-[0_15px_15px_rgba(0,0,0,0.25)] group-hover:-translate-y-6 group-hover:scale-110 transition-all duration-500 ease-out"
            loading="lazy"
          />
        </div>

        {/* 3. ID y Nombre */}
        <div className="flex flex-col items-center mb-6">
          <span className="bg-slate-100 text-slate-500 text-[11px] font-black px-4 py-1 rounded-full tracking-widest uppercase mb-3 shadow-inner group-hover:bg-purple-100 group-hover:text-purple-600 transition-colors duration-300">
            Nº {id.padStart(3, '0')}
          </span>
          <h2 className="capitalize font-black text-2xl text-slate-700 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-blue-600 transition-all duration-300">
            {name}
          </h2>
        </div>

        {/* 4. Botones de Acción Estilizados */}
        <div className="flex w-full gap-3 mt-auto">
          <button
            onClick={onVer}
            className="flex-1 bg-white border-2 border-slate-100 hover:border-blue-200 hover:bg-blue-50 text-slate-600 hover:text-blue-600 px-3 py-3 rounded-2xl text-sm font-bold transition-all shadow-sm active:scale-95 flex justify-center items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Ver
          </button>

          <button
            onClick={onAdd}
            className="flex-1 bg-gradient-to-r from-slate-800 to-slate-700 hover:from-purple-600 hover:to-blue-600 text-white px-3 py-3 rounded-2xl text-sm font-bold transition-all shadow-lg hover:shadow-purple-500/40 active:scale-95 flex justify-center items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Añadir
          </button>
        </div>
        
      </div>
    </div>
  );
}