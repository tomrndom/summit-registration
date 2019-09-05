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

class TicketList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        };

    }


    render() {

      let { tickets } = this.props;

      if (!tickets) {
        return (
          <div className="tickets-list">            
            <div className="row">
              <div className="ticket complete p-2 col-sm-8 col-sm-offset-2">
                  <div className="col-sm-5">
                      <h4>Equinoccio Summit 2020</h4>
                      <p className="status">Ready to Use</p>
                  </div>
                  <div className="col-sm-5">
                      <h5>One Day Pass</h5>
                      <p>California, US / December 22nd 2020</p>
                  </div>
                  <div className="arrow col-sm-2">
                      <i className="fa fa-angle-right"></i>
                  </div>
              </div>
            </div>
          </div>
        )        
      } else {
        return (
          <div className="mt-5 p-5">
              <div className="row">
                  <div className="col-sm-12 mt-5 text-center">
                      <i className="fa fa-5x fa-ticket"></i>
                      <h5>{T.translate("tickets.empty")}</h5>
                  </div>
              </div>
          </div>
          )
      }                       
    }
}

export default TicketList;
