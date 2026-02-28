import { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";

export default function PokemonModal({ url = "", onClose = () => {} }) {
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    if (!url) return;
    const controller = new AbortController();
    setLoading(true);
    setError(null);
    setPokemon(null);

    fetch(url, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error("Respuesta no válida");
        return res.json();
      })
      .then((data) => {
        setPokemon(data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === 'AbortError') return;
        console.error("Error cargando detalles:", err);
        setError("No se pudieron cargar los datos");
        setLoading(false);
      });

    return () => controller.abort();
  }, [url]);

  if (!url) return null;

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        ref={modalRef}
        className="bg-white rounded-lg p-6 relative w-72 text-center shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {loading && <p className="mb-4">Cargando...</p>}
        {error && !loading && (
          <p className="text-red-500 mb-4">{error}</p>
        )}
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-2xl font-bold text-gray-500 hover:text-black"
        >
          ×
        </button>

        <h2 className="capitalize font-bold text-2xl mt-2">{pokemon?.name}</h2>
        
        <img
          src={pokemon?.sprites?.front_default}
          alt={pokemon?.name}
          className="mx-auto w-24 h-24"
        />

        <div className="flex flex-col items-center gap-1.5 text-base mt-2">
          <p>❤️ HP: {pokemon?.stats?.[0]?.base_stat ?? "-"}</p>
          <p>⚔️ Ataque: {pokemon?.stats?.[1]?.base_stat ?? "-"}</p>
          <p>🛡️ Defensa: {pokemon?.stats?.[2]?.base_stat ?? "-"}</p>
          <p>⚡ Velocidad: {pokemon?.stats?.[5]?.base_stat ?? "-"}</p>
          <p>📏 Altura: {pokemon?.height ?? "-"}</p>
          <p>⚖️ Peso: {pokemon?.weight ?? "-"}</p>
        </div>

        <div className="flex justify-center gap-2 mt-4">
          {pokemon?.types?.map((typeInfo) => (
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

PokemonModal.propTypes = {
  url: PropTypes.string,
  onClose: PropTypes.func,
};