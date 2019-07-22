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
import TicketInput from "../components/ticket-input";
import StepRow from '../components/step-row';
import SubmitButtons from "../components/submit-buttons";


import '../styles/step-one-page.less';


class StepOnePage extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            ticketSelection: props.ticketSelection
        };

        this.saveTicketQuantity = this.saveTicketQuantity.bind(this);
    }

    componentWillMount() {

    }

    saveTicketQuantity(selection) {
        this.setState({ticketSelection: selection})
    }

    render(){

        let {summit} = this.props;
        let {ticketSelection} = this.state;

        return (
            <div className="step-one">
                <StepRow step={1} />
                <div className="row">
                    <div className="col-md-8">
                        <div className="row">
                            <div className="col-md-12">
                                <h3>{T.translate("step_one.choose_tickets")}</h3>
                                <p>{T.translate("step_one.choose_tickets_desc")}</p>
                            </div>
                            <div className="col-md-12">
                                <TicketInput summit={summit} selection={ticketSelection} save={this.saveTicketQuantity} />
                            </div>
                        </div>

                    </div>
                    <div className="col-md-4 about-event-wrapper">
                        <div className="row">
                            <div className="col-md-12">
                                <h3>{T.translate("step_one.about_title")}</h3>
                                <p>{T.translate("step_one.about_desc")}</p>
                                <a>{T.translate("step_one.directions")}</a><br/>
                                <a>{T.translate("step_one.calendar")}</a>
                                <hr/>
                                <a>twitter</a><br/>
                                <a>facebook</a><br/>
                                <a>mail</a><br/>
                                <a>web</a><br/>
                            </div>
                        </div>
                    </div>
                </div>
                <SubmitButtons step={2} />
            </div>
        );
    }
}

const mapStateToProps = ({ loggedUserState, summitState, orderState }) => ({
    member: loggedUserState.member,
    summit: summitState.summit,
    ...orderState
})

export default connect (
    mapStateToProps,
    {

    }
)(StepOnePage);

