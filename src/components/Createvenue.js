import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function CreateVenue() {
  const [event, setEvent] = useState("");
  const [where, setWhere] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate inputs
    if (!event || !where || !startDate || !startTime || !endDate || !endTime) {
        setError("All fields are required.");
      return;
    }

    try {
      // Fetch the name using the id
      const id = window.location.pathname.split("/").pop();
      const nameResponse = await axios.get(
        `http://localhost:3001/getname/${id}`
      );
      const name = nameResponse.data.name;

      // Format start and end times
      const startDateTime = new Date(`${startDate}T${startTime}`);
      const endDateTime = new Date(`${endDate}T${endTime}`);

      // Make API request to create the venue
      const venueResponse = await axios.post(
        `http://localhost:3001/createvenue`,
        {
          event,
          name,
          where,
          startTime: startDateTime.toISOString(),
          endTime: endDateTime.toISOString(),
        }
      );

      console.log("Venue created:", venueResponse.data);
      // Redirect user after successful submission
      navigate(`/user/${id}`);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError("Time conflict detected. Please choose different time slots.");
        // Display error message to the user
        // You can use state to manage an error message and display it in your UI
      } else {
        console.error("Error:", error);
        setError("An error occurred. Please try again later.");
        // Handle other errors - display to the user or log as needed
      }
    }
  };

  return (
    <div>
      <div className="Header">
      <Link to={`/userhome/${window.location.pathname.split('/').pop()}`}>
              <div className="group">
                <p className="nest">Nest</p>
                <p className="the">The</p>
                <p className="thenest">thenest</p>
                <p className="tagline">finding venue for CCS events just got easier</p>
              </div>
              </Link>
            </div>
      <div className="container">
        <form onSubmit={handleSubmit} class="my-form">
          <h2 className="fonak fonsileb">Add Venue</h2>
          {error && <div className="error-message mise">{error}</div>}
          <div class="form-group fonak fonsiltit">
            <label htmlFor="event">Event</label>
            <input
              type="text"
              id="event"
              placeholder="Enter Event"
              className="form-control"
              value={event}
              onChange={(e) => setEvent(e.target.value)}
            />
          </div>
          <div class="form-group fonak fonsiltit">
            <label htmlFor="where">Location</label>
            <input
              type="text"
              placeholder="Enter Location"
              className="form-control"
              onChange={(e) => setWhere(e.target.value)}
            />
          </div>
          <div class="form-group fonak fonsiltit">
            <label htmlFor="startDate">Start Date</label>
            <input
              type="date"
              id="startDate"
              placeholder="Enter Start Date"
              className="form-control"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div class="form-group fonak fonsiltit">
            <label htmlFor="startTime">Start Time</label>
            <input
              type="time"
              id="startTime"
              placeholder="Enter Start Time"
              className="form-control"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </div>
          <div class="form-group fonak fonsiltit">
            <label htmlFor="endDate">End Date</label>
            <input
              type="date"
              id="endDate"
              placeholder="Enter End Date"
              className="form-control"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <div class="form-group fonak fonsiltit">
            <label htmlFor="endTime">End Time</label>
            <input
              type="time"
              id="endTime"
              placeholder="Enter End Time"
              className="form-control"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </div>
          <button type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateVenue;
