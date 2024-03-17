import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
    
        try {
            const response = await axios.post('http://localhost:3001/login', { name, password });
            
            const userId = response.data.userId;
    
            navigate(`/userhome/${userId}`) ;
        } catch (error) {
            console.error('Error during login:', error);
        }
    };
    
    return (
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
                    <h2 className="fonak fonsileb">Log in</h2>
                    {error && <div className="error">{error}</div>}
                    <div class="form-group fonak fonsiltit">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            placeholder="Enter Username"
                            className="form-control"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div class="form-group fonak fonsiltit">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter Password"
                            className="form-control"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <p className="mis">Don't have an account? <Link to="/signup" className="miss">Sign Up</Link></p>
                    <button type="submit" >Login</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
