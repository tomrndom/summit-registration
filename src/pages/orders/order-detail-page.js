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

import '../../styles/order-detail-page.less';

class OrderDetailPage extends React.Component {

    render() {
        let {order} = this.props;

        return (
            <div className="order-detail">
                <div className="row">
                    <div className="col-md-8">
                      <div className="order-detail__title">
                        <h4>Google I/O 2019</h4>
                        California, US / September 18, 2019
                      </div>
                      <div className="ticket-list">
                        <div className="ticket-type">
                          Full Pass Tickets x3
                        </div>
                        <div className="row">
                            <div className="ticket complete p-2 col-sm-12 col-sm-offset-1">
                                <div className="col-sm-6">
                                    <h4>Speaker</h4>
                                    100% Discount
                                    <p className="status">Ready to Use</p>
                                </div>
                                <div className="col-sm-5">
                                    ned.stark@winterfell.com
                                </div>
                                <div className="col-sm-1">
                                    <h4>&#10095;</h4>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="ticket complete p-2 col-sm-12 col-sm-offset-1">
                                <div className="col-sm-6">
                                    <h4>Speaker</h4>
                                    100% Discount
                                    <p className="status">Ready to Use</p>
                                </div>
                                <div className="col-sm-5">
                                    ned.stark@winterfell.com
                                </div>
                                <div className="col-sm-1">
                                    <h4>&#10095;</h4>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="ticket complete p-2 col-sm-12 col-sm-offset-1">
                                <div className="col-sm-6">
                                    <h4>Speaker</h4>
                                    100% Discount
                                    <p className="status">Ready to Use</p>
                                </div>
                                <div className="col-sm-5">
                                    ned.stark@winterfell.com
                                </div>
                                <div className="col-sm-1">
                                    <h4>&#10095;</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                    <div className="col-md-4">
                        <OrderSummary order={order} />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ loggedUserState, userState }) => ({
    member: loggedUserState.member,
    order: userState.orders
})

export default connect(
    mapStateToProps
)(OrderDetailPage);