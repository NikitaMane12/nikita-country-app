import { Link } from "react-router-dom";

import "./Header.css";

const Header = () => {
  return (
    <header>
      <h1>Country Info App</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/serch">Search</Link>
        <Link to="/register"> Register</Link>

        <Link to="/login">Login</Link>
      </nav>
    </header>
  );
};

export default Header;
