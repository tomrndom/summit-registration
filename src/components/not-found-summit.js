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


export default class NotFoundSummit extends React.Component {

    constructor(props){
        super(props);

        this.state = {
          selectedSummit : ''
        };
    }

    handleChange(ev) {
      let {value} = ev.target;
      history.push(`/a/${value}/register`);
    }

    render(){

      let {slug, summits} = this.props;
      let {selectedSummit} = this.state;

      summits = summits.map(s => ({...s, value: s.slug, label: s.name}));

        return (
            <div className="not-found-summit">
                <h3>{`${T.translate("no-summit.show-slug")} ${slug ? `"${slug}"` : ''} ${T.translate("no-summit.not-found")}`}</h3>
                <h3>{`${T.translate("no-summit.select-list")}`}</h3>
                <br />
                <div className="row field-wrapper">                  
                  <div className="col-sm-6 col-sm-offset-3 col-lg-4 col-lg-offset-4 col-xs-8 col-xs-offset-2">
                    <Dropdown
                      value={selectedSummit}
                      options={summits}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
            </div>
        );
    }
}


