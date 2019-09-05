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

class FormPopup extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        };

    }


    render() {

        return (  
        <div className='popup'>  
            <div className='popup-form'>
                <Tabs>
                    <TabList>
                        <Tab>{T.translate("popup.tab_assign")}</Tab>      
                        <Tab>{T.translate("popup.tab_reassign")}</Tab>
                        <Tab>{T.translate("popup.tab_edit")}</Tab>
                    </TabList>
                    <TabPanel>
                        <p>{T.translate("popup.assign_text")} September 29</p>
                        <button className="btn btn-primary">
                          {T.translate("popup.assign_me")}
                        </button>
                        {T.translate("popup.assign_or")}
                        <Input
                          className="form-control email"
                          placeholder={T.translate("popup.placeholders.email")}
                          error={this.hasErrors(`tix_email_${tix.id}`)}
                          onChange={this.ticketInfoChange.bind(this, tix.id, 'email')}
                          value={tix.email ? tix.email : ''}
                        />
                        <button className="btn btn-primary">
                          {T.translate("popup.assign_someone")}
                        </button>
                    </TabPanel>
                    <TabPanel>
                        <p>edit</p>
                        <button className="btn btn-primary" onClick={this.props.closePopup}>{T.translate("popup.save_changes")}</button>  
                    </TabPanel>
                    <TabPanel>
                        <p>reassign</p>
                        <button className="btn btn-primary" onClick={this.props.closePopup}>{T.translate("popup.save_changes")}</button>  
                    </TabPanel>
                </Tabs>
            </div>  
        </div>  
        );  
    }
}

export default FormPopup;
