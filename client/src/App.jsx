import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import './index.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-blue-600 text-white p-4 shadow">
          <div className="container mx-auto flex justify-between items-center">
            <Link to="/" className="text-xl font-bold">Inventory Dashboard</Link>
            <div className="space-x-6">
              <Link to="/" className="hover:underline">Dashboard</Link>
              <Link to="/products" className="hover:underline">Products</Link>
            </div>
          </div>
        </nav>

        <main className="container mx-auto py-8 px-4">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id/edit" element={<Products />} /> {/* reuse with logic */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;