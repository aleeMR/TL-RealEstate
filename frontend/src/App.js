import { BrowserRouter, Routes, Route } from "react-router-dom";
import Container from 'react-bootstrap/Container';

// Importando páginas
import Home from './pages/home/home.page';
import Visits from './pages/visits/visits.page';

function App() {
  return (
    <div className="App">
      <Container fluid>
        <BrowserRouter>
            <Routes>
              <Route path="/" element={ <Home /> } />
              <Route path="/visits/create" element={ <Visits /> } />
            </Routes>
        </BrowserRouter>
      </Container>
    </div>
  );
};

export default App;
