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
import { NavLink } from 'react-router-dom'
import T from 'i18n-react/dist/i18n-react'
import history from '../history'
import URI from 'urijs';


export default class 
AuthButton extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            showLogOut: false,
        };
        
        this.NONCE_LEN = 16;

        this.toggleLogOut = this.toggleLogOut.bind(this);
        this.handleMemberMenu = this.handleMemberMenu.bind(this);
        this.onTicketClick = this.onTicketClick.bind(this);
        this.onOrderClick = this.onOrderClick.bind(this);
        this.initLogOut = this.initLogOut.bind(this);
        this.getLogoutUrl = this.getLogoutUrl.bind(this);
        this.createNonce = this.createNonce.bind(this);

    }

    toggleLogOut(ev) {
        this.setState({showLogOut: !this.state.showLogOut});
    }

    handleMemberMenu() {
      let { location } = this.props;
      let memberLocation = '/a/member/';
      let showMemberOptions = location.match(memberLocation) ? false : true;
      return showMemberOptions;
    }

    onTicketClick() {
      this.setState({showLogOut: !this.state.showLogOut}, () => history.push('/a/member/orders'));      
    }

    onOrderClick() {
      this.setState({showLogOut: !this.state.showLogOut}, () => history.push('/a/member/tickets'));
    }

    initLogOut() {
      let location =  window.location;
      // check if we are on iframe
      if(window.top)
          location = window.top.location;      
      this.getLogoutUrl(window.idToken).toString()
      location.replace(this.getLogoutUrl(window.idToken).toString());
    }

    getLogoutUrl(idToken) {
      let baseUrl       = window.IDP_BASE_URL;
      let url           = URI(`${baseUrl}/oauth2/end-session`);
      let state         = this.createNonce(this.NONCE_LEN);
      let postLogOutUri = window.location.origin + '/auth/logout';
      let backUrl       = URI(window.location.href).pathname();                  
      // store nonce to check it later
      window.localStorage.setItem('post_logout_state', state);
      window.localStorage.setItem('post_logout_back_uri', backUrl);
      /**
       * post_logout_redirect_uri should be listed on oauth2 client settings
       * on IDP
       * "Security Settings" Tab -> Logout Options -> Post Logout Uris
       */
      return url.query({
          "id_token_hint"             : idToken,
          "post_logout_redirect_uri"  : encodeURI(postLogOutUri),
          "state"                     : state,
      });
    }

    createNonce(len) {
      let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let nonce = '';
      for(let i = 0; i < len; i++) {
          nonce += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      return nonce;
    }

    render() {
        let {isLoggedUser, doLogin, member} = this.props;
        let profile_pic = member ? member.pic : '';
        let {showLogOut} = this.state;

        if (isLoggedUser) {
            return (
                <div className="user-menu" onMouseEnter={this.toggleLogOut} onMouseLeave={this.toggleLogOut}>
                    <span className="user-greeting">{member ? `Hi ${member.first_name}` : 'Hi'}&nbsp;</span>
                    <div className="profile-pic">
                        <img src={profile_pic} />
                    </div>
                    <div className="dropdown-container">
                        {showLogOut && this.handleMemberMenu() &&
                        <React.Fragment>
                            <span className="dropdown-item-desktop" onClick={() => { this.onTicketClick(); }}>
                                {T.translate("nav_bar.my-orders")}
                            </span>
                            <span className="dropdown-item-desktop" onClick={() => { this.onOrderClick(); }}>
                                {T.translate("nav_bar.my-tickets")}
                            </span>
                        </React.Fragment>
                        }
                        {showLogOut &&
                        <React.Fragment>
                            <span className="dropdown-item" onClick={() => { this.initLogOut(); }}>
                                {T.translate("landing.sign_out")}
                            </span>
                            <span className="dropdown-item" onClick={() => { this.props.clearState(); }}>
                                Clear State
                            </span>                            
                        </React.Fragment>
                        }                        
                    </div>                    
                </div>
            );
        } else {
            return (
                <div className="user-menu">
                    <button className="btn btn-primary btn-xs login" onClick={() => { doLogin(); }}>
                        {T.translate("landing.sign_in")}
                    </button>
                </div>
            );
        }

    }
}
