import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Users from './components/Users'
import Login from './components/Login'
import Signup from './components/Signup'
import Createvenue from './components/Createvenue'
import Updatevenue from './components/Updatevenue'
import Userhome from './components/Userhome'
import About from './components/About'
import Contacts from './components/Contacts'
import Calendar from './components/Calendar'

function App() {

    return( 
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='/user/:id' element={<Users />}></Route>
                <Route path='/login' element={<Login />}></Route>
                <Route path='/signup' element={<Signup />}></Route>
                <Route path='/createvenue/:id' element={<Createvenue />}></Route>
                <Route path='/updatevenue/:id' element={<Updatevenue />}></Route>
                <Route path='/userhome/:id' element={<Userhome />}></Route>
                <Route path='/about/:id' element={<About />}></Route>
                <Route path='/contacts/:id' element={<Contacts />}></Route>
                <Route path='/calendar/:id' element={<Calendar />}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App