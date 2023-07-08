import HomePage from './Pages/HomePage/HomePage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ListContextProvider } from './Context/ListContext';
import { ToastContextProvider } from './Context/ToastContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <ToastContextProvider>
      <ListContextProvider>
        <BrowserRouter>
          <Routes> {/* instead of Switch*/}
            <Route path="/" element={<HomePage />} />
          </Routes>
        </BrowserRouter>
      </ListContextProvider>
    </ToastContextProvider>
  );
}

export default App;
