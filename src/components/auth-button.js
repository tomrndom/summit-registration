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


export default class 
AuthButton extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            showLogOut: false,
        };

        this.toggleLogOut = this.toggleLogOut.bind(this);
        this.handleMemberMenu = this.handleMemberMenu.bind(this);
        this.onTicketClick = this.onTicketClick.bind(this);
        this.onOrderClick = this.onOrderClick.bind(this);
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
      history.push('/a/member/orders');
    }

    onOrderClick() {
      history.push('/a/member/tickets');
    }

    render() {
        let {isLoggedUser, doLogin, initLogOut, member} = this.props;
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
                            <span className="dropdown-item" onClick={() => { initLogOut(); }}>
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
                        {T.translate("landing.log_in")}
                    </button>
                </div>
            );
        }

    }
}
