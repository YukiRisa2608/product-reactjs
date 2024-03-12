import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/common/Sidebar';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/admin/CategoryPage';
import ProductPage from './pages/admin/ProductPage';
import ProtectedRoute from './routes/ProtectedRoute';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <Router>
      <Container>
        {/* Title */}
        <Row>
          <h2>Welcome!!!</h2>
        </Row>

        <Row>
          {/* Sidebar */}
          <Col md={2} className="sidebar bg-dark text-white">
            <Sidebar />
          </Col>

          {/* Root */}
          <Col md={10}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/admin/categories" element={<ProtectedRoute><CategoryPage /></ProtectedRoute>} />
              <Route path="/admin/products" element={<ProtectedRoute><ProductPage /></ProtectedRoute>} />
            </Routes>
          </Col>
        </Row>
      </Container>
    </Router>
  );
}

export default App;
