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

import { LOGOUT_USER } from "openstack-uicore-foundation/lib/actions";
import {RESET_ORDER, RECEIVE_ORDER, CHANGE_ORDER, VALIDATE_STRIPE} from "../actions/order-actions";


const DEFAULT_ENTITY = {
    first_name: '',
    last_name: '',
    email: '',
    company: '',
    tickets: [],
    billing_country: '',
    billing_address: '',
    billing_address_two: '',
    billing_city: '',
    billing_state: '',
    billing_zipcode: '',
    currentStep: null,
}

const DEFAULT_STATE = {
    order: DEFAULT_ENTITY,
    errors: {},
    stripe: null
}

const orderReducer = (state = DEFAULT_STATE, action) => {
    const { type, payload } = action

    switch(type){
        case LOGOUT_USER:
            return DEFAULT_STATE;
        case RESET_ORDER:
            return DEFAULT_STATE;
            break;
        case RECEIVE_ORDER:
            return state;
            break;
        case CHANGE_ORDER:
            let {order, errors} = payload;
            return {...state, order: order, errors: errors};
            break;
        case VALIDATE_STRIPE:
            let {value} = payload
            return {...state, stripe: value}
        default:
            return state;
            break;
    }
}

export default orderReducer