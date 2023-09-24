import React, { useState, useEffect } from 'react';
import './App.css';
import { Howl } from 'howler';

function App() {
  const [sound] = useState(new Howl({
    src: ['quack.mp3'],
    volume: 1.0,
  }));

  const [contador, setContador] = useState(0);
  const [patoStyle, setPatoStyle] = useState({});
  const [tiempoRestante, setTiempoRestante] = useState(30);
  const [juegoEnCurso, setJuegoEnCurso] = useState(false);

  const tiempoInicio = 30; // Tiempo inicial en segundos

  const reiniciarJuego = () => {
    setContador(0);
    setPatoStyle({});
    setTiempoRestante(tiempoInicio);
    setJuegoEnCurso(true);
  };

  const handleTiempoAgotado = () => {
    // Realizar acciones adicionales al agotarse el tiempo
    // Por ejemplo, mostrar un mensaje de fin de juego
    setJuegoEnCurso(false);
  };

  const handleClickPato = (e) => {
    if (juegoEnCurso) {
      const pato = e.target;

      if (pato.classList.contains('pato')) {
        const cuadroAzul = document.getElementById('cuadro-azul');
        const cuadroRect = cuadroAzul.getBoundingClientRect();
        const patoWidth = 50;
        const patoHeight = 50;

        const randomX = Math.random() * (cuadroRect.width - patoWidth);
        const randomY = Math.random() * (cuadroRect.height - patoHeight);

        sound.play();

        setContador((prevContador) => prevContador + 1);
        setPatoStyle({
          transform: `translate(${randomX}px, ${randomY}px)`,
        });
      }
    }
  };

  useEffect(() => {
    let interval;

    if (juegoEnCurso && tiempoRestante > 0) {
      interval = setInterval(() => {
        setTiempoRestante((prevTiempo) => prevTiempo - 1);
      }, 1000);
    } else if (tiempoRestante === 0) {
      clearInterval(interval);
      handleTiempoAgotado();
    }

    return () => {
      clearInterval(interval);
    };
  }, [juegoEnCurso, tiempoRestante]);

  return (
    <div>
      <h1 className='titulo'>Patitos cazados: {contador}</h1>
      {juegoEnCurso ? (
        <div>
          <div id="cuadro-azul" onClick={handleClickPato}>
            <div className="pato" style={patoStyle}></div>
          </div>
          <div>Tiempo restante: {tiempoRestante} segundos</div>
        </div>
      ) : (
        <button onClick={reiniciarJuego}>Iniciar Juego</button>
      )}
    </div>
  );
}

export default App;

