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
            <Link to={`/about/${window.location.pathname.split('/').pop()}`} className="ten">About</Link>
            <Link to={`/contacts/${window.location.pathname.split('/').pop()}`} className="con">Contacts</Link>
          </>
        ) : (
          <>
            <Link to={`/userhome/${window.location.pathname.split('/').pop()}`} className="ten">CCS Events</Link>
            <Link to={`/calendar/${window.location.pathname.split('/').pop()}`} className="ten">Calendar</Link>
            <Link to={`/user/${window.location.pathname.split('/').pop()}`} className="ten">Your Events</Link>
            <Link to={`/about/${window.location.pathname.split('/').pop()}`} className="ten">About</Link>
            <Link to={`/contacts/${window.location.pathname.split('/').pop()}`} className="con">Contacts</Link>
          </>
        )}
  </div>
<div className="bodybox">
  <p className="fonak pmar jus word">
            
            <h4 className="tiel">Contacts Page - TheNest</h4>

            Thank you for choosing TheNest for your venue booking needs! If you have any inquiries or would like to get in touch with us, please feel free to contact us using the information below:

            <br></br> <br></br><h4 className="tiel">Phone Number:</h4>

            09651829504

            <br></br> <br></br><h4 className="tiel">Email:</h4>

            info@thenestvenue.com

            <br></br><br></br><h4 className="tiel"> Social Media:</h4>

            Facebook: https://www.facebook.com/msuiitjits<br></br>
            Youtube: https://www.youtube.com/channel/UC3txU1mOCCC0zgcs59nsE_g

            <br></br><br></br><h4 className="tiel"> Feedback and Suggestions:</h4>
            We value your feedback! If you have any suggestions or comments about our services, please email feedback@thenestvenue.com.
            <br></br><br></br><h4 className="tiel"> Technical Support:</h4>
            Encountering technical issues? Our technical support team is here to help. Please email support@thenestvenue.com for assistance.
            <br></br><br></br><h4 className="tiel"> Marketing and Partnerships:</h4>
            Interested in partnering with TheNest or collaborating on marketing initiatives? Contact our marketing team at marketing@thenestvenue.com.
            <br></br><br></br><h4 className="tiel"> Press Inquiries:</h4>
            For press inquiries or media requests, please reach out to our PR team at press@thenestvenue.com.
            <br></br><br></br><h4 className="tiel"> Feedback Form:</h4>
            We're constantly striving to improve our services. If you have a moment, please fill out our feedback form [here] to let us know about your experience with TheNest.
            <br></br><br></br><br></br><br></br>
            Thank you for choosing TheNest - the perfect venue for College of Computer Studies events! We look forward to assisting you with your booking needs.
            </p>


    </div></div>
);
}

export default About;