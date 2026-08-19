
import Home from './components/Home';
import Login from './components/Login';
import { Routes, Route } from "react-router-dom";
import Register from './components/Register';
import Problems from './components/Problems';
import Navbar from './components/Navbar';
import Edit from './components/Edit';
import Add from './components/Add';
import ProblemDetails from './components/ProblemDetails';
import Footer from './components/Footer';
function App() {
  return(
    <div>
      
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/home" element={<Home />} />
        <Route path="/problems" element={<Problems/>}/>
        <Route path="/problem/:id" element={<ProblemDetails/>}/>
        <Route path="/edit/:id" element={<Edit/>}/>
        <Route path="/add" element={<Add/>}/>
      </Routes>
    </div>
  )
}

export default App
