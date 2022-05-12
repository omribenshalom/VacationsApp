import { useNavigate } from "react-router-dom";

import { IoIosArrowBack } from "react-icons/io";

import "./AboutUs.css";

function AboutUs(): JSX.Element {
  const navigate = useNavigate();

  return (
    <div>
      <div className="aboutUs">
        <h1>About Us</h1>
        <br />
        <p>
          Nam ornare, augue non mollis aliquet, turpis elit vestibulum eros, vel
          auctor enim erat nec purus. Vestibulum dignissim tincidunt odio, eget
          gravida leo rutrum bibendum. Praesent mollis lacus sit amet sapien
          venenatis, eget tincidunt ex gravida. Curabitur facilisis purus
          faucibus, pellentesque urna id, gravida libero. Interdum et malesuada
          fames ac ante ipsum primis in faucibus.
        </p>
        <p>
          Pellentesque vitae dui a justo tempor suscipit vitae nec nunc. Donec
          mauris tortor, pellentesque sit amet malesuada sit amet, auctor non
          magna. Duis pellentesque luctus pretium. Sed sit amet orci quis tellus
          molestie condimentum. Donec non feugiat purus. Donec a mauris id est
          pretium dapibus in vel odio. Praesent finibus ac dolor at viverra. In
          feugiat lectus est, dignissim sodales erat sagittis non. Nam venenatis
          nisi eu rutrum malesuada.
        </p>
        <button
          className="btn"
          onClick={() => {
            navigate("/home");
          }}
        >
          <h2>
            <IoIosArrowBack className="icon" />
          </h2>
        </button>
      </div>
    </div>
  );
}

export default AboutUs;
