import { Link } from "react-router-dom";
import { nav } from "../../styles/Link.module.css";

const Nav = () => {
  return (
    <nav>
      <Link className={nav} to="/">
        Shop
      </Link>
      <Link className={nav} to="/account">
        Account
      </Link>
      <Link className={nav} to="/basket">
        Basket
      </Link>
    </nav>
  );
};

export default Nav;
