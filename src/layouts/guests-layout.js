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

import TicketAssignForm from '../components/ticket-assign-form';
import TicketOptions from '../components/ticket-options';

import { getTicketByHash } from '../actions/member-actions'

class GuestsLayout extends React.Component {
    componentDidMount() {
      let { getTicketByHash } = this.props;

      let ticketHash = this.props.match.params.ticket_hash;

      if (ticketHash) {
          getTicketByHash(ticketHash);
      }
    }

    componentWillReceiveProps(newProps) {
      let oldHash = this.props.match.params.ticket_hash;
      let newHash = newProps.match.params.ticket_hash;

      if (newHash != oldHash) {
          if (newHash) {
              this.props.getTicketByHash(newHash);
          }
      }
    }
    
    render() {
        return (
            <div>
              <div className="col-sm-8">
                <TicketAssignForm />
              </div>
              <div className="col-sm-4">
                <TicketOptions guest={true}/>
              </div>
            </div>
        );
    }
}

const mapStateToProps = () => ({
})

export default connect(
  mapStateToProps,
  {
    getTicketByHash
  }
)(GuestsLayout);