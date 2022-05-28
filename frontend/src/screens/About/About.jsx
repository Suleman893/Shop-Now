import "./About.css";
import MetaData from "../../component/layout/MetaData";
import user from "../../images/user.png";

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
                  <img src={user} />
                </div>
                <h1>Suleman Ahmad</h1>
                <p>
                  Hey! I am software developer. I have expertise in web
                  development technologies. <br />I love being a full stack
                  developer, i gives me complete freedom to code knowing whats
                  going on my web app frontend and backend
                </p>
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
