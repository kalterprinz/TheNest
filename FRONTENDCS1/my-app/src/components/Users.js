import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import axios from "axios";

function Users() {
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] =useState();
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const id = window.location.pathname.split('/').pop();
                console.log("ID:", id);

                // Fetching the name
                const nameResponse = await axios.get(`http://localhost:3001/getname/${id}`);
                const name = nameResponse.data.name;
                console.log("Name:", name);

                // Fetching the venue using the obtained name
                const venueResponse = await axios.get(`http://localhost:3001/getvenue/${name}`);
                console.log("Venue:", venueResponse.data);

                // Set the data to state
                setData(venueResponse.data);
            } catch (error) {
                console.error("Error fetching data:", error);
                // Handle error appropriately, e.g., show an error message to the user
            }
        };

        fetchData();
    }, []);

    const handleDelete = (id) => {
        axios.delete('http://localhost:3001/deletevenue/'+id)
            .then(res => {
                console.log(res)
                window.location.reload();
            }).catch(err => console.log(err))
    }

    const filteredData = data.filter(user => {
        const search = searchQuery ? searchQuery.toLowerCase() : '';
    
        const event = user.event ? user.event.toLowerCase() : '';
        const name = user.name ? user.name.toLowerCase() : '';
        const where = user.where ? user.where.toLowerCase() : '';
        const startDate = user.start_date ? new Date(user.start_date) : null;
        const endDate = user.end_date ? new Date(user.end_date) : null;
        const stringIncludesSearch = str => str.toLowerCase().includes(search);
        return (
            event.includes(search) ||
            name.includes(search) ||
            where.includes(search) ||
            (startDate && stringIncludesSearch(startDate.toISOString())) || // Check if start date matches search
        (endDate && stringIncludesSearch(endDate.toISOString()))
        );
    });

    return (
        <div >
          <div className="Header">
          <Link to={`/userhome/${window.location.pathname.split('/').pop()}`}>
              <div className="group">
                <p className="nest">Nest</p>
                <p className="the">The</p>
                <p className="thenest">thenest</p>
                <p className="tagline">finding venue for CCS events just got easier</p>
              </div>
              </Link>
              <Link to={`/`} className="logbutt">Log out</Link>
            </div>
            <div className="Choose">
        <Link to={`/userhome/${window.location.pathname.split('/').pop()}`} className="ten">CCS Events</Link>
        <Link to={`/calendar/${window.location.pathname.split('/').pop()}`} className="ten">Calendar</Link>
        <Link to={`/user/${window.location.pathname.split('/').pop()}`} className="con">Your Events</Link>
        <Link to={`/about/${window.location.pathname.split('/').pop()}`} className="ten">About</Link>
        <Link to={`/contacts/${window.location.pathname.split('/').pop()}`} className="ten">Contacts</Link>
     
      </div>

            <div className="bodybox">
              <div className="tablelist">
                <div className="arr">
                  <div className="tit">
                    <h1>Your Events</h1>
                  </div>
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
                <Link to={`/createvenue/${window.location.pathname.split('/').pop()}`} className="add ">
                    Book venue
                </Link>

                <table className="table">
                    <thead>
                        <tr>
                            <th>Event</th>
                            <th>Location</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData
                        .sort((a, b) => new Date(a.start_time) - new Date(b.start_time))
                        .map((venue, index) => (
                            <tr key={index}>
                                <td>{venue.event}</td>
                                <td>{venue.where}</td>
                                <td>{new Date(venue.start_time).toLocaleString()}</td>
                                <td>{new Date(venue.end_time).toLocaleString()}</td>
                                <td>
                                        <Link to={`/updatevenue/${venue._id}`} className="btn btn-sm btn-success box up">Update</Link>
                                        <button onClick={() => handleDelete(venue._id)} className="btn btn-sm btn-danger del">Delete</button>
                                        </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
              </div>
            </div>
        </div>
    );
}

export default Users;
