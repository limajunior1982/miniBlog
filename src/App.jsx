import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

import { AuthProvider } from "./context/AuthContext";

import { useState, useEffect } from "react";
import { useAuthentication } from "./hooks/useAuthentication";

import Home from "./pages/Home/Home";
import Aboult from "./pages/Aboult/About";
import Footer from "./componets/Footer";
import Navbar from "./componets/Navbar";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import CreatePost from "./pages/CreatePost/CreatePost";
import Dashbord from "./pages/Dashbord/Dashbord";
import Search from "./pages/Search/Search";
import Post from "./pages/Post/Post";
import EditPost from "./pages/EditPost/EditPost";

function App() {

  const [user, setUser] = useState(undefined)
  const {auth} = useAuthentication()

  const loadingUser = user === undefined;

  useEffect(() => {

    onAuthStateChanged (auth, (user) => {
      setUser(user);
    })

  }, [auth])

  if (loadingUser) {
    return <p>Carregando...</p>
  }


  return (
    <div className="App">
      <AuthProvider value={{user}}>
        <BrowserRouter>
          <Navbar />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/aboult" element={<Aboult />} />
              <Route path="/search" element={<Search />} />
              <Route path="/login" element={!user ? <Login/>: <Navigate to="/"/>} />
              <Route path="/register" element={!user ? <Register/>: <Navigate to="/"/>} />
              <Route path="posts/edit/:id" element={user ? <EditPost/>: <Navigate to="/login"/>} />
              <Route path="posts/create" element={user ? <CreatePost/>: <Navigate to="/login"/>} />
              <Route path="dashbord" element={user ? <Dashbord/>: <Navigate to="/login"/>} />
              <Route path="/posts/:id" element={<Post />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
