import React, { useEffect } from "react";
import { Route, Routes, BrowserRouter, Link, redirect, Navigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import Store from "./store.js";
import PrivateRoute from "./privateRoute.jsx";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage.jsx";
import EmailVerification from "./pages/EmailVerification.jsx";
import Folder from "./pages/Folder.jsx";
import Book from "./pages/Book.jsx";
import store from "./store.js";

const App = observer(() => {

  useEffect(() => {
    Store.getUser();
  }, []);

  useEffect(() => {
    console.log('sql-inject me.')
  })

  function renderHeader() {
    if (store.user)
      return (<div style={{ width: "100%" , display: 'flex'}}>
          [<Link to="/">Home</Link>]
          [<Link to="/logout">Logout</Link>]
          <div style={{marginLeft: 10}}>Доступно {store.user?.downloads_left} скачиваний</div>
        </div>)
    else
      return (<div style={{ width: "100%", display: "flex" }}>
          [<Link to="/">Home</Link>]

        <span>
          [<Link to="/register">Register</Link>]
        </span>
        <span>
          [<Link to="/login">Login</Link>]
        </span>
      </div>)

  }

  const Logout = () => {
    useEffect(() => {
      store.user = null
      localStorage.setItem('token', null)
    }, [])
    return <Navigate to={"/"}/>
  }

  return (
      <BrowserRouter>
      {renderHeader()}
    <div>
        <Routes>
          <Route path="/" element={<Navigate to={'/folder/'}/>}/>
          {/* //страница, для посещения которой авторизация не требуется */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/verify" element={<EmailVerification />} />

          {/* //страницы, для посещения которых требуется авторизация
              <Route path="/users" element={<PrivateRoute  />}>
                  <Route path="" element={<UsersPage />} />
                  <Route path=":id" element={<UserPage />} />
              </Route> */}


          <Route path="/folder/:path/*" element={<Folder />} />
          <Route path="/folder/*" element={<Folder />} />
          <Route path="/book/:id" element={<Book />} />
          <Route path="/404" element={<div>404... not found </div>} />
          <Route path="*" element={<Navigate to={"/404"}/>} />
        </Routes>
    </div>
      </BrowserRouter>
  );
});

export default App;