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
import { Input, Dropdown, CheckboxList, TextArea, CheckBox, RadioList  } from 'openstack-uicore-foundation/lib/components'
import QuestionAnswersInput from './questions-answer-input';

import { daysBetweenDates, getFormatedDate } from '../utils/helpers';

import '../styles/ticket-assign-form.less';
import moment from 'moment';

class TicketAssignForm extends React.Component {

    constructor(props) {
      super(props);

      this.state = {        
        extra_questions : [],
        input_email: false,
        disclaimer_checked: null,
      };

      this.handleFormatExpirationDate = this.handleFormatExpirationDate.bind(this);

    }

    componentDidMount() {
      let {extra_questions} = this.state;
      let {ticket} = this.props;
      
      if(!ticket.extra_questions && extra_questions.length === 0) {
        
        let {extraQuestions} = this.props;
        
        extraQuestions.map((q, index) => {
          extra_questions[index] = { question_id: q.id, answer: ''};
        })
  
        this.setState(() => ({
          extra_questions: extra_questions,
          disclaimer_checked: ticket.disclaimer_checked_date ? true : false
        }));
      } 
    }

    hasErrors(field) {
      let {errors} = this.props;
      if(field in errors) {
          return errors[field];
      }

      return '';
    }

    handleFormatExpirationDate(days) {
      let {expirationDate, summit} = this.props;
      if(days) {
        let now = parseInt((new Date().getTime() / 1000).toFixed(0));
        return daysBetweenDates(now, expirationDate, summit.time_zone.name).length;        
      } else {
        return getFormatedDate(expirationDate);
      }      

    }


    render() {

      let {guest, ownedTicket, ticket, onChange, extraQuestions, status, summit, orderOwned } = this.props;
      let {extra_questions, input_email} = this.state;
      let now = parseInt((new Date().getTime() / 1000).toFixed(0));

        return (
          <div>
            <div className="row popup-basic-info">
              <div className="col-sm-6">{T.translate("ticket_popup.edit_basic_info")}</div>
              <div className="col-sm-6">{T.translate("ticket_popup.edit_required")}</div>
            </div>
            <div className="row field-wrapper">
              <div className="col-sm-4">{T.translate("ticket_popup.edit_email")}</div>
              <div className="col-sm-6">
                {status === 'UNASSIGNED' ?
                  <span>
                    {input_email ?
                    <React.Fragment>
                      <Input
                        id="attendee_email"
                        className="form-control"                              
                        error={this.hasErrors('attendee_email')}
                        onChange={onChange}
                        value={ticket.email}
                      />
                    </React.Fragment>
                    :
                    <React.Fragment>
                      <button className="btn btn-primary" onClick={() => this.setState({input_email: true})}>
                        {T.translate("ticket_popup.assign_this")}
                      </button>                    
                      <p>{T.translate("ticket_popup.assign_expire")} {this.handleFormatExpirationDate(true)} {T.translate("ticket_popup.assign_days")} ({this.handleFormatExpirationDate(false)})</p>
                    </React.Fragment>
                    }
                    
                  </span>
                  :
                  <span>{ticket.attendee_email}</span>
                }
              </div>
            </div>
            <div className="row field-wrapper">
              <div className="col-sm-4">{T.translate("ticket_popup.edit_first_name")}</div>
              <div className="col-sm-6">
                <Input
                  id="attendee_first_name"
                  className="form-control"              
                  error={this.hasErrors('attendee_first_name')}
                  onChange={onChange}
                  value={ticket.attendee_first_name}
                />
              </div>
            </div>
            <div className="row field-wrapper">
              <div className="col-sm-4">{T.translate("ticket_popup.edit_last_name")}</div>
              <div className="col-sm-6">
                <Input
                  id="attendee_last_name"
                  className="form-control"
                  error={this.hasErrors('attendee_last_name')}
                  onChange={onChange}
                  value={ticket.attendee_surname}
                />
              </div>
            </div>            
            <hr/>
            {extraQuestions && 
            <React.Fragment>
              <div className="row popup-basic-info">
                <div className="col-sm-6">{T.translate("ticket_popup.edit_preferences")}</div>
                <div className="col-sm-6"></div>
              </div>
              <QuestionAnswersInput
                  id="extra_questions"
                  answers={ticket.extra_questions}
                  questions={extraQuestions}
                  questions_type={'Ticket'}
                  onChange={onChange}
              />                        
            </React.Fragment>
            }
            {(guest || ownedTicket) &&
              <React.Fragment>
                <hr/>
                <div className="row field-wrapper">
                  <div className="col-sm-12">
                      <div className="form-check abc-checkbox">
                          <input type="checkbox" id="disclaimer_accepted" checked={ticket.disclaimer_accepted}
                                  onChange={onChange} className="form-check-input" />
                          <label className="form-check-label" htmlFor="disclaimer_accepted">
                              {summit.registration_disclaimer_content}
                          </label>
                      </div>
                  </div>
                </div>
              </React.Fragment>
            }
            {!guest && orderOwned && summit.start_date > now &&
              <div className="row field-wrapper">
                <div className="col-sm-4"></div>
                <div className="col-sm-6">
                  <h4 className="popup-cancel-ticket" onClick={this.props.cancelTicket}>Cancel Ticket</h4>
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