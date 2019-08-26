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

class OrderSummary extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        };

    }


    render() {
        let {order, summit} = this.props;
        let {ticket_types} = summit;

        let ticketTotal = 0;
        let ticketSummary = [];
        order.tickets.forEach(tix => {
            let idx = ticketSummary.findIndex(o => o.tix_type_id == tix.tix_type_id);
            let tixType = ticket_types.find(tt => tt.id == tix.tix_type_id);

            if (idx >= 0) {
                ticketSummary[idx].qty++;
            } else {
                ticketSummary.push({tix_type_id: tix.tix_type_id, tix_type: tixType, qty: 1})
            }

            ticketTotal = ticketTotal + tixType.price;

        });
        
        let discountTotal = 0;
        let discounts = order.tickets.filter(tix => tix.coupon).map(tix => {
            let tixType = ticket_types.find(tt => tt.id == tix.tix_type_id);

            let discountTmp = (tix.coupon.percentage / 100) * tixType.price;
            discountTotal = discountTotal + discountTmp;

            return {tix_type: tixType, percentage: tix.coupon.percentage, code: tix.coupon.code};
        });

        let total = ticketTotal - discountTotal;

        return (
            <div className="order-summary-wrapper">
                <div className="row">
                    <div className="col-xs-12">
                        <h4>{T.translate("order_summary.order_summary")}</h4>
                    </div>
                </div>
                {ticketSummary.map(tix => {
                    let total = tix.qty * tix.tix_type.price;
                    return (
                        <div className="row order-row" key={`tixorder_${tix.tix_type.id}`}>
                            <div className="col-xs-6">
                                {tix.tix_type.name}
                            </div>
                            <div className="col-xs-2">
                                x{tix.qty}
                            </div>
                            <div className="col-xs-4 text-right subtotal">
                                ${total.toFixed(2)}
                            </div>
                        </div>
                    );
                })}

                <div className="row order-discounts order-row">
                    <div className="col-xs-8 text-left">
                        {T.translate("order_summary.discounts")}
                        <p className="discount-desc">
                            {discounts.map(dis => (
                                <div key={dis.code}>x1 {dis.tix_type.name} / {dis.percentage}%</div>
                            ))}
                        </p>
                    </div>
                    <div className="col-xs-4 text-right subtotal">
                        -${discountTotal.toFixed(2)}
                    </div>
                </div>
                <div className="row total-row">
                    <div className="col-xs-6 text-left">
                        {T.translate("order_summary.total")}
                    </div>
                    <div className="col-xs-6 text-right total">
                        ${total.toFixed(2)}
                    </div>
                </div>
            </div>
        );
    }
}

export default OrderSummary;
