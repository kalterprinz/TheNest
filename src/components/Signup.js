import axios from "axios";
import {Link} from "react-router-dom";
import { useState } from "react";
import {useNavigate} from "react-router-dom";

function Signup(){
    
    const [name, setName]=useState()
    const [college, setCollege]=useState()
    const [email, setEmail]=useState()
    const [password, setPassword]=useState()

    const navigate = useNavigate()

    const handleSubmit = (e)=>{
        e.preventDefault()
        axios.post('http://localhost:3001/signup',{name, college, email, password})
        .then(res=>{
            
            console.log(res);
            navigate(`/login`)
        })
        .catch(err => console.log(err))
    }
    return(
        <div>
            
            <div className="Header">
            <Link to={`/`}>
              <div className="group">
                <p className="nest">Nest</p>
                <p className="the">The</p>
                <p className="thenest">thenest</p>
                <p className="tagline">finding venue for CCS events just got easier</p>
              </div></Link>
            </div>
            <div class="container">
                <form onSubmit={handleSubmit} class="my-form">
                    <h2 className="fonak fonsileb">Sign up</h2>
                    <div class="form-group fonak fonsiltit">
                        <label htmlFor="">Name</label>
                        <input
                            type="text"
                            placeholder="Enter Name"
                            className="form-control"
                            onChange={(e)=>setName(e.target.value)}
                        />
                    </div>
                    <div class="form-group fonak fonsiltit">
                        <label htmlFor="">College</label>
                        <input
                            type="text"
                            placeholder="Enter College"
                            className="form-control"
                            onChange={(e)=>setCollege(e.target.value)}
                        />
                    </div>
                    <div class="form-group fonak fonsiltit">
                        <label htmlFor="">Email</label>
                        <input
                            type="text"
                            placeholder="Enter Email"
                            className="form-control"
                            onChange={(e)=>setEmail(e.target.value)}
                        />
                    </div>
                    <div class="form-group fonak fonsiltit">
                        <label htmlFor="">Password</label>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            className="form-control"
                            onChange={(e)=>setPassword(e.target.value)}
                        />
                    </div>
                    <p className="mis">Already have an account?<Link to={`/login`} className="miss">Log in</Link></p>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Signup;