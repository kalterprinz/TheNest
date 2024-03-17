import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function UpdateVenue() {
  const { id } = useParams();

  const [event, setEvent] = useState("");
  const [where, setWhere] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/getven/${id}`);
        console.log("Response:", response);

        setEvent(response.data.event);
        setWhere(response.data.where);

        const startDateTimeUTC = new Date(response.data.start_time);
        const endDateTimeUTC = new Date(response.data.end_time);

        const startDateTimePST = new Date(
          startDateTimeUTC.toLocaleString()
        );
        const endDateTimePST = new Date(
          endDateTimeUTC.toLocaleString()
        );

        const startDate = startDateTimePST.toISOString().split("T")[0];
        const startTime = startDateTimePST.toTimeString().split(" ")[0];
        const endDate = endDateTimePST.toISOString().split("T")[0];
        const endTime = endDateTimePST.toTimeString().split(" ")[0];

        setStartDate(startDate);
        setStartTime(startTime);
        setEndDate(endDate);
        setEndTime(endTime);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!event || !where || !startDate || !startTime || !endDate || !endTime) {
      setError("All fields are required.");
      return;
    }
    try {
      // Format start and end times
      const startDateTime = new Date(`${startDate}T${startTime}`);
      const endDateTime = new Date(`${endDate}T${endTime}`);

      // Make the PUT request to update the venue
      const venueResponse = await axios.put(`http://localhost:3001/updatevenue/`+id, {
        event,
        where,
        start_time: startDateTime.toISOString(), 
        end_time: endDateTime.toISOString(), 
      });
      console.log("Venue updated:", venueResponse.data);
      navigate(-1);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError("Time conflict detected. Please choose different time slots.");
      } else {
        console.error("Error:", error);
        setError("An error occurred. Please try again later.");
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
      <div class="container">
        <form onSubmit={handleUpdate} class="my-form">
          <h2 className="fonak fonsileb">Update Venue</h2>
          {error && <div className="error-message">{error}</div>}
          <div class="form-group fonak fonsiltit">
            <label htmlFor="">Event</label>
            <input
              type="text"
              placeholder="Enter Event"
              className="form-control"
              value={event}
              onChange={(e) => setEvent(e.target.value)}
            />
          </div>
          <div class="form-group fonak fonsiltit">
            <label htmlFor="">Location</label>
            <input
              type="text"
              placeholder="Enter Location"
              className="form-control"
              value={where}
              onChange={(e) => setWhere(e.target.value)}
            />
          </div>
          <div class="form-group fonak fonsiltit">
            <label htmlFor="">Start Date</label>
            <input
              type="date"
              placeholder="Enter Start Date"
              className="form-control"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div class="form-group fonak fonsiltit">
            <label htmlFor="">Start Time</label>
            <input
              type="time"
              placeholder="Enter Start Time"
              className="form-control"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </div>
          <div class="form-group fonak fonsiltit">
            <label htmlFor="">End Date</label>
            <input
              type="date"
              placeholder="Enter End Date"
              className="form-control"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <div class="form-group fonak fonsiltit">
            <label htmlFor="">End Time</label>
            <input
              type="time"
              placeholder="Enter End Time"
              className="form-control"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </div>
          <button type="submit">
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateVenue;
