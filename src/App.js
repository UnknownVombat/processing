import './App.css';
import {Routes, Route} from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import Layout from "./components/Layout/Layout";
import Auth from "./components/Auth/Auth";
import Settings from "./components/Settings/Settings";
import Payments from "./components/Payments/Payments";
import AllPayments from "./components/AllPayments/AllPayments";

function App() {
  return (
    <div className="App">
        <Routes>
            <Route path='/' element={<Layout/>}>
                <Route path='/' element={<Dashboard/>}/>
                <Route path='/payments' element={<Payments />} />
                <Route path='/settings' element={<Settings />} />
                <Route path='/history' element={<AllPayments />} />
            </Route>
            <Route index path='/auth' element={<Auth />} />
        </Routes>
    </div>
  );
}

export default App;
