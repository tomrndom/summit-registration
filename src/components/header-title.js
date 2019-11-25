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
import URI from "urijs";
import { daysBetweenDates, getFormatedDate } from '../utils/helpers';

class HeaderTitle extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        };

        this.handleEventDateLocation = this.handleEventDateLocation.bind(this);

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
          return `${summitDate} \n ${summitLocation}`;
        } else {
          return null;
        }
      } else {
        return null;
      }                  
    }


    render() {

      let {summit} = this.props;

      let url = URI(window.location.href);
      let location = url.pathname();      
      let purchaseLocation = '/register/';

        return (
          <div className="header-title">
              <h4>{summit?summit.logo:''}<b>{!location.match(purchaseLocation) ? 'Registration' : summit && summit.name ? summit.name : 'Registration'}</b></h4>
              <h5>{!location.match(purchaseLocation) ? '' : summit ? this.handleEventDateLocation() : ''}</h5>
          </div>
        );
    }
}

export default HeaderTitle;