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
import T from 'i18n-react/dist/i18n-react'
import history from '../history'

const stepDefs = ['start', 'details', 'checkout', 'done'];

export default class SubmitButtons extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
        };

        this.continueClick = this.continueClick.bind(this);
        this.backClick = this.backClick.bind(this);
        this.payClick = this.payClick.bind(this);

    }

    continueClick(ev) {
        let {step} = this.props;
        ev.preventDefault();
        // stepDefs start on 0 so next step is the same as step
        history.push(stepDefs[step]);
    }

    backClick(ev) {
        let {step} = this.props;
        let backStep = step - 2; // step is one plus the stepDef index
        ev.preventDefault();
        history.push(stepDefs[backStep]);
    }

    payClick(ev) {
        let {stripe, token, order} = this.props;
        
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

                    {step < 3 &&
                    <button className="btn btn-primary continue-btn" onClick={this.continueClick} disabled={!canContinue}>
                        {T.translate("general.continue")}
                    </button>
                    }

                    {step == 3 &&
                    <button className="btn btn-primary continue-btn" onClick={this.payClick} disabled={!canContinue}>
                        {T.translate("general.pay_now")}
                    </button>
                    }

                </div>
            </div>
        );

    }
}
