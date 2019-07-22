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

        this.changeQuantity = this.changeQuantity.bind(this);

    }

    changeQuantity(ticketId, add, ev) {
        let {selection} = this.props;

        ev.preventDefault();

        if (!selection.hasOwnProperty(ticketId)) selection[ticketId] = 0;

        if (add) {
            selection[ticketId]++;
        } else if (selection[ticketId] > 0) {
            selection[ticketId]--;
        }

        this.props.save(selection);

    }

    render() {
        let {summit, selection} = this.props;

        let ticketTypes = [
            {id: 1, name: 'Full Pass', price: 800},
            {id: 2, name: 'One Day Pass', price: 300}
        ];

        return (
            <div className="ticket-input-box">
                {ticketTypes.map(t => {
                    let quantity = selection.hasOwnProperty(t.id) ? selection[t.id] : 0;

                    return (
                        <div className="ticket-wrapper row">
                            <div className="col-md-8">
                                <div className="ticket-type">{t.name}</div>
                                <div className="ticket-price">
                                    ${t.price}
                                </div>
                                <div className="ticket-expiration">
                                    {T.translate("step_one.expiration")} July 15, 2019
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-inline ticket-quantity">
                                    <button className="btn btn-default" onClick={this.changeQuantity.bind(this, t.id, true)}>
                                        <i className="fa fa-plus"></i>
                                    </button>
                                    <div className="quantity-value">{quantity}</div>
                                    <button className="btn btn-default" onClick={this.changeQuantity.bind(this, t.id, false)}>
                                        <i className="fa fa-minus"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        );

    }
}
