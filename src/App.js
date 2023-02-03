import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NewClub from './routes/NewClub';
import UpdateClub from './routes/UpdateClub';
import ClubDetail from './routes/ClubDetail';

import Home from './routes/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/clubs/new" element={<NewClub />} />
        <Route path="/clubs/update/:id" element={<UpdateClub />} />
        <Route path="/clubs/:id" element={<ClubDetail />} />
        <Route path="/clubs" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
