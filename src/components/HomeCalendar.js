import React from 'react'
import { Calendar, momentLocalizer } from "react-big-calendar";
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { getFollowedEvents } from '../redux/actions'
import { Icon, Item } from 'semantic-ui-react'
// @import 'react-big-calendar/lib/sass/styles';


moment.locale("en-US");
const localizer = momentLocalizer(moment);

class HomeCalendar extends React.Component {

    componentDidMount() {
        console.log("testing")
        if (this.props.currentUser.id) {
            console.log("running events")
            this.props.fetchEvents(this.props.currentUser.id)
        }
    }

    allEvents = () => {
        return this.props.followedEvents.map(event => {
            return {
                title: event.title,
                start: moment(event.date),
                end: moment(event.date),
                allDay: true,
                resourceId: 10,
                tooltipAccessor: event.title,
            }
        })
    }

    defaultEvent = () => {
        return ([{
            title: "today",
            start: new Date(),
            end: new Date(),
            allDay: true,
            resourceId: 1
        }])
    }
  
// this.props.events.length > 0 ? this.allEvents() : 
    render() {
        return (
            <>
            <div style={{height: "100%", marginTop: "10%"}}>
            <Item as={NavLink} to={`/events/new`} style={{textAlign: "right", paddingTop: "15%", paddingRight: "15%", paddingBottom: "2%"}}>
                <Item.Content style={{marginRight: "15%"}}>
                    <Icon size="big" color='blue' name='calendar plus outline' link={true} /> 
                </Item.Content>
            </Item>
            <Calendar
                localizer={localizer}
                events={this.props.followedEvents.length > 0 ? this.allEvents() : this.defaultEvent()}
                // step={5}
                // timeslots={3}
                defaultView="month"
                views={["month", "week"]}
                // min={new Date(2020, 0, 1, 8, 0)} // 8.00 AM
                // max={new Date(2020, 0, 1, 17, 0)} // Max will be 6.00 PM!
                defaultDate={new Date()}
                popup={true}
                startAccessor="start"
                endAccessor="end"
                drilldownView="week"
                style={{ margin: "0% 15%", height: 500 }}
            />
            </div>
            </>
        )
    }
}

const msp = (state) => {
    return {
        followedEvents: state.followedEvents,
        currentUser: state.currentUser
    }
}

const mdp = (dispatch) => {
    return {fetchEvents: (userId) => dispatch(getFollowedEvents(userId))}
}

export default connect(msp, mdp)(HomeCalendar)