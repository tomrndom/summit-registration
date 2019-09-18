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

import { authErrorHandler } from "openstack-uicore-foundation/lib/methods";
import T from "i18n-react/dist/i18n-react";
import history from '../history'
import validator from "validator"


import {
    getRequest,
    putRequest,
    postRequest,
    createAction,
    stopLoading,
    startLoading,
    showMessage,
    showSuccessMessage,    
} from 'openstack-uicore-foundation/lib/methods';


export const GET_ORDERS  = 'GET_ORDERS';
export const GET_TICKETS  = 'GET_TICKETS';
export const GET_TICKET_BY_HASH  = 'GET_TICKET_BY_HASH';
export const SELECT_ORDER  = 'SELECT_ORDER';


export const getUserOders = () => (dispatch, getState) => {
  
  let { loggedUserState } = getState();
  let { accessToken }     = loggedUserState;
  
  dispatch(startLoading());

  let params = {
      access_token : accessToken,
      expand       : 'tickets',
  };
  
  return getRequest(
      null,
      createAction(GET_ORDERS),
      `${window.API_BASE_URL}/api/v1/summits/all/orders/me`,
      authErrorHandler
  )(params)(dispatch).then(() => {
      dispatch(stopLoading());
    }
  );

}

export const getUserTickets = () => (dispatch, getState) => {
  
  let params = {
      expand: ''
  };

  dispatch(startLoading());

  return getRequest(
      null,
      createAction(GET_TICKETS),
      `${window.API_BASE_URL}/api/public/v1/summits/`,
      authErrorHandler
  )(params)(dispatch).then(() => {
      dispatch(stopLoading());
    }
  );

}

export const getTicketByHash = (hash) => (dispatch, getState) => {

  dispatch(startLoading());

  return getRequest(
      null,
      createAction(GET_TICKET_BY_HASH),
      `${window.API_BASE_URL}/api/public/v1/summits/all/orders/orders/all/tickets/${hash}`,
      authErrorHandler
  )()(dispatch).then(() => {
      dispatch(stopLoading());
    }
  );
}

export const selectOrder = (order) => (dispatch, getState) => {

    console.log('selected', order);
    
    dispatch(startLoading());

    dispatch(createAction(SELECT_ORDER)(order));

    dispatch(stopLoading());

    
    /*
    return getRequest(
        dispatch(startLoading()),
        createAction(RECEIVE_SUMMIT),
        `${window.API_BASE_URL}/api/public/v1/summits/all/${slug}`,
        authErrorHandler
    )()(dispatch).then(() => {
          dispatch(stopLoading());
        }
    );
    */

}
