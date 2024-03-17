import { Link } from "react-router-dom";

function About() {

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
        {window.location.pathname.split('/').pop() === "00" ? (
          <>
            <Link to={`/`} className="ten">CCS Events</Link>
            <Link to={`/calendar/${window.location.pathname.split('/').pop()}`} className="ten">Calendar</Link>
            <Link to={`/about/${window.location.pathname.split('/').pop()}`} className="con">About</Link>
            <Link to={`/contacts/${window.location.pathname.split('/').pop()}`} className="ten">Contacts</Link>
          </>
        ) : (
          <>
            <Link to={`/userhome/${window.location.pathname.split('/').pop()}`} className="ten">CCS Events</Link>
            <Link to={`/calendar/${window.location.pathname.split('/').pop()}`} className="ten">Calendar</Link>
            <Link to={`/user/${window.location.pathname.split('/').pop()}`} className="ten">Your Events</Link>
            <Link to={`/about/${window.location.pathname.split('/').pop()}`} className="con">About</Link>
            <Link to={`/contacts/${window.location.pathname.split('/').pop()}`} className="ten">Contacts</Link>
          </>
        )}
    
 
  </div>
<div className="bodybox">
  <p className="fonak pmar jus word">
            
            <h2 className="scr">Welcome to TheNest - Your Premier Venue Booking Platform for the College of Computer Studies!</h2>
<br></br>
            <h4 className="tiel">About Us</h4>

            At TheNest, we are proud to introduce a specialized service tailored specifically for the vibrant community of the College of Computer Studies (CCS). Our platform is dedicated to simplifying the process of finding and booking venues for events within CCS, ensuring that every gathering, seminar, workshop, et cetera is held in the perfect setting.

            <br></br> <br></br><h4 className="tiel">Our Mission</h4>

            Our mission at TheNest is to empower the CCS community by providing a seamless and efficient solution for event venue booking. We aim to enhance the experience of students, faculty, and staff alike by offering a curated selection of venues and facilitating hassle-free bookings, ultimately fostering a vibrant culture of collaboration and innovation within the college.

            <br></br> <br></br><h4 className="tiel">Get Started with TheNest</h4>

            Explore Venues: Browse through our carefully curated selection of venues within the CCS campus, each offering unique amenities and features to suit your event requirements.

            Book with Ease: Once you've found the perfect venue, simply select your preferred date and time, review the pricing details, and confirm your booking online. It's that simple!

            Host Your Event: With your venue secured, you can focus on planning and executing a successful event, knowing that you have the perfect space reserved through TheNest.

            <br></br><br></br><h4 className="tiel"> Join TheNest Community</h4>

            Join our growing community of event organizers and venue seekers within the CCS community. Stay connected, share insights, and discover new opportunities for collaboration and networking.</p>
       
    </div></div>
);
}

export default About;