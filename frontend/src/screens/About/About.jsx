import "./About.css";
import MetaData from "../../component/Layout/MetaData";
import pic from "../../images/pic.jpg";

const About = () => {
  return (
    <div>
      <MetaData title="About" />
      <div className="about-background">
        <div className="about-box">
          <h1 className="page-title">About Us</h1>
          <div className="about-box-wrapper">
            <div className="about-left">
              <div className="about-card">
                <div className="about-card-img">
                  <img src={pic} style={{ objectPosition: "center" }} />
                </div>
                <h1>Suleman Ahmad</h1>
                <p>E-commerce Store Project developed using MERN.</p>
              </div>
            </div>
            <div class="vl" />
            <div className="about-right">
              <h3>My Social Media Links</h3>
              <div className="about-social-links">
                <ul>
                  <li>
                    {" "}
                    <a href="#">LinkedIn</a>
                  </li>
                  <li>
                    <a href="#">Github</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
