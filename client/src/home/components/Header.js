// import { useNavigate } from 'react-router-dom';


function Header() {
  return (
    <header>
      <video src={`${process.env.PUBLIC_URL}/video.mp4`} loop autoPlay muted />

      <h1>Welcome to MicroMatch</h1>
      <div className="row">
        <button className="btn" style={{ cursor: "pointer" }}>
          Sign Up
        </button>

        <button className="btn" style={{ cursor: "pointer" }} >
          Log in
        </button>
      </div>

      <div className="headerbg"></div>
    </header>
  );
}
export default Header;
