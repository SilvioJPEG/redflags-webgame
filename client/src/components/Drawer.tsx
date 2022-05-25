import "../styles/Drawer.scss";
import arrow from "../assets/return.svg";
const Drawer: React.FC = () => {
  return (
    <div id="drawer">
      <div></div>
      <div></div>
      <img id="arrow" src={arrow} alt="arrow" />
    </div>
  );
};

export default Drawer;
