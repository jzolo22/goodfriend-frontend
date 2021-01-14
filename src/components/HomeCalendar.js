import React from 'react'
import { Calendar, momentLocalizer } from "react-big-calendar";
import { connect } from 'react-redux'
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { getEvents } from '../redux/actions'
// @import 'react-big-calendar/lib/sass/styles';


moment.locale("en-US");
const localizer = momentLocalizer(moment);

class HomeCalendar extends React.Component {

    componentDidMount() {
        this.props.fetchEvents()
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
        console.log("props in homecalendar ", this.props.followedEvents)
        return (
            <div style={{height: "100%"}}>
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
                style={{ margin: "15%", height: 500 }}
            />
            </div>
        )
    }
}

const msp = (state) => {
    return {followedEvents: state.followedEvents}
}

const mdp = (dispatch) => {
    return {fetchEvents: () => dispatch(getEvents())}
}

export default connect(msp, mdp)(HomeCalendar)