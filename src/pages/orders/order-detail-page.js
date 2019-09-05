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
import OrderSummary from "../../components/order-summary";

class OrderDetailPage extends React.Component {

    render() {
        let {summit, order} = this.props;

        return (
            <div className="order-detail">
                <div className="row">
                    <div className="col-md-8">
                    </div>
                    <div className="col-md-4">
                        <OrderSummary order={order} summit={summit} />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ loggedUserState, summitState, orderState }) => ({
    member: loggedUserState.member,
    summit: summitState.currentSummit,
    order:  orderState.order
})

export default connect(
    mapStateToProps
)(OrderDetailPage);