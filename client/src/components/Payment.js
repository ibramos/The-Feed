import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import { connect } from "react-redux";
import * as actions from "../actions/actions";

class Payment extends Component {
  render() {
    return (
      <StripeCheckout
        name="The Feed"
        description="$1 to purchase 1 credit"
        amount={100}
        token={token => this.props.handleToken(token)}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        <button className="btn"> Add Credits </button>
      </StripeCheckout>
    );
  }
}

export default connect(null, actions)(Payment);
