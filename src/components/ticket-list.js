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
        this.handleExpirationDate = this.handleExpirationDate.bind(this);
        
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
          text: 'REQUIRED DETAILS NEEDED',
          icon: 'fa-exclamation-circle',
          ticketClass: 'warning',
          class: 'ticket-warning'
        },
        { 
          text: 'READY TO USE',
          icon: 'fa-check-circle',
          ticketClass: 'complete',
          class: 'ticket-complete'
        },
        { 
          text: 'CANCELLED',         
          ticketClass: 'cancel', 
          class: 'ticket-cancel'
        },
      ];
      if(ticket.status === 'Cancelled') {
        return status[2];
      }
      else if (!ticket.owner.extra_questions) {
        return status[0];
      } else if (ticket.owner.extra_questions) {
        let answers = ticket.owner.extra_questions.some((q) => q.value == '');      
        if(answers) {
          return status[0];
        } else {
          return status[1];
        }
      }
    }

    handleTicketDownload() {    
      this.props.getTicketPDF();
    }

    handleTicketUpdate(ticket){
      let { attendee_first_name, attendee_last_name, attendee_email, extra_questions } = ticket;    
      let fromTicket = true;
      this.props.assignAttendee(attendee_email, attendee_first_name, attendee_last_name, extra_questions, fromTicket);
    }

    handleTicketLocation(ticket) {
      let {summits} = this.props;
      let summit = summits.find(s => s.id === ticket.owner.summit_id);
      if(summit.locations.length === 1) {        
        return `${summit.locations[0].city}, ${summit.locations[0].country}`
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
        let summitDate = `${getFormatedDate(dateRange[0])}, ${getFormatedDate(dateRange[dateRange.length-1])}`;
        return summitDate;
      } else {
        let summitDate = getFormatedDate(summit.start_date);
        return summitDate;
      }          
    }

    handleExpirationDate(ticket) {
      let {summits} = this.props;
      let summit = summits.find(s => s.id === ticket.owner.summit_id);      
      return summit.registration_end_date;
    }

    handleEventName(ticket) {
      let {summits} = this.props;
      let event = summits.find(s => s.id === ticket.owner.summit_id).name;
      return event;
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
      let { tickets, selectedTicket, extraQuestions, loading, errors, summits } = this.props;
      let { showPopup } = this.state;

      if (tickets.length) {
        return (
          <div className="tickets-list">            
            <div>
              {tickets.map((t) => {
                return (
                  <div className={`ticket ${this.handleTicketStatus(t).ticketClass} p-2 col-sm-8 col-sm-offset-2`} key={t.id} 
                    onClick={() => {t.status === "Cancelled" ? null: this.togglePopup(t)}}>
                      <div className="col-sm-1">
                          <i className={`fa fa-2x ${this.handleTicketStatus(t).icon} ${this.handleTicketStatus(t).class}`}></i>                             
                      </div>
                      <div className="col-sm-5">
                          <h4>{this.handleEventName(t)}</h4>
                          <p className={`status ${this.handleTicketStatus(t).class}`}>{this.handleTicketStatus(t).text}</p>
                      </div>
                      <div className="col-sm-4">
                          <h5>{this.handleTicketName(t)}</h5>
                          <p>{this.handleTicketLocation(t)} / {this.handleTicketDate(t)}</p>
                      </div>
                      <div className="arrow col-sm-2">
                          <i className="fa fa-angle-right"></i>
                      </div>
                  </div>
                )
              })}              
            </div>
            {showPopup ?  
                <TicketPopup  
                  ticket={selectedTicket}
                  expirationDate={this.handleExpirationDate(selectedTicket)}
                  member={null}
                  status={this.handleTicketStatus(selectedTicket).text}
                  onChange={this.handleChange}
                  extraQuestions={extraQuestions}
                  downloadTicket={this.handleTicketDownload}
                  closePopup={this.togglePopup.bind(this)}
                  updateTicket={this.handleTicketUpdate}
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
      } else {
        return (
          <div className="mt-5 p-5">
              <div className="row">
                  <div className="col-sm-12 mt-5 text-center">
                      <i className="fa fa-5x fa-ticket"></i>
                      <h5>{T.translate("tickets.empty")}</h5>
                  </div>
              </div>
          </div>
          )
      }                       
    }
}

export default TicketList;
