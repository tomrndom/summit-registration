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
import cloneDeep from "lodash.clonedeep";
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import { Input, Dropdown, CheckboxList, TextArea } from 'openstack-uicore-foundation/lib/components'

import TicketAssignForm from '../components/ticket-assign-form';
import ConfirmPopup from '../components/confirm-popup';

import '../styles/popup-form.less';

class TicketPopup extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          showPopup: false,
          tempTicket: {
            attendee_email: '',
            attendee_first_name: '',
            attendee_last_name: '',
            extra_questions: []
          }
        };
  
        this.togglePopup = this.togglePopup.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
  
    togglePopup(confirm) {
      this.setState((prevState, props) => {
        return {
          showPopup: !prevState.showPopup
        }
      })
      if(confirm) {
        let ticket = cloneDeep(this.props.ticket);
        ticket = {...ticket, ...this.state.tempTicket}
        this.props.updateTicket(ticket);
        this.props.closePopup();
      }
    }

    hasErrors(field) {
      let {errors} = this.props;
      if(field in errors) {
          return errors[field];
      }

      return '';
    }

    handleTicketAssign(self) {
      if(self){

      } else {
        let { tempTicket } = this.state;
        this.props.updateTicket(tempTicket);
      }           
    }

    handleChange(ev) {
      
      let ticket = this.state.tempTicket;

      if (ev.target.type == 'checkbox') {
        value = ev.target.checked;
      }

      if (ev.target.type == 'datetime') {
          value = value.valueOf() / 1000;
      }
      
      let {value, id} = ev.target;

      ticket[id] = value;

      this.setState({tempTicket: ticket});      
  
      //this.props.handleTicketChange(ticket, errors);
    }

    handleStatus(status) {
      
    }

    render() {

      let {extraQuestions, status, errors} = this.props;
      let {showPopup, tempTicket, tempTicket: {attendee_email}} = this.state;

      console.log(status);

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
                    <i onClick={() => this.props.downloadTicket()} className="fa fa-file-pdf-o"></i>
                    <i onClick={() => this.props.closePopup()} className="fa fa-times"></i>                    
                  </div>
                </div>
              </div>
                <Tabs selectedTabClassName="popup-tabs--active" >
                    <TabList className="popup-tabs">
                        {status === 'UNASSIGNED' && <Tab>{T.translate("ticket_popup.tab_assign")}</Tab>}
                        <Tab>{T.translate("ticket_popup.tab_edit")}</Tab>
                        {status !== 'UNASSIGNED' && <Tab>{T.translate("ticket_popup.tab_reassign")}</Tab>}
                        {status !== 'UNASSIGNED' && <Tab>{T.translate("ticket_popup.tab_notify")}</Tab>}
                    </TabList>
                    {status === 'UNASSIGNED' && 
                      <TabPanel className="popup-panel popup-panel--assign">
                        <p>{T.translate("ticket_popup.assign_text")} September 29</p>
                        <button className="btn btn-primary" onClick={() => this.handleTicketAssign(true)}>
                          {T.translate("ticket_popup.assign_me")}
                        </button>
                        <div className="popup-separator">
                          <div><hr/></div>
                          <span>{T.translate("ticket_popup.assign_or")}</span>
                          <div><hr/></div>
                        </div>
                        <Input
                            id="attendee_email"
                            className="form-control"
                            placeholder="Email"
                            error={this.hasErrors('email')}
                            onChange={this.handleChange}
                            value={attendee_email}
                        />
                        <button className="btn btn-primary" onClick={() => this.handleTicketAssign(false)}>
                          {T.translate("ticket_popup.assign_someone")}
                        </button>
                      </TabPanel>
                    }
                    <TabPanel className="popup-panel popup-panel--edit">
                        <TicketAssignForm ticket={tempTicket} status={status} onChange={this.handleChange} extraQuestions={extraQuestions} errors={errors}/>
                        <div className="popup-footer-save">
                          <button className="btn btn-primary" onClick={() => this.togglePopup()}>{T.translate("ticket_popup.save_changes")}</button>  
                        </div>
                    </TabPanel>
                    {status !== 'UNASSIGNED' && 
                      <TabPanel className="popup-panel popup-panel--reassign">
                          <p>{T.translate("ticket_popup.reassign_text")} <br/> <b>jon.snow@thewall.com</b></p>                        
                          <label>
                            <input type="checkbox" className="popup-clean" /> &nbsp;
                              {T.translate("ticket_popup.reassign_check")} <i className="fa fa-question-circle"></i>
                          </label>
                          <br />
                          <button className="btn btn-primary" onClick={() => this.props.closePopup}>{T.translate("ticket_popup.reassign_me")}</button>  
                          <div className="popup-separator">
                            <div><hr/></div>
                            <span>{T.translate("ticket_popup.assign_or")}</span>
                            <div><hr/></div>
                          </div>
                          <Input
                              id="attendee_email"
                              className="form-control"
                              placeholder="Email"
                              error={this.hasErrors('email')}
                              onChange={this.handleChange}
                              value={attendee_email}
                          />
                          <button className="btn btn-primary" onClick={() => this.togglePopup()}>
                            {T.translate("ticket_popup.reassign_someone")}
                          </button>
                      </TabPanel>
                    }
                    {status !== 'UNASSIGNED' && 
                      <TabPanel className="popup-panel popup-panel--notify">
                          <p>{T.translate("ticket_popup.notify_text_1")} September 29.</p>                                                
                          <p>{T.translate("ticket_popup.notify_text_2")} <b>jon.snow@thewall.com</b></p>
                          <button className="btn btn-primary">{T.translate("ticket_popup.notify_button")}</button>  
                      </TabPanel>
                    }
                </Tabs>
            </div>
            {showPopup ?  
              <ConfirmPopup
                closePopup={this.togglePopup.bind(this)}
              />  
            : null  
            }  
        </div>  
        );  
    }
}

export default TicketPopup;
