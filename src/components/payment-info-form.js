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
import { findElementPos } from 'openstack-uicore-foundation/lib/methods'
import { CardNumberElement,
         CardExpiryElement,
         CardCvcElement,
         injectStripe } from 'react-stripe-elements';
import { Input } from 'openstack-uicore-foundation/lib/components'


class PaymentInfoForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            stripeErrors: {
                cardNumber: '',
                cardExpiry: '',
                cardCvc: '',
            }
        };

        // this.hasErrors = this.hasErrors.bind(this);
        this.hasStripeErrors = this.hasStripeErrors.bind(this);
    }

    hasErrors(field) {
        let {errors} = this.props;
        if(field in errors) {
            return errors[field];
        }

        return '';
    }

    hasStripeErrors(ev) {
        let {error, complete, elementType} = ev;        

        console.log('has striped', ev);

        if(!complete && error) {
            switch(elementType) {
                case 'cardNumber':
                    console.log('card numbner');
                    // this.hasErrors('card_number');                    
                    this.setState({ stripeErrors: { ...this.state.stripeErrors, cardNumber: error.message }})                    
                    break;
                case 'cardExpiry':
                    console.log('card ex');
                    // this.hasErrors('card_expiration');
                    this.setState({ stripeErrors: { ...this.state.stripeErrors, cardExpiry: error.message }})
                    console.log('card ccv');
                    break;
                case 'cardCvc':
                    // this.hasErrors('card_cvc');
                    this.setState({ stripeErrors: { ...this.state.stripeErrors, cardCvc: error.message } })
                    break;
            }
        }
    }


    render() {
        let {order, onChange} = this.props;
        let {stripeErrors: {cardNumber, cardExpiry, cardCvc}} = this.state;

        console.log('state', this.state);
        console.log(cardNumber, cardExpiry, cardCvc);

        const style = {
            base: {
                // Add your base input styles here. For example: #d4e5f4
                color: '#3486cd',
                fontSize: '16px',
            },
            invalid: {
                color: '#e5424d',
                ':focus': {
                  color: '#3486cd',
                },
            },
        };        

        return (
            <div className="payment-info">
                <div className="row">
                    <div className="col-md-8">
                        <h3>{T.translate("step_three.payment_info")}</h3>
                    </div>
                    <div className="col-md-4">
                        * {T.translate("step_three.required")}
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        {T.translate("step_three.payment_subtitle")}
                    </div>
                </div>
                <div className="row field-wrapper">
                    <div className="col-md-4">
                        <label>{T.translate("step_three.cardholder_name")} *</label>
                    </div>
                    <div className="col-md-6">
                        <Input
                            id="cardholder_name"
                            className="form-control"
                            error={this.hasErrors('cardholder_name')}
                            onChange={onChange}
                            value={order.cardholder_name}
                        />
                    </div>
                </div>
                <div className="row field-wrapper">
                    <div className="col-md-4">
                        <label>{T.translate("step_three.card_number")} *</label>
                    </div>
                    <div className="col-md-6">
                        <CardNumberElement style={style} className="form-control stripe-input" onChange={this.hasStripeErrors} />
                        {cardNumber && <p class="error-label">{cardNumber}</p>}                        
                        <Input
                            id="card_number"
                            className="form-control"
                            error={this.hasErrors('card_number')}
                            onChange={onChange}
                            value={order.card_number}
                        />
                    </div>
                </div>
                <div className="row field-wrapper">
                    <div className="col-md-4">
                        <label>{T.translate("step_three.expiration")} *</label>
                    </div>
                    <div className="col-md-3">
                        <CardExpiryElement style={style} className="form-control stripe-input" onChange={this.hasStripeErrors}/>                        
                        {cardExpiry && <p class="error-label">{cardExpiry}</p>}
                        <Input
                            id="card_expiration"
                            className="form-control"
                            error={this.hasErrors('card_expiration')}
                            onChange={onChange}
                            value={order.card_expiration}
                        />
                    </div>
                    <div className="col-md-3">
                        <CardCvcElement style={style} className="form-control stripe-input" onChange={this.hasStripeErrors} />                        
                        {cardCvc && <p class="error-label">{cardCvc}</p>}
                        <Input
                            id="card_cvc"
                            className="form-control"
                            error={this.hasErrors('card_cvc')}
                            onChange={onChange}
                            value={order.card_cvc}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default injectStripe(PaymentInfoForm);
