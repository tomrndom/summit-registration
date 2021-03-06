/**
 * Copyright 2019 OpenStack Foundation
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
import 'awesome-bootstrap-checkbox/awesome-bootstrap-checkbox.css'
import { Input, Dropdown, RadioList, CheckboxList } from 'openstack-uicore-foundation/lib/components'
import T from "i18n-react/dist/i18n-react";

import '../styles/ticket-assign-form.less';

export default class QuestionAnswersInput extends React.Component {

    constructor(props) {
        super(props);

        let answers = props.questions.map(q => {
            let defaultValue = (q.type == 'CheckBox') ? 'false' : '';

            let answer = props.answers.find(ans => ans.question_id == q.id);            
            let value = answer ? answer.answer : defaultValue;            
            return ({question_id: q.id, answer: value});
        });

        this.state = {
            answers: answers,
        };

        this.handleChange = this.handleChange.bind(this);
        this.getInput = this.getInput.bind(this);
    }

    handleChange(ev) {
        let {value, id} = ev.target;

        if (ev.target.type == 'checkbox') {
            value = ev.target.checked ? "true" : "false";
        }

        if (ev.target.type == 'checkboxlist') {
            value = ev.target.value.join(',');
        }

        let answers = this.state.answers.map(ans => {
            let newValue = ans.answer;
            if (ans.question_id == id) newValue = `${value}`;

            return ({question_id: ans.question_id, answer: newValue})
        });

        let newEv = {
            target: {
                id: this.props.id,
                value: answers
            }
        };

        this.setState({ answers });

        this.props.onChange(newEv);
    }

    getInput(question, answerValue) {        
        let questionValues = question.values;
        let {readOnly} = this.props;

        switch(question.type) {
            case 'Text':
                if(readOnly && !answerValue) {
                  return null;
                } else {
                  return (
                    <React.Fragment>
                      <div className="row field-wrapper">
                          <div className="col-sm-4"> {question.label} {!readOnly && question.mandatory ? '*' : ''} </div>
                          <div className="col-sm-8">
                            {readOnly ? 
                              <span>{answerValue}</span>
                              :
                              <Input
                                  id={question.id}
                                  value={answerValue}
                                  onChange={this.handleChange}
                                  placeholder={question.placeholder}
                                  className="form-control"
                              />
                            }                            
                          </div>                        
                      </div>
                      <div className="field-wrapper-mobile">
                      <div> {question.label} {!readOnly && question.mandatory ? '*' : ''}</div>
                          <div>
                            {readOnly ? 
                              <span>{answerValue}</span>
                              :
                              <Input
                                  id={question.id}
                                  value={answerValue}
                                  onChange={this.handleChange}
                                  placeholder={question.placeholder}
                                  className="form-control"
                              />
                            }
                          </div>
                      </div>
                    </React.Fragment>
                  );
                }                
            case 'TextArea':
              if(readOnly && !answerValue) {
                return null;
              } else {
                return (
                  <React.Fragment>
                    <div className='row field-wrapper--textarea'>
                        <div className={`col-sm-4 ${readOnly?'read-only':''}`}> {question.label} {!readOnly && question.mandatory ? '*' : ''}</div>
                        <div className="col-sm-8">
                          {readOnly ? 
                            <span>{answerValue}</span>
                            :
                            <textarea
                                id={question.id}
                                value={answerValue}
                                onChange={this.handleChange}
                                placeholder={question.placeholder}
                                className="form-control"                                
                                rows="4"
                            />
                          }
                        </div>                        
                    </div>
                    <div className="field-wrapper-mobile">
                        <div> {question.label} {!readOnly && question.mandatory ? '*' : ''}</div>
                        <div>
                          {readOnly ? 
                            <span>{answerValue}</span>
                            :
                            <textarea
                                id={question.id}
                                value={answerValue}
                                onChange={this.handleChange}
                                placeholder={question.placeholder}
                                className="form-control"                                
                                rows="4"
                            />
                          }
                        </div>                        
                    </div>
                  </React.Fragment>
                );
              }
            case 'CheckBox':
              if(readOnly && !answerValue) {
                return null;
              } else {
                if(readOnly) {
                  return (
                    <React.Fragment>
                      <div className="row field-wrapper">
                          <div className="col-sm-4"> {question.label} </div>
                          <div className="col-sm-8">
                              <span>{answerValue === 'true' ? T.translate("general.yes") : T.translate("general.no")}</span>                                                     
                          </div>                        
                      </div>
                      <div className="field-wrapper-mobile">
                        <div> {question.label} </div>
                        <div>
                            <span>{answerValue === 'true' ? T.translate("general.yes") : T.translate("general.no")}</span>                                                     
                        </div>                        
                    </div>
                    </React.Fragment>
                  );
                } else {
                  return (
                    <div className="form-check abc-checkbox">
                        <input type="checkbox" id={question.id} checked={(answerValue == "true")}
                               onChange={this.handleChange} className="form-check-input" />
                        <label className="form-check-label" htmlFor={question.id}>
                            {question.label} {!readOnly && question.mandatory ? '*' : ''}
                        </label>
                    </div>
                  );
                }           
              }
            case 'ComboBox':
              if(readOnly && !answerValue) {
                return null;
              } else {
                let value = answerValue ? questionValues.find(val => val.id == parseInt(answerValue)) : null;
                questionValues = questionValues.map(val => ({...val, value: val.id}));
                if(readOnly) {
                  return (
                    <React.Fragment>
                      <div className="row field-wrapper">
                          <div className="col-sm-4"> {question.label} </div>
                          <div className="col-sm-8"> {value? value.label: ''} </div>                        
                      </div>
                      <div className="field-wrapper-mobile">
                          <div> {question.label} </div>
                          <div> {value? value.label: ''} </div>                        
                      </div>
                    </React.Fragment>
                  );
                } else {
                  return (
                    <React.Fragment>
                      <div className="row field-wrapper">
                          <div className="col-sm-4"> {question.label} {!readOnly && question.mandatory ? '*' : ''}</div>
                          <div className="col-sm-8">                          
                            <Dropdown
                                id={question.id}
                                value={value}
                                options={questionValues}
                                onChange={this.handleChange}
                            />
                          </div>                        
                      </div>
                      <div className="field-wrapper-mobile">
                          <div> {question.label} {!readOnly && question.mandatory ? '*' : ''}</div>
                          <div>                          
                            <Dropdown
                                id={question.id}
                                value={value}
                                options={questionValues}
                                onChange={this.handleChange}
                            />
                          </div>                        
                      </div>
                    </React.Fragment>
                  );
                }
              }
            case 'CheckBoxList':
              if(readOnly && !answerValue) {
                return null;
              } else {
                questionValues = questionValues.map(val => ({...val, value: val.id}));
                answerValue = answerValue ? answerValue.split(',').map(ansVal => parseInt(ansVal)) : [];                
                if(readOnly) {
                  let readOnlyAnswers = [];
                  answerValue.map(a => {
                    questionValues.map(q => { 
                      if(q.value == a) {
                        readOnlyAnswers.push(q.label);
                      }
                    });
                  });                  
                  return (
                    <React.Fragment>
                      <div className="row field-wrapper">
                          <div className="col-sm-4"> {question.label} </div>
                          <div className="col-sm-8">                          
                              {readOnlyAnswers.join(', ')}
                          </div>                        
                      </div>
                      <div className="field-wrapper-mobile">
                        <div> {question.label} </div>
                        <div>                          
                            {readOnlyAnswers.join(', ')}
                        </div>                        
                    </div>
                    </React.Fragment>
                  );
                } else {
                  return(
                    <React.Fragment>
                      <div className="row field-wrapper">
                          <div className="col-sm-4"> {question.label} {!readOnly && question.mandatory ? '*' : ''}</div>
                          <div className="col-sm-8">                          
                              <CheckboxList
                                  id={question.id}
                                  value={answerValue}
                                  options={questionValues}
                                  onChange={this.handleChange}
                              />
                          </div>                        
                      </div>
                      <div className="field-wrapper-mobile">
                        <div> {question.label} {!readOnly && question.mandatory ? '*' : ''}</div>
                        <div>                          
                            <CheckboxList
                                id={question.id}
                                value={answerValue}
                                options={questionValues}
                                onChange={this.handleChange}
                            />
                        </div>                        
                    </div>
                    </React.Fragment>
                  );
                }
              }
            case 'RadioButtonList':
              if(readOnly && !answerValue) {
                return null;
              } else {
                questionValues = questionValues.map(val => ({...val, value: val.id}));
                if(readOnly){
                  return(
                    <React.Fragment>
                      <div className="row field-wrapper">
                          <div className="col-sm-4"> {question.label} </div>
                          <div className="col-sm-8">
                            {questionValues.find(q => q.value == answerValue) ? 
                              questionValues.find(q => q.value == answerValue).label 
                              : 
                              ''
                            }</div>
                      </div>
                      <div className="field-wrapper-mobile">
                          <div> {question.label} </div>
                          <div>{questionValues.find(q => q.value == answerValue) ? 
                              questionValues.find(q => q.value == answerValue).label 
                              : 
                              ''
                            }</div>
                      </div>
                    </React.Fragment>
                  );
                } else {
                  return (
                      <div className="row field-wrapper--radio-list">
                          <div className="col-sm-4"> {question.label} {!readOnly && question.mandatory ? '*' : ''}</div>
                          <div className="col-sm-8">
                            {readOnly ? 
                              <span>{answerValue}</span>
                              :
                              <RadioList
                                  id={question.id}
                                  value={answerValue}
                                  options={questionValues}
                                  onChange={this.handleChange}
                                  inline
                              />
                            }
                          </div>                                             
                      </div>
                  );
                }
              }
        }
    }

    render() {
        let { answers } = this.state;
        let { questions, questions_type, readOnly } = this.props;

        let orderedQuestions = questions.sort((a, b) => (a.order > b.order) ? 1 : -1);

        return (
            <div>
                {orderedQuestions.filter(q => q.usage === "Both" || q.usage === questions_type).map( q => {
                    let answer = answers.find(ans => ans.question_id == q.id);
                    let answerValue = answer ? answer.answer : null;
                    return (                      
                        <div className={`row form-group ${readOnly? 'read-only':''}`} key={`question_answer_${q.id}`}>
                            <div className="col-md-12">
                                {this.getInput(q, answerValue)}
                            </div>
                        </div>
                    );
                })}
            </div>
        );

    }
}