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
import EventInfo from "../components/event-info";
import TicketInput from "../components/ticket-input";
import StepRow from '../components/step-row';
import SubmitButtons from "../components/submit-buttons";
import { handleOrderChange } from '../actions/order-actions'


import '../styles/step-one-page.less';


class StepOnePage extends React.Component {

    constructor(props){
        super(props);

        this.state = {
        };

        this.step = 1;

        this.handleAddTicket = this.handleAddTicket.bind(this);
        this.handleSubstractTicket = this.handleSubstractTicket.bind(this);
    }

    componentWillMount() {

    }

    componentWillMount() {
        let order = {...this.props.order};        
        
        order = {
            ...order,
            currentStep: this.step
        };
        
        this.props.handleOrderChange(order)
    }

    handleAddTicket(ticketTypeId) {
        let order = {...this.props.order};
        let randomNumber = moment().valueOf();

        order.tickets.push({id: randomNumber, tix_type_id: ticketTypeId});
        this.props.handleOrderChange(order)
    }

    handleSubstractTicket(ticketTypeId) {
        let order = {...this.props.order};
        let idx = order.tickets.findIndex(t => t.tix_type_id == ticketTypeId);

        if (idx !== -1) {
            order.tickets.splice(idx,1);
            this.props.handleOrderChange(order)
        }
    }

    render(){

        let {summit, order} = this.props;

        return (
            <div className="step-one">
                <StepRow step={this.step} />
                <div className="row">
                    <div className="col-md-8">
                        <div className="row">
                            <div className="col-md-12">
                                <h3>{T.translate("step_one.choose_tickets")}</h3>
                                <p>{T.translate("step_one.choose_tickets_desc")}</p>
                            </div>
                            <div className="col-md-12">
                                <TicketInput
                                    ticketTypes={summit.ticketTypes}
                                    selection={order.tickets}
                                    add={this.handleAddTicket}
                                    substract={this.handleSubstractTicket}
                                />
                            </div>
                        </div>

                    </div>
                    <div className="col-md-4">
                        <EventInfo />
                    </div>
                </div>
                <SubmitButtons step={this.step} canContinue={order.tickets.length > 0} />
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
        handleOrderChange
    }
)(StepOnePage);

