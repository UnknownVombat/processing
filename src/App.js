import './App.css';
import {Routes, Route} from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import Layout from "./components/Layout/Layout";
import Auth from "./components/Auth/Auth";

function App() {
  return (
    <div className="App">
        <Routes>
            <Route path='/' element={<Layout/>}>
                <Route path='/' element={<Dashboard/>}/>
                <Route path='/payments' element={<Dashboard/>} />
            </Route>
            <Route index path='/auth' element={<Auth />} />
        </Routes>
    </div>
  );
}

export default App;
