import Navbar from "./components/Navbar.jsx";
import Header from "./components/Header.jsx";
import Main from "./components/Main.jsx";
import Footer from "./components/Footer.jsx"; 


function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />
      <Header />
      <Main />
      <Footer />
    </main>
  );
}

export default Home;
