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
import { connect } from 'react-redux';
import T from "i18n-react/dist/i18n-react";

import '../../styles/tickets-list-page.less';
import TicketList from '../../components/ticket-list';

import { getUserTickets, selectTicket, getTicketPDF, assignAttendee, handleTicketChange } from '../../actions/ticket-actions';

class TicketsListPage extends React.Component {

    componentWillMount() {    
        this.props.getUserTickets();
    }

    render() {
        let {tickets, extraQuestions, selectedTicket, selectTicket, getTicketPDF, assignAttendee, handleTicketChange, summits, loadingTickets, loadingSummits, errors} = this.props;        
        return (
            <div>
                <TicketList 
                  tickets={tickets}
                  selectedTicket={selectedTicket}
                  selectTicket={selectTicket}
                  getTicketPDF={getTicketPDF}                  
                  assignAttendee={assignAttendee}
                  handleTicketChange={handleTicketChange}
                  summits={summits}
                  extraQuestions={extraQuestions}
                  loading={loadingTickets && loadingSummits}
                  errors={errors}
                />
            </div>
        );
    }
}

const mapStateToProps = ({ ticketState, summitState }) => ({
    tickets: ticketState.memberTickets,
    selectedTicket: ticketState.selectedTicket,
    loadingTickets: ticketState.loading,
    errors: ticketState.errors,
    summits: summitState.summits,
    loadingSummits: summitState.loading,
    extraQuestions: summitState.selectedSummit.order_extra_questions
})
  
export default connect (
    mapStateToProps,
    {
      getUserTickets,
      selectTicket,
      getTicketPDF,
      assignAttendee,
      handleTicketChange
    }
)(TicketsListPage);
  