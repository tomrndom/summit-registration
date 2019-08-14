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
                cardNumber: { message: '', required: false },
                cardExpiry: { message: '', required: false },
                cardCvc: { message: '', required: false },
            }
        };

        // this.hasErrors = this.hasErrors.bind(this);
        this.hasStripeErrors = this.hasStripeErrors.bind(this);
        this.hasUncompletedFields = this.hasUncompletedFields.bind(this);
    }

    hasErrors(field) {        
        let {errors} = this.props;     
        console.log(errors)   
        if(field in errors) {
            return errors[field];
        }
        return '';
    }

    hasStripeErrors(ev) {
        let {error, elementType} = ev;          

        if(error) {
            switch(elementType) {
                case 'cardNumber':
                    this.setState({
                        stripeErrors: { ...this.state.stripeErrors, cardNumber: { message: error.message}}
                    }, () => this.hasUncompletedFields(ev));
                    break;
                case 'cardExpiry':                    
                    this.setState({ 
                        stripeErrors: { ...this.state.stripeErrors, cardExpiry: { message: error.message}}
                    }, () => this.hasUncompletedFields(ev));
                    break;
                case 'cardCvc':                    
                    this.setState({ 
                        stripeErrors: { ...this.state.stripeErrors, cardCvc: { message: error.message}}
                    }, () => this.hasUncompletedFields(ev));
                    break;
            }            
        } else {
            this.setState({ 
                    stripeErrors: { ...this.state.stripeErrors, [elementType]: { message: ''}}
                }, () => this.hasUncompletedFields(ev));
        }                
    }

    hasUncompletedFields(ev){    
        let {complete, elementType} = ev;
        let {onChange} = this.props;        
        let {message} = this.state.stripeErrors[elementType];        

        if(complete) {
            this.setState({ 
                stripeErrors: { ...this.state.stripeErrors, [elementType]: { message, required: true }}
            }, () => onChange(this.state.stripeErrors));
        } else {
            this.setState({ 
                stripeErrors: { ...this.state.stripeErrors, [elementType]: { message, required: false }}
            }, () => onChange(this.state.stripeErrors));
        }
    }


    render() {
        let {order, onChange} = this.props;
        let {stripeErrors: {cardNumber, cardExpiry, cardCvc}} = this.state;

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
                {/* <div className="row field-wrapper">
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
                </div> */}
                <div className="row field-wrapper">
                    <div className="col-md-4">
                        <label>{T.translate("step_three.card_number")} *</label>
                    </div>
                    <div className="col-md-6">
                        <CardNumberElement style={style} className="form-control stripe-input" onChange={this.hasStripeErrors} />
                        {cardNumber.message && <p className="error-label">{cardNumber.message}</p>}                        
                        {/* <Input
                            id="cardNumber"
                            className="form-control"
                            error={this.hasErrors('cardNumber')}
                            onChange={onChange}
                            value={order.cardNumber}
                        /> */}
                    </div>
                </div>
                <div className="row field-wrapper">
                    <div className="col-md-4">
                        <label>{T.translate("step_three.expiration")} *</label>
                    </div>
                    <div className="col-md-3">
                        <CardExpiryElement style={style} className="form-control stripe-input" onChange={this.hasStripeErrors}/>                        
                        {cardExpiry.message && <p className="error-label">{cardExpiry.message}</p>}
                        {/* <Input
                            id="cardExpiry"
                            className="form-control"
                            error={this.hasErrors('cardExpiry')}
                            onChange={onChange}
                            value={order.cardExpiry}
                        /> */}
                    </div>
                    <div className="col-md-3">
                        <CardCvcElement style={style} className="form-control stripe-input" onChange={this.hasStripeErrors} />                        
                        {cardCvc.message && <p className="error-label">{cardCvc.message}</p>}
                        {/* <Input
                            id="cardCvc"
                            className="form-control"
                            error={this.hasErrors('cardCvc')}
                            onChange={onChange}
                            value={order.cardCvc}
                        /> */}
                    </div>
                </div>
            </div>
        );
    }
}

export default injectStripe(PaymentInfoForm);
