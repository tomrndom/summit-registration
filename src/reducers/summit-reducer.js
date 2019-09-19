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

import { LOGOUT_USER } from "openstack-uicore-foundation/lib/actions";
import { RECEIVE_SUMMIT, GET_SUMMITS } from "../actions/summit-actions";


const DEFAULT_STATE = {
    currentSummit: {      
      id: 6,
      created: 1437428824,
      last_edited: 1524601768,
      name: "TEST OCP 2019",
      start_date: 1461506400,
      end_date: 1461970800,
      registration_begin_date: 1450738800,
      registration_end_date: 1461968160,
      start_showing_venues_date: 1459778400,
      schedule_start_date: null,
      active: false,
      type_id: 0,
      dates_label: "April 25-29, 2016",
      max_submission_allowed_per_user: 3,
      presentation_votes_count: 33087,
      presentation_voters_count: 6011,
      attendees_count: 4748,
      speakers_count: 0,
      presentations_submitted_count: 1303,
      published_events_count: 1124,
      speaker_announcement_email_accepted_count: 447,
      speaker_announcement_email_rejected_count: 1064,
      speaker_announcement_email_alternate_count: 53,
      speaker_announcement_email_accepted_alternate_count: 22,
      speaker_announcement_email_accepted_rejected_count: 249,
      speaker_announcement_email_alternate_rejected_count: 23,
      time_zone_id: "America\/Chicago",
      secondary_registration_link: null,
      secondary_registration_label: null,
      slug: "shangai-2019",
      meeting_room_booking_start_time: null,
      meeting_room_booking_end_time: null,
      meeting_room_booking_slot_length: 0,
      meeting_room_booking_max_allowed: 0,
      api_feed_type: null,
      api_feed_url: null,
      api_feed_key: null,
      time_zone: {
        country_code: "US",
        latitude: 41.85,
        longitude: -87.65,
        comments: "Central (most areas)",
        name: "America\/Chicago",
        offset: -18000
      },
      logo: null,
      page_url: "summit\/austin-2016",
      schedule_page_url: "summit\/austin-2016\/summit-schedule",
      schedule_event_detail_url: "summit\/austin-2016\/summit-schedule\/events\/:event_id\/:event_title",
      ticket_types: [
        { id:105,
          created:1565195114,
          last_edited:1565195114,
          name: 'Full Pass',
          description:"nada",
          external_id:"none",
          summit_id:27,
          cost:800,
          currency:"USD",
          quantity_2_sell:100,
          quantity_sold: 10,
          max_quantity_per_order:5,
          sales_start_date:null,
          sales_end_date:null
        },
        { id:106,
          created:1565195114,
          last_edited:1565195114,
          name: 'One Day Pass',
          description:"nada",
          external_id:"none",
          summit_id:27,
          cost:300,
          currency:"USD",
          quantity_2_sell:100,
          quantity_sold: 95,
          max_quantity_per_order:0,
          sales_start_date:null,
          sales_end_date:null
        },
        { id:107,
          created:1565195114,
          last_edited:1565195114,
          name: 'Free Pass',
          description:"nada",
          external_id:"none",
          summit_id:27,
          cost:0,
          currency:"USD",
          quantity_2_sell:100,
          quantity_sold: 10,
          max_quantity_per_order:0,
          sales_start_date:null,
          sales_end_date:null
        }, 
      ],
      meeting_booking_room_allowed_attributes: [],
      locations: [],
      wifi_connections: [],
      selection_plans: [
        {
          id: 1,
          created: 1555492030,
          last_edited: 1555492030,
          name: "Selection Plan 1",
          is_enabled: true,
          submission_begin_date: 1450731600,
          submission_end_date: 1457186340,
          max_submission_allowed_per_user: 0,
          voting_begin_date: 1454508000,
          voting_end_date: 1455804000,
          selection_begin_date: 1455829200,
          selection_end_date: 1456867860,
          summit_id: 6,
          track_groups: [
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            11
          ]
        }
      ],
      timestamp: 1566936325      
    },
    summits: []
}

const summitReducer = (state = DEFAULT_STATE, action) => {
    const { type, payload } = action

    switch(type){
        case LOGOUT_USER:
            return DEFAULT_STATE;
        case GET_SUMMITS:
            let summits =  payload.response.data;
            return {...state, summits};
            break;
        case RECEIVE_SUMMIT: {
            let entity = {...payload.response};

            for(var key in entity) {
                if(entity.hasOwnProperty(key)) {
                    entity[key] = (entity[key] == null) ? '' : entity[key] ;
                }
            }

            return {...state, currentSummit: entity};
        }
        break;
        default:
            return state;
            break;
    }
}

export default summitReducer
