/**
 * Copyright 2019
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/

import React from 'react'
import { connect } from 'react-redux';
import T from 'i18n-react/dist/i18n-react'
import history from '../history'
import { createReservation, payReservation } from '../actions/order-actions'

const stepDefs = ['start', 'details', 'checkout', 'done'];

class SubmitButtons extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
        };

        this.continueClick = this.continueClick.bind(this);
        this.backClick = this.backClick.bind(this);
        this.payClick = this.payClick.bind(this);
        this.reservationClick = this.reservationClick.bind(this);

    }

    continueClick(ev) {
        let {step} = this.props;
        ev.preventDefault();
        history.push(stepDefs[step]);        
    }

    reservationClick(ev) {
        let {errors, dirty, createReservation, order} = this.props;
        ev.preventDefault();
        if((Object.keys(errors).length === 0)) {
            let {email, first_name, last_name, company, tickets} = order;            
            createReservation(email, first_name, last_name, company, tickets);
        } else {
            return dirty.call();
        }
    }

    backClick(ev) {
        let {step} = this.props;
        let backStep = step - 2; // step is one plus the stepDef index
        ev.preventDefault();
        history.push(stepDefs[backStep]);
    }

    payClick(ev) {
        let {dirty, errors, stripe, token, order, step} = this.props;
        ev.preventDefault();
        if((Object.keys(errors.errors).length === 0) && errors.stripeForm) {
            // stepDefs start on 0 so next step is the same as step
            history.push(stepDefs[step]);
        } else {
            return dirty.call();
        }
        
        // stripe.handleCardPayment(
        //     client_secret, token, {
        //         payment_method_data: {
        //             billing_details: {name: `${order.first_name} ${order.last_name}`}
        //         }
        //     }
        // ).then(function(result) {
        //     if (result.error) {
        //         // Display error.message in your UI.
        //         this.continueClick(ev);
        //     } else {
        //         // The payment has succeeded. Display a success message.
        //         this.continueClick(ev);
        //     }
        // });

    }

    render() {
        let {step, canContinue} = this.props;

        return (
            <div className="row submit-buttons-wrapper">
                <div className="col-md-12">
                    {step > 1 &&
                    <a href="" className="back-btn" onClick={this.backClick}>
                        <i className="fa fa-chevron-left" aria-hidden="true"></i>
                        {T.translate("general.back")}
                    </a>
                    }

                    {step == 1 &&
                    <button className="btn btn-primary continue-btn" onClick={this.continueClick} disabled={!canContinue}>
                        {T.translate("general.continue")}
                    </button>
                    }

                    {step == 2 &&
                    <button className="btn btn-primary continue-btn" onClick={this.reservationClick}>
                        {T.translate("general.continue")}
                    </button>
                    }

                    {step == 3 &&
                    <button className="btn btn-primary continue-btn" onClick={this.payClick}>
                        {T.translate("general.pay_now")}
                    </button>
                    }

                </div>
            </div>
        );

    }
}

const mapStateToProps = ({ loggedUserState, summitState, orderState }) => ({
    member: loggedUserState.member,
    summit: summitState.summit,
    order:  orderState.order
})

export default connect (
    mapStateToProps,
    {
        createReservation,
        payReservation
    }
)(SubmitButtons);

