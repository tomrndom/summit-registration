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
import cloneDeep from "lodash.clonedeep";
import OrderSummary from "../../components/order-summary";
import TicketPopup from "../../components/ticket-popup";
import TicketOptions from "../../components/ticket-options";

import { selectTicket, getTicketPDF, assignAtendee, handleTicketChange } from '../../actions/ticket-actions';
import { cancelOrder } from '../../actions/order-actions';

import '../../styles/order-detail-page.less';

class OrderDetailPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showPopup: false
    };  

    this.togglePopup = this.togglePopup.bind(this);
    this.handleTicketDownload = this.handleTicketDownload.bind(this);
    this.handleOrderCancel = this.handleOrderCancel.bind(this);
    this.handleTicketStatus = this.handleTicketStatus.bind(this);
    this.handleTicketUpdate = this.handleTicketUpdate.bind(this);
  }

  togglePopup(ticket) {
    ticket ? this.props.selectTicket(ticket) : this.props.selectTicket({});

    this.setState((prevState, props) => {
      return {
        showPopup: !prevState.showPopup
      }
    })
  }

  handleTicketStatus(ticket){
    const status = [
      { 
        text: 'UNASSIGNED',
        icon: 'fa-exclamation-circle',
        class: 'ticket-unset'
      },
      { 
        text: 'REQUIRED DETAILS NEEDED',
        icon: 'fa-exclamation-circle',
        class: 'ticket-warning'
      },
      { 
        text: 'READY TO USE',
        icon: 'fa-check-circle',
        class: 'ticket-complete'
      },
    ];
    if(!ticket.attendee_mail || ticket.attendee_mail === "") {
      return status[0];
    } else if (!ticket.extra_questions) {
      return status[1];
    } else if (ticket.extra_questions) {
      return status[2];
    }
  }

  handleTicketDownload() {    
    this.props.getTicketPDF();
  }

  handleOrderCancel(){
    let {order} = this.props;
    this.props.cancelOrder(order);
  }

  handleTicketUpdate(ticket){
    let { attendee_first_name, attendee_last_name, attendee_email, extra_questions } = ticket;    
    this.props.assignAtendee(attendee_email, attendee_first_name, attendee_last_name, extra_questions);
  }

  handleChange(ev) {
    let ticket = cloneDeep(this.props.ticket);
    let errors = cloneDeep(this.props.errors);
    let {value, id} = ev.target;

    delete(errors[id]);
    ticket[id] = value;

    this.props.handleTicketChange(ticket, errors);
  }

  render() {
      let {order, summit, ticket, errors, extraQuestions, member} = this.props;
      let {showPopup} = this.state;

      return (
          <div className="order-detail">
              <div className="row" style={showPopup? {overflow: 'hidden'} : {overflow: 'auto'}}>
                  <div className="col-md-8">
                    <div className="order-detail__title">
                      <h4><b>{summit.name}</b></h4>
                      California, US / September 18, 2019
                    </div>
                    <div className="ticket-list">
                      {summit.ticket_types.map((s, index) => {
                        return (
                          <React.Fragment key={s.id}>
                            {order.tickets.some(t => t.ticket_type_id === s.id) &&
                            <div className="ticket-type">
                              {s.name} Tickets x3
                            </div>
                            &&      
                            order.tickets.map(t => {
                              return (
                                s.id === t.ticket_type_id ?                                
                                <div className="row" key={t.id} onClick={() => this.togglePopup(t)}>                                  
                                  <div className="ticket complete p-2 col-sm-12 col-sm-offset-1">        
                                      <div className="col-sm-1">
                                        <i className={`fa fa-2x ${this.handleTicketStatus(t).icon} ${this.handleTicketStatus(t).class}`}></i>                             
                                      </div>
                                      <div className="col-sm-5">
                                          <h4>Speaker</h4>
                                          100% Discount
                                          <p className={`status ${this.handleTicketStatus(t).class}`}>{this.handleTicketStatus(t).text}</p>
                                      </div>
                                      <div className="col-sm-5">
                                          ned.stark@winterfell.com
                                      </div>
                                      <div className="col-sm-1">
                                          <h4>&#10095;</h4>
                                      </div>
                                  </div>
                                </div> 
                                : null  
                              )
                            })                           
                            }             
                          {index ? <div className="separator"></div> : null}
                          </React.Fragment>                   
                        )
                      })}                                                
                    </div>                      
                  </div>
                  <div className="col-md-4">
                      <OrderSummary order={order} summit={summit}/>
                      <TicketOptions cancelOrder={this.handleOrderCancel}/>
                  </div>
              </div>
              {showPopup ?  
                <TicketPopup  
                  ticket={ticket}
                  member={member}
                  status={this.handleTicketStatus(ticket).text}
                  onChange={this.handleChange}
                  extraQuestions={extraQuestions}
                  downloadTicket={this.handleTicketDownload}
                  closePopup={this.togglePopup.bind(this)}
                  updateTicket={this.handleTicketUpdate}
                  errors={errors}
                />  
              : null  
              }
          </div>
      );
    }
}

const mapStateToProps = ({ loggedUserState, orderState, summitState, ticketState }) => ({
    member: loggedUserState.member,
    order: orderState.selectedOrder,
    summit: summitState.selectedSummit,
    extraQuestions: summitState.selectedSummit.order_extra_questions,
    ticket: ticketState.selectedTicket,
    errors: ticketState.errors
})

export default connect(
    mapStateToProps,
    {
      selectTicket,
      getTicketPDF,
      cancelOrder,
      assignAtendee,
      handleTicketChange
    }
)(OrderDetailPage);