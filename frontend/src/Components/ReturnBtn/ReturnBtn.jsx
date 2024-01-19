import { MdArrowBackIos } from "react-icons/md";
import { Link } from "react-router-dom";

import "./ReturnBtn.css";

const ReturnBtn = () => {


  // ----- Return button component linking back to the homepage

  return (
    <Link to={"/"}>
      <button className="returnBtn">
        <MdArrowBackIos /> Fortsätt handla
      </button>
    </Link>
  );
};

export default ReturnBtn;
