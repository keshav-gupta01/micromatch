import { useEffect, useState } from "react";

function SignupForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    // add any other fields you have
  });

  const [instagramUsername, setInstagramUsername] = useState("");
  const [isInstagramVerified, setIsInstagramVerified] = useState(false);
  const [errors, setErrors] = useState({});

  // Save form data before redirecting to Instagram
  const handleConnectInstagram = () => {
    sessionStorage.setItem('formData', JSON.stringify(formData));
    // Redirect to Instagram OAuth
    window.location.href = "https://api.instagram.com/oauth/authorize?..."; // your Instagram URL
  };

  // Load form data + handle access_token after returning from Instagram
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get('access_token');

    if (accessToken) {
      console.log("Access token found:", accessToken);

      // 1. Restore formData
      const savedFormData = sessionStorage.getItem('formData');
      if (savedFormData) {
        setFormData(JSON.parse(savedFormData));
        sessionStorage.removeItem('formData'); // clear it after restoring
      }

      // 2. Verify Instagram account using accessToken
      verifyInstagramAccount(accessToken);
    }
  }, []);

  // Dummy function for verifying instagram
  const verifyInstagramAccount = async (accessToken) => {
    try {
      // Fetch instagram username using access token
      const username = await fetchInstagramUsername(accessToken);

      if (username) {
        setInstagramUsername(username);
        setIsInstagramVerified(true);
        console.log("Instagram connected as:", username);
      } else {
        console.error("Failed to fetch Instagram username");
      }
    } catch (error) {
      console.error("Error verifying Instagram:", error);
    }
  };

  const fetchInstagramUsername = async (accessToken) => {
    // Simulate API call — you can replace it with your backend call
    return "mocked_username"; // return dummy username
  };

  const handleInputChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (!instagramUsername) newErrors.instagram = "Instagram is not connected";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async () => {
    if (validate()) {
      // proceed with signup API
      console.log("Sign up data:", formData, instagramUsername);

      // Clear form after signup
      setFormData({ name: "", email: "", password: "" });
      setInstagramUsername("");
      setIsInstagramVerified(false);
    }
  };

  return (
    <div>
      <h2>Signup Form</h2>

      <input
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleInputChange}
      />
      {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}

      <input
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleInputChange}
      />
      {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}

      <input
        name="password"
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleInputChange}
      />
      {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}

      <br />

      {isInstagramVerified ? (
        <p>Connected to Instagram: {instagramUsername}</p>
      ) : (
        <button onClick={handleConnectInstagram}>Connect Instagram</button>
      )}
      {errors.instagram && <p style={{ color: "red" }}>{errors.instagram}</p>}

      <br />

      <button onClick={handleSignup} disabled={!isInstagramVerified}>
        Sign Up
      </button>
    </div>
  );
}

export default SignupForm;
