import React from 'react';
import { Link, animateScroll as scroll } from 'react-scroll';

// Main component that includes all sections
function Home() {
  // Add event listener for scroll to handle navbar and gotop button
  React.useEffect(() => {
    const handleScroll = () => {
      if (window.screen.width < 768 && window.scrollY > 690) {
        const gotop = document.querySelector(".gotop");
        gotop?.classList.add("display");
        const nav = document.querySelector(".navbar");
        nav?.classList.add("navopened");
      } else if (window.screen.width > 768 && window.scrollY > 220) {
        const gotop = document.querySelector(".gotop");
        gotop?.classList.add("display");
        const nav = document.querySelector(".navbar");
        nav?.classList.add("navopened");
      } else {
        const nav = document.querySelector(".navbar");
        const gotop = document.querySelector(".gotop");
        gotop?.classList.remove("display");
        nav?.classList.remove("navopened");
      }
    };

    document.addEventListener("scroll", handleScroll);
    return () => document.removeEventListener("scroll", handleScroll);
  }, []);

  function openBar() {
    const bar = document.querySelector(".bar");
    bar?.classList.toggle("opened");
  }

  // Styles object for all components
  const styles = {
    // Global styles
    body: {
      overflow: 'auto',
      margin: 0,
      padding: 0,
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale'
    },
    container: {
      width: 'auto',
      maxWidth: '1300px',
      paddingRight: '.75rem',
      paddingLeft: '.75rem',
      marginRight: 'auto',
      marginLeft: 'auto'
    },
    row: {
      display: 'flex',
      zIndex: 1
    },
    textCenter: {
      textAlign: 'center'
    },
    imgFluid: {
      maxWidth: '60%',
      width: '50%'
    },
    btn: {
      outline: 0,
      border: 0,
      fontSize: '20px',
      borderRadius: '5px',
      textDecoration: 'none',
      color: 'white',
      fontWeight: 500,
      zIndex: 1,
      backgroundColor: '#01bf71',
      padding: '10px 50px',
      margin: '0 0.5rem',
      cursor: 'pointer'
    },
    colMd12: {
      width: '100%'
    },
    colMd6: {
      width: '49.9%'
    },
    colMd3: {
      margin: '0 1rem !important',
      width: '100%'
    },
    colMd4: {
      width: '33.3%'
    },
    mb2: {
      marginBottom: '2rem !important'
    },
    mb1: {
      marginBottom: '1rem !important'
    },

    // Navbar styles
    navbar: {
      transition: 'background-color 0.4s',
      position: 'fixed',
      top: 0,
      width: '100%',
      padding: '0.5rem',
      backgroundColor: 'transparent',
      zIndex: 2,
      backdropFilter: 'blur(2px)'
    },
    navopened: {
      backgroundColor: '#010606 !important'
    },
    logo: {
      transition: 'all 0.2s',
      alignItems: 'center',
      alignContent: 'center',
      color: 'rgb(243, 243, 243)',
      letterSpacing: '2px',
      fontWeight: 400,
      margin: 0,
      fontSize: '28px',
      paddingTop: '10px'
    },
    logoLink: {
      textDecoration: 'none',
      color: '#fafafa',
      cursor: 'pointer'
    },
    navbarUl: {
      transition: 'all 0.2s',
      marginLeft: '17rem',
      listStyle: 'none'
    },
    navbarLi: {
      margin: '0 1rem',
      display: 'inline-block'
    },
    navbarLink: {
      transition: 'all 0.2s',
      fontSize: '20px',
      cursor: 'pointer',
      textDecoration: 'none',
      color: 'rgb(243, 243, 243)',
      fontWeight: 500
    },
    button: {
      cursor: 'pointer',
      transition: 'transform 0.2s linear',
      position: 'fixed',
      transform: 'translateX(300%)',
      top: '20px',
      right: '15px',
      zIndex: 1
    },
    burger: {
      transition: 'all 0.2s',
      marginBottom: '0.45rem',
      width: '25px',
      height: '3px',
      backgroundColor: 'white'
    },

    // Header styles
    header: {
      height: '100vh',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      boxShadow: 'inset 0 0 0 1000px rgba(0, 0, 0, 0.2)'
    },
    headerVideo: {
      top: 0,
      objectFit: 'cover',
      width: '100%',
      height: '100vh',
      position: 'absolute',
      zIndex: -1
    },
    headerBg: {
      position: 'absolute',
      width: '100%',
      height: '100vh',
      zIndex: 0,
      top: 0,
      backgroundColor: 'black',
      opacity: 0.7
    },
    headerH1: {
      zIndex: 1,
      color: 'white',
      fontSize: '64px'
    },

    // Main styles
    main: {
      padding: '3rem 0',
      backgroundColor: '#fafafa',
      width: '100%'
    },
    mainTitle: {
      fontSize: '48px',
      color: '#01bf71'
    },
    mainP: {
      fontSize: '22px',
      fontWeight: 500
    },

    // Services styles
    services: {},
    cardCover: {
      padding: '2rem 0',
      borderRadius: '15px',
      height: 'auto',
      width: '100%'
    },
    card: {
      cursor: 'pointer',
      borderRadius: '10px',
      width: '100%',
      transition: 'all 0.2s',
      backgroundColor: 'white',
      boxShadow: '5px 5px 5px 5px #e5e5e5'
    },
    cardHover: {
      transform: 'scale(1.03)'
    },
    cardTitle: {
      color: '#01bf71',
      fontSize: '24px'
    },
    cardText: {
      padding: '0 0 1rem 0',
      fontWeight: 500,
      fontSize: '18px'
    },
    p3: {
      padding: '0.2rem 1rem'
    },

    // About styles
    aboutScroll: {
      marginTop: '15rem',
      width: '100%',
      height: '10px'
    },
    about: {
      marginBottom: '15rem'
    },
    aboutH2: {},

    // Contact styles
    contact: {},
    contactInput: {
      color: 'white',
      borderRadius: '5px',
      padding: '15px 0px 10px 5px',
      fontSize: '20px',
      width: '100%',
      outline: 0,
      border: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.76)'
    },
    contactTextarea: {
      color: 'white',
      borderRadius: '5px',
      padding: '15px 0px 10px 5px',
      fontSize: '20px',
      width: '100%',
      minWidth: '100%',
      maxWidth: '100%',
      height: '300px',
      minHeight: '300px',
      maxHeight: '600px',
      outline: 0,
      border: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.76)'
    },
    formBtn: {
      border: 0,
      outline: 0,
      cursor: 'pointer',
      fontSize: '20px',
      borderRadius: '5px',
      textDecoration: 'none',
      color: 'white',
      width: '100%',
      fontWeight: 500,
      zIndex: 1,
      backgroundColor: '#01bf71',
      padding: '10px 50px',
      transition: 'background-color 0.2s'
    },

    // Footer styles
    footer: {
      width: '100%',
      height: 'auto',
      margin: 0,
      padding: '1rem 0',
      backgroundColor: '#010606'
    },
    footerTop: {
      margin: 0,
      padding: '0.1rem 0',
      backgroundColor: '#01bf71'
    },
    footerTitle: {
      color: '#fafafa',
      fontWeight: 600,
      fontSize: '22px',
      marginBottom: 0,
      wordWrap: 'initial'
    },
    footerText: {
      marginTop: '2.5px',
      fontSize: '18px',
      color: '#919191'
    },
    footerUl: {
      listStyle: 'none',
      marginLeft: 0,
      paddingLeft: 0,
      marginTop: '2.5px'
    },
    footerLi: {},
    footerLink: {
      textDecoration: 'none',
      color: '#919191',
      fontSize: '18px',
      fontWeight: 500
    },
    side1: {
      width: '50%'
    },
    side2: {
      width: '50%'
    },
    textWhite: {
      color: 'white'
    },
    gotop: {
      transition: 'all 0.2s',
      backgroundColor: '#01bf71',
      position: 'fixed',
      borderRadius: '25px',
      padding: '1rem',
      border: 0,
      opacity: 0,
      outline: 0,
      cursor: 'pointer',
      fontWeight: 1000,
      boxShadow: '0px 0px 5px 0.2px #000000',
      color: 'white',
      bottom: '20px',
      right: '15px'
    },
    display: {
      opacity: '1 !important'
    }
  };

  // Media query adjustments
  if (typeof window !== 'undefined') {
    if (window.screen.width <= 576) {
      styles.colMd4.width = '100% !important';
      styles.services.colMd4 = {
        margin: '2rem auto !important',
        width: '87.9% !important'
      };
      styles.row.display = 'inline-block';
      styles.colMd6.width = '100%';
      styles.side1.width = '100%';
      styles.side2.width = '100%';
      styles.button.transform = 'translateX(0)';
      styles.headerH1.fontSize = '44px';
      styles.btn.padding = '10px 30px';
      styles.navbarUl = {
        ...styles.navbarUl,
        backdropFilter: 'blur(20px)',
        zIndex: -1,
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100vh',
        width: '100%',
        listStyle: 'none',
        padding: '10rem 0 0 0',
        textAlign: 'center',
        margin: 0,
        transform: 'translateX(-100%)'
      };
      styles.navbarLi = {
        margin: '2rem 0',
        display: 'block'
      };
      styles.navbar = {
        ...styles.navbar,
        backdropFilter: 'none',
        padding: '10px 0'
      };
    } else if (window.screen.width <= 768) {
      styles.colMd4.width = '55.9% !important';
      styles.navbarUl.marginLeft = '0';
      styles.headerH1 = {
        ...styles.headerH1,
        textAlign: 'center',
        fontSize: '44px !important'
      };
    } else if (window.screen.width <= 992) {
      styles.colMd4.width = '49.9%';
      styles.navbarUl.marginLeft = '5rem';
      styles.colMd3.width = '100%';
      styles.side1.row = {
        display: 'inline-block',
        width: '100%'
      };
      styles.side2.row = {
        display: 'inline-block',
        width: '100%'
      };
    }
  }

  return (
    <>
      {/* Navbar Component */}
      <nav style={styles.navbar} className="navbar">
        <div style={styles.container}>
          <div style={styles.row}>
            <h1 style={styles.logo} className="logo">
              <Link
                spy={true}
                smooth={true}
                duration={1000}
                to="headerbg"
                style={styles.logoLink}
              >
                MicroMatch
              </Link>
            </h1>
            <ul style={styles.navbarUl} className="bar">
              <li style={styles.navbarLi}>
                <Link
                  onClick={openBar}
                  activeClass="active"
                  spy={true}
                  smooth={true}
                  duration={1000}
                  to="headerbg"
                  style={styles.navbarLink}
                >
                  Home
                </Link>
              </li>
              <li style={styles.navbarLi}>
                <Link
                  onClick={openBar}
                  activeClass="active"
                  to="services"
                  spy={true}
                  smooth={true}
                  duration={1000}
                  style={styles.navbarLink}
                >
                  Services
                </Link>
              </li>
              <li style={styles.navbarLi}>
                <Link
                  onClick={openBar}
                  to="about-scroll"
                  spy={true}
                  smooth={true}
                  duration={1000}
                  activeClass="active"
                  style={styles.navbarLink}
                >
                  About
                </Link>
              </li>
              <li style={styles.navbarLi}>
                <Link
                  onClick={openBar}
                  to="contact"
                  spy={true}
                  smooth={true}
                  duration={1000}
                  activeClass="active"
                  style={styles.navbarLink}
                >
                  Contact
                </Link>
              </li>
            </ul>
            <div style={styles.button} className="button" onClick={openBar}>
              <div style={styles.burger} className="burger"></div>
              <div style={styles.burger} className="burger"></div>
              <div style={styles.burger} className="burger"></div>
            </div>
          </div>
        </div>
      </nav>

      {/* Header Component */}
      <header style={styles.header}>
        <video src='/video.mp4' loop autoPlay muted style={styles.headerVideo} />

        <h1 style={styles.headerH1}>Welcome to MicroMatch</h1>
        <div style={styles.row}>
          <button style={styles.btn} className="btn">
            Sign Up
          </button>

          <button style={styles.btn} className="btn">
            Log in
          </button>
        </div>

        <div style={styles.headerBg} className="headerbg"></div>
      </header>

      {/* Main Component with Services, About, and Contact */}
      <main style={styles.main}>
        {/* Services Section */}
        <div style={{...styles.container, ...styles.services}} className="services">
          <h2 style={{...styles.mainTitle, ...styles.textCenter}} className="main-title text-center">SERVICES</h2>
          <div style={styles.cardCover} className="card-cover">
            <div style={styles.colMd12} className="col-md-12">
              <div style={styles.row} className="row">
                <div style={{...styles.colMd4, ...styles.mb2}} className="col-md-4 mb-2">
                  {/* Card Component */}
                  <div style={styles.card} className="card">
                    <br />
                    <div style={styles.textCenter} className="text-center">
                      <img
                        alt="card-img"
                        src={process.env.PUBLIC_URL + "/img/card1.png"}
                        style={styles.imgFluid}
                        className="text-center img-fluid"
                      />
                    </div>
                    <div style={styles.textCenter} className="text-center">
                      <h3 style={styles.cardTitle} className="card-title">Web Development</h3>
                    </div>
                    <div style={styles.p3} className="p-3">
                      <p style={styles.cardText} className="card-text">
                        Morbi eget neque risus. Duis erat quam, porta quis enim id, venenatis blandit nunc.
                      </p>
                    </div>
                  </div>
                </div>
                <div style={{...styles.colMd4, ...styles.mb2}} className="col-md-4 mb-2">
                  {/* Card Component */}
                  <div style={styles.card} className="card">
                    <br />
                    <div style={styles.textCenter} className="text-center">
                      <img
                        alt="card-img"
                        src={process.env.PUBLIC_URL + "/img/card2.png"}
                        style={styles.imgFluid}
                        className="text-center img-fluid"
                      />
                    </div>
                    <div style={styles.textCenter} className="text-center">
                      <h3 style={styles.cardTitle} className="card-title">E-Commerce Services</h3>
                    </div>
                    <div style={styles.p3} className="p-3">
                      <p style={styles.cardText} className="card-text">
                        Maecenas dictum efficitur felis non gravida. Vestibulum vitae ante luctus, accumsan mi vitae, pretium metus.
                      </p>
                    </div>
                  </div>
                </div>
                <div style={{...styles.colMd4, ...styles.mb2}} className="col-md-4 mb-2">
                  {/* Card Component */}
                  <div style={styles.card} className="card">
                    <br />
                    <div style={styles.textCenter} className="text-center">
                      <img
                        alt="card-img"
                        src={process.env.PUBLIC_URL + "/img/card3.png"}
                        style={styles.imgFluid}
                        className="text-center img-fluid"
                      />
                    </div>
                    <div style={styles.textCenter} className="text-center">
                      <h3 style={styles.cardTitle} className="card-title">Cyber Security</h3>
                    </div>
                    <div style={styles.p3} className="p-3">
                      <p style={styles.cardText} className="card-text">
                        Phasellus suscipit nibh at nisi finibus vestibulum sit amet vitae massa. Suspendisse non est eget elit pulvinar consectetur nec non sapien.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div style={styles.aboutScroll} className="about-scroll"></div>

        <div style={{...styles.container, ...styles.about}} className="about">
          <div style={styles.row} className="row">
            <div style={{...styles.colMd6, ...styles.textCenter}} className="col-md-6 text-center">
              <img alt="about" src={`${process.env.PUBLIC_URL}/img/img1.png`} style={styles.imgFluid} className="img-fluid" />
            </div>
            <div style={styles.colMd6} className="col-md-6">
              <h2 style={{...styles.mainTitle, ...styles.aboutH2}} className="main-title about-h2">ABOUT</h2>
              <p style={styles.mainP} className="main-p">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
                quam purus, ullamcorper id risus eu, consectetur consectetur
                purus. Etiam sagittis in eros ac sollicitudin.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div style={{...styles.container, ...styles.contact}} className="contact">
          <h2 style={{...styles.mainTitle, ...styles.textCenter}} className="main-title text-center">CONTACT</h2>
          <div style={styles.colMd12} className="col-md-12">
            <div style={styles.row} className="row">
              <div style={{...styles.colMd4, ...styles.mb1}} className="col-md-4 mb-1">
                <input name="name" placeholder="Name" style={styles.contactInput} className="contact-input" />
              </div>

              <div style={{...styles.colMd4, ...styles.mb1}} className="col-md-4 mb-1">
                <input name="email" placeholder="Email" style={styles.contactInput} className="contact-input" />
              </div>
              <div style={{...styles.colMd4, ...styles.mb1}} className="col-md-4 mb-1">
                <input
                  name="subject"
                  placeholder="Subject"
                  style={styles.contactInput}
                  className="contact-input"
                />
              </div>
            </div>
          </div>
          <br />
          <div style={styles.colMd12} className="col-md-12">
            <textarea
              name="message"
              placeholder="Message"
              style={styles.contactTextarea}
              className="contact-textarea"
            />
          </div>

          <br />
          <div style={styles.row} className="row">
            <div style={styles.colMd12} className="col-md-12">
              <input style={styles.formBtn} className="form-btn" type="submit" value="Send Message" />
            </div>
          </div>
        </div>
      </main>

      {/* Footer Component */}
      <footer style={styles.footer}>
        <div style={styles.container}>
          <div style={styles.row}>
            <div style={styles.side1}>
              <div style={styles.row}>
                <div style={styles.colMd3}>
                  <h1 style={styles.logo} className="logo">MicroMatch</h1>
                  <p style={styles.footerText} className="footer-text">
                    Lorem ipsum Here are thriteen health benefits of apples Lorem
                  </p>
                </div>
                <div style={styles.colMd3}>
                  <p style={styles.footerTitle} className="footer-title">Important Link</p>
                  <ul style={styles.footerUl}>
                    <li style={styles.footerLi}>
                      <Link   
                        spy={true}
                        smooth={true}
                        duration={1000}
                        to="headerbg"
                        style={styles.footerLink}
                      > Home </Link>
                    </li>
                    <li style={styles.footerLi}>
                      <Link to="services" spy={true} smooth={true} duration={1000} style={styles.footerLink}> Services </Link>
                    </li>
                    <li style={styles.footerLi}>
                      <Link to="about-scroll" spy={true} smooth={true} duration={1000} style={styles.footerLink}>About Us  </Link>
                    </li>
                    <li style={styles.footerLi}>
                      <Link to="contact" spy={true} smooth={true} duration={1000} style={styles.footerLink}> Contact  </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div style={styles.side2}>
              <div style={styles.row}>
                <div style={styles.colMd3}>
                  <p style={styles.footerTitle} className="footer-title">Contact</p>
                  <ul style={styles.footerUl}>
                    <li style={styles.footerLi}>
                      <Link to="#" style={styles.footerLink}>burhankcd@gmail.com</Link>
                    </li>
                    <li style={styles.footerLi}>
                      <Link to="#" style={styles.footerLink}> Burhan #3265</Link>
                    </li>
                    <li style={styles.footerLi}>
                      <Link to="#" style={styles.footerLink}>0212 444 44 44</Link>
                    </li>
                  </ul>
                </div>
                <div style={styles.colMd3}>
                  <p style={styles.footerTitle} className="footer-title">Social Media</p>
                  <ul style={styles.footerUl}>
                    <li style={styles.footerLi}>
                      <a target="_blank" rel="noreferrer" href="https://github.com/darkleas" style={styles.footerLink}> Github</a>
                    </li>
                    <li style={styles.footerLi}>
                      <a target="_blank" rel="noreferrer" href="https://twitter.com/burhankocadag0" style={styles.footerLink}> Twitter</a>
                    </li>
                    <li style={styles.footerLi}>
                      <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/burhan-kocada%C4%9F-49a3331a5/" style={styles.footerLink}> Linkedin</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button onClick={() => scroll.scrollToTop(2500)} className="gotop" style={styles.gotop}><i className="fas fa-level-up-alt"></i></button>
      </footer>
    </>
  );
}

export default Home;