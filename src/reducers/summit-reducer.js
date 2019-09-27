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
import { GET_SUMMIT_BY_ID, GET_SUMMIT_BY_SLUG, SELECT_SUMMIT, GET_EXTRA_QUESTIONS } from "../actions/summit-actions";


const DEFAULT_STATE = {
    currentSummit: {},
    selectedSummit: {},
    summits: []
}

const summitReducer = (state = DEFAULT_STATE, action) => {
    const { type, payload } = action

    switch(type){
        case LOGOUT_USER:
            return DEFAULT_STATE;
        case GET_SUMMIT_BY_SLUG:
            let entity = {...payload.response};

            for(var key in entity) {
                if(entity.hasOwnProperty(key)) {
                    entity[key] = (entity[key] == null) ? '' : entity[key] ;
                }
            }
            return {...state, currentSummit: entity};      
            break;
        case GET_SUMMIT_BY_ID:
            let summit = payload.response;
            return {...state, summits: [ ...state.summits, summit ]}
        case SELECT_SUMMIT:
            return {...state, selectedSummit: payload};
            break;
        case GET_EXTRA_QUESTIONS:
            console.log(payload);
            return {...state, selectedSummit: { extra_questions: payload }}
        default:
            return state;
            break;
    }
}

export default summitReducer
