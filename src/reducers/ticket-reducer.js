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
import { GET_TICKETS, GET_TICKET_BY_HASH, SELECT_TICKET, CHANGE_TICKET } from "../actions/ticket-actions";

const DEFAULT_STATE = {
    loading: false,
    memberTickets: [],
    selectedTicket: {},
    errors: {}
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
        case CHANGE_TICKET:
            let {ticket, errors} = payload;
            return {...state, selectedTicket: ticket, errors: errors};
            break;
        case GET_TICKETS:            
            return {...state, memberTickets: payload.response.data};
        case GET_TICKET_BY_HASH:
            return {...state, selectedTicket: payload};
        case SELECT_TICKET:
            return {...state, selectedTicket: payload};
        default:
            return state;
            break;
    }
}

export default memberReducer;
