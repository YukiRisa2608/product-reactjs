import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Sidebar from './components/common/Sidebar';
import HomePage from './pages/common/HomePage';
import CategoryPage from './pages/admin/CategoryPage';
import ProductPage from './pages/admin/ProductPage'; 
import SaveCategoryForm from './components/admin/SaveCategoryForm'; 


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
              <Route path="/api/v1/categories" element={<CategoryPage />} />
              <Route path="/api/v1/products" element={<ProductPage />} />
              <Route path="/api/v1/categories/add" element={<SaveCategoryForm />} />

            </Routes>
          </Col>
        </Row>
      </Container>
    </Router>
  );
}

export default App;
