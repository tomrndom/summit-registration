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



export const GET_TICKETS              = 'GET_TICKETS';
export const SELECT_TICKET            = 'SELECT_TICKET';
export const ASSIGN_TICKET            = 'ASSIGN_TICKET';
export const REMOVE_TICKET_ATTENDEE   = 'REMOVE_TICKET_ATTENDEE';
export const GET_TICKET_PDF           = 'GET_TICKET_PDF';
export const REFUND_TICKET            = 'REFUND_TICKET';
export const GET_TICKET_BY_HASH       = 'GET_TICKET_BY_HASH';
export const ASSIGN_TICKET_BY_HASH    = 'ASSIGN_TICKET_BY_HASH';
export const REGENERATE_TICKET_HASH   = 'REGENERATE_TICKET_HASH';
export const GET_TICKET_PDF_BY_HASH   = 'GET_TICKET_PDF_BY_HASH';


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

export const selectTicket = (ticket) => (dispatch, getState) => {
    
  dispatch(startLoading());

  dispatch(createAction(SELECT_TICKET)(ticket));

  dispatch(stopLoading());

}

export const assignAtendee = (attendee_first_name, attendee_last_name, attendee_email, extra_questions) => (dispatch, getState) => {

  let { loggedUserState, orderState: { selectedOrder }, ticketState: { selectTicket } } = getState();
  let { accessToken }     = loggedUserState;

  dispatch(startLoading());

  let params = {
    access_token : accessToken
  };

  let normalizedEntity = { attendee_first_name, attendee_last_name, attendee_email, extra_questions };


  return getRequest(
      null,
      createAction(ASSIGN_TICKET),
      `${window.API_BASE_URL}/api/v1/summits/all/orders/${selectedOrder.id}/tickets/${selectTicket.id}/attendee`,
      normalizedEntity,
      authErrorHandler
  )(params)(dispatch).then(() => {
      dispatch(stopLoading());
    }
  );

}

export const removeAttendee = () => (dispatch, getState) => {

  let { loggedUserState, orderState: { selectedOrder }, ticketState: { selectTicket } } = getState();
  let { accessToken }     = loggedUserState;

  dispatch(startLoading());

  let params = {
    access_token : accessToken
  };

  return getRequest(
      null,
      createAction(REMOVE_TICKET_ATTENDEE),
      `${window.API_BASE_URL}/api/v1/summits/all/orders/${selectedOrder.id}/tickets/${selectTicket.id}/attendee`,
      authErrorHandler
  )(params)(dispatch).then(() => {
      dispatch(stopLoading());
    }
  );

}

export const getTicketPDF = () => (dispatch, getState) => {

  let { loggedUserState, orderState: { selectedOrder }, ticketState: { selectedTicket } } = getState();
  let { accessToken }     = loggedUserState;

  dispatch(startLoading());

  let params = {
    access_token : accessToken
  };

  return getRequest(
      null,
      createAction(GET_TICKET_PDF),
      `${window.API_BASE_URL}/api/v1/summits/all/orders/${selectedOrder.id}/tickets/${selectedTicket.id}/pdf`,
      authErrorHandler
  )(params)(dispatch).then(() => {
      dispatch(stopLoading());
    }
  );
  
}

export const refundTicket = () => (dispatch, getState) => {

  let { loggedUserState, orderState: { selectedOrder }, ticketState: { selectedTicket } } = getState();
  let { accessToken }     = loggedUserState;

  dispatch(startLoading());

  let params = {
    access_token : accessToken
  };

  return getRequest(
      null,
      createAction(REFUND_TICKET),
      `${window.API_BASE_URL}/api/v1/summits/all/orders/${selectedOrder.id}/tickets/${selectedTicket.id}/refund`,
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

export const assignTicketByHash = (attendee_first_name, attendee_last_name, disclaimer_accepted, share_contact_info, extra_questions, hash) => (dispatch, getState) => {

  dispatch(startLoading());

  let normalizedEntity = {attendee_first_name, attendee_last_name, disclaimer_accepted, share_contact_info, extra_questions};

  return putRequest(
    null,
    createAction(ASSIGN_TICKET_BY_HASH),
    `${window.API_BASE_URL}/api/public/v1/summits/all/orders/orders/all/tickets/${hash}`,
    normalizedEntity,
    authErrorHandler
  )()(dispatch).then(() => {
    dispatch(stopLoading());
  });
}

export const regenerateTicketHash = (formerHash) => (dispatch, getState) => {
  dispatch(startLoading());

  return putRequest(
      null,
      createAction(REGENERATE_TICKET_HASH),
      `${window.API_BASE_URL}/api/public/v1/summits/all/orders/orders/all/tickets/${formerHash}/regenerate`,
      authErrorHandler
  )()(dispatch).then(() => {
      dispatch(stopLoading());
    }
  );
}

export const getTicketPDFByHash = (hash) => (dispatch, getState) => {
  
  dispatch(startLoading());

  return getRequest(
      null,
      createAction(GET_TICKET_PDF_BY_HASH),
      `${window.API_BASE_URL}/api/public/v1/summits/all/orders/orders/all/tickets/${hash}/pdf`,
      authErrorHandler
  )()(dispatch).then(() => {
      dispatch(stopLoading());
    }
  );
}
