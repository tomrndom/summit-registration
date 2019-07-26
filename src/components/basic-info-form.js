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
import T from 'i18n-react/dist/i18n-react'
import { findElementPos } from 'openstack-uicore-foundation/lib/methods'
import { Input } from 'openstack-uicore-foundation/lib/components'


class BasicInfoForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        };

    }

    hasErrors(field) {
        let {errors} = this.props;
        if(field in errors) {
            return errors[field];
        }

        return '';
    }


    render() {
        let {order, onChange} = this.props;

        return (
            <div className="basic-info">
                <div className="row">
                    <div className="col-md-8">
                        <h3>{T.translate("step_two.basic_info")}</h3>
                    </div>
                    <div className="col-md-4">
                        * {T.translate("step_two.required")}
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        {T.translate("step_two.have_account")} {T.translate("step_two.sign_in")}
                    </div>
                </div>
                <div className="row field-wrapper">
                    <div className="col-md-4">
                        <label>{T.translate("step_two.first_name")} *</label>
                    </div>
                    <div className="col-md-6">
                        <Input
                            id="first_name"
                            className="form-control"
                            error={this.hasErrors('first_name')}
                            onChange={onChange}
                            value={order.first_name}
                        />
                    </div>
                </div>
                <div className="row field-wrapper">
                    <div className="col-md-4">
                        <label>{T.translate("step_two.last_name")} *</label>
                    </div>
                    <div className="col-md-6">
                        <Input
                            id="last_name"
                            className="form-control"
                            error={this.hasErrors('last_name')}
                            onChange={onChange}
                            value={order.last_name}
                        />
                    </div>
                </div>
                <div className="row field-wrapper">
                    <div className="col-md-4">
                        <label>{T.translate("step_two.email")} *</label>
                    </div>
                    <div className="col-md-6">
                        <Input
                            id="email"
                            className="form-control"
                            error={this.hasErrors('email')}
                            onChange={onChange}
                            value={order.email}
                        />
                    </div>
                </div>
                <div className="row field-wrapper">
                    <div className="col-md-4">
                        <label>{T.translate("step_two.company")} *</label>
                    </div>
                    <div className="col-md-6">
                        <Input
                            id="company"
                            className="form-control"
                            error={this.hasErrors('company')}
                            onChange={onChange}
                            value={order.company}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default BasicInfoForm;
