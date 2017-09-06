import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Header extends Component {
  renderContent() {
    switch (this.props.oAuth) {
      case null:
        return;
      case false:
        return (
          <li>
            <a href="/oAuth/google">Sign In With Google</a>
          </li>
        );
      default:
        return (
          <li>
            <a href="/api/logoutUser">Logout</a>
          </li>
        );
    }
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <Link
            to={this.props.oAuth ? "/surveys" : "/"}
            className="left brand-logo"
          >
            The Feed
          </Link>
          <ul className="right">{this.renderContent()}</ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps({ oAuth }) {
  return { oAuth };
}

export default connect(mapStateToProps)(Header);
