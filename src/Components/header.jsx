import React from "react";
import { useAuth } from "../utils/AuthContext";
import { Link } from "react-router-dom";
import { LogOut } from "react-feather";

const Header = () => {
  const { user, handleLogOut } = useAuth();
  return (
    <div className="header--wrapper">
      {user ? (
        <>
          Welcome {user.name}
          <LogOut className="header--link" onClick={handleLogOut
            
          }/>
        </>
      ) : (
        <Link to='/login' className="btn btn--lg btn--main">Login</Link>
      )}
    </div>
  );
};

export default Header;
