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
import { GET_SUMMIT_BY_ID, GET_SUMMIT_BY_SLUG, SELECT_SUMMIT, SUMMIT_NOT_FOUND, GET_SUMMIT_REFUND_POLICY, GET_SUGGESTED_SUMMITS } from "../actions/summit-actions";


const DEFAULT_STATE = {
    loading: false,
    currentSummit: {},
    selectedSummit: {
      refund_policy: null
    },
    summits: [],
    suggestedSummits: []
}

const summitReducer = (state = DEFAULT_STATE, action) => {
    const { type, payload } = action

    switch(type){
        case LOGOUT_USER:
            return DEFAULT_STATE;
        case START_LOADING:
            return {...state, loading: true};
            break;
        case STOP_LOADING:
            return {...state, loading: false};
            break;
        case GET_SUMMIT_BY_SLUG:
            let entity = payload.response ? {...payload.response} : {...payload};

            for(var key in entity) {
                if(entity.hasOwnProperty(key)) {
                    entity[key] = (entity[key] == null) ? '' : entity[key] ;
                }
            }

            if(payload.response) {
              return {...state, currentSummit: entity, summits: [ ...state.summits, entity ]};
            } else {
              return {...state, currentSummit: entity, summits: [ ...state.summits ]};
            }
            break;
        case SUMMIT_NOT_FOUND:
            console.log(payload);
            return {...state, currentSummit: {}};
        case GET_SUMMIT_BY_ID:
            let summit = payload.response;
            return {...state, summits: [ ...state.summits, summit ]}
        case SELECT_SUMMIT:
            return {...state, selectedSummit: payload};
            break;
        case GET_SUMMIT_REFUND_POLICY:
            return {...state, selectedSummit: { ...state.selectedSummit, refund_policy: payload.response}}
        case GET_SUGGESTED_SUMMITS:
            return {...state, suggestedSummits: payload.response.data}
        default:
            return state;
            break;
    }
}

export default summitReducer
