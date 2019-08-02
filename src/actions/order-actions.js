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
    createAction,
    stopLoading,
    startLoading,
    showMessage,
    showSuccessMessage,
} from 'openstack-uicore-foundation/lib/methods';


export const RESET_ORDER  = 'RESET_ORDER';
export const RECEIVE_ORDER  = 'RECEIVE_ORDER';
export const CHANGE_ORDER  = 'CHANGE_ORDER';


export const handleResetOrder = () => (dispatch, getState) => {
    dispatch(createAction(RESET_ORDER)({}));
}


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
        if (validator.isEmpty(order.cardholder_name)) errors.cardholder_name = "Please enter the cardholder's Name.";
        if (!validator.isCreditCard(order.card_number)) errors.card_number = "Please enter a valid Credit Card.";
        if (validator.isEmpty(order.card_expiration)) errors.card_expiration = "Please enter the card expiration.";
        if (validator.isEmpty(order.card_cvc)) errors.card_cvc = "Please enter the card cvc.";

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




