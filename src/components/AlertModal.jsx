import { useState, useEffect } from "react";

export default function AlertModal({ type = "info", message, title, isOpen, onClose, autoClose = true, duration = 4000 }) {
  const [visible, setVisible] = useState(isOpen);

  useEffect(() => {
    setVisible(isOpen);
    if (isOpen && autoClose) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isOpen, autoClose, duration]);

  const handleClose = () => {
    setVisible(false);
    onClose?.();
  };

  const alertConfig = {
    success: {
      bg: "from-emerald-500 to-emerald-600",
      icon: "✓",
      bgLight: "from-emerald-100 to-emerald-200",
      border: "border-emerald-400",
      textColor: "text-emerald-800",
      iconColor: "text-emerald-600"
    },
    error: {
      bg: "from-red-500 to-red-600",
      icon: "✕",
      bgLight: "from-red-100 to-red-200",
      border: "border-red-400",
      textColor: "text-red-800",
      iconColor: "text-red-600"
    },
    warning: {
      bg: "from-yellow-500 to-yellow-600",
      icon: "⚠",
      bgLight: "from-yellow-100 to-yellow-200",
      border: "border-yellow-400",
      textColor: "text-yellow-800",
      iconColor: "text-yellow-600"
    },
    info: {
      bg: "from-blue-500 to-blue-600",
      icon: "ℹ",
      bgLight: "from-blue-100 to-blue-200",
      border: "border-blue-400",
      textColor: "text-blue-800",
      iconColor: "text-blue-600"
    }
  };

  const config = alertConfig[type] || alertConfig.info;

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-40 p-4 transition-all">
      <div className={`bg-gradient-to-br ${config.bgLight} border-2 ${config.border} rounded-2xl p-6 w-full max-w-md shadow-2xl relative animate-bounce-once`}>
        
        {/* Botón cerrar */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center hover:bg-white/30 rounded-full transition-all"
          title="Cerrar"
        >
          ✕
        </button>

        {/* Contenido */}
        <div className="flex gap-4 pt-2">
          {/* Icono */}
          <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${config.bg} flex items-center justify-center text-white text-2xl font-bold flex-shrink-0`}>
            {config.icon}
          </div>

          {/* Texto */}
          <div className="flex-1">
            {title && (
              <h3 className={`font-bold text-lg ${config.textColor} mb-1`}>
                {title}
              </h3>
            )}
            {message && (
              <p className={`text-sm ${config.textColor}`}>
                {message}
              </p>
            )}
          </div>
        </div>

        {/* Barra de progreso */}
        {autoClose && (
          <div className={`h-1 bg-gradient-to-r ${config.bg} rounded-full mt-4 animate-shrink`}></div>
        )}
      </div>

      <style>{`
        @keyframes bounce-once {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-once {
          animation: bounce-once 0.6s ease-in-out;
        }
        @keyframes shrink {
          0% { width: 100%; }
          100% { width: 0%; }
        }
        .animate-shrink {
          animation: shrink 4s linear;
        }
      `}</style>
    </div>
  );
}
