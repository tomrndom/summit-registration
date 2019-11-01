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

class NavBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        };

    }


    render() {

        return (
          <nav className="dashboard-menu">
            <NavLink to={'/a/member/orders'} activeClassName="active">{T.translate("nav_bar.my-orders")}</NavLink>
            <NavLink to={'/a/member/tickets'} activeClassName="active">{T.translate("nav_bar.my-tickets")}</NavLink>
          </nav>
        );
    }
}

export default NavBar;