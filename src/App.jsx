import { useEffect } from 'react';
import './App.css';
//import './glsl/mouse.js'

function App() {


  const cargarScript = (mouseScript) => {
    const script = document.createElement("script");
    script.src = mouseScript;
    script.type = "module";
    script.async = true;
    document.body.appendChild(script);

  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      cargarScript('./glsl/mouse.js');
    }, 100)
  }, []);


  return (
    <>

      <p className='commingsoon'>Comming soon...</p>

      <canvas id="my_canvas"></canvas>

    </>
  )
}

export default App
