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
import { Switch, Route, Router } from 'react-router-dom'
import PrimaryLayout from "./layouts/primary-layout"
import DashboardLayout from "./layouts/dashboard-layout"
import GuestsLayout from "./layouts/guests-layout"
import AuthorizedRoute from './routes/authorized-route'
import AuthorizationCallbackRoute from "./routes/authorization-callback-route"
import LogOutCallbackRoute from './routes/logout-callback-route'
import AuthButton from './components/auth-button'
import NavBar from './components/nav-bar'
import NotFoundPage from './pages/not-found-page'
import { connect } from 'react-redux'
import { AjaxLoader } from "openstack-uicore-foundation/lib/components";
import { onUserAuth, doLogin, doLogout, initLogOut, getUserInfo } from "openstack-uicore-foundation/lib/methods";
import { handleResetReducers } from './actions/summit-actions'
import T from 'i18n-react';
import history from './history'
import URI from "urijs";


// here is set by default user lang as en
let language = (navigator.languages && navigator.languages[0]) || navigator.language || navigator.userLanguage;

// language would be something like es-ES or es_ES
// However we store our files with format es.json or en.json
// therefore retrieve only the first 2 digits

if (language.length > 2) {
    language = language.split("-")[0];
    language = language.split("_")[0];
}

//console.log(`user language is ${language}`);

T.setTexts(require(`./i18n/${language}.json`));

window.IDP_BASE_URL        = process.env['IDP_BASE_URL'];
window.API_BASE_URL        = process.env['API_BASE_URL'];
window.OAUTH2_CLIENT_ID    = process.env['OAUTH2_CLIENT_ID'];
window.SCOPES              = process.env['SCOPES'];
window.ALLOWED_USER_GROUPS = process.env['ALLOWED_USER_GROUPS'];
window.STRIPE_PRIVATE_KEY  = process.env['STRIPE_PRIVATE_KEY'];

class App extends React.PureComponent {

    getBackURL() {
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

    onClickLogin() {
        this.getBackURL();
        doLogin(this.getBackURL());        
    }

    render() {
      let {isLoggedUser, onUserAuth, doLogout, getUserInfo, member, backUrl, summit} = this.props;

      let url = URI(window.location.href);
      let location = url.pathname();
      let memberLocation = '/a/member/';            

      return (
          <Router history={history}>
              <div className="container">
                  <AjaxLoader show={ this.props.loading } size={ 120 }/>
                  <div className="header row">
                      <div className="header-title">
                          <h4>{summit?summit.logo:''}<b>{summit && summit.name ? summit.name : 'Registration'}</b></h4>
                      </div>
                      <div className="header-menu">                        
                        {isLoggedUser && location.match(memberLocation) && <NavBar />}
                      </div>
                      <div className="header-user">
                          <AuthButton isLoggedUser={isLoggedUser} member={member} doLogin={this.onClickLogin.bind(this)} initLogOut={initLogOut} location={location} clearState={this.props.handleResetReducers}/>
                      </div>
                  </div>
                  <Switch>
                      <Route path="/a/:summit_slug/register" component={PrimaryLayout}/>
                      <Route path="/a/guests/:ticket_hash" component={GuestsLayout}/>
                      <AuthorizedRoute isLoggedUser={isLoggedUser} backUrl={backUrl} path="/a/member" component={DashboardLayout} />
                      <AuthorizationCallbackRoute onUserAuth={onUserAuth} path='/auth/callback' getUserInfo={getUserInfo} />
                      <LogOutCallbackRoute doLogout={doLogout}  path='/auth/logout'/>
                      <Route path="/logout" component={NotFoundPage} />
                      <Route path="/404" component={NotFoundPage} />
                      <Route component={NotFoundPage} />
                  </Switch>
              </div>
          </Router>
      );
  }
}

const mapStateToProps = ({ loggedUserState, baseState, summitState }) => ({
  isLoggedUser: loggedUserState.isLoggedUser,
  backUrl: loggedUserState.backUrl,
  member: loggedUserState.member,
  summit: summitState.currentSummit,
  loading : baseState.loading,
})

export default connect(mapStateToProps, {
  onUserAuth,
  doLogout,
  getUserInfo,
  handleResetReducers
})(App)
