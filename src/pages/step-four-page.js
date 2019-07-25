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
import OrderSummary from "../components/order-summary";
import EventInfo from "../components/event-info";
import BasicInfoForm from '../components/basic-info-form';
import TicketInfoForm from '../components/ticket-info-form';
import StepRow from '../components/step-row';
import { saveOrderDetails, handleOrderChange } from '../actions/order-actions'
import {findElementPos} from "openstack-uicore-foundation/lib/methods";


//import '../styles/step-two-page.less';


class StepFourPage extends React.Component {

    constructor(props){
        super(props);

        this.state = {

        };

    }


    render(){
        let {summit, order, errors} = this.props;

        return (
            <div className="step-four">
                <div className="row">
                    <div className="col-md-12">
                        <h1>{T.translate("step_four.congratulations")}</h1>
                        <p>{T.translate("step_four.subtitle")}</p>
                        <p>{T.translate("step_four.text")}</p>
                        <div className="order_no_box">
                            <p>{T.translate("step_four.order_no")}</p>
                        </div>
                        <button className="btn btn-primary manage-btn">
                            {T.translate("step_four.manage")}
                        </button>
                    </div>
                </div>
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
)(StepFourPage);

