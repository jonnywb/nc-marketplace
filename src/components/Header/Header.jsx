import Nav from "./Nav/Nav";
import { header } from "./Header.module.css";
import { h1 } from "../styles/Typography.module.css";

const Header = () => {
  return (
    <header className={header}>
      <h1 className={h1}>Marketplace</h1>
      <Nav />
    </header>
  );
};

export default Header;
