// import { useEffect, useRef, useState } from 'react';
// import Pageable from 'pageable';
// import Welcome from './components/Welcome/Welcome';
// import Mission from './components/Mission/Mission';
// import Stats from './components/Stats/Stats';
// import Partner from './components/partner/Partner';
// import Loading from './components/Loading/Loading';
// import Footer from './components/Footer/Footer';
// import styles from './App.module.css';

// export default function App() {
//   const pageableRef = useRef(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsLoading(false);
//     }, 3000);

//     return () => clearTimeout(timer);
//   }, []);

//   useEffect(() => {
//     if (!isLoading && pageableRef.current) {
//       const pageable = new Pageable(pageableRef.current, {
//         animation: 800,
//         delay: 0,
//         throttle: 50,
//         orientation: 'vertical',
//         easing: function(currentTime, startPos, endPos, interval) {
//           return -endPos * (currentTime /= interval) * (currentTime - 2) + startPos;
//         },
//       });

//       return () => {
//         pageable.destroy();
//       };
//     }
//   }, [isLoading]);

//   if (isLoading) {
//     return <Loading />;
//   }

//   return (
//     <div ref={pageableRef} className={styles.mainContainer}>
//       <div data-anchor="page-1" className={styles.page}>
//         <Welcome />
//       </div>
//       <div data-anchor="page-2" className={styles.page}>
//         <Mission />
//       </div>
//       <div data-anchor="page-3" className={styles.page}>
//         <Stats />
//       </div>
//       <div data-anchor="page-4" className={styles.page}>
//         <Partner />
//       </div>
//       <div data-anchor="page-5" className={styles.page}>
//         <Footer />
//       </div>
//     </div>
//   );
// }


import { useState } from 'react';
import Dashboard from './components/Dashboard/Dashboard';

function App() {
  return (
    <div>
      <Dashboard />
    </div>
  );
}

export default App; // Add this line to export App as default