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

import React from 'react';
import { connect } from 'react-redux';
import T from "i18n-react/dist/i18n-react";
import { Dropdown } from 'openstack-uicore-foundation/lib/components'
import history from '../history';
import SummitCard from './summit-card';


export default class NotFoundSummit extends React.Component {

    constructor(props){
        super(props);

        this.state = {
          selectedSummit : ''
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(ev) {
      let {selectPurchaseSummit} = this.props;
      let {value} = ev.target;
      selectPurchaseSummit(value);      
    }

    render(){
      let {slug, summits} = this.props;
      let {selectedSummit} = this.state;

      summits = summits.filter(s => s.slug 
        && s.registration_begin_date 
        && s.registration_begin_date < s.timestamp 
        && s.registration_end_date
        && s.registration_end_date > s.timestamp).map(s => ({...s, value: s.slug, label: s.name}));

        return (
            <div className="not-found-summit">
                <h4>{`${T.translate("no-summit.not-found")}`}</h4>
                <h4>{`${T.translate("no-summit.select-list")}`}</h4>
                <div className="row field-wrapper">                  
                  <div className="col-sm-4 col-xs-10 col-lg-3">
                    <Dropdown
                      value={selectedSummit}
                      options={summits}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                {/* <div className="summit-card-container">
                  {summits.map(s => {
                    return (
                        <SummitCard summit={s}/>
                    )
                  })}
                </div> */}
            </div>
        );
    }
}


