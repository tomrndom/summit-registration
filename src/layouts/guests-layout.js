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

import TicketAssignForm from '../components/ticket-assign-form';
import TicketOptions from '../components/ticket-options';

import { getTicketByHash, getTicketPDFByHash, refundTicket } from '../actions/ticket-actions'

class GuestsLayout extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      tempTicket: {
        attendee_email: '',
        attendee_first_name: '',
        attendee_last_name: ''
      }
    };

    this.handleTicketDownload = this.handleTicketDownload.bind(this);
    this.handleTicketCancel = this.handleTicketCancel.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

    componentDidMount() {
      let { getTicketByHash, ticket } = this.props;

      let ticketHash = this.props.match.params.ticket_hash;

      if (ticketHash) {
          getTicketByHash(ticketHash);
      }

      this.setState({tempTicket: ticket});
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

    handleChange(ev) {
      const {id, value} = ev.target;

      this.setState(() => ({
        tempTicket: {...this.state.tempTicket, [id]: value }        
      }));

      //      this.props.handleOrderChange(order, errors);
    }   
    
    render() {
      let {extraQuestions} = this.props;
      let {tempTicket} = this.state;
        return (
            <div>
              <div className="col-sm-8">                
                <TicketAssignForm ticket={tempTicket} onChange={this.handleChange} extraQuestions={extraQuestions}/>
              </div>
              <div className="col-sm-4">
                <TicketOptions 
                  guest={true} 
                  downloadTicket={this.handleTicketDownload} 
                  cancelTicket={this.handleTicketCancel}
                />
              </div>
            </div>
        );
    }
}

const mapStateToProps = ({ ticketState, summitState }) => ({
  ticket: ticketState.selectedTicket,
  extraQuestions: summitState.selectedSummit.order_extra_questions,
})

export default connect(
  mapStateToProps,
  {
    getTicketByHash,
    getTicketPDFByHash,
    refundTicket
  }
)(GuestsLayout);