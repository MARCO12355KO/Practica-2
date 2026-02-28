import React from "react";
import PropTypes from "prop-types";

export default function PokemonCard({
  url = "",
  name = "Desconocido",
  onVer = () => {},
  isFav = false,
  onFav = () => {},
  onAdd = () => {},
  inTeam = false,
}) {

  // Extraer id de la url de forma segura
  let id = "---";
  if (typeof url === "string" && url.length > 0) {
    const parts = url.split("/").filter(Boolean);
    if (parts.length) id = parts.pop();
  }

  // Fallback de imagen cuando no hay id numérico
  const isNumericId = /^\d+$/.test(id);
  const imageUrl = isNumericId
    ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
    : "https://via.placeholder.com/150?text=No+Image";

  return (
    <div className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-5 border border-slate-100 flex flex-col items-center overflow-hidden">
      {/* Botón de Favorito */}
      <button
        type="button"
        onClick={onFav}
        className="absolute top-3 right-3 text-2xl hover:scale-125 transition-transform duration-200 z-10 focus:outline-none"
        title={isFav ? "Quitar de favoritos" : "Añadir a favoritos"}
        aria-pressed={isFav}
      >
        {isFav ? "⭐" : <span className="text-slate-300 hover:text-yellow-400 drop-shadow-sm">☆</span>}
      </button>

      {/* Círculo decorativo de fondo e Imagen */}
      <div className="relative w-full flex justify-center mt-2 mb-4">
        <div className="absolute inset-0 bg-slate-50 rounded-full scale-75 group-hover:bg-blue-50 transition-colors duration-300" />
        <img
          src={imageUrl}
          alt={name}
          className="relative w-32 h-32 object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-300"
          loading="lazy"
        />
      </div>

      {/* ID y Nombre del Pokémon */}
      <span className="text-xs font-bold text-slate-400 mb-1 tracking-wider">Nº {String(id).padStart(3, "0")}</span>
      <h2 className="capitalize font-extrabold text-xl text-slate-700 mb-5">{name}</h2>

      {/* Botones de Acción */}
      <div className="flex w-full gap-3 mt-auto">
        <button
          type="button"
          onClick={onVer}
          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-2 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-sm hover:shadow-blue-500/40 active:scale-95 flex justify-center items-center gap-1"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Ver
        </button>

        <button
          type="button"
          onClick={onAdd}
          className={`flex-1 text-white px-2 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-sm hover:shadow-red-500/40 active:scale-95 flex justify-center items-center gap-1 ${inTeam ? 'bg-red-600 hover:bg-red-700' : 'bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/40'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Equipo
        </button>
      </div>
    </div>
  );
}

PokemonCard.propTypes = {
  url: PropTypes.string,
  name: PropTypes.string,
  onVer: PropTypes.func,
  isFav: PropTypes.bool,
  onFav: PropTypes.func,
  onAdd: PropTypes.func,
  inTeam: PropTypes.bool,
};