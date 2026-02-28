import { useState, useEffect } from "react";

export default function SearchModal({ isOpen, onClose, onSearch, initialValue = "" }) {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState("");
  const [theme, setTheme] = useState("blue");

  const themes = {
    blue: {
      bg: "from-blue-500 to-blue-600",
      button: "bg-blue-600 hover:bg-blue-700",
      input: "border-blue-300 focus:ring-blue-300",
      accent: "text-blue-600",
    },
    purple: {
      bg: "from-purple-500 to-purple-600",
      button: "bg-purple-600 hover:bg-purple-700",
      input: "border-purple-300 focus:ring-purple-300",
      accent: "text-purple-600",
    },
    pink: {
      bg: "from-pink-500 to-pink-600",
      button: "bg-pink-600 hover:bg-pink-700",
      input: "border-pink-300 focus:ring-pink-300",
      accent: "text-pink-600",
    },
    emerald: {
      bg: "from-emerald-500 to-emerald-600",
      button: "bg-emerald-600 hover:bg-emerald-700",
      input: "border-emerald-300 focus:ring-emerald-300",
      accent: "text-emerald-600",
    },
    orange: {
      bg: "from-orange-500 to-orange-600",
      button: "bg-orange-600 hover:bg-orange-700",
      input: "border-orange-300 focus:ring-orange-300",
      accent: "text-orange-600",
    },
    red: {
      bg: "from-red-500 to-red-600",
      button: "bg-red-600 hover:bg-red-700",
      input: "border-red-300 focus:ring-red-300",
      accent: "text-red-600",
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
    setError("Solo letras y espacios permitidos");
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
    <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-md flex items-center justify-center z-50 p-4 transition-all duration-300">
      <div className={`bg-gradient-to-br ${currentTheme.bg} rounded-2xl p-8 w-full max-w-md shadow-2xl relative overflow-hidden transform transition-all duration-300`}>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-16 -mb-16"></div>

        <div className="relative z-10">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:bg-white/20 p-2 rounded-full transition-all hover:scale-110 focus:outline-none"
            title="Cerrar"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>

          {/* Header */}
          <h2 className="text-3xl font-black text-white mb-2">Buscar Pokémon</h2>
          <p className="text-white/80 text-sm mb-6">Ingresa solo letras para buscar</p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="relative">
              <input
                type="text"
                value={value}
                onChange={handleChange}
                className={`w-full border-2 ${currentTheme.input} rounded-lg px-4 py-3 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/30 bg-white/95 backdrop-blur-sm transition-all`}
                placeholder="Ej: Pikachu, Charizard..."
              />
              {value && (
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xl">
                  🔍
                </span>
              )}
            </div>

            {/* Error message */}
            {error && (
              <div className="flex items-center gap-2 bg-white/20 border border-white/30 rounded-lg p-3">
                <span className="text-xl">⚠️</span>
                <span className="text-sm text-white font-medium">{error}</span>
              </div>
            )}

            {/* Buttons container */}
            <div className="flex gap-3">
              <button
                type="submit"
                className={`flex-1 ${currentTheme.button} text-white px-4 py-3 rounded-lg font-bold transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg`}
                disabled={!!error || value.trim() === ""}
              >
                Buscar 🎯
              </button>

              <button
                type="button"
                onClick={changeTheme}
                className="bg-white/20 hover:bg-white/30 border border-white/40 text-white px-4 py-3 rounded-lg font-bold transition-all transform hover:scale-105 active:scale-95 shadow-lg"
                title="Cambiar color"
              >
                🎨
              </button>
            </div>

            {/* Theme indicators */}
            <div className="flex justify-center gap-2 mt-2">
              {themeList.map((t) => (
                <button
                  key={t}
                  onClick={() => setTheme(t)}
                  className={`w-3 h-3 rounded-full transition-all transform ${
                    t === theme ? "scale-150 ring-2 ring-white" : ""
                  } ${
                    t === "blue"
                      ? "bg-blue-400"
                      : t === "purple"
                      ? "bg-purple-400"
                      : t === "pink"
                      ? "bg-pink-400"
                      : t === "emerald"
                      ? "bg-emerald-400"
                      : t === "orange"
                      ? "bg-orange-400"
                      : "bg-red-400"
                  }`}
                  title={`Cambiar a ${t}`}
                />
              ))}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
