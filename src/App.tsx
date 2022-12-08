import './App.css';
import HomePage from './Pages/HomePage/HomePage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <BrowserRouter>
      <Routes> {/* замість Switch*/}
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
