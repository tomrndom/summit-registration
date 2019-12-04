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

import React from 'react';
import { connect } from 'react-redux';
import T from "i18n-react/dist/i18n-react";
import cloneDeep from "lodash.clonedeep";
import OrderSummary from "../components/order-summary";
import EventInfo from "../components/event-info";
import StepRow from '../components/step-row';
import SubmitButtons from "../components/submit-buttons";
import { saveOrderDetails, handleOrderChange, validateStripe } from '../actions/order-actions'
import {findElementPos} from "openstack-uicore-foundation/lib/methods";
import { Elements, StripeProvider } from 'react-stripe-elements';
import PaymentInfoForm from "../components/payment-info-form";
import BillingInfoForm from "../components/billing-info-form";


import '../styles/step-three-page.less';
import history from '../history';


class StepThreePage extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            stripe: {},
            token: {},
            dirty: false
        };

        this.step = 3;

        this.handleChange = this.handleChange.bind(this);
        this.handleStripe = this.handleStripe.bind(this);
        this.handleShowErrors = this.handleShowErrors.bind(this);

    }

    componentWillMount() {
        let order = {...this.props.order};
        
        order = {
            ...order,
            currentStep: this.step
        };

        let address = this.props.member ? this.props.member.address : {};

        if(Object.entries(address).length !== 0 && address.constructor === Object) {        
          let {country, region, locality, postal_code, street_address} = address;
          order = {
            ...order, 
            billing_country: country ? country : '',
            billing_address: street_address ? street_address : '',
            billing_city: locality ? locality : '',
            billing_state: region ? region : '',
            billing_zipcode: postal_code ? postal_code : '',
          };
        }       
        
        this.props.handleOrderChange(order)
    }

    componentWillReceiveProps(nextProps) {
        //scroll to first error
        if(Object.keys(nextProps.errors).length > 0) {
            let firstError = Object.keys(nextProps.errors)[0]
            let firstNode = document.getElementById(firstError);
            if (firstNode) window.scrollTo(0, findElementPos(firstNode));
        }
    }

    componentDidMount() {
        let {order:{reservation}} = this.props;
        const stepDefs = ['start', 'details', 'checkout', 'done'];
        if(Object.entries(reservation).length === 0 && reservation.constructor === Object) {
          history.push(stepDefs[0]);
        } else {
          window.scrollTo(0, 0);
        }
    }

    handleChange(ev) {
        let order = cloneDeep(this.props.order);
        let errors = cloneDeep(this.props.errors);
        let {value, id} = ev.target;

        delete(errors[id]);
        order[id] = value;

        this.props.handleOrderChange(order, errors);
    }

    async handleStripe(ev, stripe) {        
        let stripeErrors = Object.values(ev).filter(x => x.required === true && x.message === '');
        if(stripeErrors.length === 3) { 
            let {card} = await stripe.createToken({name: "Name"});
            this.setState({card, stripe}, () => this.props.validateStripe(true));
        } else {
            this.props.validateStripe(false);         
        }
    }

    handleShowErrors() {
        this.setState({dirty: true});
    }

    render(){
        let {summit, order, errors, stripeForm} = this.props;
        let {card, stripe, dirty} = this.state; 

        let address = this.props.member ? this.props.member.address : {};

        return (
            <div className="step-three">
                <OrderSummary order={order} summit={summit} type={'mobile'} />
                <StepRow step={this.step} />
                    <div className="row">
                        <div className="col-md-8">
                        <StripeProvider apiKey={window.STRIPE_PRIVATE_KEY}>
                            <Elements>
                                <PaymentInfoForm 
                                    onChange={this.handleStripe} 
                                    order={order} 
                                    dirty={dirty} />
                            </Elements>
                        </StripeProvider>
                            <BillingInfoForm 
                                onChange={this.handleChange}
                                order={order} 
                                summit={summit} 
                                address={address}
                                errors={dirty ? errors : {}} />
                        </div>
                        <div className="col-md-4">
                            <OrderSummary order={order} summit={summit} type={'desktop'} />
                        </div>
                    </div>
                <SubmitButtons 
                    step={this.step} 
                    stripe={stripe} 
                    card={card}
                    errors={{errors, stripeForm}}
                    dirty={this.handleShowErrors} />
            </div>
        );
    }
}

const mapStateToProps = ({ loggedUserState, summitState, orderState }) => ({
    member: loggedUserState.member,
    summit: summitState.currentSummit,
    order:  orderState.purchaseOrder,
    errors:  orderState.errors,
    stripeForm:  orderState.stripeForm,
})

export default connect (
    mapStateToProps,
    {
        saveOrderDetails,
        handleOrderChange,
        validateStripe
    }
)(StepThreePage);

