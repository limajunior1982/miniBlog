import { NavLink } from "react-router-dom";

import { useAuthentication } from "../hooks/useAuthentication";

import { useAuthValue } from "../context/AuthContext";

import style from "./Navbar.module.css";

const Navbar = () => {
  const { user } = useAuthValue();
  const { logout } = useAuthentication();

  return (
    <nav className={style.navbar}>
      <NavLink to="/" className={style.brand}>
        Mini <span>Blog</span>
      </NavLink>
      <ul className={style.links_list}>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? style.active : "")}
          >
            Home
          </NavLink>
        </li>
        {!user && (
          <>
            <li>
              <NavLink
                to="/login"
                className={({ isActive }) => (isActive ? style.active : "")}
              >
                Entrar
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/register"
                className={({ isActive }) => (isActive ? style.active : "")}
              >
                Cadastrar
              </NavLink>
            </li>
          </>
        )}
        {user && (
          <>
            <li>
              <NavLink
                to="/posts/create"
                className={({ isActive }) => (isActive ? style.active : "")}
              >
                Novo Post
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashbord"
                className={({ isActive }) => (isActive ? style.active : "")}
              >
                Dashbord
              </NavLink>
            </li>
          </>
        )}

        <li>
          <NavLink
            to="/aboult"
            className={({ isActive }) => (isActive ? style.active : "")}
          >
            Sobre
          </NavLink>
        </li>
        {user && (
          <li>
            <button onClick={logout}>Sair</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
