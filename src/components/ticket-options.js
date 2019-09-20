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
import T from 'i18n-react/dist/i18n-react'

class TicketOptions extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        };

    }


    render() {

      let {guest, summit} = this.props;

        return (
            <div className="order-info-wrapper">
                {guest && 
                <React.Fragment>
                  <div className="row">
                    <div className="col-md-12 info">
                      <h4>Google I/O 2019</h4>
                      <p>Full Day Pass</p>
                      <p>Shangai, US / November 25-31, 2019</p>
                      <p><i className="fa fa-shield"></i> Staff Ticket</p>
                    </div>
                  </div>
                  <hr />
                </React.Fragment>
                }                                
                <div className="row">
                    <div className="col-md-12">
                        <a>{T.translate("order_info.print")}</a><br/>
                        {!guest && <a>{T.translate("order_info.resend")}<br/></a>}
                        <a>{T.translate("order_info.download")}</a><br/>
                        {guest && <a>{T.translate("order_info.directions")}<br/></a>}
                        {guest && <a>{T.translate("order_info.calendar")}<br/></a>}
                        {!guest && <a className="cancel">{T.translate("order_info.cancel_order")}</a>}
                        {guest && <a className="cancel">{T.translate("order_info.cancel_ticket")}</a>}
                    </div>
                </div>
            </div>
        );
    }
}

export default TicketOptions;
