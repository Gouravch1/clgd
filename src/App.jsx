import { useEffect, useRef, useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Welcome from './components/Welcome/Welcome';
import Mission from './components/Mission/Mission';
import Stats from './components/Stats/Stats';
import Partner from './components/partner/Partner';
import Loading from './components/Loading/Loading';
import Footer from './components/Footer/Footer';
import AuthPage from './components/pages/Auth/AuthPage';
import styles from './App.module.css';
import '@fullpage/react-fullpage';
import ReactFullpage from '@fullpage/react-fullpage';
import Dashboard from './components/Dashboard/Dashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleJoinUs = (e) => {
    e.preventDefault();
    navigate('/auth');
  };

  return (
    <ReactFullpage
      licenseKey={'gplv3-license'}
      scrollingSpeed={1000}
      navigation={true}
      navigationPosition={'right'}
      render={({ state, fullpageApi }) => {
        return (
          <ReactFullpage.Wrapper>
            <div className="section">
              <Welcome onJoinUs={handleJoinUs} />
            </div>
            <div className="section">
              <Mission />
            </div>
            <div className="section">
              <Stats />
            </div>
            <div className="section">
              <Partner />
            </div>
            <div className="section">
              <Footer />
            </div>
          </ReactFullpage.Wrapper>
        );
      }}
    />
  );
};

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={isLoading ? <Loading /> : <LandingPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
};

export default App;


// import { useState } from 'react';
// import Dashboard from './components/Dashboard/Dashboard';

// function App() {
//   return (
//     <div>
//       <Dashboard />
//     </div>
//   );
// }

// export default App; // Add this line to export App as default