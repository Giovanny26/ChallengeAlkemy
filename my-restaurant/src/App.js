import Login from './Components/Login'
import Home from './Components/Home'
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";

function App() {

    return (
      <Router>
        <Routes>
          <Route exact path="/" element={<Home/>}></Route>
          <Route exact path="/Login" element={<Login/>}></Route>
        </Routes>
      </Router>
      
    );
}

export default App;
