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
import './ticket-input.less'


export default class TicketInput extends React.Component {

    constructor(props) {
        super(props);

        this.addTicket = this.addTicket.bind(this);
        this.substractTicket = this.substractTicket.bind(this);

    }

    addTicket(ticketTypeId, ev) {
        ev.preventDefault();

        this.props.add(ticketTypeId);
    }

    substractTicket(ticketTypeId, ev) {
        ev.preventDefault();

        this.props.substract(ticketTypeId);
    }

    render() {
        let {selection, ticketTypes} = this.props;

        return (
            ticketTypes && 
            <div className="ticket-input-box">
                {ticketTypes.map(t => {
                    let quantity = selection.filter(sel => sel.tix_type_id == t.id).length;

                    return (
                        <div className="ticket-wrapper" key={`ttype_${t.id}`}>
                            <div className="row">
                                <div className="col-md-8">
                                    <div className="ticket-type">{t.name}</div>
                                    <div className="ticket-price">
                                        {t.cost > 0 ? `$ ${t.cost}` : T.translate("step_one.free")}
                                    </div>
                                    <div className="ticket-expiration">
                                        {T.translate("step_one.expiration")} July 15, 2019
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-inline ticket-quantity">
                                        <button className="btn btn-default" onClick={this.substractTicket.bind(this, t.id)}>
                                            <i className="fa fa-minus"></i>
                                        </button>
                                        <div className="quantity-value">{quantity}</div>
                                        <button className="btn btn-default" onClick={this.addTicket.bind(this, t.id)} 
                                          disabled={(t.max_quantity_per_order > 0 && t.max_quantity_per_order <= quantity) ||
                                          (quantity >= t.quantity_2_sell - t.quantity_sold)}>
                                            <i className="fa fa-plus"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        );

    }
}
