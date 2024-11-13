
import {Routes , Route} from 'react-router-dom';


import NavigationBar from "./components/NavigationBar";
import LoginPage from './components/LoginPage';


function App() {
  return (
    <div className="App">
       <NavigationBar/>
       <Routes>
         <Route path='/login' element={<LoginPage/>}/>
       </Routes>
    </div>
  );
}

export default App;
