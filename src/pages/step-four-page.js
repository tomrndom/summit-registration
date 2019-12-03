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

import React from 'react';
import { connect } from 'react-redux';
import T from "i18n-react/dist/i18n-react";
import { Link } from 'react-router-dom';
import OrderSummary from "../components/order-summary";
import EventInfo from "../components/event-info";
import BasicInfoForm from '../components/basic-info-form';
import TicketInfoForm from '../components/ticket-info-form';
import StepRow from '../components/step-row';
import { saveOrderDetails, handleOrderChange } from '../actions/order-actions'
import {findElementPos} from "openstack-uicore-foundation/lib/methods";


import '../styles/step-four-page.less';
import history from '../history';


class StepFourPage extends React.Component {

    constructor(props){
        super(props);

        this.state = {

        };

        this.generateQRCode = this.generateQRCode.bind(this);

    }

    componentDidMount() {
      let {order:{checkout}} = this.props;
      const stepDefs = ['start', 'details', 'checkout', 'done'];
      if(Object.entries(checkout).length === 0 && checkout.constructor === Object) {
        history.push(stepDefs[0]);
      } else {
        window.scrollTo(0, 0);
      }
    }

    componentWillUnmount() {
      let {member, order} = this.props;

      if(member) {
        order = {
          ...order,
          checkout: {}
        };
      } else {
        order= {
          ...order,
          checkout: {},
          first_name: '',
          last_name: '',
          email: '',
          company: '',
          billing_country: '',
          billing_address: '',
          billing_city: '',
          billing_state: '',
          billing_zipcode: ''
        }        
      }

      this.props.handleOrderChange(order);
    }

    generateQRCode() {
      var QRCode = require('qrcode.react');      
      const { order: { checkout }} = this.props;
      let qr = null;

      if (checkout && checkout.number) {          
          qr = <QRCode value={checkout.number} />
      }

      return qr;
  }

    render(){
        let {summit, order: {checkout}, order, errors, member} = this.props;

        return (
            <div className="step-four">
                <OrderSummary order={order} summit={summit} type={'mobile'} />
                <div className="row">
                    <div className="order-result">
                        <h1>{T.translate("step_four.congratulations")}!</h1>
                        {checkout &&
                        <div className="order-no-box">
                            <p>{T.translate("step_four.order_no")}</p>
                            <div className="qr-code">
                              {this.generateQRCode()}
                            </div>
                            <div className="order-no">{checkout.number}</div>
                        </div>
                        }
                        {member &&
                          <Link to="/a/member/orders">
                            <button className="btn btn-primary manage-btn">
                              {T.translate("step_four.manage")}
                            </button>
                          </Link>                          
                        }
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ loggedUserState, summitState, orderState }) => ({
    member: loggedUserState.isLoggedUser,
    summit: summitState.currentSummit,
    order:  orderState.purchaseOrder,
    errors:  orderState.errors
})

export default connect (
    mapStateToProps,
    {
        saveOrderDetails,
        handleOrderChange
    }
)(StepFourPage);

