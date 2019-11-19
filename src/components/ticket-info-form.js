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
import { findElementPos } from 'openstack-uicore-foundation/lib/methods'
import { Input } from 'openstack-uicore-foundation/lib/components'


class TicketInfoForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        };

        this.addTicket = this.addTicket.bind(this);
        this.removeTicket = this.removeTicket.bind(this);
        this.ticketInfoChange = this.ticketInfoChange.bind(this);

    }

    addTicket(ticketTypeId, ev) {
        ev.preventDefault();
        this.props.onAddTicket(ticketTypeId);
    }

    removeTicket(ticketId, ev) {
        ev.preventDefault();
        this.props.onRemoveTicket(ticketId);
    }

    ticketInfoChange(ticketId, field, ev) {
        ev.preventDefault();
        this.props.onChange(ticketId, field, ev.target.value);
    }

    hasErrors(field) {
        let {errors} = this.props;
        if(field in errors) {
            return errors[field];
        }

        return '';
    }


    render() {
        let {order, onChange, ticketType} = this.props;
        let orderedTickets = order.tickets.filter(tix => tix.type_id == ticketType.id);
        let now = Math.round((new Date()).getTime() / 1000);        

        if (ticketType.quantity_2_sell > 0 && now >= ticketType.sales_start_date && now <= ticketType.sales_end_date) {
            return (
                <div className="ticket-info-wrapper">
                    <div className="row">
                        <div className="col-md-12">
                            <h3>{ticketType.name} {T.translate("step_two.tickets")} {orderedTickets.length > 0 ? `(${orderedTickets.length})` : ''}</h3>
                        </div>
                    </div>
                    { orderedTickets.map((tix, i) => (                  
                        <div className="row field-wrapper" key={`tix_${ticketType.id}_${i}`}>                                          
                            <div className="col-md-4">
                                <label>{T.translate("step_two.ticket")} #{i+1}</label>
                            </div>
                            <div className="col-md-6">
                                <Input
                                    className="form-control"
                                    placeholder={T.translate("step_two.placeholders.coupon")}
                                    error={this.hasErrors(`tix_coupon_${tix.tempId}`)}
                                    onChange={this.ticketInfoChange.bind(this, tix.tempId, 'promo_code')}
                                    value={tix.promo_code ? tix.promo_code : ''}
                                />
                                <Input
                                    className="form-control email"
                                    placeholder={T.translate("step_two.placeholders.email")}
                                    error={this.hasErrors(`tix_email_${tix.tempId}`)}
                                    onChange={this.ticketInfoChange.bind(this, tix.tempId, 'attendee_email')}
                                    value={tix.attendee_email ? tix.attendee_email : ''}
                                />
                            </div>
                            <div className="col-md-2">
                                <a href="" onClick={this.removeTicket.bind(this, tix.tempId)}>
                                    <i className="fa fa-trash-o" aria-hidden="true"></i>
                                </a>
                            </div>
                        </div>
                    ))}

                    {orderedTickets.length == 0 &&
                        <div className="row">
                            <div className="col-md-12">
                                {T.translate("step_two.no_tickets")}
                            </div>
                        </div>
                    }

                    <div className="row ticket-add-wrapper">
                        <div className="col-md-10 text-right">
                            <button className="btn btn-primary" onClick={this.addTicket.bind(this, ticketType.id)}>
                                {T.translate("step_two.add_ticket")}
                            </button>
                        </div>
                    </div>


                </div>
            );
        } else { 
          return null;
        }        
    }
}

export default TicketInfoForm;
