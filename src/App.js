import { useState } from 'react';
import './App.css';
import { Conn } from './Conn';
import Home from './Page/Home';
 import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [toenc, settoenc] = useState(false)

  return (
    <>
      <Conn.Provider value={{toenc, settoenc}}>
        <Home />
        <ToastContainer theme='dark' position='bottom-center' style={{zIndex: 10000000000000}}/>
      </Conn.Provider>
    </>
  );
}

export default App;
