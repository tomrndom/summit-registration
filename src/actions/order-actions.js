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


export const RESET_ORDER  = 'RESET_ORDER';
export const RECEIVE_ORDER  = 'RECEIVE_ORDER';
export const CHANGE_ORDER  = 'CHANGE_ORDER';
export const VALIDATE_STRIPE  = 'VALIDATE_STRIPE';
export const CREATE_RESERVATION = 'CREATE_RESERVATION';
export const CREATE_RESERVATION_SUCCESS = 'CREATE_RESERVATION_SUCCESS';

export const handleResetOrder = () => (dispatch, getState) => {
    dispatch(createAction(RESET_ORDER)({}));
}

const stepDefs = ['start', 'details', 'checkout', 'done'];

export const handleOrderChange = (order, errors = {}) => (dispatch, getState) => {

    let {currentStep} = order;

    if(currentStep === 2) {
        if (validator.isEmpty(order.first_name)) errors.first_name = 'Please enter your First Name.';
        if (validator.isEmpty(order.last_name)) errors.last_name = 'Please enter your Last Name.';
        if (!validator.isEmail(order.email)) errors.email = 'Please enter a valid Email.';
        if (validator.isEmpty(order.company)) errors.company = 'Please enter your Company.';

        order.tickets.forEach(tix => {
           if (tix.coupon && tix.coupon.code == 'NOTACOUPON') errors[`tix_coupon_${tix.id}`] = 'Coupon not valid.';
           else delete(errors[`tix_coupon_${tix.id}`]);

           if (tix.email && !validator.isEmail(tix.email)) errors[`tix_email_${tix.id}`] = 'Please enter a valid Email.';
           else delete(errors[`tix_email_${tix.id}`]);
        });        
        dispatch(createAction(CHANGE_ORDER)({order, errors}));
    } else if(currentStep === 3) {     
        if (validator.isEmpty(order.billing_country)) errors.billing_country = "Please enter the billing Country.";
        if (validator.isEmpty(order.billing_address)) errors.billing_address = "Please enter the billing Address.";
        if (validator.isEmpty(order.billing_city)) errors.billing_city = "Please enter the billing City.";
        if (validator.isEmpty(order.billing_state)) errors.billing_state = "Please enter the billing State.";
        if (validator.isEmpty(order.billing_zipcode)) errors.billing_zipcode = "Please enter the billing ZipCode.";
        dispatch(createAction(CHANGE_ORDER)({order, errors}));
    } else {
        dispatch(createAction(CHANGE_ORDER)({order, errors}));
    }

}

export const validateStripe = (value) => (dispatch, getState) => {
    dispatch(createAction(VALIDATE_STRIPE)({value}));
}

export const createReservation = (owner_email, owner_first_name, owner_last_name, owner_company, tickets) => (dispatch, getState) => {
    let { summitState } = getState();    
    let { currentSummit }   = summitState;

    dispatch(startLoading());
    
    let normalizedEntity = {owner_email, owner_first_name, owner_last_name, owner_company, tickets };

    // postRequest(
    //     createAction(CREATE_RESERVATION),
    //     createAction(CREATE_RESERVATION_SUCCESS),        
    //     `${window.API_BASE_URL}/api/public/v1/summit/${currentSummit.id}/orders/reserve`,
    //     normalizedEntity,
    //     authErrorHandler,
    //     // entity
    // )(dispatch)
    //     .then((payload) => {
    //         dispatch(stopLoading());
    //         console.log(payload);
    //         history.push(stepDefs[2]);
    //     }), (error) => {
    //         dispatch(stopLoading());
    //         console.log('error', error);
    //     }

    setTimeout(() => { 
        dispatch(stopLoading());        
        history.push(stepDefs[2]);
    }, 1000);    
}

export const payReservation = (card, stripe, clientSecret) => (dispatch, getState) => {
    let {orderState, summitState} = getState();

    // let success_message = {
    //     title: T.translate("general.done"),
    //     html: T.translate("book_meeting.reservation_created"),
    //     type: 'success'
    // };

    dispatch(startLoading());
    
    stripe.handleCardPayment(
        clientSecret, card, {
            payment_method_data: {
                billing_details: {name: `${orderState.first_name} ${orderState.last_name}`}
            }
        }
    ).then(function(result) {
        if (result.error) {
            // Display error.message in your UI.
            dispatch(stopLoading());
            console.log('error', error);
        } else {
            // let normalizedEntity = {
            //     billing_address_1: orderState.billing_address,
            //     billing_address_2: orderState.billing_address_two,
            //     billing_address_zip_code: orderState.billing_zipcode,
            //     billing_address_city: orderState.billing_city,
            //     billing_address_state: orderState.billing_state,
            //     billing_address_country: orderState.billing_country
            // };
            // putRequest(
            //     `${window.API_BASE_URL}/api/public/v1/summit/${currentSummit.id}/orders/reserve`,
            //     normalizedEntity,
            //     authErrorHandler,
            //     // entity
            // )(dispatch)
            //     .then((payload) => {
            //         dispatch(stopLoading());
            //         history.push(`app/${summitState.summit.slug}/done`);
            //     })

            setTimeout(() => { 
                dispatch(stopLoading());        
                history.push(stepDefs[3]);
            }, 1000);               
            // dispatch(showMessage(
            //     success_message,
            //     () => { history.push(`/a/${summitReducer.currentSummit.id}/my-meetings`) }
            // ));
            // The payment has succeeded. Display a success message.
        }
    });
}



