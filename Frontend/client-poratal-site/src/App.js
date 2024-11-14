import {Routes , Route} from 'react-router-dom';
import NavigationBar from "./components/NavigationBar";
import LoginPage from './components/LoginPage';
import HomePage from './Pages/HomePage';
import ContactUs from './Pages/ContactUs';
import RegisterPage from './Pages/RegisterPage';
import EmployerDashboard from './Dashboard/EmployerDashboard';
import JobSeekerDashboard from './Dashboard/JobSeekerDashboard';


function App() {
  return (
    <div className="App">
       <NavigationBar/>
       <Routes>
           <Route path='/' element={<HomePage/>}/>
            <Route path ='/contact' element={<ContactUs/>}/>
            <Route path='/register' element = {<RegisterPage/>}/>
           <Route path='/login' element={<LoginPage/>}/>
           <Route path='/empdashBord' element={<EmployerDashboard/>}/>
           <Route path='/jobseeker' element ={<JobSeekerDashboard/>}/>
       </Routes>
    </div>
  );
}

export default App;
