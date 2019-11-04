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

import { selectTicket, getTicketPDF, assignAttendee, handleTicketChange, refundTicket, removeAttendee, resendNotification } from '../../actions/ticket-actions';
import { cancelOrder } from '../../actions/order-actions';

import { daysBetweenDates, getFormatedDate } from '../../utils/helpers';

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
    this.handleSummitLocation = this.handleSummitLocation.bind(this);
    this.handleTicketDate = this.handleTicketDate.bind(this);
    this.handleTicketRemoveAttendee = this.handleTicketRemoveAttendee.bind(this);
    this.handleResendNotification = this.handleResendNotification.bind(this);
    this.handleTicketCancel = this.handleTicketCancel.bind(this);
    this.handleExpirationDate = this.handleExpirationDate.bind(this);
    this.handleTicketRole = this.handleTicketRole.bind(this);
    this.handleReassignDate = this.handleReassignDate.bind(this);

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
        orderClass: 'unset',
        class: 'ticket-unset'
      },
      { 
        text: 'REQUIRED DETAILS NEEDED',
        icon: 'fa-exclamation-circle',
        orderClass: 'warning',
        class: 'ticket-warning'
      },
      { 
        text: 'READY TO USE',
        icon: 'fa-check-circle',
        orderClass: 'complete',
        class: 'ticket-complete'
      },
      { 
        text: 'CANCELLED',        
        orderClass: 'cancel',
        class: 'ticket-cancel'
      },
    ];
    if(ticket.status === "Cancelled") {
      return status[3];
    }
    else if(ticket.owner_id === 0) {
      return status[0];
    } else if (!ticket.owner.extra_questions) {
      return status[1];
    } else if (ticket.owner.extra_questions) {
      let incomplete = ticket.owner.extra_questions.filter((q) => q.value == '');
      if(incomplete.length === 0) {
        return status[2];
      } else {
        return status[1];
      }
    }
  }

  handleTicketDownload() {    
    this.props.getTicketPDF();
  }

  handleOrderCancel(){
    let {order} = this.props;
    this.props.cancelOrder(order);
  }

  handleTicketCancel(ticket) {
    this.props.refundTicket(ticket);
  }

  handleTicketUpdate(ticket){    
    let { attendee_first_name, attendee_surname, attendee_email, extra_questions } = ticket;
    this.props.assignAttendee(attendee_email, attendee_first_name, attendee_surname, extra_questions);
  }

  handleTicketRemoveAttendee(ticket) {
    this.props.removeAttendee(ticket);
  }

  handleResendNotification() {
    this.props.resendNotification();
  }

  handleChange(ev) {
    let ticket = cloneDeep(this.props.ticket);
    let errors = cloneDeep(this.props.errors);
    let {value, id} = ev.target;

    delete(errors[id]);
    ticket[id] = value;

    this.props.handleTicketChange(ticket, errors);
  }

  handleTicketDate() {
    let {summit} = this.props;
    let dateRange = daysBetweenDates(summit.start_date, summit.end_date, summit.time_zone_id);
    
    if(dateRange.length > 1) {        
      let summitDate = `${getFormatedDate(dateRange[0])}, ${getFormatedDate(dateRange[dateRange.length-1])}`;
      return summitDate;
    } else {
      let summitDate = getFormatedDate(summit.start_date);
      return summitDate;
    }          
  }

  handleTicketRole(ticket) {
    let roles = [];
    ticket.badge.features.map(f => {
      roles.push(f.name);
    });
    if(roles.length) {
      return roles.join(', ');
    } else {
      return "Attendee";
    }
  }

  handleExpirationDate() {
    let {summit} = this.props;        
    return summit.registration_end_date;
  }

  handleReassignDate() {
    let {summit} = this.props;
    return summit.reassign_ticket_till_date;
  }

  handleSummitLocation() {
    let {summit} = this.props;
    if(summit.locations.length === 1) {
      let location = `${summit.locations[0].city}, ${summit.locations[0].country}`;
      return location;
    }
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
                      {this.handleSummitLocation()} / {this.handleTicketDate()}
                    </div>
                    <div className="ticket-list">
                      {summit.ticket_types.map((s, index) => {                        
                        return (
                          <React.Fragment key={s.id}>
                            {order.tickets.some(t => t.ticket_type_id === s.id) &&
                            <div className="ticket-type">
                              {s.name} Tickets ({order.tickets.filter(t => t.ticket_type_id === s.id).length})
                            </div>
                            }                            
                            {order.tickets.map(t => {
                              return (
                                s.id === t.ticket_type_id ?
                                <React.Fragment>
                                <div className="ticket-list-desktop">
                                    <div className="row" key={t.id} onClick={() => {t.status === "Cancelled" ? null: this.togglePopup(t)}}>
                                      <div className={`ticket ${this.handleTicketStatus(t).orderClass} p-2 col-sm-12 col-sm-offset-1`}>        
                                          <div className="col-sm-1">
                                            <i className={`fa fa-2x ${this.handleTicketStatus(t).icon} ${this.handleTicketStatus(t).class}`}></i>                             
                                          </div>
                                          <div className="col-sm-5">
                                              <h4>{this.handleTicketRole(t)}</h4>
                                              {t.discount > 0 && `${(t.discount * 100) / t.raw_cost}% Discount`}
                                              <p className={`status ${this.handleTicketStatus(t).class}`}>{this.handleTicketStatus(t).text}</p>
                                          </div>
                                          <div className="col-sm-5">
                                            {t.owner ? t.owner.email : ''}
                                          </div>
                                          <div className="col-sm-1">
                                              <h4>&#10095;</h4>
                                          </div>
                                      </div>
                                    </div> 
                                </div>
                                <div className="ticket-list-mobile">
                                    <div key={t.id} onClick={() => {t.status === "Cancelled" ? null: this.togglePopup(t)}}>
                                      <div className={`ticket ${this.handleTicketStatus(t).orderClass} p-2`}>        
                                          <div className="col-xs-1">
                                            <i className={`fa fa-2x ${this.handleTicketStatus(t).icon} ${this.handleTicketStatus(t).class}`}></i>                             
                                          </div>
                                          <div className="col-xs-10">                                              
                                              <h4>{this.handleTicketRole(t)}</h4>
                                              {t.discount > 0 && `${(t.discount * 100) / t.raw_cost}% Discount`}
                                              <p className={`status ${this.handleTicketStatus(t).class}`}>{this.handleTicketStatus(t).text}</p>
                                              {t.owner ? t.owner.email : ''}                                              
                                          </div>
                                          <div className="col-xs-1">
                                              <h4>&#10095;</h4>                         
                                          </div>
                                      </div>
                                    </div> 
                                </div>
                                </React.Fragment>
                                : null  
                              )
                            })                           
                            }             
                          {index < order.tickets.length -1 ? <div className="separator"></div> : null}
                          </React.Fragment>                   
                        )
                      })}                                                
                    </div>                      
                  </div>
                  <div className="col-md-4">
                      <OrderSummary order={order} summit={summit} type={'desktop'}/>
                      <TicketOptions cancelOrder={this.handleOrderCancel}/>
                  </div>
              </div>
              {showPopup ?  
                <TicketPopup  
                  ticket={ticket}
                  member={member}
                  owned={true}
                  status={this.handleTicketStatus(ticket)}
                  reassignDate={this.handleReassignDate()}
                  expirationDate={this.handleExpirationDate()}
                  onChange={this.handleChange}
                  extraQuestions={extraQuestions}
                  downloadTicket={this.handleTicketDownload}
                  closePopup={this.togglePopup.bind(this)}
                  cancelTicket={this.handleTicketCancel}
                  updateTicket={this.handleTicketUpdate}
                  resendNotification={this.handleResendNotification}
                  removeAttendee={this.handleTicketRemoveAttendee}
                  summit={summit}
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
      assignAttendee,
      handleTicketChange,
      refundTicket,
      removeAttendee,
      resendNotification
    }
)(OrderDetailPage);