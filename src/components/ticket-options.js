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

import { daysBetweenDates, getFormatedDate } from '../utils/helpers';

class TicketOptions extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        };

        this.handleTicketName = this.handleTicketName.bind(this);
        this.handleSummitLocation = this.handleSummitLocation.bind(this);
        this.handleTicketDate = this.handleTicketDate.bind(this);
        this.handleTicketRole = this.handleTicketRole.bind(this);
    }

    handleTicketName(ticket) {
      let {summit} = this.props;
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

    handleTicketRole(badge) {
      let roles = [];
      badge.features.map(f => {
        roles.push(f.name);
      });
      if(roles.length) {
        return roles.join(', ');
      } else {
        return "Attendee";
      }
    }

    handleSummitLocation(summit) {
      if(summit.locations.length === 1) {
        let location = `${summit.locations[0].city}, ${summit.locations[0].country}`;
        return location;
      }
    }


    render() {

      let {guest, summit, ticket} = this.props;

      console.log('summit optuions', summit);
      console.log('ticket optuions', ticket);

        return (
            <div className="order-info-wrapper">
                {guest && 
                <React.Fragment>
                  <div className="row">
                    <div className="col-md-12 info">
                      <h4>{summit.name}</h4>
                      <p>{this.handleTicketName(ticket)}</p>
                      <p>{this.handleSummitLocation(summit)} / {this.handleTicketDate(ticket)}</p>
                      <p>{this.handleTicketRole(ticket.badge)}</p>
                    </div>
                  </div>
                  <hr />
                </React.Fragment>
                }                                
                <div className="row">
                    <div className="col-md-12">
                        <a>{T.translate("order_info.print")}</a><br/>
                        {!guest && <a>{T.translate("order_info.resend")}<br/></a>}
                        <a onClick={this.props.downloadTicket}>{T.translate("order_info.download")}</a><br/>
                        {guest && <a>{T.translate("order_info.directions")}<br/></a>}
                        {guest && <a>{T.translate("order_info.calendar")}<br/></a>}
                        {!guest && <a onClick={this.props.cancelOrder} className="cancel">{T.translate("order_info.cancel_order")}</a>}
                        {guest && <a onClick={this.props.cancelTicket} className="cancel">{T.translate("order_info.cancel_ticket")}</a>}
                    </div>
                </div>
            </div>
        );
    }
}

export default TicketOptions;
