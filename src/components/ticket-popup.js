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
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import { Input, Dropdown, CheckboxList, TextArea } from 'openstack-uicore-foundation/lib/components'

import '../styles/popup-form.less';

class TicketPopup extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        };

    }


    render() {

        return (  
        <div className='popup-bg'>
            <div className='popup-form'>
              <div className="popup-header">
                <div className="row">
                  <div className="col-sm-9 popup-title">
                    <h4><b>Full Day Pass</b></h4>
                    <p>Speaker</p>
                    <p>Ready to use</p>
                  </div>
                  <div className="col-sm-3 popup-icons">
                    <i className="fa fa-print"></i>
                    <i className="fa fa-file-pdf-o"></i>
                    <i onClick={this.props.closePopup} className="fa fa-times"></i>                    
                  </div>
                </div>
              </div>
                <Tabs selectedTabClassName="popup-tabs--active" >
                    <TabList className="popup-tabs">
                        <Tab>{T.translate("ticket_popup.tab_assign")}</Tab>      
                        <Tab>{T.translate("ticket_popup.tab_edit")}</Tab>
                        <Tab>{T.translate("ticket_popup.tab_reassign")}</Tab>
                        <Tab>{T.translate("ticket_popup.tab_notify")}</Tab>
                    </TabList>
                    <TabPanel className="popup-panel popup-panel--assign">
                        <p>{T.translate("ticket_popup.assign_text")} September 29</p>
                        <button className="btn btn-primary">
                          {T.translate("ticket_popup.assign_me")}
                        </button>
                        <div className="popup-separator">
                          <div><hr/></div>
                          <span>{T.translate("ticket_popup.assign_or")}</span>
                          <div><hr/></div>
                        </div>
                        <Input
                            id="email"
                            className="form-control"
                            placeholder="Email"
                            //error={this.hasErrors('email')}
                            //onChange={onChange}
                            //value={order.email}
                        />
                        <button className="btn btn-primary">
                          {T.translate("ticket_popup.assign_someone")}
                        </button>
                    </TabPanel>
                    <TabPanel className="popup-panel popup-panel--edit">
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
                          <div className="col-sm-6"></div>
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
                        <div className="row field-wrapper">
                          <div className="col-sm-4"></div>
                          <div className="col-sm-6">
                            <h4 className="popup-cancel-ticket">Cancel Ticket</h4>
                            <p>Description about the refund policy lorem ipsum dolor sit amet.</p>
                            learn more
                          </div>
                        </div>
                        <div className="popup-footer-save">
                          <button className="btn btn-primary" onClick={this.props.closePopup}>{T.translate("ticket_popup.save_changes")}</button>  
                        </div>
                    </TabPanel>
                    <TabPanel className="popup-panel popup-panel--reassign">
                        <p>{T.translate("ticket_popup.reassign_text")} <br/> <b>jon.snow@thewall.com</b></p>                        
                        <label>
                          <input type="checkbox" className="popup-clean" /> &nbsp;
                            {T.translate("ticket_popup.reassign_check")} <i className="fa fa-question-circle"></i>
                        </label>
                        <br />
                        <button className="btn btn-primary" onClick={this.props.closePopup}>{T.translate("ticket_popup.reassign_me")}</button>  
                        <div className="popup-separator">
                          <div><hr/></div>
                          <span>{T.translate("ticket_popup.assign_or")}</span>
                          <div><hr/></div>
                        </div>
                        <Input
                            id="email"
                            className="form-control"
                            placeholder="Email"
                            //error={this.hasErrors('email')}
                            //onChange={onChange}
                            //value={order.email}
                        />
                        <button className="btn btn-primary">
                          {T.translate("ticket_popup.reassign_someone")}
                        </button>
                    </TabPanel>
                    <TabPanel className="popup-panel popup-panel--notify">
                        <p>{T.translate("ticket_popup.notify_text_1")} September 29.</p>                                                
                        <p>{T.translate("ticket_popup.notify_text_2")} <b>jon.snow@thewall.com</b></p>
                        <button className="btn btn-primary">{T.translate("ticket_popup.notify_button")}</button>  
                    </TabPanel>
                </Tabs>
            </div>  
        </div>  
        );  
    }
}

export default TicketPopup;
