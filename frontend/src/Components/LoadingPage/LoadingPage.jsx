import "./LoadingPage.css";
import { motion } from "framer-motion";
import { ImSpinner11 } from "react-icons/im";

export default function LoadingPage() {
  return (
    <div className="loadingPage">
      <motion.div
        className="animatedSpinner"
        animate={{
          rotateZ: 360,
        }}
        transition={{
          duration: 2,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        <ImSpinner11 />
      </motion.div>
    </div>
  );
}
