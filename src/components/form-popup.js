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

import '../styles/popup-form.less';

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
              <div className="popup-header">
                <div className="row">
                  <div className="col-sm-10 popup-title">
                    <h4>Full Day Pass</h4>
                    <p>Speaker</p>
                    <p>Speaker ticket</p>
                  </div>
                  <div className="col-sm-2 popup-icons">
                    <button onClick={this.props.closePopup}>close me</button>  
                  </div>
                </div>
              </div>
                <Tabs>
                    <TabList className="popup-tabs">
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
