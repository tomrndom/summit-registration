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
import moment from "moment";
import cloneDeep from "lodash.clonedeep";
import OrderSummary from "../components/order-summary";
import EventInfo from "../components/event-info";
import BasicInfoForm from '../components/basic-info-form';
import TicketInfoForm from '../components/ticket-info-form';
import StepRow from '../components/step-row';
import SubmitButtons from "../components/submit-buttons";
import { saveOrderDetails, handleOrderChange } from '../actions/order-actions'
import {findElementPos} from "openstack-uicore-foundation/lib/methods";


import '../styles/step-two-page.less';


class StepTwoPage extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            dirty: false
        };

        this.step = 2;

        this.handleChange = this.handleChange.bind(this);
        this.handleTicketInfoChange = this.handleTicketInfoChange.bind(this);
        this.handleAddTicket = this.handleAddTicket.bind(this);
        this.handleRemoveTicket = this.handleRemoveTicket.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleShowErrors = this.handleShowErrors.bind(this);

    }

    componentWillMount() {
        let order = {...this.props.order};   
        
        order = {
            ...order,
            currentStep: this.step
        };
        
        this.props.handleOrderChange(order);
    }

    componentWillReceiveProps(nextProps) {
        //scroll to first error
        if(Object.keys(nextProps.errors).length > 0) {
            let firstError = Object.keys(nextProps.errors)[0]
            let firstNode = document.getElementById(firstError);
            if (firstNode) window.scrollTo(0, findElementPos(firstNode));
        }
    }

    handleTicketInfoChange(ticketId, field, value) {
        let order = cloneDeep(this.props.order);
        let errors = cloneDeep(this.props.errors);        

        order.tickets.forEach(tix => {
            if (tix.tempId == ticketId) {
                tix[field] = value;
            }
        });

        this.props.handleOrderChange(order, errors);
    }

    handleChange(ev) {
        let order = cloneDeep(this.props.order);
        let errors = cloneDeep(this.props.errors);
        let {value, id} = ev.target;

        delete(errors[id]);
        order[id] = value;

        this.props.handleOrderChange(order, errors);
    }

    handleAddTicket(ticketTypeId) {
        let order = cloneDeep(this.props.order);
        let errors = cloneDeep(this.props.errors);        
        let randomNumber = moment().valueOf();

        order.tickets.push({type_id: ticketTypeId, tempId: randomNumber});
        this.props.handleOrderChange(order, errors);
    }

    handleRemoveTicket(ticketId) {
        let order = cloneDeep(this.props.order);
        let errors = cloneDeep(this.props.errors);

        order.tickets = order.tickets.filter(t => t.tempId != ticketId);
        this.props.handleOrderChange(order, errors);
    }

    handleSubmit(ev) {
        ev.preventDefault();
        this.props.saveOrderDetails();
    }

    handleShowErrors() {        
        this.setState({dirty: true});
    }

    render(){
        let {summit, order, errors} = this.props;
        let {dirty} = this.state;        

        return (
            <div className="step-two">
                <StepRow step={this.step} />
                <div className="row">
                    <div className="col-md-8">
                        <BasicInfoForm order={order} errors={dirty? errors : {}} onChange={this.handleChange}/>
                        {summit.ticket_types.map((t,i) => (
                            <TicketInfoForm
                                key={`tixinfo_${t.ticket_type_id}_${i}`}
                                ticketType={t}
                                order={order}
                                errors={errors}
                                onAddTicket={this.handleAddTicket}
                                onRemoveTicket={this.handleRemoveTicket}
                                onChange={this.handleTicketInfoChange}
                            />
                        ))}
                    </div>
                    <div className="col-md-4">
                        <OrderSummary order={order} summit={summit} />
                        <EventInfo />
                    </div>
                </div>
                <SubmitButtons step={this.step} errors={errors} dirty={this.handleShowErrors}/>
            </div>
        );
    }
}

const mapStateToProps = ({ loggedUserState, summitState, orderState }) => ({
    member: loggedUserState.member,
    summit: summitState.currentSummit,
    order:  orderState.order,
    errors:  orderState.errors
})

export default connect (
    mapStateToProps,
    {
        saveOrderDetails,
        handleOrderChange
    }
)(StepTwoPage);

