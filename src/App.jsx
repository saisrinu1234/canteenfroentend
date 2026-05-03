// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import { useContext } from "react";
// import { AuthContext } from "./context/AuthContext";

// import Register from "./pages/Register";
// import Login from "./pages/Login";
// import Dashboard from "./pages/Dashboard";
// import Home from "./pages/Home";
// import Profile from "./pages/Profile";
// import Orders from "./pages/Orders";
// import Cart from "./pages/cart";
// import AdminDashboard from "./pages/admindashboard";
// function AppContent() {
//   const { authenticated, loading } = useContext(AuthContext);

//   if (loading) return <div>Loading...</div>;

//   return (
//     <Routes>
//       <Route
//         path="/"
//         element={
//           authenticated ? (
//             <Navigate to="/dashboard" />
//           ) : (
//             <Navigate to="/login" />
//           )
//         }
//       />

//       <Route
//         path="/login"
//         element={authenticated ? <Navigate to="/dashboard" /> : <Login />}
//       />

//       <Route
//         path="/register"
//         element={authenticated ? <Navigate to="/dashboard" /> : <Register />}
//       />

//       <Route
//         path="/dashboard"
//         element={authenticated ? <Dashboard /> : <Navigate to="/login" />}
//       >
//         <Route index element={<Home />} />

//         {/* ✅ Sub pages */}
//         <Route path="profile" element={<Profile />} />
//         <Route path="orders" element={<Orders />} />
//         <Route path="cart" element={<Cart />} />
//       </Route>
//       <Route path="/admindashboard" element={<AdminDashboard />} />
//     </Routes>
//   );
// }

// function App() {
//   return (
//     <BrowserRouter>
//       <AppContent />
//     </BrowserRouter>
//   );
// }

// export default App;
// // import "./App.css";
// // import { BrowserRouter, Routes, Route, NavLink, Navigate } from "react-router-dom";
// // import { useState } from "react";
// // import Requests from "./Requests";
// // import Delivered from "./Delivered";

// // function App() {

// //   const [requests, setRequests] = useState([
// //     {
// //       tokenId: 101,
// //       items: [
// //         { name: "Idli", qty: 2 },
// //         { name: "Dosa", qty: 1 }
// //       ]
// //     },
// //     {
// //       tokenId: 102,
// //       items: [
// //         { name: "Idli", qty: 2 },
// //         { name: "Dosa", qty: 1 }
// //       ]
// //     },
// //     {
// //       tokenId: 103,
// //       items: [
// //         { name: "Idli", qty: 2 },
// //         { name: "Dosa", qty: 1 }
// //       ]
// //     },
// //     {
// //       tokenId: 104,
// //       items: [
// //         { name: "Idli", qty: 2 },
// //         { name: "Dosa", qty: 1 }
// //       ]
// //     },
// //     {
// //       tokenId: 105,
// //       items: [
// //         { name: "Idli", qty: 2 },
// //         { name: "Dosa", qty: 1 }
// //       ]
// //     },

// //     {
// //       tokenId: 106,
// //       items: [
// //         { name: "Puri", qty: 3 },
// //         { name: "Tea", qty: 2 }
// //       ]
// //     }
// //   ]);

// //   const [delivered, setDelivered] = useState([]);

// //   const markDelivered = (order) => {

// //     setDelivered([...delivered, order]);

// //     setRequests(
// //       requests.filter(o => o.tokenId !== order.tokenId)
// //     );
// //   };

// //   return (

// //     <BrowserRouter>

// //       {/* Navigation */}

// //       <nav
// //         style={{
// //           background:"#1e293b",
// //           padding:"15px 30px",
// //           display:"flex",
// //           gap:"25px"
// //         }}
// //       >

// //         <NavLink
// //           to="/requests"
// //           style={({isActive})=>({
// //             color:"white",
// //             textDecoration:"none",
// //             borderBottom:isActive ? "2px solid #38bdf8" : "none"
// //           })}
// //         >
// //           Requests
// //         </NavLink>

// //         <NavLink
// //           to="/delivered"
// //           style={({isActive})=>({
// //             color:"white",
// //             textDecoration:"none",
// //             borderBottom:isActive ? "2px solid #38bdf8" : "none"
// //           })}
// //         >
// //           Delivered
// //         </NavLink>

// //       </nav>

// //       <Routes>

// //         <Route path="/" element={<Navigate to="/requests"/>}/>

// //         <Route
// //           path="/requests"
// //           element={
// //             <Requests
// //               requests={requests}
// //               markDelivered={markDelivered}
// //             />
// //           }
// //         />

// //         <Route
// //           path="/delivered"
// //           element={
// //             <Delivered delivered={delivered}/>
// //           }
// //         />

// //       </Routes>

// //     </BrowserRouter>

// //   );
// // }

// // export default App;
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";
import Cart from "./pages/cart";
import AdminDashboard from "./pages/admindashboard";
import ViewItems from "./pages/view-items";

import ProtectedRoute from "./components/ProtectedRoute";
import AddProduct from "./pages/add-produxt";
import AdminOrders from "./pages/adminorders";

function AppContent() {
  const { authenticated, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;

  const role = localStorage.getItem("role");

  return (
    <Routes>
      {/* 🔁 Default route */}
      <Route
        path="/"
        element={
          authenticated ? (
            role === "ROLE_ADMIN" ? (
              <Navigate to="/admindashboard" />
            ) : (
              <Navigate to="/dashboard" />
            )
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      {/* 🔐 Login */}
      <Route
        path="/login"
        element={authenticated ? <Navigate to="/" /> : <Login />}
      />

      {/* 🔐 Register */}
      <Route
        path="/register"
        element={authenticated ? <Navigate to="/" /> : <Register />}
      />

      {/* 👤 USER DASHBOARD */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      >
        <Route index element={<Home />} />
        <Route path="profile" element={<Profile />} />
        <Route path="orders" element={<Orders />} />
        <Route path="cart" element={<Cart />} />
      </Route>

      {/* 👑 ADMIN DASHBOARD (PROTECTED) */}
      <Route
        path="/admindashboard"
        element={
          <ProtectedRoute roleRequired="ROLE_ADMIN">
            <AdminDashboard />
          </ProtectedRoute>
        }
      >
        <Route index element={<h2>Welcome Admin</h2>} />
        <Route path="add-product" element={<AddProduct />} />
        <Route path="adminorders" element={<AdminOrders />} />
        <Route path="view-items" element={<ViewItems />} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
