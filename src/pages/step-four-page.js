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
import { Link } from 'react-router-dom';
import OrderSummary from "../components/order-summary";
import EventInfo from "../components/event-info";
import BasicInfoForm from '../components/basic-info-form';
import TicketInfoForm from '../components/ticket-info-form';
import StepRow from '../components/step-row';
import { saveOrderDetails, handleOrderChange } from '../actions/order-actions'
import {findElementPos} from "openstack-uicore-foundation/lib/methods";


import '../styles/step-four-page.less';
import history from '../history';


class StepFourPage extends React.Component {

    constructor(props){
        super(props);

        this.state = {

        };

        this.purchasedTickets = this.purchasedTickets.bind(this);

    }

    componentDidMount() {
      let {order:{checkout}} = this.props;
      const stepDefs = ['start', 'details', 'checkout', 'done'];
      if(Object.entries(checkout).length === 0 && checkout.constructor === Object) {
        history.push(stepDefs[0]);
      } else {
        window.scrollTo(0, 0);
      }
    }

    componentWillUnmount() {
      let {member, order} = this.props;

      if(member) {
        order = {
          ...order,
          checkout: {}
        };
      } else {
        order= {
          ...order,
          checkout: {},
          first_name: '',
          last_name: '',
          email: '',
          company: '',
          billing_country: '',
          billing_address: '',
          billing_city: '',
          billing_state: '',
          billing_zipcode: ''
        }        
      }

      this.props.handleOrderChange(order);
    }

    purchasedTickets(){
      let {order, summit: {ticket_types}} = this.props;

      let ticketSummary = [];
      
      order.tickets.forEach(tix => {
        let idx = ticketSummary.findIndex(o => o.ticket_type_id == (tix.type_id ? tix.type_id : tix.ticket_type_id));
        let tixType = ticket_types.find(tt => tt.id == (tix.type_id ? tix.type_id : tix.ticket_type_id));

        if (idx >= 0) {
            ticketSummary[idx].qty++;
        } else {
            let name = ticket_types.find(q => q.id === (tix.type_id ? tix.type_id : tix.ticket_type_id)).name;                
            ticketSummary.push({ticket_type_id: (tix.type_id ? tix.type_id : tix.ticket_type_id), name, qty: 1})
        }        
      });
      
      return ticketSummary;
    }

    render(){
        let {summit, order: {checkout}, order, errors, member} = this.props;

        this.purchasedTickets();

        return (
            <div className="step-four">
                <OrderSummary order={order} summit={summit} type={'mobile'} />
                <div className="row">
                    <div className="order-result">

                        <span>
                          {T.translate("step_four.thank_you")}
                          <br/>
                          {this.purchasedTickets().map(t => {
                            return (
                              <ul>
                                {`${t.qty} ${t.name}`}
                              </ul>
                            )
                          })}
                        </span>
                          
                            <span>
                              {T.translate("step_four.manage_text")}
                            <Link to="/a/member/orders">
                              {T.translate("step_four.manage_link_text")}
                            </Link>
                            {T.translate("step_four.page_text")}                          
                            </span>
                            <br/>
                            <span>
                            {T.translate("step_four.required_text")}
                            <br/><br/>
                              <Link to="/a/member/orders">
                                <button className="btn btn-primary manage-btn">
                                  {T.translate("step_four.manage")}
                                </button>
                              </Link>
                            </span>                            
                            {!member &&
                            <React.Fragment>
                              <br/>
                              <span>
                                {T.translate("step_four.register_text")}
                                <a href={`${window.IDP_BASE_URL}/auth/register`}>
                                  {T.translate("step_four.register_link_text")}
                                </a>
                                {T.translate("step_four.register_text_2")}
                                {order.email}
                                {T.translate("step_four.register_text_3")}                              
                              </span>              
                            </React.Fragment>              
                            }
                            <br/>
                            <span>
                              {T.translate("step_four.help_text")} 
                              <a href={`mailto:${window.SUPPORT_EMAIL}`}>{window.SUPPORT_EMAIL}</a>
                            </span>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ loggedUserState, summitState, orderState }) => ({
    member: loggedUserState.isLoggedUser,
    summit: summitState.purchaseSummit,
    order:  orderState.purchaseOrder,
    errors:  orderState.errors
})

export default connect (
    mapStateToProps,
    {
        saveOrderDetails,
        handleOrderChange
    }
)(StepFourPage);

