import { BsLinkedin } from "react-icons/bs";
import { BsGithub } from "react-icons/bs";

import "./Footer.css";

function Footer(): JSX.Element {
  const year = new Date().getFullYear();

  return (
    <div className="Footer">
      <div className="links-container">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.linkedin.com/in/omri-ben-shalom"
        >
          <BsLinkedin className="icon" size={25} />
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/omribenshalom"
        >
          <BsGithub className="icon" size={25} />
        </a>
      </div>

      <p> {year} &copy; Omri Ben Shalom </p>
    </div>
  );
}

export default Footer;
