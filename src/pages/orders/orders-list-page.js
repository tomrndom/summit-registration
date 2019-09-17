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

import React from 'react'
import { connect } from 'react-redux';
import T from "i18n-react/dist/i18n-react";

import '../../styles/orders-list-page.less';
import OrderList from '../../components/order-list';

import getUserOders from '../../actions/member-actions';

class OrdersListPage extends React.Component {

  componentWillMount() {
    console.log('order list did mount?');
    
    this.props.getUserOders();
  }

    render() {
      let {orders} = this.props;

        return (
          <div>
            <p>order lsit...</p>
            <OrderList orders={orders} />
          </div>
        );
    }
}

const mapStateToProps = ({ memberState }) => ({
  orders: memberState.orders
})

export default connect (
  mapStateToProps, 
    {
      getUserOders
    }
)(OrdersListPage);