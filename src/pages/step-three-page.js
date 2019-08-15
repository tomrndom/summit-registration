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


class StepThreePage extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            stripe: {},
            token: {}
        };

        this.step = 3;

        this.handleChange = this.handleChange.bind(this);
        this.handleStripe = this.handleStripe.bind(this);

    }

    componentWillMount() {
        let order = {...this.props.order};    
        
        order = {
            ...order,
            currentStep: this.step
        };
        
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

    handleChange(ev) {
        let order = cloneDeep(this.props.order);
        let errors = cloneDeep(this.props.errors);
        let {value, id} = ev.target;

        delete(errors[id]);
        order[id] = value;

        this.props.handleOrderChange(order, errors)
    }

    async handleStripe(ev, stripe) {
        let stripeErrors = Object.values(ev).filter(x => x.required === true && x.message === '');
        if(stripeErrors.length === 3) { 
            let {token} = await stripe.createToken({name: "Name"});
            this.setState({token, stripe}, () => this.props.validateStripe(true));
        } else {
            this.props.validateStripe(false);         
        }
    }

    async submit(ev) {
        let {token} = await this.props.stripe.createToken({name: "Name"});
        let response = await fetch("/charge", {
          method: "POST",
          headers: {"Content-Type": "text/plain"},
          body: token.id
        });
      
        if (response.ok) console.log("Purchase Complete!")
      }

    render(){
        let {summit, order, errors, stripeForm} = this.props;
        let {token, stripe} = this.state;

        return (
            <div className="step-three">
                <StepRow step={this.step} />
                    <div className="row">
                        <div className="col-md-8">
                        <StripeProvider apiKey={window.STRIPE_PRIVATE_KEY}>
                            <Elements>
                                <PaymentInfoForm onChange={this.handleStripe} order={order} />
                            </Elements>
                        </StripeProvider>
                            <BillingInfoForm onChange={this.handleChange} order={order} summit={summit} errors={errors} />
                        </div>
                        <div className="col-md-4">
                            <OrderSummary order={order} summit={summit} />
                            <EventInfo />
                        </div>
                    </div>
                <SubmitButtons stripe={stripe} token={token} order={order} step={this.step} canContinue={(Object.keys(errors).length == 0 && stripeForm === true)} />
            </div>
        );
    }
}

const mapStateToProps = ({ loggedUserState, summitState, orderState }) => ({
    member: loggedUserState.member,
    summit: summitState.summit,
    order:  orderState.order,
    errors:  orderState.errors,
    stripeForm:  orderState.stripeForm
})

export default connect (
    mapStateToProps,
    {
        saveOrderDetails,
        handleOrderChange,
        validateStripe
    }
)(StepThreePage);

