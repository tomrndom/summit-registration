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
import { doLogin } from "openstack-uicore-foundation/lib/methods";
import URI from "urijs";

//import '../styles/not-found-page.less';


export default class NotFoundPage extends React.Component {

    constructor(props){
        super(props);

        this.state = {

        };

        this.redirectLogin = this.redirectLogin.bind(this);
    }

    componentWillMount() {
      this.redirectLogin();
    }

    redirectLogin() {
      function getBackURL() {
        let defaultLocation = '/a/member/orders';      
        let url      = URI(window.location.href);      
        let location = url.pathname();
        if (location === '/') location = defaultLocation
        let query    = url.search(true);
        let fragment = url.fragment();      
        let backUrl  = query.hasOwnProperty('BackUrl') ? query['BackUrl'] : location;
        if(fragment != null && fragment != ''){
            backUrl += `#${fragment}`;
        }
        return backUrl;
      }
      getBackURL();
      doLogin(getBackURL());        
    }

    render(){

        return (
            <div className="container">
                <div className="row">
                    NOT FOUND
                </div>
            </div>
        );
    }
}


