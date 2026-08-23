import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import Footer from './Components/Footer';
import Header from './Components/Header';
import Main from './Components/Main';
import Register from './Components/Register'; // Import the Register component
import Login from './Components/Login'; // Import the Login component
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import  AuthProvider  from './context/AuthProvider'; // Import the AuthProvider
import ProtectedRoute from './Components/ProtectedRoute'; // Import the ProtectedRoute component
import Dashboard from './Components/Dashboard'; // Import the Dashboard component
import PublicRoute from './Components/PublicRoute';


function App() {
  return (
    <Router>
      <AuthProvider>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Header />
          <div style={{ flex: 1 }} className="h-100 d-flex align-items-center justify-content-center">
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path='/register' element={<PublicRoute><Register /></PublicRoute>} />
              <Route path='/login' element={<PublicRoute><Login /></PublicRoute>} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
          <Footer />
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            style={{
              fontSize: '16px',
              fontFamily: 'Arial, sans-serif',
              borderRadius: '8px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}
          />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
