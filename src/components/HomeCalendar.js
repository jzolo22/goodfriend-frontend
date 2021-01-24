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
        eventIds: [],
    }

    componentDidMount() {
        const { currentUser, fetchEvents, fetchAllUsers } = this.props
        if (currentUser.id) {
            fetchEvents(currentUser.id)
            fetchAllUsers()
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
        const { eventIds } = this.state
        if (eventIds.includes(parseInt(e.target.id))) {
            console.log("already on list")
            let updatedList = [...eventIds]
            let indexOfDeleted = updatedList.findIndex(eventId => eventId === parseInt(e.target.id))
            updatedList.splice(indexOfDeleted, 1)
            this.setState({eventIds: updatedList})
        } else {
            this.setState({eventIds: [...eventIds, parseInt(e.target.id)]})
        }
        
    }

    makeAvatars = () => {
        const { currentUser, followedUsers, allUsers } = this.props
        const { eventIds } = this.state
        let avatarArray = followedUsers.map(user => user.id)
        avatarArray.push(currentUser.id)
        if (allUsers.length > 0) {
            let followedUserAvatars = allUsers.filter(user => avatarArray.includes(user.id))
        return followedUserAvatars.map(user => {
            return (
                (<Item >
                        <Item.Content style={{marginRight: "15%"}} onClick={this.onClick}>
                            {user.profile_picture ?
                            <Image 
                                disabled={eventIds.includes(user.id) ? true : false}
                                src={user.profile_picture.url} 
                                circular 
                                size="tiny" 
                                link={true} 
                                id={user.id}/> 
                            :
                            <Icon 
                                disabled={eventIds.includes(user.id) ? true : false} 
                                circular 
                                size="big" 
                                color='blue' 
                                name='user' 
                                link={true} 
                                id={user.id} /> 
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
        const { currentUser, followedEvents, allEvents } = this.props
        const { eventIds } = this.state
        console.log(followedEvents)
        let usersEvents = allEvents.filter(event => event.user_id === currentUser.id)
        let allCalEvents = followedEvents.concat(usersEvents)
        let filteredEvents = allCalEvents.filter(event => !eventIds.includes(event.user_id))
        let filteredEventsForCal = filteredEvents.map(event => {
            return {
                title: `${event.initials} - ${event.title}`,
                bgColor: event.user_id === currentUser.id ? "pink" : "purple",
                start: moment(event.date),
                end: moment(event.date),
                allDay: true,
                resourceId: event.user_id,
                tooltipAccessor: event.title,
            }})


        return (
            <>
            <div style={{height: "100%", marginTop: "7%", textAlign: "center"}}>
                <div>
                    {followedEvents.length > 0 && eventIds.length > 0 
                        ? 
                        <Label  onClick={this.selectAll} style={{height: "fit-content"}}>
                            <Icon name="checkmark" link={true} />Select All
                        </Label> 
                        : 
                        <Label style={{height: "fit-content"}}>click icons to toggle events off calendar</Label> 
                    }
                </div>
                <div style={{display: "flex", justifyContent: "center", paddingLeft: "18%", paddingBottom: "0%"}}>
                
                    {this.makeAvatars()}
                    
                    <Item as={NavLink} to={`/events/new`} style={{paddingBottom: "2%", paddingTop: "2%"}}>
                        <Item.Content style={{marginRight: "5%", paddingLeft: "200px"}}>
                        <Icon size="big" color='pink' name='calendar plus outline' link={true} /> 
                    </Item.Content>
                    </Item>
                </div>

            <div style={{margin: "0% 0% 5% 12%"}}>  
                <BigCalendar
                    // selectable
                    // localizer={localizer}

                    events={followedEvents.length > 0 || currentUser.own_events.length > 0?  
                        filteredEventsForCal
                        : this.defaultEvent()}
                    
                    defaultView="month"
                    views={["month", "week"]}
                    // min={new Date(2020, 0, 1, 8, 0)} // 8.00 AM
                    // max={new Date(2020, 0, 1, 17, 0)} // Max will be 6.00 PM!
                    defaultDate={new Date()}
                    popup={true}
                    // popupOffset={{x: 30, y: 20}}
                    startAccessor="start"
                    endAccessor="end"
                    drilldownView="week"
                    onSelectEvent={this.onSelectEvent}
                    style={{height: 525, width: 1100, paddingTop: "0", paddingBottom: "5%"}}
                />
                </div>  
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
        allUsers: state.allUsers, 
        allEvents: state.allEvents
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