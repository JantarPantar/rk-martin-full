import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import LandingPage from './Pages/Landingpage';
import ListEstate from './Pages/ListEstate';
import PropertyDetail from './Pages/EstateDetail';
import NotFound from './Pages/NotFound';
import Contact from './Pages/Contact';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Router>
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" index element={<LandingPage />} />
            <Route path="/list" element={<ListEstate />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/detail/:id" element={<PropertyDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

const Navbar = () => (
  <nav className="flex justify-between p-5 bg-white shadow-md items-center">
    <div>
      <Link to="/">
        <img src="./logo.svg" className="h-10" alt="logo" />
      </Link>
    </div>
    <div>
      <Link to="/contact" className="mr-5 text-black no-underline">Kontakt</Link>
      <Link to="/list" className="bg-[#F9DC5C] px-5 py-2 rounded text-black no-underline">Nabídka</Link>
    </div>
  </nav>
);

const Footer = () => (
  <footer className="bg-[#34333d] text-white flex flex-col items-center py-6 space-y-3">
    <nav className="flex space-x-4 text-sm">
      <Link to="/" className="hover:underline opacity-80">Home</Link>
      <Link to="/list" className="hover:underline opacity-80">Nabídka</Link>
      <Link to="/contact" className="hover:underline opacity-80">Kontakt</Link>
      <Link to="/admin" className="hover:underline opacity-80">Admin</Link>
    </nav>

    <p className="text-sm opacity-70 text-center mt-2">
      IČO: 18849024<br />
      Martin Holý<br />
      Riegrova 1206<br />
      Tel: 603 898 391
    </p>
    <div className="text-xs opacity-50">Developed by TedBert.com</div>
  </footer>
);

export default App;
