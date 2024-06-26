import './App.css';
import {Routes, Route} from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import Layout from "./components/Layout/Layout";
import Auth from "./components/Auth/Auth";
import Settings from "./components/Settings/Settings";
import Payments from "./components/Payments/Payments";
import AllPayments from "./components/AllPayments/AllPayments";
import AdminLayout from "./components/AdminLayout/AdminLayout";
import AdminUsers from "./components/AdminUsers/AdminUsers";
import AdminAuth from "./components/AdminAuth/AdminAuth";
import AdminWithdraws from "./components/AdminWithdraws/AdminWithdraws";
import AdminAllPayments from "./components/AdminAllPayments/AdminAllPayments";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      >
        
      </ToastContainer>
      <Routes>
              <Route path='/' element={<Layout/>}>
                  <Route index element={<Dashboard/>}/>
                  <Route path='/payments' element={<Payments />} />
                  <Route path='/settings' element={<Settings />} />
                  <Route path='/history' element={<AllPayments />} />
              </Route>
              <Route path='/admin' element={<AdminLayout />}>
                  <Route path='/admin' element={<AdminUsers />}/>
                  <Route path='/admin/withdraws' element={<AdminWithdraws />}/>
                  <Route path='/admin/all_payments' element={<AdminAllPayments />} />
              </Route>
              <Route path='/auth' element={<Auth />} />
              <Route path='/admin/auth' element={<AdminAuth />} />
          </Routes>
        
    </div>
  );
}

export default App;
