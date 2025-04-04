
 import 'bootstrap/dist/css/bootstrap.min.css';
 import Home from './Home.jsx';



import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
 

 import Test from './Test.js';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>

          <Route path="/" element={<Home />} />

          
          <Route path="/test" element={<Test />} />

          <Route path="*" element={<Navigate to="/" />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
