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
import { Link } from 'react-router-dom'

import '../styles/orders-list-page.less';

class OrderList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        };

        this.handleTicketCount = this.handleTicketCount.bind(this);

    }

    handleTicketCount(tickets) {
      let quantity = [];
      tickets.map(t => {
        if(quantity.some(q => q.tix_type_id === t.tix_type_id)) {          
          quantity.map(q => {
            if (q.tix_type_id === t.tix_type_id) {
              q.quantity++;
              return q
            }
          });
        } else {
          let addTicket = { quantity : 1, ...t};
          quantity.push(addTicket);
        }
      });      
      return quantity;
    }


    render() {

      let { orders } = this.props;         

      if (orders) {      
          return (
            <div className="orders-list">
                {orders.map(o => {
                  return (
                    <Link to="/a/orders/detail" key={o.id}>
                      <div className="row">
                          <div className="order complete p-2 col-sm-8 col-sm-offset-2">
                              <div className="col-sm-6">
                                  <h4>{o.title}</h4>
                                  <p className="status">Ready to Use</p>
                              </div>
                              <div className="col-sm-4">
                                  <h5>On March 20th</h5>
                                  <ul>
                                    {this.handleTicketCount(o.tickets).map(t => {
                                      return (
                                        <li key={t.tix_type_id}>
                                          x{t.quantity} {t.name}
                                        </li>                                      
                                      )
                                    })}                                      
                                  </ul>
                              </div>
                              <div className="col-sm-2">
                                  <h4>$ {o.total}</h4>
                              </div>
                          </div>
                      </div>
                    </Link>
                  )
                })}
            </div>
          )          
      } else {
        return (
         <div className="mt-5 p-5">
            <div className="row">
                <div className="col-sm-12 mt-5 text-center">
                    <i className="fa fa-5x fa-inbox"></i>
                    <h5>{T.translate("orders.empty")}</h5>
                </div>
            </div>
          </div>
        )
      }
    }
}

export default OrderList;
