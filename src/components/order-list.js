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
import { withRouter } from 'react-router-dom';
import T from 'i18n-react/dist/i18n-react';

import '../styles/orders-list-page.less';
import { daysBetweenDates, getFormatedDate } from '../utils/helpers';

class OrderList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        };

        this.handleTicketCount = this.handleTicketCount.bind(this);
        this.handleOrderSelect = this.handleOrderSelect.bind(this);
        this.getSummitDate = this.getSummitDate.bind(this);
        this.getSummitName = this.getSummitName.bind(this);
        this.handleOrderStatus = this.handleOrderStatus.bind(this);

    }

    handleTicketCount(tickets, summitId) {
      let quantity = [];
      let { summits } = this.props;
      let summit = summits.find(s => s.id === summitId);
      
      tickets.map(t => {
        if(quantity.some(q => q.ticket_type_id === t.ticket_type_id)) {          
          quantity.map(q => {
            if (q.ticket_type_id === t.ticket_type_id) {
              q.quantity++;
              return q
            }
          });
        } else {
          let name = summit.ticket_types.find(q => q.id === t.ticket_type_id).name;
          let addTicket = { quantity : 1, name, ...t};
          quantity.push(addTicket);
        }
      });      
      return quantity;
    }

    handleOrderSelect(order) {
      let {history, summits} = this.props;      
      if(order.status !== 'Cancelled') {
        let summit = summits.find(s => s.id === order.summit_id);      
        this.props.selectSummit(summit);
        this.props.selectOrder(order);
        history.push('/a/member/orders/detail');
      }      
    }

    handleOrderStatus(order){
      const status = [
        { 
          text: 'READY TO USE',
          icon: 'fa-check-circle',
          class: 'complete'
        },
        { 
          text: 'REQUIRED DETAILS NEEDED',
          icon: 'fa-exclamation-circle',
          class: 'warning'
        },
        { 
          text: 'PENDING CONFIRMATION',          
          class: 'pending'
        },
        { 
          text: 'CANCELLED',          
          class: 'cancel'
        },
      ];
      switch(order.status) {
        case "Paid":
          return status[0];
        case "Reserved":
          return status[2];
        case "Cancelled":
          return status[3];        
          return;
        default:
          return null;
      }

      // TODO: Check posible cases
      const ReservedStatus        = 'Reserved';
      const CancelledStatus       = 'Cancelled';
      const RefundRequestedStatus = 'RefundRequested';
      const RefundedStatus        = 'Refunded';
      const ConfirmedStatus       = 'Confirmed';
      const PaidStatus            = 'Paid';
      const ErrorStatus           = 'Error';
    }

    getSummitName(order) {
      let {summits} = this.props;

      let name = summits.find(s => s.id === order.summit_id).name;      
      return name;

    }

    getSummitDate(order) {
      let {summits} = this.props;
      let summit = summits.find(s => s.id === order.summit_id);
      let dateRange = daysBetweenDates(summit.start_date, summit.end_date, summit.time_zone_id);
      
      if(dateRange.length > 1) {        
        let summitDate = `${getFormatedDate(dateRange[0])}, ${getFormatedDate(dateRange[dateRange.length-1])}`;
        return summitDate;
      } else {
        let summitDate = getFormatedDate(summit.start_date);
        return summitDate;
      }          
    }




    render() {

      let { orders, summits } = this.props;           

      if (orders && summits) {      
          return (
            <div className="orders-list">
                {orders.map(o => {
                  return (                    
                    <div className="row" key={o.id} onClick={() => this.handleOrderSelect(o)}>
                        <div className={`order ${this.handleOrderStatus(o).class} p-2 col-sm-8 col-sm-offset-2`}>                        
                            <div className="col-sm-6">
                                <h4>{this.getSummitName(o)}</h4>
                                <p className="status">{this.handleOrderStatus(o).text}</p>
                            </div>
                            <div className="col-sm-4">
                                <h5>On {this.getSummitDate(o)}</h5>
                                <ul>
                                  {this.handleTicketCount(o.tickets, o.summit_id).map(t => {
                                    return (
                                      <li key={t.ticket_type_id}>
                                        x{t.quantity} {t.name}
                                      </li>                                      
                                    )
                                  })}                                      
                                </ul>
                            </div>
                            <div className="col-sm-2">
                                <h4>$ {o.amount}</h4>
                            </div>
                        </div>
                    </div>
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

export default withRouter(OrderList);
