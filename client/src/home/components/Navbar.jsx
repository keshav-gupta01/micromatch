import { Link } from "react-scroll";
import { useEffect } from "react";
import '../home.css';

function Navbar() {
  useEffect(() => {
    const handleScroll = () => {
      const gotop = document.querySelector(".gotop");
      const nav = document.querySelector(".navbar");

      if (!nav) return;

      if (window.screen.width < 768 && window.scrollY > 690) {
        gotop?.classList.add("display");
        nav.classList.add("navopened");
      } else if (window.screen.width > 768 && window.scrollY > 220) {
        gotop?.classList.add("display");
        nav.classList.add("navopened");
      } else {
        gotop?.classList.remove("display");
        nav.classList.remove("navopened");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll); // cleanup
  }, []);

  function openBar() {
    const bar = document.querySelector(".bar");
    bar.classList.toggle("opened");
  }

  return (
    <nav className="navbar">
      <div className="container">
        <div className="row">
          <h1 className="logo">
            <Link
              spy={true}
              smooth={true}
              duration={1000}
              to="headerbg"
              style={{ cursor: "pointer" }}
            >
              MicroMatch
            </Link>
          </h1>
          <ul className="bar">
            <li>
              <Link onClick={openBar} activeClass="active" spy={true} smooth={true} duration={1000} to="headerbg">
                Home
              </Link>
            </li>
            <li>
              <Link onClick={openBar} activeClass="active" to="features" spy={true} smooth={true} duration={1000}>
                Features
              </Link>
            </li>
            <li>
              <Link onClick={openBar} to="about-scroll" spy={true} smooth={true} duration={1000} activeClass="active">
                About
              </Link>
            </li>
            <li>
              <Link onClick={openBar} to="contact" spy={true} smooth={true} duration={1000} activeClass="active">
                Contact
              </Link>
            </li>
          </ul>
          <div className="button" onClick={openBar}>
            <div className="burger"></div>
            <div className="burger"></div>
            <div className="burger"></div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
