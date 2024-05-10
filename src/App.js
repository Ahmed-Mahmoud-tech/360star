// import * as React from 'react';
// import { Routes, Route, useParams } from 'react-router-dom';

// function ProfilePage() {
//   // Get the userId param from the URL.
//   let { userId } = useParams();
//   return (
//     <>dddd {userId}</>
//   )
//   // ...
// }

// function App() {
//   return (
//     <Routes>
//       <Route path="users">
//         <Route path=":userId" element={<ProfilePage />} />
//         <Route path="*" element={<>dddddddddd</>} />
//       </Route>
//     </Routes>
//   );
// }


// export default App;



// import { BrowserRouter, useParams, useRoutes } from 'react-router-dom';

// // Pages
//  function ProfilePage() {
//   // Get the userId param from the URL.
//   let { userId } = useParams();
//   return (
//     <>dddd {userId}</>
//   )
//   // ...
// }

// const App = () => {
//     const routes = useRoutes([
//         { path: '*', element: <ProfilePage /> },
//     ]);
//   console.log(routes, "dd")

//     return (
//         <BrowserRouter>
//             {routes}
//         </BrowserRouter>
//     );
// };

// export default App;




import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Main from './components/Main';
 
function App() {
  return (
    <Router>
        <Routes>
          <Route path="/env/:model" element={<Main />} />
        </Routes>
     </Router>
  );
}


export default App;