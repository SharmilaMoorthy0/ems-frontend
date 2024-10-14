import logo from './logo.svg';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


import { Toaster } from 'react-hot-toast';

import Category from './components/CategoryPage/Category';

import Home from './components/Dashboard/Home';
import Form from './components/Form';
import Login from './components/loginadmin/Login';
import Signup from './components/signup/Signup';
import Employe from './components/EmployePage/Employe';
import Header from './components/Header/Header'




import Admin from './components/Admin';

function App() {
  const toastoption = {
    // Define default options
    className: '',
    duration: 5000,
    style: {
      background: '#363646',
      color: '#fff',
    },

    // Default options for specific types
    success: {
      duration: 3000,
      theme: {
        primary: 'green',
        secondary: 'black',
      },
    },

  }


  return (
    <BrowserRouter>
    
      <Routes>
       {/* <Route path='/' element={<Page/>} /> */}
        <Route path='/' element={<Login />} />
        <Route path='/header' element={<Header/>} />
         <Route path='/signup' element={<Signup />} />
       
        <Route path='/employe' element={<Employe />} />
        <Route path='/home' element={<Home />} />
        <Route path='/form' element={<Form />} />
        <Route path='/category' element={<Category />} />
       
        {/* <Route path='/admin' element={<Admin/>} /> */}
        
        
       
       
       







      </Routes>

      <Toaster position='top-center' toastOptions={toastoption} />
    </BrowserRouter >
  );
}

export default App;
