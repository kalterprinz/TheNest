import {Link} from "react-router-dom";
import React, {useState, useEffect} from 'react'
import axios from "axios";

function Home() {

    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] =useState();

    useEffect(() => {
        axios.get('http://localhost:3001/')
        .then(res =>{
            console.log(res);
            setData(res.data);
        })
        .catch(err => console.log(err));
    },[])

        const filteredData = data.filter(user => {
        const search = searchQuery ? searchQuery.toLowerCase() : '';
    
        const event = user.event ? user.event.toLowerCase() : '';
        const name = user.name ? user.name.toLowerCase() : '';
        const where = user.where ? user.where.toLowerCase() : '';
        const start_date= user.start_date ? user.start_date.toString() : '';
        const end_date= user.end_date ? user.end_date.toString() : '';
    
        return (
            event.includes(search) ||
            name.includes(search) ||
            where.includes(search) ||
            start_date.includes(search) ||
            end_date.includes(search) 
        );
    });

    return (
      
        <div>
            <div className="Header">
            <Link to={`/`}>
              <div className="group">
                <p className="nest">Nest</p>
                <p className="the">The</p>
                <p className="thenest">thenest</p>
                <p className="tagline">finding venue for CCS events just got easier</p>
              </div>
              </Link>
              <Link to={`/signup`} className="sigbut">Sign up</Link>
              <Link to={`/login`} className="logbut">Log in</Link>
            </div>
      <div className="Choose">
        <Link to={`/`} className="con">CCS Events</Link>
        <Link to={`/calendar/00`} className="ten">Calendar</Link>
        <Link to={`/about/00`} className="ten">About</Link>
        <Link to={`/contacts/00`} className="ten">Contacts</Link>
     
      </div>
      <div className="bodybox">
            <div className="tablelist">
              <div className="arr">
                <div className="tit"><h1>CCS Events</h1></div>
                <div className="search-container">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search"
                  />
                </div>
              </div>
            
            
                <table className="table">
            <thead>
                <tr>
                    <th>Event</th>
                    <th>Name</th>
                    <th>Location</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                </tr>
            </thead>
            <tbody>
                {
                    filteredData
                        .sort((a, b) => new Date(a.start_time) - new Date(b.start_time))
                        .map((venue, index) => {
                            return (
                                <tr key={index}>
                                    <td>{venue.event}</td>
                                    <td>{venue.name}</td>
                                    <td>{venue.where}</td>
                                    <td>{new Date(venue.start_time).toLocaleString()}</td>
                                    <td>{new Date(venue.end_time).toLocaleString()}</td>
                                </tr>
                            );
                        })
                }
            </tbody>
          </table>
            </div>
            </div>
        </div>
    );
}

export default Home;