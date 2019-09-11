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
import T from "i18n-react/dist/i18n-react";
import { Input, Dropdown, CheckboxList, TextArea } from 'openstack-uicore-foundation/lib/components'

import '../styles/ticket-assign-form.less';

class TicketAssignForm extends React.Component {    

    render() {
      let {guest} = this.props;

        return (
          <div>
            <div className="row popup-basic-info">
              <div className="col-sm-6">{T.translate("ticket_popup.edit_basic_info")}</div>
              <div className="col-sm-6">{T.translate("ticket_popup.edit_required")}</div>
            </div>
            <div className="row field-wrapper">
              <div className="col-sm-4">{T.translate("ticket_popup.edit_email")}</div>
              <div className="col-sm-6">john.snow@thewall.com</div>
            </div>
            <div className="row field-wrapper">
              <div className="col-sm-4">{T.translate("ticket_popup.edit_first_name")}</div>
              <div className="col-sm-6">
                <Input
                  id="first_name"
                  className="form-control"                              
                  //error={this.hasErrors('email')}
                  //onChange={onChange}
                  value="John"
                />
              </div>
            </div>
            <div className="row field-wrapper">
              <div className="col-sm-4">{T.translate("ticket_popup.edit_last_name")}</div>
              <div className="col-sm-6">
                <Input
                  id="last_name"
                  className="form-control"
                  placeholder="Email"
                  //error={this.hasErrors('email')}
                  //onChange={onChange}
                  value="Snow"
                />
              </div>
            </div>
            <hr/>
            <div className="row popup-basic-info">
              <div className="col-sm-6">{T.translate("ticket_popup.edit_preferences")}</div>
              <div className="col-sm-6"></div>
            </div>
            <div className="row field-wrapper">
              <div className="col-sm-4">Small Select*</div>
              <div className="col-sm-6">
                <Dropdown />
              </div>
            </div>
            <div className="row field-wrapper">
              <div className="col-sm-4">Small Select*</div>
              <div className="col-sm-6">
                <Dropdown />
              </div>
            </div>
            <div className="row field-wrapper">
              <div className="col-sm-4">Checkbox List</div>
              <div className="col-sm-6">                
              </div>
            </div>
            <div className="row field-wrapper">
              <div className="col-sm-4">Checkbox List</div>
              <div className="col-sm-6"></div>
            </div>
            <div className="row field-wrapper">
              <div className="col-sm-4">TextArea *</div>
              <div className="col-sm-6">
                <TextArea />
              </div>
            </div>                        
            {!guest &&
              <div className="row field-wrapper">
                <div className="col-sm-4"></div>
                <div className="col-sm-6">
                  <h4 className="popup-cancel-ticket">Cancel Ticket</h4>
                  <p>Description about the refund policy lorem ipsum dolor sit amet.</p>
                  learn more
                </div>
              </div>
            }
          </div>
        );
    }
}

export default TicketAssignForm;