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
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import LandingPage from '../pages/landing-page'

class PrimaryLayout extends React.Component {

  render(){
    let { location } = this.props;

    return(
      <div className="primary-layout">
        <main id="page-wrap">
          <Switch>
              <Route exact path="/app/start" component={LandingPage}/>
          </Switch>
        </main>
      </div>
    );
  }

}

const mapStateToProps = ({  }) => ({

})

export default connect(
    mapStateToProps,
    {}
)(PrimaryLayout);


