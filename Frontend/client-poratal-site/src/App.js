import {Routes , Route} from 'react-router-dom';
import NavigationBar from "./components/NavigationBar";
import LoginPage from './components/LoginPage';
import HomePage from './Pages/HomePage';
import ContactUs from './Pages/ContactUs';
import RegisterPage from './Pages/RegisterPage';
import EmployerDashboard from './Dashboard/EmployerDashboard';
import JobSeekerDashboard from './Dashboard/JobSeekerDashboard';
import JobListPage from './Pages/JobListPage';
import CreateJobPage from './components/CreateJob';


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
           <Route path='/jobs' element={<JobListPage/>}/>
           <Route path='/createJob' element = {<CreateJobPage/>}/>
       </Routes>
    </div>
  );
}

export default App;
