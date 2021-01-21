import React from 'react'
// import { Calendar, momentLocalizer } from "react-big-calendar";
import BigCalendar from 'react-big-calendar-like-google';
import 'react-big-calendar-like-google/lib/css/react-big-calendar.css'
import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'
import moment from "moment";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// @import 'react-big-calendar/lib/sass/styles';

import { getFollowedEvents, fetchAllUsers, newEvent } from '../redux/actions'
import { Icon, Item, Label, Image } from 'semantic-ui-react'


moment.locale("en-US");
BigCalendar.momentLocalizer(moment)


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
            console.log(e.target.id)
            this.setState({eventIds: [...this.state.eventIds, parseInt(e.target.id)]})
        }
        
    }

    makeAvatars = () => {
        let avatarArray = this.props.followedUsers.map(user => user.id)
        avatarArray.push(this.props.currentUser.id)
        if (this.props.allUsers.length > 0) {
            let followedUserAvatars = this.props.allUsers.filter(user => avatarArray.includes(user.id))
        return followedUserAvatars.map(user => {
            return (
                (<Item style={{paddingBottom: "2%"}}>
                        <Item.Content style={{marginRight: "15%"}} onClick={this.onClick}>
                            {user.profile_picture ?
                            <Image src={user.profile_picture.url} circular size="tiny" link={true} id={user.id}/> 
                            :
                            <Icon circular size="big" color='blue' name='user' link={true} id={user.id} /> 
                            }
                        </Item.Content>
                    </Item>)
            )
        })
        }
        
    }

    onSelectEvent = (e) => {
        this.props.history.push(`/users/${e.resourceId}`)
    }

    selectAll = () => {
        this.setState({eventIds: []})
    }

    render() {
        console.log(this.state)
        let allCalEvents = this.props.followedEvents.concat(this.props.currentUser.own_events)
        let filteredEvents = allCalEvents.filter(event => !this.state.eventIds.includes(event.user_id))
        console.log(filteredEvents)
        let filteredEventsForCal = filteredEvents.map(event => {
            return {
                title: event.title,
                bgColor: event.user_id === this.props.currentUser.id ? "pink" : "purple",
                start: moment(event.date),
                end: moment(event.date),
                allDay: true,
                resourceId: event.user_id,
                tooltipAccessor: event.title,
            }})

        // let ownEventsForCal = this.props.currentUser.own_events.map(event => {
        //     return {
        //         title: event.title,
        //         bgColor: "pink",
        //         start: moment(event.date),
        //         end: moment(event.date),
        //         allDay: true,
        //         resourceId: event.user_id,
        //         tooltipAccessor: event.title,
        //     }
        // })
        
        
        return (
            <>
            <div style={{height: "100%", marginTop: "10%"}}>
                <div style={{display: "flex", justifyContent: "center"}}>
                {this.props.followedEvents.length > 0 && this.state.eventIds.length > 0 ? 
                    <Label  onClick={this.selectAll} style={{height: "fit-content"}}>
                        <Icon name="checkmark" link={true} />Select All
                    </Label> : <Label style={{height: "fit-content"}}>click heads to toggle events off calendar</Label> }
                    {this.makeAvatars()}
                    
                    <Item as={NavLink} to={`/events/new`} style={{paddingBottom: "2%", paddingTop: "2%"}}>
                        <Item.Content style={{marginRight: "5%", paddingLeft: "300px"}}>
                        <Icon size="big" color='blue' name='calendar plus outline' link={true} /> 
                    </Item.Content>
                    </Item>
                </div>
                
            <BigCalendar
                // selectable
                // localizer={localizer}

                events={this.props.followedEvents.length > 0 ?  
                    filteredEventsForCal
                    : this.defaultEvent()}
                
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
                onSelectEvent={this.onSelectEvent}
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
        followedUsers: state.followedUsers,
        allUsers: state.allUsers
    }
}

const mdp = (dispatch) => {
    return {
        fetchEvents: (userId) => dispatch(getFollowedEvents(userId)),
        fetchAllUsers: () => dispatch(fetchAllUsers()),
        newEvent: (eventObj) => dispatch(newEvent(eventObj))
    }
}

export default connect(msp, mdp)(withRouter(HomeCalendar))