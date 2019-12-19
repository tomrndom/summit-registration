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

import React from 'react'
import T from 'i18n-react/dist/i18n-react'
import { Pagination } from 'react-bootstrap';

import TicketPopup from "../components/ticket-popup";

import { daysBetweenDates, getDayNumberFromDate, getFormatedDate, getFormatedTime } from '../utils/helpers';

class TicketList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          showPopup: false
        };  

        this.togglePopup = this.togglePopup.bind(this);
        this.handleTicketStatus = this.handleTicketStatus.bind(this);
        this.handleTicketDownload = this.handleTicketDownload.bind(this);
        this.handleTicketUpdate = this.handleTicketUpdate.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleTicketLocation = this.handleTicketLocation.bind(this);
        this.handleTicketName = this.handleTicketName.bind(this);        
        this.handleEventName = this.handleEventName.bind(this);
        this.handleTicketDate = this.handleTicketDate.bind(this);        
        this.handleReassignDate = this.handleReassignDate.bind(this);
        this.handleTicketCancel = this.handleTicketCancel.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        
    }

    togglePopup(ticket) {
      ticket ? this.props.selectTicket(ticket, true) : this.props.selectTicket({});
  
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
        { 
          text: 'REFUND REQUESTED',
          icon: 'fa-fw',
          orderClass: 'cancel',
          class: 'order-cancel'
        },
        { 
          text: 'REFUNDED',
          icon: 'fa-fw',
          orderClass: 'cancel',
          class: 'order-cancel'
        },
      ];
      if(ticket.status === "Cancelled") {
        return status[3];
      }
      else if(ticket.status === "RefundRequested") {
        return status[4];
      } else if (ticket.status === "Refunded") {
        return status[5];
      } else if(ticket.owner_id === 0) {
        return status[0];
      } else if (!ticket.owner.first_name || !ticket.owner.surname) {
        return status[1];
      } else if (ticket.owner.first_name && ticket.owner.surname && ticket.owner.extra_questions.length === 0) {
        return status[2];
      } else if (ticket.owner.extra_questions.length) {
        let incomplete = ticket.owner.extra_questions.filter((q) => q.value == '');
        if(incomplete.length === 0 && ticket.owner.first_name && ticket.owner.surname) {
          return status[2];
        } else {
          return status[1];
        }
      }
    }

    handleTicketDownload() {    
      this.props.getTicketPDF();
    }

    handlePageChange(page) {      
      this.props.pageChange(page);
    }

    handleTicketUpdate(ticket){

      let { attendee_first_name, attendee_surname, attendee_company, attendee_email, extra_questions, disclaimer_accepted, owner } = ticket;
      let { member } = this.props;
      
      if(owner.email !== attendee_email) {
          this.props.removeAttendee(ticket);
      } else if(owner.email === member.email) {
          this.props.editOwnedTicket(attendee_email, attendee_first_name, attendee_surname, attendee_company, disclaimer_accepted, extra_questions);      
      }
            
    }

    handleTicketLocation(ticket) {
      let {summits} = this.props;
      let summit = summits.find(s => s.id === ticket.owner.summit_id);
      let location = summit.locations.filter(l => l.class_name === "SummitVenue").find(l => l.is_main === true);      
      if(location) {
        return `${location.city}, ${location.country}`;
      } else {
        return null;
      }
    }

    handleTicketName(ticket) {
      let {summits} = this.props;
      let summit = summits.find(s => s.id === ticket.owner.summit_id);
      let ticketName = summit.ticket_types.find(t => t.id === ticket.ticket_type_id).name;      
      return ticketName;      
    }

    handleTicketDate(ticket) {
      let {summits} = this.props;
      let summit = summits.find(s => s.id === ticket.owner.summit_id);
      let dateRange = daysBetweenDates(summit.start_date, summit.end_date, summit.time_zone_id);
      
      if(dateRange.length > 1) {     
        let startDate = getFormatedDate(dateRange[0], summit.time_zone_id);
        let endDate = getFormatedDate(dateRange[dateRange.length-1], summit.time_zone_id);
        let startYear = startDate.substring(startDate.length, startDate.length-4);
        let endYear = endDate.substring(endDate.length, endDate.length-4);
        if (startYear === endYear) startDate = startDate.substring(0, startDate.length-4);   
        let summitDate = `${startDate} - ${endDate}`;
        return summitDate;
      } else {
        let summitDate = getFormatedDate(summit.start_date, summit.time_zone_id);
        return summitDate;
      }          
    }

    handleReassignDate(ticket) {
      let {summits} = this.props;
      let summit = summits.find(s => s.id === ticket.owner.summit_id);
      let reassign_date = summit.reassign_ticket_till_date < summit.end_date ? summit.reassign_ticket_till_date : summit.end_date
      return reassign_date;
    }

    handleEventName(ticket) {
      let {summits} = this.props;
      let event = summits.find(s => s.id === ticket.owner.summit_id).name;
      return event;
    }


    handleTicketCancel() {
      let {selectedTicket, refundTicket} = this.props;      
      refundTicket(selectedTicket);
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
      let { tickets, selectedTicket, extraQuestions, loading, errors, summits, lastPage, currentPage, member, summit, loadingSummits } = this.props;
      let { showPopup } = this.state;
      let now = summit.timestamp;

      if(loading) {
        return (
          <div></div>
        )
      } else if (tickets.length > 0 && !loading) {
        return (
          <div className="tickets-list">            
            <div className="list-desktop">
              {tickets.map((t) => {
                return (
                  <div className={`ticket ${this.handleTicketStatus(t).text === "UNASSIGNED" ? now > this.handleReassignDate(t) ? 'disabled' : this.handleTicketStatus(t).orderClass : this.handleTicketStatus(t).orderClass} p-2 col-sm-8 col-sm-offset-2`} key={t.id} 
                    onClick={() => {t.status === "Cancelled" || t.status === "RefundRequested" || t.status === "Refunded" || (this.handleTicketStatus(t).text === "UNASSIGNED" && now > this.handleReassignDate(t)) ? null: this.togglePopup(t)}}>
                      <div className="col-sm-1">
                          <i className={`fa fa-2x ${this.handleTicketStatus(t).icon} ${this.handleTicketStatus(t).class}`}></i>                             
                      </div>
                      <div className="col-sm-5">
                          <h4>{this.handleEventName(t)}</h4>
                          <p className={`status ${this.handleTicketStatus(t).class}`}>{this.handleTicketStatus(t).text}</p>
                      </div>                      
                      <div className="col-sm-4">
                          <h5>{this.handleTicketName(t)}</h5>
                          <p>{this.handleTicketDate(t)} <br /> {this.handleTicketLocation(t)} </p>
                      </div>
                      {(t.status === "Cancelled" || t.status === "RefundRequested" || t.status === "Refunded") ?
                        <div className="arrow col-sm-2"></div>
                        :
                        <div className="arrow col-sm-2">
                            <i className="fa fa-angle-right"></i>
                        </div>
                      }
                  </div>
                )
              })}              
            </div>
            <div className="list-mobile">
              {tickets.map((t) => {
                return (
                  <div className={`ticket ${this.handleTicketStatus(t).text === "UNASSIGNED" ? now > this.handleReassignDate(t) ? 'disabled' : this.handleTicketStatus(t).orderClass : this.handleTicketStatus(t).orderClass} p-2 col-sm-8 col-sm-offset-2`} key={t.id} 
                  onClick={() => {t.status === "Cancelled" || t.status === "RefundRequested" || t.status === "Refunded" || (this.handleTicketStatus(t).text === "UNASSIGNED" && now > this.handleReassignDate(t)) ? null: this.togglePopup(t)}}>
                      <div className="col-sm-1">
                          <i className={`fa fa-2x ${this.handleTicketStatus(t).icon} ${this.handleTicketStatus(t).class}`}></i>                             
                      </div>
                      <div className="col-sm-9">
                          <h4>{this.handleEventName(t)}</h4>
                          <p>{this.handleTicketDate(t)} <br/> {this.handleTicketLocation(t)} </p>
                          <p className={`status ${this.handleTicketStatus(t).class}`}>{this.handleTicketStatus(t).text}</p>
                      </div>                                            
                      {(t.status === "Cancelled" || t.status === "RefundRequested" || t.status === "Refunded") ?
                        <div className="arrow col-sm-2"></div>
                        :
                        <div className="arrow col-sm-2">
                            <i className="fa fa-angle-right"></i>
                        </div>
                      }
                  </div>
                )
              })}              
            </div>
            <div className="footer-pagination">
                <Pagination
                  bsSize="medium"
                  prev
                  next
                  first
                  last
                  ellipsis
                  boundaryLinks
                  maxButtons={2}
                  items={lastPage}
                  activePage={currentPage}
                  onSelect={this.handlePageChange}
                />
            </div>
            {showPopup ?  
                <TicketPopup  
                  ticket={selectedTicket}
                  member={member}
                  status={this.handleTicketStatus(selectedTicket)}
                  onChange={this.handleChange}
                  orderOwned={selectedTicket.owner.owner_id === member.id}
                  extraQuestions={extraQuestions}
                  loading={loadingSummits}
                  downloadTicket={this.handleTicketDownload}
                  closePopup={this.togglePopup.bind(this)}
                  updateTicket={this.handleTicketUpdate}
                  cancelTicket={this.handleTicketCancel}
                  resendNotification={this.props.resendNotification}
                  removeAttendee={this.props.removeAttendee}  
                  fromTicketList={true}
                  summit={summits.find(s => s.id === selectedTicket.owner.summit_id)}
                  errors={errors}
                />  
              : null  
              }
          </div>
        )        
      }           
    }
}

export default TicketList;
