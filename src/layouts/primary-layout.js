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
import { getSummitBySlug } from '../actions/base-actions';
import StepOnePage from '../pages/step-one-page'
import StepTwoPage from '../pages/step-two-page'
import StepThreePage from '../pages/step-three-page'
import StepFourPage from '../pages/step-four-page'

class PrimaryLayout extends React.Component {

    componentWillMount() {
        let summitSlug = this.props.match.params.summit_slug;

        if (summitSlug) {
            this.props.getSummitBySlug(summitSlug);
        }
    }

    componentWillReceiveProps(newProps) {
        let oldId = this.props.match.params.summit_slug;
        let newId = newProps.match.params.summit_slug;

        if (newId != oldId) {
            if (newId) {
                this.props.getSummitBySlug(newId);
            }
        }
    }

    render(){
        let { location, match, summit } = this.props;
        let summitSlug = this.props.match.params.summit_slug;

        if (!summit || summitSlug != summit.slug) return (<div></div>);

        return(
            <div className="primary-layout">
                <main id="page-wrap">
                    <Switch>
                        <Route exact path={`${match.url}/start`} component={StepOnePage}/>
                        <Route exact path={`${match.url}/details`} component={StepTwoPage}/>
                        <Route exact path={`${match.url}/checkout`} component={StepThreePage}/>
                        <Route exact path={`${match.url}/done`} component={StepFourPage}/>
                        <Route render={props => (<Redirect to={`${match.url}/start`} />)}/>
                    </Switch>
                </main>
            </div>
        );
    }

}

const mapStateToProps = ({ summitState  }) => ({
    summit: summitState.summit
})

export default connect(
    mapStateToProps,
    {
        getSummitBySlug
    }
)(PrimaryLayout);


