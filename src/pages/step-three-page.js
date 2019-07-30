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
import { saveOrderDetails, handleOrderChange } from '../actions/order-actions'
import {findElementPos} from "openstack-uicore-foundation/lib/methods";
import PaymentInfoForm from "../components/payment-info-form";
import BillingInfoForm from "../components/billing-info-form";


import '../styles/step-three-page.less';


class StepThreePage extends React.Component {

    constructor(props){
        super(props);

        this.state = {

        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    componentWillMount() {
        let order = {...this.props.order};
        let currentStep = 2
        
        order = {
            ...order,
            currentStep
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

    handleSubmit(ev) {
        ev.preventDefault();
        this.props.saveOrderDetails();
    }

    render(){
        let {summit, order, errors} = this.props;

        return (
            <div className="step-three">
                <StepRow step={3} />
                <div className="row">
                    <div className="col-md-8">
                        <PaymentInfoForm onChange={this.handleChange} order={order} summit={summit} errors={errors} />
                        <BillingInfoForm onChange={this.handleChange} order={order} summit={summit} errors={errors} />
                    </div>
                    <div className="col-md-4">
                        <OrderSummary order={order} summit={summit} />
                        <EventInfo />
                    </div>
                </div>
                <SubmitButtons step={3} canContinue={(Object.keys(errors).length == 0)} />
            </div>
        );
    }
}

const mapStateToProps = ({ loggedUserState, summitState, orderState }) => ({
    member: loggedUserState.member,
    summit: summitState.summit,
    order:  orderState.order,
    errors:  orderState.errors
})

export default connect (
    mapStateToProps,
    {
        saveOrderDetails,
        handleOrderChange
    }
)(StepThreePage);

