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
import cloneDeep from "lodash.clonedeep";

import TicketAssignForm from '../components/ticket-assign-form';
import TicketOptions from '../components/ticket-options';

import { getTicketByHash, getTicketPDFByHash, refundTicket, regenerateTicketHash, handleTicketChange } from '../actions/ticket-actions'

class GuestsLayout extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      tempTicket: {
        attendee_email: '',
        attendee_first_name: '',
        attendee_last_name: '',
        disclaimer_accepted: null,
        extra_questions: []
      }
    };

    this.handleTicketDownload = this.handleTicketDownload.bind(this);
    this.handleTicketCancel = this.handleTicketCancel.bind(this);    
    this.handleExpirationDate = this.handleExpirationDate.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

    componentDidMount() {
      let { getTicketByHash } = this.props;

      let ticketHash = this.props.match.params.ticket_hash;

      if (ticketHash) {                    
          getTicketByHash(ticketHash);
      }      
    }

    componentDidUpdate() {
      let {attendee_email, attendee_first_name, attendee_last_name, disclaimer_accepted, extra_questions} = this.state.tempTicket;
      let {owner} = this.props.ticket;      
      if(owner && !attendee_email && (!attendee_first_name || !attendee_last_name || !disclaimer_accepted || !extra_questions)) {
        let {email, first_name, last_name, disclaimer_accepted_date, extra_questions} = owner;
        let formattedQuestions = [];
        extra_questions.map(q => {
          let question = {question_id: q.question_id, answer: q.value};
          formattedQuestions.push(question);
        })        
        this.setState({tempTicket: { 
          attendee_email: email, 
          attendee_first_name: first_name, 
          attendee_last_name: last_name, 
          disclaimer_accepted: disclaimer_accepted_date ? true : false,
          extra_questions: formattedQuestions}});                        
      }
    }

    componentWillReceiveProps(newProps) {
      let oldHash = this.props.match.params.ticket_hash;
      let newHash = newProps.match.params.ticket_hash;

      if (newHash != oldHash) {
          if (newHash) {
              this.props.getTicketByHash(newHash);
          }
      }
    }

    handleTicketDownload() {
      let ticketHash = this.props.match.params.ticket_hash;
      this.props.getTicketPDFByHash(ticketHash);
    }

    handleTicketCancel() {
      let ticketHash = this.props.match.params.ticket_hash;
      this.props.refundTicket(ticketHash);
    }

    handleTicketUpdate(ticket){
      let { attendee_first_name, attendee_last_name, attendee_email, disclaimer_accepted, extra_questions } = ticket;
      this.props.editOwnedTicket(attendee_email, attendee_first_name, attendee_last_name, disclaimer_accepted, extra_questions);
    }
  
    handleChange(ev) {
      let ticket = cloneDeep(this.props.ticket);
      let errors = cloneDeep(this.props.errors);
      let {value, id} = ev.target;
  
      delete(errors[id]);
      ticket[id] = value;
  
      this.props.handleTicketChange(ticket, errors);
    }

    handleExpirationDate() {
      let {summit} = this.props;      
      return summit.registration_end_date;
    }
    
    render() {
      let {ticket: {owner, order_extra_questions}, ticket, errors, loading, summit, summits} = this.props;
      let {tempTicket} = this.state;

      if(!owner) {
        return (
          <div>
            Ticket not found
          </div>
        )
      } else {
        return (
          !loading &&
            <div>
              <div className="col-sm-8 guest-layout">                
                <TicketAssignForm ticket={tempTicket} onChange={this.handleChange} extraQuestions={order_extra_questions} errors={errors} guest={true} summit={summit}/>
              </div>
              <div className="col-sm-4">
                <TicketOptions 
                  guest={true}
                  expirationDate={this.handleExpirationDate()} 
                  downloadTicket={this.handleTicketDownload} 
                  cancelTicket={this.handleTicketCancel}
                  ticket={ticket}
                  summit={summit}
                  summits={summits}
                />
              </div>
              <div className="row submit-buttons-wrapper">
                  <div className="col-md-12">  
                      <a href="" className="back-btn" onClick={this.cancelClick}>                        
                          {T.translate("guests.cancel")}
                      </a>
                      <button className="btn btn-primary continue-btn" onClick={this.sendClick}>
                          {T.translate("guests.send")}
                      </button>
                  </div>
              </div>
            </div>
        )
      }
      
                          
    }
}

const mapStateToProps = ({ ticketState, summitState }) => ({
  loading: ticketState.loading,
  ticket: ticketState.selectedTicket,
  errors: ticketState.errors,
  summit: summitState.selectedSummit,
  summits: summitState.summits
})

export default connect(
  mapStateToProps,
  {
    getTicketByHash,
    getTicketPDFByHash,
    refundTicket,
    regenerateTicketHash,
    handleTicketChange
  }
)(GuestsLayout);