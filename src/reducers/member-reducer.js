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

import { START_LOADING, STOP_LOADING, LOGOUT_USER } from "openstack-uicore-foundation/lib/actions";
import { GET_ORDERS, GET_TICKETS, SELECT_ORDER } from "../actions/member-actions";

const DEFAULT_STATE = {
    loading: false,
    orders: [
      {
        title: "Google I/O 2019",
        id: 1231231,
        date: new Date(),
        total: "1280",
        status: "Ready to Use",
        tickets: [
          {
            id: 1567685178277,
            type_id: 105,
            name: "Full Pass Ticket",
            title: "SPEAKER",
            discount: 100,
            cost: 100,
            member: {
              email: "ned.stark@winterfell.com"
            },
            status: "Ready to Use"
          },
          {
            id: 1567685178278,
            type_id: 105,
            name: "Full Pass Ticket",
            title: "SPEAKER",
            discount: 50,
            cost: 100,
            member: {
              email: "jon.snow@thewall.com"
            },
            status: "Ready to Use"
          },
          {
            id: 1567685178279,
            type_id: 105,
            name: "Full Pass Ticket",
            title: "CREW",
            discount: 50,
            cost: 100,
            member: {},
            status: "Unassigned"
          },
          {
            id: 1567685178280,
            type_id: 106,
            name: "One Day Pass Ticket",
            title: "CREW",
            discount: 20,
            cost: 100,
            member: {},
            status: "Unassigned"
          },
          {
            id: 1567685178281,
            type_id: 106,
            name: "One Day Pass Ticket",
            title: "SPEAKER",
            discount: 20,
            cost: 100,
            member: {
              name: "YOU"
            },
            status: "Ready to Use"
          }
        ]
      },        
    ],
    tickets: [],
    selectedOrder: {},
}

const memberReducer = (state = DEFAULT_STATE, action) => {
    const { type, payload } = action

    switch(type){
        case LOGOUT_USER:
            return DEFAULT_STATE;
        case START_LOADING:
            console.log('START_LOADING')
            return {...state, loading: true};
            break;
        case STOP_LOADING:
            console.log('STOP_LOADING')
            return {...state, loading: false};
            break;
        case GET_ORDERS:
            let orders = payload.response.data;
            return {...state, orders};
        case GET_TICKETS:            
            return {...state, tickets: payload};
        case SELECT_ORDER:
            return {...state, selectedOrder: payload};
        default:
            return state;
            break;
    }
}

export default memberReducer;
