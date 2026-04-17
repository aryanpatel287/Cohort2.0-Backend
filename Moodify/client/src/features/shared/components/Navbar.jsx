import React from "react";
import ActiveUser from "../../auth/components/ActiveUser";
import "../styles/navbar.scss";

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="navbar-brand">Moodify</div>
      <div className="navbar-user-wrap">
        <ActiveUser />
      </div>
    </header>
  );
};

export default Navbar;
