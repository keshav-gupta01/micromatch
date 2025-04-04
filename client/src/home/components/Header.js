import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  return (
    <header>
      <video src={`${process.env.PUBLIC_URL}/video.mp4`} loop autoPlay muted />

      <h1>Welcome to MicroMatch</h1>
      <div className="row">
        <button className="btn" style={{ cursor: "pointer" }} onClick={() => navigate("/signup")}>
          Sign Up
        </button>

        <button className="btn" style={{ cursor: "pointer" }} onClick={() => navigate("/login")}>
          Log in
        </button>
      </div>

      <div className="headerbg"></div>
    </header>
  );
}

export default Header;
