import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { Home } from "./pages/Home";
import Map from "./pages/Map";
import RoutesPage from "./pages/Routes";
import Profile from "./pages/Profile";
import Merchant from "./pages/Merchant";

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/map" element={<Map />} />
          <Route path="/routes" element={<RoutesPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/merchant" element={<Merchant />} />
        </Routes>
      </Router>
      
      {/* Toast Notifications */}
      <Toaster 
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#fff',
            color: '#374151',
            border: '1px solid #e5e7eb',
            borderRadius: '0.75rem',
            fontSize: '14px'
          }
        }}
      />
    </>
  );
}
