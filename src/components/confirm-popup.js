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

import '../styles/confirm-popup.less';

class ConfirmPopup extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        };

    }

    render() {
      let {closePopup, popupCase, cleanFields} = this.props;
        return (  
          <div className="confirm-popup-bg">
            <div className="confirm-popup">
              {(() => {
                switch(popupCase) {
                  case 'cancel':
                      return (
                        <React.Fragment>
                            <h4>{T.translate("confirm_popup.question_title_cancel")}</h4>            
                            <p>{T.translate("confirm_popup.question_text_cancel")}</p>    
                        </React.Fragment>
                      );                 
                  case 'assign':
                      return (
                        <React.Fragment>
                            <h4>{T.translate("confirm_popup.question_title_assign")}</h4>            
                            <p>{T.translate("confirm_popup.question_text_assign")}</p>    
                        </React.Fragment>
                      );                   
                  case 'reassign':
                      return (
                        <React.Fragment>
                            <h4>{T.translate("confirm_popup.question_title_reassign")}</h4>
                            {cleanFields ? 
                              <p>{T.translate("confirm_popup.question_text_reassign")}</p>
                              :
                              <p>{T.translate("confirm_popup.question_text_confirm")}</p>
                            }
                        </React.Fragment>
                      );    
                  case 'save':
                      return (
                        <React.Fragment>
                            <h4>{T.translate("confirm_popup.question_title_save")}</h4>            
                            <p>{T.translate("confirm_popup.question_text_save")}</p>    
                        </React.Fragment>
                      );
                  case 'notification':
                      return (
                        <React.Fragment>
                            <h4>{T.translate("confirm_popup.question_title_notification")}</h4>            
                            <p>{T.translate("confirm_popup.question_text_notification")}</p>    
                        </React.Fragment>
                      );  
                  default:
                    return null;
                }
              })()}
              <div className="buttons">
                <span onClick={() => closePopup(false, popupCase)}>{T.translate("confirm_popup.cancel")}</span>
                <span onClick={() => closePopup(true, popupCase)}>{T.translate("confirm_popup.accept")}</span>
              </div>              
            </div>
          </div>
        );  
    }
}

export default ConfirmPopup;
