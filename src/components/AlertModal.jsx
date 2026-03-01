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
      glow: "bg-emerald-400",
      iconGradient: "from-emerald-400 to-emerald-600",
      iconShadow: "shadow-emerald-500/40",
      textTitle: "text-emerald-800",
      textMsg: "text-emerald-700",
      bar: "from-emerald-400 to-teal-400",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
      )
    },
    error: {
      glow: "bg-red-400",
      iconGradient: "from-red-400 to-red-600",
      iconShadow: "shadow-red-500/40",
      textTitle: "text-red-800",
      textMsg: "text-red-700",
      bar: "from-red-400 to-rose-400",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      )
    },
    warning: {
      glow: "bg-amber-400",
      iconGradient: "from-amber-400 to-orange-500",
      iconShadow: "shadow-amber-500/40",
      textTitle: "text-amber-800",
      textMsg: "text-amber-700",
      bar: "from-amber-400 to-orange-400",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      )
    },
    info: {
      glow: "bg-blue-400",
      iconGradient: "from-blue-400 to-indigo-500",
      iconShadow: "shadow-blue-500/40",
      textTitle: "text-blue-800",
      textMsg: "text-blue-700",
      bar: "from-blue-400 to-indigo-400",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
        </svg>
      )
    }
  };

  const config = alertConfig[type] || alertConfig.info;

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      
      {/* Contenedor principal con efecto cristal y animación de entrada */}
      <div className="relative bg-white/80 backdrop-blur-xl border border-white/60 rounded-[2rem] p-6 w-full max-w-md shadow-[0_20px_50px_rgba(0,0,0,0.2)] overflow-hidden alert-pop-in">
        
        {/* Luces de fondo (Blobs) dinámicas según el tipo de alerta */}
        <div className={`absolute -top-10 -right-10 w-32 h-32 ${config.glow} rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse z-0`}></div>
        <div className={`absolute -bottom-10 -left-10 w-32 h-32 ${config.glow} rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse z-0 delay-75`}></div>

        <div className="relative z-10">
          {/* Botón de cerrar estilizado */}
          <button
            onClick={handleClose}
            className="absolute -top-2 -right-2 w-8 h-8 flex items-center justify-center bg-white/50 hover:bg-slate-100 text-slate-400 hover:text-slate-600 rounded-full transition-all backdrop-blur-md shadow-sm active:scale-95"
            title="Cerrar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Contenido (Icono + Texto) */}
          <div className="flex gap-4 items-center pt-2 mb-4">
            
            {/* Círculo del Icono flotante */}
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${config.iconGradient} shadow-lg ${config.iconShadow} flex items-center justify-center text-white flex-shrink-0 transform rotate-3 hover:rotate-0 hover:scale-105 transition-all duration-300`}>
              {config.icon}
            </div>

            {/* Textos */}
            <div className="flex-1 pr-6">
              {title && (
                <h3 className={`font-black text-lg ${config.textTitle} tracking-tight leading-tight mb-1`}>
                  {title}
                </h3>
              )}
              {message && (
                <p className={`text-sm font-medium ${config.textMsg} leading-relaxed`}>
                  {message}
                </p>
              )}
            </div>
          </div>

          {/* Barra de progreso dinámica (se ajusta a la duración exacta) */}
          {autoClose && (
            <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2 overflow-hidden">
              <div 
                className={`h-full bg-gradient-to-r ${config.bar} rounded-full`}
                style={{ animation: `shrink-bar ${duration}ms linear forwards` }}
              ></div>
            </div>
          )}
        </div>
      </div>

      {/* Estilos inyectados actualizados */}
      <style>{`
        @keyframes alert-pop {
          0% { opacity: 0; transform: scale(0.9) translateY(20px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        .alert-pop-in {
          animation: alert-pop 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes shrink-bar {
          0% { width: 100%; }
          100% { width: 0%; }
        }
      `}</style>
    </div>
  );
}