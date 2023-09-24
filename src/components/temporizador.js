// Temporizador.js
import React, { useState, useEffect, useCallback } from 'react';

function Temporizador({ tiempoInicial, onTiempoAgotado }){
  const [tiempoRestante, setTiempoRestante] = useState(tiempoInicial);
  const [juegoEnCurso, setJuegoEnCurso] = useState(false);

  useEffect(() => {
    let interval;

    if (juegoEnCurso && tiempoRestante > 0) {
      interval = setInterval(() => {
        setTiempoRestante(tiempoRestante => tiempoRestante - 1);
      }, 1000);
    }

    if (!juegoEnCurso) {
      clearInterval(interval);
    }

    if (tiempoRestante === 0) {
      setJuegoEnCurso(false);
      onTiempoAgotado(); // Llama a la función de devolución de llamada cuando se agota el tiempo
    }

    return () => {
      clearInterval(interval); // Limpia el intervalo cuando el componente se desmonta
    };
  }, [juegoEnCurso, tiempoRestante, onTiempoAgotado]);

  const iniciarJuego = () => {
    setTiempoRestante(tiempoInicial);
    setJuegoEnCurso(true);
  };

  const detenerJuego = useCallback(() => {
    setJuegoEnCurso(false);
  }, []);

  return (
    <div>
      <p>Tiempo restante: {tiempoRestante} segundos</p>
      {juegoEnCurso ? (
        <button onClick={detenerJuego}>Detener Juego</button>
      ) : (
        <button onClick={iniciarJuego}>Iniciar Juego</button>
      )}
    </div>
  );
}
export default Temporizador;