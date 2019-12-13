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
import { Dropdown } from 'openstack-uicore-foundation/lib/components'
import history from '../history';
import { daysBetweenDates, getFormatedDate } from '../utils/helpers';


export default class SummitCard extends React.Component {

    constructor(props){
        super(props);

        this.state = {
        };

        this.clickSummit = this.clickSummit.bind(this);
        this.handleEventDateLocation = this.handleEventDateLocation.bind(this);
    }

    clickSummit(slug) {            
      history.push(`/a/${slug}/register/start`);
    }

    handleEventDateLocation() {
      let {summit} = this.props;
      if(summit && summit.locations && summit.start_date && summit.end_date && summit.time_zone_id) {
        let location = summit.locations.filter(l => l.class_name === "SummitVenue").find(l => l.is_main === true);
        let dateRange = daysBetweenDates(summit.start_date, summit.end_date, summit.time_zone_id);
        let summitDate = '';
        let summitLocation = '';
        if(dateRange.length > 1) {
          let startDate = getFormatedDate(dateRange[0], summit.time_zone_id);
          let endDate = getFormatedDate(dateRange[dateRange.length-1], summit.time_zone_id);
          let startYear = startDate.substring(startDate.length, startDate.length-4);
          let endYear = endDate.substring(endDate.length, endDate.length-4);
          if (startYear === endYear) startDate = startDate.substring(0, startDate.length-4);        
          summitDate = `${startDate} - ${endDate}`;
        } else {
          summitDate = getFormatedDate(summit.start_date, summit.time_zone_id);        
        }
        if(location) {
          summitLocation = `${location.city}, ${location.country} `;
        }      
        if(summitLocation !== '') {
          return (
            <React.Fragment>
              {summitDate}
              <br />
              {summitLocation}
            </React.Fragment>
          );
        } else {
          return null;
        }
      } else {
        return null;
      }
    }

    render(){
      let {summit, size, bgColor, fontColor, lastHours, soldOut, image} = this.props;      

        return (
            <div className="summit-card">
                {image &&
                <div className="image-container">
                  <img src={image} />
                </div>
                }
                <div className="summit-container">
                  <h4>{summit.name}</h4>
                  <h5>{this.handleEventDateLocation() ? this.handleEventDateLocation() : <React.Fragment><br/><br/></React.Fragment>}</h5>
                  <br />
                  {/* {lastHours && !soldOut && <span className="summit-label summit-label--last-hours">Last hours</span>}
                  {soldOut && !lastHours && <span className="summit-label summit-label--sold-out">Sold out</span>}
                  {!soldOut && !lastHours && <span className="summit-label summit-label--empty">&nbsp;</span>} */}
                  <div className="bottom-row">
                    <button className="btn btn-primary btn-md login" onClick={() => this.clickSummit(summit.slug)}>
                        Register
                    </button>
                    {/* <span>From <h4>$800</h4></span> */}
                  </div>    
                </div>
            </div>
        );
    }
}


