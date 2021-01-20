import React from 'react'
import { Calendar, momentLocalizer } from "react-big-calendar";
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { getFollowedEvents, fetchAllUsers, newEvent } from '../redux/actions'
import { Icon, Item, Label } from 'semantic-ui-react'
// @import 'react-big-calendar/lib/sass/styles';


moment.locale("en-US");
const localizer = momentLocalizer(moment);

class HomeCalendar extends React.Component {

    state = {
        eventIds: []
    }

    componentDidMount() {
        if (this.props.currentUser.id) {
            this.props.fetchEvents(this.props.currentUser.id)
            this.props.fetchAllUsers()
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
                tooltip: event.title,
            }
        })
    }

    defaultEvent = () => {
        return ([{
            title: "No Events!",
            start: new Date(),
            end: new Date(),
            allDay: true,
            resourceId: 1
        }])
    }

    onClick = (e) => {
        if (this.state.eventIds.includes(parseInt(e.target.id))) {
            console.log("already on list")
            let updatedList = [...this.state.eventIds]
            let indexOfDeleted = updatedList.findIndex(eventId => eventId === parseInt(e.target.id))
            updatedList.splice(indexOfDeleted, 1)
            this.setState({eventIds: updatedList})
        } else {
            this.setState({eventIds: [...this.state.eventIds, parseInt(e.target.id)]})
        }
        
    }

    makeAvatars = () => {
        return this.props.followedUsers.map(user => {
            return (
                (<Item style={{paddingBottom: "2%"}}>
                        <Item.Content style={{marginRight: "15%"}}>
                            <Icon circular size="large" color='blue' name='user' link={true} id={user.id} onClick={this.onClick}/> 
                        </Item.Content>
                    </Item>)
            )
        })
    }

    selectAll = () => {
        this.setState({eventIds: []})
    }

    render() {
        let filteredEvents = this.props.followedEvents.filter(event => !this.state.eventIds.includes(event.user_id))
      
        return (
            <>
            <div style={{height: "100%", marginTop: "10%"}}>
                <div style={{display: "flex", justifyContent: "center"}}>
                    <Label  onClick={this.selectAll} style={{height: "fit-content"}}>
                        <Icon name="checkmark" link={true} />Select All
                    </Label>
                    {this.makeAvatars()}
                    
                    <Item as={NavLink} to={`/events/new`} style={{paddingBottom: "2%", paddingTop: "2%"}}>
                        <Item.Content style={{marginRight: "5%", paddingLeft: "300px"}}>
                        <Icon size="big" color='blue' name='calendar plus outline' link={true} /> 
                    </Item.Content>
                    </Item>
                </div>
                
            <Calendar
                localizer={localizer}
                events={this.props.followedEvents.length > 0 ?  
                filteredEvents.map(event => {
                    return {
                        title: event.title,
                        start: moment(event.date),
                        end: moment(event.date),
                        allDay: true,
                        resourceId: 10,
                        tooltipAccessor: event.title,
                    }}) : this.defaultEvent()}
                
                // events={this.eventAttempt(null)}
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
        currentUser: state.currentUser,
        followedUsers: state.followedUsers
    }
}

const mdp = (dispatch) => {
    return {
        fetchEvents: (userId) => dispatch(getFollowedEvents(userId)),
        fetchAllUsers: () => dispatch(fetchAllUsers()),
        newEvent: (eventObj) => dispatch(newEvent(eventObj))
    }
}

export default connect(msp, mdp)(HomeCalendar)