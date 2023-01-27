import React from "react";
import Link from "next/link";
import styles from "../styles/navbar.module.css";
function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-primary shadow-sm fixed-to bg-primay bg-light px-lg-5">
      <div className="container-fluid">
        <Link className="navbar-brand" href="/">
          Blog Site
        </Link>
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto gap-5 mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" href="/">
                Home
              </Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" aria-current="page" href="/newsPost">
                New Post
              </Link>
            </li>
            <li className={`nav-item dropdown ${styles.dropdownToggle}`} >
              <a
                className="nav-link"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Category
              </a>
              <ul
                className={`dropdown-menu ${styles.dropdown_menu}`}
                aria-labelledby="navbarDropdown"
              >
                <li>
                  <a className="dropdown-item" href="#">
                    Sport
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Education
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Politics
                  </a>
                </li>
              </ul>
            </li>
          </ul>
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
