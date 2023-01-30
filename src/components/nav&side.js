import React from "react";
import { useContext } from "react";
import AuthContext from "../store/auth-context";
import { useHistory, Link } from "react-router-dom";
import { toast } from "react-toastify";
var user = JSON.parse(localStorage.getItem("user"));

const NavandSide = () => {
  const history = useHistory();
  const authCtx = useContext(AuthContext);
  function logoutHandler() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    authCtx.logout();
    toast.success("Logout successfully");
    history.replace("/login");
  }
  return (
    <div>
      <div class="hold-transition sidebar-mini layout-fixed">
        <div class="wrapper">
          <nav class="main-header navbar navbar-expand navbar-white navbar-light">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a
                  class="nav-link"
                  data-widget="pushmenu"
                  href="#"
                  role="button"
                >
                  <i class="fas fa-bars"></i>
                </a>
              </li>
            </ul>

            <ul class="navbar-nav ml-auto">
              <li class="nav-item">
                <div class="media">
                  <img
                    class="image"
                    src={"http://localhost:8080/images/photos/" + user.photo}
                    alt="User Avatar"
                  />
                  &nbsp;
                  <div class="media-body">
                    <h3 class="dropdown-item-title">{user.username}</h3>
                    <p class="text-sm">Points: {user.total_points}</p>
                  </div>
                </div>
              </li>
              &nbsp;&nbsp;&nbsp;
              <li class="nav-item">
                <button
                  class="btn btn-primary btn-block"
                  onClick={logoutHandler}
                >
                  Log Out
                </button>
              </li>
            </ul>
          </nav>

          <aside class="main-sidebar sidebar-dark-primary elevation-4">
            <div class="sidebar">
              <div class="user-panel mt-3 pb-3 mb-3 d-flex">
                
                <div class="info">
                  <span class="d-block" style={{ color: "white" }}>
                    {user.email}
                  </span>
                </div>
              </div>

              <nav class="mt-2">
                <ul
                  class="nav nav-pills nav-sidebar flex-column"
                  data-widget="treeview"
                  role="menu"
                  data-accordion="false"
                >
                  <li class="nav-item">
                    <Link to="/category" class="nav-link">
                      <i class="far fa-file-alt"></i>&nbsp;
                      <p>Categories</p>
                    </Link>
                  </li>
                  <li class="nav-item">
                    <Link to="/athletes" class="nav-link">
                      <i class="fas fa-skating"></i>&nbsp;
                      <p>Athletes</p>
                    </Link>
                  </li>
                  <li class="nav-item">
                    <Link to="/drills" class="nav-link">
                      <i class="fas fa-photo-video"></i>&nbsp;
                      <p>Drills</p>
                    </Link>
                  </li>
                  <li class="nav-item">
                    <Link to="/video" class="nav-link">
                      <i class="fas fa-video"></i>&nbsp;
                      <p>Videos</p>
                    </Link>
                  </li>

                  <li class="nav-item">
                    <Link to="/users" class="nav-link">
                      <i class="fas fa-users"></i>&nbsp;
                      <p>Users</p>
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default NavandSide;
