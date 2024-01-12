import { GrLanguage } from "react-icons/gr";
import { IoMdArrowDropdown } from "react-icons/io";
import "./LangBtn.css"
const LangBtn = () => {
  return (
    <div className="language">
    <GrLanguage /> Svenska <IoMdArrowDropdown />
  </div>
  )
}

export default LangBtn