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

import { getFormatedDate } from '../utils/helpers';

import '../styles/popup-form.less';

class TicketPopup extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          showPopup: false,
          popupCase: '',
          cleanFields: false,
          reassignEmail: '',
          tempTicket: {
            attendee_email: '',
            attendee_first_name: '',
            attendee_surname: '',
            disclaimer_accepted: null,
            extra_questions: []
          }
        };

        this.popUpPanelRef = React.createRef();
  
        this.togglePopup = this.togglePopup.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleTicketCancel = this.handleTicketCancel.bind(this);
        this.handleTicketReassign = this.handleTicketReassign.bind(this);
        this.handleTicketSave = this.handleTicketSave.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);        
        this.handleFormatReassignDate = this.handleFormatReassignDate.bind(this);
        this.handleTicketRole = this.handleTicketRole.bind(this);
    }

    componentWillMount() {      
      document.body.style.overflow = "hidden";
      let {owner} = this.props.ticket;
      if(owner) {
        let {email, first_name, surname, disclaimer_accepted_date, extra_questions} = owner;
        let formattedQuestions = [];
        extra_questions.map(q => {
          let question = {question_id: q.question_id, answer: q.value};
          formattedQuestions.push(question);
        })        
        this.setState({tempTicket: { 
          attendee_email: email, 
          attendee_first_name: first_name, 
          attendee_surname: surname,
          disclaimer_accepted: disclaimer_accepted_date ? true : false, 
          extra_questions: formattedQuestions
        }});        
      }
    }

    componentWillUnmount() {      
      document.body.style.overflow = "visible";      
    }
  
    togglePopup(confirm, popupCase) {
      this.setState((prevState, props) => {
        return {
          showPopup: !prevState.showPopup
        }
      })
      if(confirm) {
        let ticket = cloneDeep(this.props.ticket);        
        switch(popupCase) {
          case 'cancel':
              this.props.cancelTicket(ticket);
              this.props.closePopup();
              break;
          case 'assign':              
              ticket = {...ticket, ...this.state.tempTicket};
              this.props.updateTicket(ticket);
              this.props.closePopup();
              break;
          case 'reassign':
                ticket = {...ticket, ...this.state.tempTicket};                
                this.props.removeAttendee(ticket);
                this.props.closePopup();
                break;
          case 'notification':
              break;
          default:
            return null;
        }              
      }
    }

    handleTicketSave(){
      let ticket = cloneDeep(this.props.ticket);
      ticket = {...ticket, ...this.state.tempTicket};
      this.props.updateTicket(ticket);
      this.props.closePopup();
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
        const { email, first_name, last_name } = this.props.member;
        this.props.updateTicket({attendee_email: email, attendee_first_name: first_name, attendee_surname: last_name});
        this.props.closePopup();
      } else {
        let { tempTicket } = this.state;
        this.props.updateTicket(tempTicket);
        this.props.closePopup();
      }           
    }

    handleTicketReassign(self) {
      let {cleanFields} = this.state;      
      if(self){
        const {email} = this.props.member;
        if(cleanFields) {
          this.setState((prevState) => {
            return {
              tempTicket: {                    
                attendee_first_name: '',
                attendee_surname: '',
                extra_questions: [],
                attendee_email: email
              }
            }
          }, () => this.handleConfirmPopup('reassign'));
        } else {
          this.setState((prevState) => {
            return {
              tempTicket: {                    
                attendee_first_name: prevState.tempTicket.attendee_first_name,
                attendee_surname: prevState.tempTicket.attendee_surname,
                extra_questions: prevState.tempTicket.extra_questions,
                attendee_email: email
              }
            }
          }, () => this.handleConfirmPopup('reassign'));
        }
      } else {
        this.setState((prevState) => {
          return {
            tempTicket: {                    
              attendee_first_name: '',
              attendee_surname: '',
              extra_questions: [],
              attendee_email: prevState.reassignEmail
            }
          }
        }, () => this.handleConfirmPopup('reassign'));
      }
      
    }

    handleTicketCancel() {      
      this.handleConfirmPopup('cancel')      
    }

    handleConfirmPopup(popup) {
      this.setState((prevState) => {
        return {          
          ...prevState,
          popupCase: popup
        }
      }, () => this.togglePopup(null, popup));
    }

    handleChange(ev) {
      
      let ticket = this.state.tempTicket;
      let {value, id} = ev.target;

      if(ev.target.id === 'attendee_last_name') {
        id = 'attendee_surname';
      }

      if (ev.target.type == 'checkbox') {
        value = ev.target.checked;        
      }

      if (ev.target.type == 'datetime') {
          value = value.valueOf() / 1000;
      }
      

      ticket[id] = value;

      this.setState({tempTicket: ticket});
  
      //this.props.handleTicketChange(ticket, errors);
    }
    
    handleTicketRole(badge) {
      let roles = [];
      badge.features.map(f => {
        roles.push(f.name);
      });
      if(roles.length) {
        return roles.join(', ');
      } else {
        return "Attendee";
      }
    }  

    handleChangeEmail(ev) {
      this.setState({reassignEmail: ev.target.value});
    }

    handleFormatReassignDate() {
      let {summit} = this.props;
      let reassign_date = summit.reassign_ticket_till_date < summit.end_date ? summit.reassign_ticket_till_date : summit.end_date;
      return getFormatedDate(reassign_date, summit.time_zone_id);
    }

    render() {

      let {extraQuestions, status, errors, ticket: {owner, badge}, fromTicketList, summit, owned, member} = this.props;
      let {showPopup, tempTicket, tempTicket: {attendee_email}, popupCase, cleanFields, reassignEmail} = this.state;
      let reassign_date = summit.reassign_ticket_till_date < summit.end_date ? summit.reassign_ticket_till_date : summit.end_date;
      let now = parseInt((new Date().getTime() / 1000).toFixed(0));

        return (
        <div className='popup-bg'>
            <div className='popup-form'>
              <div className={`popup-header ${status.orderClass}`}>                
                  {fromTicketList ? 
                    <div className="popup-title">
                      <h4><b>Full Day Pass</b></h4>
                      <p>{this.handleTicketRole(badge)}</p>
                      <p className={`status ${status.class}`}>{status.text}</p>
                    </div>
                    : 
                    <div className="popup-title">
                      <h4><b>Full Day Pass</b></h4>
                      <p>{this.handleTicketRole(badge)}</p>
                      <p className={`status ${status.class}`}>{status.text}</p>
                    </div>
                    }                  
                  <div className="popup-icons">                     
                    <i onClick={() => this.props.downloadTicket()} className="fa fa-file-pdf-o"></i>
                    <i onClick={() => this.props.closePopup()} className="fa fa-times"></i>                    
                  </div>
              </div>
                <Tabs selectedTabClassName="popup-tabs--active" >
                    <TabList className="popup-tabs">
                        {status.text === 'UNASSIGNED' && <Tab>{T.translate("ticket_popup.tab_assign")}</Tab>}
                        <Tab>{T.translate("ticket_popup.tab_edit")}</Tab>
                        {status.text !== 'UNASSIGNED' && 
                          now < reassign_date && 
                          (!fromTicketList || (fromTicketList && owned)) &&
                          <Tab>{T.translate("ticket_popup.tab_reassign")}</Tab>
                        }
                        {status.text !== 'UNASSIGNED' && 
                          (!fromTicketList && member.email !== owner.email) && 
                          <Tab>{T.translate("ticket_popup.tab_notify")}</Tab>
                        }
                    </TabList>
                    {status.text === 'UNASSIGNED' && 
                      <TabPanel ref={this.popUpPanelRef} className="popup-panel popup-panel--assign">
                        <div className="popup-scroll">
                            <p>{T.translate("ticket_popup.assign_text")} {this.handleFormatReassignDate()}</p>
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
                        </div>
                      </TabPanel>
                    }
                    <TabPanel ref={this.popUpPanelRef} className="popup-panel popup-panel--edit">
                        <div className="popup-scroll">
                          <TicketAssignForm 
                            ticket={tempTicket} 
                            status={status.text} 
                            ownedTicket={fromTicketList || owner? owner.email === member.email : false }
                            orderOwned={owned}
                            extraQuestions={extraQuestions}
                            readOnly={now > reassign_date}
                            onChange={this.handleChange} 
                            cancelTicket={this.handleTicketCancel}
                            summit={summit}
                            errors={errors}/>
                        </div>
                        <div className="popup-footer-save">
                          <button 
                              className="btn btn-primary" 
                              disabled={
                                (tempTicket.disclaimer_accepted === false && summit.registration_disclaimer_mandatory === true && fromTicketList) ||
                                !tempTicket.attendee_first_name || 
                                !tempTicket.attendee_surname}
                              onClick={() => this.handleTicketSave()}>
                                  {T.translate("ticket_popup.save_changes")}
                          </button>  
                        </div>
                    </TabPanel>
                    {status.text !== 'UNASSIGNED' && now < reassign_date && (!fromTicketList || (fromTicketList && owned)) &&
                      <TabPanel ref={this.popUpPanelRef} className="popup-panel popup-panel--reassign">
                        <div className="popup-scroll">
                          <div className="ticket-reassign-form">
                              <p>{T.translate("ticket_popup.reassign_text")} <br/> <b>{owner.email}</b></p>                              
                              <br />
                              <button className="btn btn-primary" onClick={() => this.handleTicketReassign(true)}>{T.translate("ticket_popup.reassign_me")}</button>  
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
                                  onChange={this.handleChangeEmail}
                                  value={reassignEmail}
                              />
                              <button className="btn btn-primary" onClick={() => this.handleTicketReassign(false)}>
                                {T.translate("ticket_popup.reassign_someone")}
                              </button>
                          </div>
                        </div>
                      </TabPanel>
                    }
                    {status.text !== 'UNASSIGNED' && (!fromTicketList && member.email !== owner.email) &&
                      <TabPanel ref={this.popUpPanelRef} className="popup-panel popup-panel--notify">
                          <p>{T.translate("ticket_popup.notify_text_1")} {this.handleFormatReassignDate()}.</p>                                                
                          <p>{T.translate("ticket_popup.notify_text_2")} <b>{owner.email}</b></p>
                          <button className="btn btn-primary" onClick={this.props.resendNotification}>{T.translate("ticket_popup.notify_button")}</button>  
                      </TabPanel>
                    }
                </Tabs>
            </div>
            {showPopup ?  
              <ConfirmPopup
                popupCase={popupCase}
                closePopup={this.togglePopup.bind(this)}
                cleanFields={cleanFields}
              />  
            : null  
            }  
        </div>  
        );  
    }
}

export default TicketPopup;
