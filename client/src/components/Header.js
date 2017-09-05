import React, { Component } from "react";

class Header extends Component {
  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <a className="left brand-logo">
            The Feed
          </a>
          <ul className="right">
            <li>
              <a>Sign In With Google</a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Header;
