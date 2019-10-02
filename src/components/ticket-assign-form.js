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

import '../styles/ticket-assign-form.less';

class TicketAssignForm extends React.Component {

    constructor(props) {
      super(props);

      this.state = {        
        extra_questions : [],
        input_email: false,
      };

      this.handleExtraQuestions = this.handleExtraQuestions.bind(this);
    }
    
    handleExtraQuestions(ticket){
      let {extra_questions} = this.state;
      
      if(!ticket.extra_questions && extra_questions.length === 0) {        
        
        let {extraQuestions} = this.props;
        
        extraQuestions.map((q, index) => {
          extra_questions[index] = { question_id: q.id, answer: ''};
        })
  
        this.setState(() => ({
          extra_questions: extra_questions
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


    render() {

      let {guest, ticket, onChange, extraQuestions, status} = this.props;
      let {extra_questions, input_email} = this.state;

      this.handleExtraQuestions(ticket);

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
                      <p>{T.translate("ticket_popup.assign_expire")} 15 {T.translate("ticket_popup.assign_days")} (September 19)</p>
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
                  placeholder="Email"
                  error={this.hasErrors('attendee_last_name')}
                  onChange={onChange}
                  value={ticket.attendee_last_name}
                />
              </div>
            </div>
            <hr/>
            <div className="row popup-basic-info">
              <div className="col-sm-6">{T.translate("ticket_popup.edit_preferences")}</div>
              <div className="col-sm-6"></div>
            </div>
            <QuestionAnswersInput
                id="extra_questions"
                answers={extra_questions}
                questions={extraQuestions}
                onChange={onChange}                
            />
            
            <hr/>
            {/*extraQuestions.map(q => {
              console.log(q);
              const QuestionComponent = extraQuestionsComponents[q.type];
              return(
                <div className="row field-wrapper" key={q.id}>
                  <div className="col-sm-4">{q.label}{q.mandatory?'*':''}</div>
                  <div className="col-sm-6">
                    <QuestionComponent 
                      name={q.name}
                      placeholder={q.placeholder}
                      value={extraQuestionsTemp[q.id]}
                      onChange={this.handleChange}
                      options={q.values ? q.values : undefined}                      
                    />
                  </div>
                </div>
              )
            })*/}                     
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