
import {Routes , Route} from 'react-router-dom';


import NavigationBar from "./components/NavigationBar";
import LoginPage from './components/LoginPage';
import HomePage from './Pages/HomePage';
import ContactUs from './Pages/ContactUs';


function App() {
  return (
    <div className="App">
       <NavigationBar/>
       <Routes>
           <Route path='/' element={<HomePage/>}/>
            <Route path ='/contact' element={<ContactUs/>}/>
           <Route path='/login' element={<LoginPage/>}/>
       </Routes>
    </div>
  );
}

export default App;
