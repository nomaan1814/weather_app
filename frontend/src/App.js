import Weather from "./Weather";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from "./components/layout/Header";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import {useSelector} from "react-redux";
import Protected from "./Protected";
import Profile from "./components/auth/Profile";

function App() {
  const userLogin=useSelector(state=>state.userLogin);
  const {userInfo}=userLogin;
  return (
    <div className="App">
      <BrowserRouter>
       <Header />
      <Routes>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
         <Route path="/" element={<Weather />}/>
         <Route path="/profile" element={<Protected userInfo={userInfo}>
         <Profile />
         </Protected>}/>
      </Routes>
       
       </BrowserRouter>
    </div>
  );
}

export default App;
