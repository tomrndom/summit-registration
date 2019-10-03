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
          class: 'ticket-warning'
        },
        { 
          text: 'READY TO USE',
          icon: 'fa-check-circle',
          class: 'ticket-complete'
        },
      ];
      if (!ticket.extra_questions) {
        return status[0];
      } else if (ticket.extra_questions) {
        return status[1];
      }
    }

    handleTicketDownload() {    
      this.props.getTicketPDF();
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
      let { tickets } = this.props;
      let {showPopup} = this.state;

      if (tickets) {
        return (
          <div className="tickets-list">            
            <div className="row">
              {tickets.map((t) => {
                return (
                  <div className="ticket complete p-2 col-sm-8 col-sm-offset-2" key={t.id} onClick={() => this.togglePopup(t)}>
                      <div className="col-sm-5">
                          <h4>Equinoccio Summit 2020</h4>
                          <p className="status">Ready to Use</p>
                      </div>
                      <div className="col-sm-5">
                          <h5>One Day Pass</h5>
                          <p>California, US / December 22nd 2020</p>
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
