import { useState, useEffect } from "react";

export default function SearchModal({ isOpen, onClose, onSearch, initialValue = "" }) {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState("");
  const [theme, setTheme] = useState("blue");

  // Paleta de colores adaptada al estilo Glassmorphism
  const themes = {
    blue: {
      glow: "bg-blue-300",
      btn: "from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-blue-500/30",
      text: "from-blue-600 to-indigo-600",
      border: "focus:border-blue-400 focus:ring-blue-400/20",
      dot: "bg-blue-500 ring-blue-200"
    },
    purple: {
      glow: "bg-purple-300",
      btn: "from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 shadow-purple-500/30",
      text: "from-purple-600 to-fuchsia-600",
      border: "focus:border-purple-400 focus:ring-purple-400/20",
      dot: "bg-purple-500 ring-purple-200"
    },
    pink: {
      glow: "bg-pink-300",
      btn: "from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 shadow-pink-500/30",
      text: "from-pink-600 to-rose-600",
      border: "focus:border-pink-400 focus:ring-pink-400/20",
      dot: "bg-pink-500 ring-pink-200"
    },
    emerald: {
      glow: "bg-emerald-300",
      btn: "from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 shadow-emerald-500/30",
      text: "from-emerald-600 to-teal-600",
      border: "focus:border-emerald-400 focus:ring-emerald-400/20",
      dot: "bg-emerald-500 ring-emerald-200"
    },
    orange: {
      glow: "bg-orange-300",
      btn: "from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-orange-500/30",
      text: "from-orange-600 to-red-500",
      border: "focus:border-orange-400 focus:ring-orange-400/20",
      dot: "bg-orange-500 ring-orange-200"
    },
    red: {
      glow: "bg-red-300",
      btn: "from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-red-500/30",
      text: "from-red-600 to-rose-600",
      border: "focus:border-red-400 focus:ring-red-400/20",
      dot: "bg-red-500 ring-red-200"
    },
  };

  const themeList = Object.keys(themes);
  const currentTheme = themes[theme];

  useEffect(() => {
    setValue(initialValue);
    setError("");
  }, [initialValue, isOpen]);

  const validate = (text) => {
    if (/^[a-zA-Z\s]*$/.test(text)) {
      setError("");
      return true;
    }
    setError("Solo se permiten letras y espacios");
    return false;
  };

  const handleChange = (e) => {
    const t = e.target.value;
    setValue(t);
    validate(t);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate(value)) {
      onSearch(value.trim().toLowerCase());
      onClose();
    }
  };

  const changeTheme = () => {
    const currentIndex = themeList.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themeList.length;
    setTheme(themeList[nextIndex]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all duration-300">
      
      {/* Contenedor principal con efecto cristal */}
      <div className="relative bg-white/80 backdrop-blur-xl border border-white/60 rounded-[2rem] p-8 w-full max-w-md shadow-[0_20px_50px_rgba(0,0,0,0.2)] overflow-hidden animate-pop-in">
        
        {/* Luces de fondo (Blobs) que cambian según el tema */}
        <div className={`absolute -top-10 -right-10 w-48 h-48 ${currentTheme.glow} rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse z-0 transition-colors duration-500`}></div>
        <div className={`absolute -bottom-10 -left-10 w-48 h-48 ${currentTheme.glow} rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse z-0 delay-75 transition-colors duration-500`}></div>

        <div className="relative z-10">
          
          {/* Botón de cerrar estilizado */}
          <button
            onClick={onClose}
            className="absolute -top-2 -right-2 w-8 h-8 flex items-center justify-center bg-white/50 hover:bg-slate-100 text-slate-400 hover:text-red-500 rounded-full transition-all backdrop-blur-md shadow-sm active:scale-95 focus:outline-none"
            title="Cerrar"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Cabecera */}
          <h2 className={`text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r ${currentTheme.text} mb-1 tracking-tight transition-all duration-500`}>
            Buscar Pokémon
          </h2>
          <p className="text-slate-500 text-sm mb-6 font-medium">Ingresa el nombre para comenzar la aventura</p>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="relative group">
              <input
                type="text"
                value={value}
                onChange={handleChange}
                className={`w-full bg-white/60 border-2 border-slate-200 ${currentTheme.border} rounded-xl pl-12 pr-4 py-3.5 text-slate-800 font-medium placeholder-slate-400 focus:outline-none focus:ring-4 backdrop-blur-sm transition-all shadow-sm`}
                placeholder="Ej: Pikachu, Charizard..."
                autoFocus
              />
              {/* Icono de búsqueda dentro del input */}
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-slate-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </div>
            </div>

            {/* Mensaje de Error */}
            {error && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-xl p-3 text-red-500 animate-shake">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 flex-shrink-0">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span className="text-sm font-bold">{error}</span>
              </div>
            )}

            {/* Botones de acción */}
            <div className="flex gap-3 mt-2">
              <button
                type="submit"
                className={`flex-[3] bg-gradient-to-r ${currentTheme.btn} text-white px-4 py-3.5 rounded-xl font-bold transition-all transform hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg flex justify-center items-center gap-2`}
                disabled={!!error || value.trim() === ""}
              >
                Buscar
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                </svg>
              </button>

              <button
                type="button"
                onClick={changeTheme}
                className="flex-[1] bg-white/60 hover:bg-slate-50 border-2 border-slate-100 text-slate-500 hover:text-slate-700 px-4 py-3.5 rounded-xl transition-all transform hover:scale-[1.02] active:scale-95 shadow-sm flex justify-center items-center"
                title="Cambiar color del buscador"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25l7.22-7.22C10.603 9.645 11.235 9 12 9s1.397.645 1.78 1.03l2.19 2.19M6.75 21v-3.375m0 3.375h3.375m-3.375 0l5.882-5.882M19.5 15.75c-1.243 0-2.25-1.007-2.25-2.25s1.007-2.25 2.25-2.25 2.25 1.007 2.25 2.25-1.007 2.25-2.25 2.25zM12 9l3.375-3.375m0 0l3.375 3.375m-3.375-3.375v7.5" />
                </svg>
              </button>
            </div>

            {/* Indicadores de tema (Puntitos) */}
            <div className="flex justify-center gap-3 mt-4">
              {themeList.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTheme(t)}
                  className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ${themes[t].dot} ${
                    t === theme ? "scale-150 ring-4 opacity-100" : "opacity-40 hover:opacity-80 hover:scale-125"
                  }`}
                  title={`Cambiar a ${t}`}
                />
              ))}
            </div>
          </form>
        </div>
      </div>

      {/* Animaciones CSS */}
      <style>{`
        @keyframes alert-pop {
          0% { opacity: 0; transform: scale(0.9) translateY(20px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-pop-in {
          animation: alert-pop 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }
        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
}