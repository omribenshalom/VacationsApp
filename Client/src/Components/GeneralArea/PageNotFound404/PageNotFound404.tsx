import { useNavigate } from "react-router-dom";

import "./PageNotFound404.css";

import { IoIosArrowBack } from "react-icons/io";

function PageNotFound404(): JSX.Element {
  const navigate = useNavigate();

  return (
    <div className="pageNotFound">
      <h1>Page Not Found</h1>
      <h3>404</h3>
      <br />
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
  );
}

export default PageNotFound404;
