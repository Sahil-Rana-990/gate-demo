import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Home from './components/Home';
import UserRegister from './components/UserRegister'
import AskQuery from './AskQuery';
import Profile from './Profile';
import Account from './Account';
import Questions from './Questions';
import SingleQue from './SingleQue';
import Users from './Users';
import Unanswered from './Unanswered';
import Tags from './Tags';

function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Home></Home>} />
          <Route path="/user-login" element={<Login/>}/>
          <Route path='/user-register' element={<UserRegister />} />
          <Route path='/questions' element={<Questions />} />
          <Route path='/questions/:id' element={<SingleQue />} />
          <Route path='/ask-query' element={<AskQuery />} />
          <Route path='/user/:username' element={<Profile />} />
          <Route path='/account' element={<Account />} />
          <Route path='/users' element={<Users/>}/>
          <Route path='/unanswered' element={<Unanswered/>}/>
          <Route path='/tags' element={<Tags/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;