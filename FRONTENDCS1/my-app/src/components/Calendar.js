import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import axios from "axios";

function Calendar() {
    const [data, setData] = useState([]);
    const [currentMonth, setCurrentMonth] = useState('');
    const [currentYear, setCurrentYear] = useState('');
    const [weeksInMonth, setWeeksInMonth] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/')
            .then(res => {
                setData(res.data);
            })
            .catch(err => console.log(err));

        const currentDate = new Date();
        setCurrentMonth(currentDate.getMonth());
        setCurrentYear(currentDate.getFullYear());

        // Generate weeks of the current month
        generateWeeks(currentDate.getMonth(), currentDate.getFullYear());

        // Update current month and weeks every minute
        const intervalId = setInterval(() => {
            const currentDate = new Date();
            setCurrentMonth(currentDate.getMonth());
            setCurrentYear(currentDate.getFullYear());
            generateWeeks(currentDate.getMonth(), currentDate.getFullYear());
        }, 60000); // 60,000 milliseconds = 1 minute

        // Cleanup function to clear interval
        return () => clearInterval(intervalId);
    }, []);

    const generateWeeks = (month, year) => {
        const weeks = [];
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const totalDaysInMonth = new Date(year, month + 1, 0).getDate();
        let week = [];

        // Add empty cells for days before the first day of the month
        for (let i = 0; i < firstDayOfMonth; i++) {
            week.push(null);
        }

        // Add days of the month
        for (let day = 1; day <= totalDaysInMonth; day++) {
            week.push(day);
            if (week.length === 7) {
                weeks.push(week);
                week = [];
            }
        }

        // Add empty cells for remaining days
        if (week.length > 0) {
            while (week.length < 7) {
                week.push(null);
            }
            weeks.push(week);
        }

        setWeeksInMonth(weeks);
    };

    const handleNextMonth = () => {
        let newMonth = currentMonth + 1;
        let newYear = currentYear;
        if (newMonth > 11) {
            newMonth = 0;
            newYear++;
        }
        setCurrentMonth(newMonth);
        setCurrentYear(newYear);
        generateWeeks(newMonth, newYear);
    };

    const handlePreviousMonth = () => {
        let newMonth = currentMonth - 1;
        let newYear = currentYear;
        if (newMonth < 0) {
            newMonth = 11;
            newYear--;
        }
        setCurrentMonth(newMonth);
        setCurrentYear(newYear);
        generateWeeks(newMonth, newYear);
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
                    </div>
                </Link>
                <Link to={`/`} className="logbutt">Log out</Link>
            </div>
            <div className="Choose">
                {window.location.pathname.split('/').pop() === "00" ? (
                <>
                    <Link to={`/`} className="ten">CCS Events</Link>
                    <Link to={`/calendar/${window.location.pathname.split('/').pop()}`} className="con">Calendar</Link>
                    <Link to={`/about/${window.location.pathname.split('/').pop()}`} className="ten">About</Link>
                    <Link to={`/contacts/${window.location.pathname.split('/').pop()}`} className="ten">Contacts</Link>
                </>
                ) : (
                <>
                    <Link to={`/userhome/${window.location.pathname.split('/').pop()}`} className="ten">CCS Events</Link>
                    <Link to={`/calendar/${window.location.pathname.split('/').pop()}`} className="con">Calendar</Link>
                    <Link to={`/user/${window.location.pathname.split('/').pop()}`} className="ten">Your Events</Link>
                    <Link to={`/about/${window.location.pathname.split('/').pop()}`} className="ten">About</Link>
                    <Link to={`/contacts/${window.location.pathname.split('/').pop()}`} className="ten">Contacts</Link>
                </>
                )}
        </div>
            <div className="bodybox">
                <div className="calendar">
                    <div className="tit fonak fonsileb">{getMonthName(currentMonth)} {currentYear}</div>
                    
                    <table className="cal">
                        <thead className="fonak fonsiltit">
                            <tr>
                                <th>Sunday</th>
                                <th>Monday</th>
                                <th>Tuesday</th>
                                <th>Wednesday</th>
                                <th>Thursday</th>
                                <th>Friday</th>
                                <th>Saturday</th>
                            </tr>
                        </thead>
                        <tbody>
                            {weeksInMonth.map((week, index) => (
                                <tr key={index}>
                                    {week.map((day, idx) => (
                                        <td key={idx} className="day">
                                            {day !== null ? (
                                                <React.Fragment>
                                                    <div>{day}</div>
                                                    {data.map((venue, idx) => {
                                                        const eventDate = new Date(venue.start_time).getDate();
                                                        const eventMonth = new Date(venue.start_time).getMonth();
                                                        const eventYear = new Date(venue.start_time).getFullYear();
                                                        const eventeDate = new Date(venue.end_time).getDate();
                                                        const eventeMonth = new Date(venue.end_time).getMonth();
                                                        const eventeYear = new Date(venue.end_time).getFullYear();
                                                        if (eventDate === day && eventMonth === currentMonth && eventYear === currentYear) {
                                                            return (
                                                                <div key={idx} className="event fonak" >
                                                                    <div><b>Event:</b> {venue.event}</div>
                                                                    <div><b>Org:</b> {venue.name}</div>
                                                                    <div><b>Location:</b> {venue.where}</div>
                                                                </div>
                                                            );
                                                        }
                                                        if (eventeDate === day && eventeMonth === currentMonth && eventeYear === currentYear) {
                                                            return (
                                                                <div key={idx} className="event fonak" >
                                                                    <div><b>Event:</b> {venue.event}</div>
                                                                    <div><b>Org:</b> {venue.name}</div>
                                                                    <div><b>Location:</b> {venue.where}</div>
                                                                </div>
                                                            );
                                                        }
                                                        return null;
                                                    })}
                                                </React.Fragment>
                                            ) : null}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="monbut">
                        <button onClick={handlePreviousMonth} >Previous Month</button>
                        <button onClick={handleNextMonth}>Next Month</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function getMonthName(month) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return months[month];
}

export default Calendar;