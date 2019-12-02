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

import { getTicketByHash, getTicketPDFByHash, refundTicket, regenerateTicketHash, handleTicketChange, assignTicketByHash } from '../actions/ticket-actions'
import history from '../history';

class GuestsLayout extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      tempTicket: {
        attendee_email: '',
        attendee_first_name: '',
        attendee_surname: '',
        disclaimer_accepted: null,
        extra_questions: []
      }
    };

    this.handleTicketDownload = this.handleTicketDownload.bind(this);
    this.handleTicketCancel = this.handleTicketCancel.bind(this);    
    this.handleReassignDate = this.handleReassignDate.bind(this);
    this.handleTicketUpdate = this.handleTicketUpdate.bind(this);
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
      let {attendee_email, attendee_first_name, attendee_surname, disclaimer_accepted, extra_questions} = this.state.tempTicket;
      let {owner} = this.props.ticket;      
      if(owner && !attendee_email && (!attendee_first_name || !attendee_surname || !disclaimer_accepted || !extra_questions)) {
        let {email, first_name, surname, disclaimer_accepted_date, extra_questions} = owner;
        let formattedQuestions = [];
        extra_questions.map(q => {
          let question = {question_id: q.question_id, answer: q.value};
          formattedQuestions.push(question);
        })        
        this.setState({tempTicket: { 
          attendee_email: email, 
          attendee_first_name: first_name, 
          attendee_surname: surname, 
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
      let ticketHash = this.props.match.params.ticket_hash;
      let { attendee_first_name, attendee_surname, disclaimer_accepted, share_contact_info, extra_questions } = ticket;
      this.props.assignTicketByHash(attendee_first_name, attendee_surname, disclaimer_accepted, share_contact_info, extra_questions, ticketHash);
    }
  
    handleChange(ev) {
      let ticket = cloneDeep(this.props.ticket);
      let errors = cloneDeep(this.props.errors);
      let {value, id} = ev.target;

      if(ev.target.id === 'attendee_last_name') {
        id = 'attendee_surname';
      }

      if (ev.target.type == 'checkbox') {
        value = ev.target.checked;        
      }
  
      delete(errors[id]);
      ticket[id] = value;

      this.setState((prevState) => {
        return { tempTicket: { ...prevState.tempTicket, [id]: value }}
      });        
    }

    handleReassignDate() {
      let {summit} = this.props;
      let reassign_date = summit.reassign_ticket_till_date < summit.end_date ? summit.reassign_ticket_till_date : summit.end_date;
      return reassign_date;
    }
    
    render() {
      let {ticket: {owner, order_extra_questions}, ticket, errors, ticketLoading, summitLoading, summit, summits} = this.props;
      let now = parseInt((new Date().getTime() / 1000).toFixed(0));
      let {tempTicket} = this.state;

      let loading = ticketLoading && summitLoading;      

      if(!owner) {
        history.push('/a/member/tickets/');
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
                  downloadTicket={this.handleTicketDownload} 
                  cancelTicket={this.handleTicketCancel}
                  ticket={ticket}
                  summit={summit}
                  summits={summits}
                  loading={loading}
                />
              </div>
              {now < this.handleReassignDate() &&
                <div className="row submit-buttons-wrapper">
                    <div className="col-md-12">                      
                        <button className="btn btn-primary continue-btn" 
                          disabled={
                            !tempTicket.attendee_first_name || 
                            !tempTicket.attendee_surname ||
                            (!tempTicket.disclaimer_accepted && summit.registration_disclaimer_mandatory === true)} 
                          onClick={() =>this.handleTicketUpdate(tempTicket)}>
                            {T.translate("guests.save")}
                        </button>
                    </div>
                </div>
              }
            </div>
        )
      }
      
                          
    }
}

const mapStateToProps = ({ ticketState, summitState }) => ({
  ticketLoading: ticketState.loading,
  ticket: ticketState.selectedTicket,
  errors: ticketState.errors,
  summit: summitState.selectedSummit,
  summits: summitState.summits,
  summitLoading: summitState.loading
})

export default connect(
  mapStateToProps,
  {
    getTicketByHash,
    getTicketPDFByHash,
    refundTicket,
    regenerateTicketHash,
    handleTicketChange,
    assignTicketByHash
  }
)(GuestsLayout);