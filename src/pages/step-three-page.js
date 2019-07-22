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

import StepRow from '../components/step-row';


//import '../styles/step-three-page.less';


class StepThreePage extends React.Component {

    constructor(props){
        super(props);

        this.state = {

        };
    }

    componentWillMount() {

    }

    render(){

        return (
            <React.Fragment>
                <StepRow step={3} />
                <div className="row">
                    <div className="col-md-12">
                        STEP 3
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = ({ loggedUserState }) => ({
    member: loggedUserState.member,
    accessToken: loggedUserState.accessToken,
})

export default connect (
    mapStateToProps,
    {

    }
)(StepThreePage);

