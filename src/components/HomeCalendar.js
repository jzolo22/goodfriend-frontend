import React from 'react'
import { Calendar, momentLocalizer } from "react-big-calendar";
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { getFollowedEvents, fetchAllUsers } from '../redux/actions'
import { Icon, Item, Label } from 'semantic-ui-react'
// @import 'react-big-calendar/lib/sass/styles';


moment.locale("en-US");
const localizer = momentLocalizer(moment);



class HomeCalendar extends React.Component {

    state = {
        eventId: ""
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
                tooltipAccessor: event.title,
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
        if (e) {
            this.setState({eventId: parseInt(e.target.id)})
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

    // renderEvents = () => {
    //     if(this.props.followedEvents.length > 0){
    //         if(!this.state.clicked) {
    //             this.allEvents()
    //         } else if (this.state.clicked) {

    //         }
    //     } else {
    //         this.defaultEvent()
    //     }
    // }
  
    render() {
        const filteredEvents = this.props.followedEvents.filter(event => event.user_id !== parseInt(this.state.eventId))
        console.log(filteredEvents)
        return (
            <>
            <div style={{height: "100%", marginTop: "10%"}}>
                <div style={{display: "flex", justifyContent: "center"}}>
                    {this.makeAvatars()}
                    
                    <Item as={NavLink} to={`/events/new`} style={{paddingBottom: "2%", paddingTop: "2%"}}>
                        <Item.Content style={{marginRight: "10%"}}>
                        {/* <Icon circular size="big" color='blue' name='user' link={true} />  */}
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
        fetchAllUsers: () => dispatch(fetchAllUsers())
    }
}

export default connect(msp, mdp)(HomeCalendar)