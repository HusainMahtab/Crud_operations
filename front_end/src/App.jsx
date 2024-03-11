import {BrowserRouter as Router, Routes,Route} from "react-router-dom"
import Header from "./components/Header"
import Home from "./components/Home"
import AddUser from "./components/AddUser"
import UpdateUser from "./components/UpdateUser"
import AboutMe from "./components/AboutMe"
function App() {
 return(
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/adduser" element={<AddUser/>}/>
        <Route path="/update_user" element={<UpdateUser/>}/>
        <Route path="/about_me" element={<AboutMe/>}/>
      </Routes>
    </Router>
 )
  
}

export default App
