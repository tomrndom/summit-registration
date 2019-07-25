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

    }

    addTicket(ev) {

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
        let orderedTickets = order.tickets.hasOwnProperty(ticketType.id) ? order.tickets[ticketType.id] : [];

        return (
            <div className="ticket-info-wrapper">
                <div className="row">
                    <div className="col-md-12">
                        <h3>{ticketType.name} {T.translate("step_two.tickets")}</h3>
                    </div>
                </div>
                { orderedTickets.map((tix, i) => (
                    <div className="row" key={`tix_${ticketType.id}_${i}`}>
                        <div className="col-md-4">
                            <label>{T.translate("step_two.ticket")} #{i}</label>
                        </div>
                        <div className="col-md-6">
                            <Input
                                id={`ticket_${ticketType.id}_${i}`}
                                className="form-control"
                                placeholder={T.translate("step_two.coupon")}
                                error={this.hasErrors(`ticket_${i}`)}
                                onChange={onChange}
                                value={tix.promo_code}
                            />
                        </div>
                        <div className="col-md-6 col-md-offset-4">
                            <Input
                                id={`ticket_${ticketType.id}_${i}`}
                                className="form-control"
                                placeholder={T.translate("step_two.email")}
                                error={this.hasErrors(`ticket_${i}`)}
                                onChange={onChange}
                                value={tix.email}
                            />
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
                    <div className="col-md-12 text-right">
                        <button className="btn btn-primary" onClick={this.addTicket.bind(this, ticketType.id)}>
                            {T.translate("step_two.add_ticket")}
                        </button>
                    </div>
                </div>


            </div>
        );
    }
}

export default TicketInfoForm;
