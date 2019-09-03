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
import T from "i18n-react/dist/i18n-react";

import '../../styles/orders-list-page.less';
import OrderList from '../../components/order-list';

class OrdersListPage extends React.Component {    
    render() {

      let ordersMock = [
        {
          title: "Google I/O 2019",
          id: 1231231,
          date: new Date(),
          total: "1280",
          status: "Ready to Use",
          tickets: [
            {
              type: "Full Pass Ticket",
              title: "SPEAKER",
              discount: 100,
              member: {
                email: "ned.stark@winterfell.com"
              },
              status: "Ready to Use"
            },
            {
              type: "Full Pass Ticket",
              title: "SPEAKER",
              discount: 50,
              member: {
                email: "jon.snow@thewall.com"
              },
              status: "Ready to Use"
            },
            {
              type: "Full Pass Ticket",
              title: "CREW",
              discount: 50,
              member: {},
              status: "Unassigned"
            },
            {
              type: "One Day Pass Ticket",
              title: "CREW",
              discount: 20,
              member: {},
              status: "Unassigned"
            },
            {
              type: "One Day Pass Ticket",
              title: "SPEAKER",
              discount: 20,
              member: {
                name: "YOU"
              },
              status: "Ready to Use"
            }
          ]
        },        
      ];

        return (
            <OrderList orders={ordersMock} />
        );
    }
}

export default OrdersListPage;