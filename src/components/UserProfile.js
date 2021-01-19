import React from 'react'
import { connect } from 'react-redux'
import { deleteFollow, newFollow, getEvents, deleteEvent } from '../redux/actions'
import { NavLink } from 'react-router-dom'
import EditableLabel from 'react-inline-editing';
import moment from 'moment'
import { Icon, Item } from 'semantic-ui-react'
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import Typography from '@material-ui/core/Typography';


class UserProfile extends React.Component {

    state = {
        first_name: this.props.user[0].first_name,
        last_name: this.props.user[0].last_name,
    }


    componentDidMount() {
        this.props.getEvents()
    }

    dateEnding = (num) => {
        switch (num) {
            case "1":
                return "st"
            case "2":
                return "nd"
            case "3":
                return "rd"
            default:
                return "th"
        }
    }

    followClick = () => {
        this.props.newFollow({
            follower_id: this.props.currentUser.id,
            followee_id: this.props.user[0].id
        })
    }

    unFollowClick = () => {
        this.props.deleteFollow(this.props.currentUser.id, this.props.user[0].id)
    }

    alreadyFollowed = () => {
        if (this.props.followedUsers){
            let idArray = this.props.followedUsers.map(user => user.id)
            return idArray.includes(this.props.user[0].id)
        }
    }

    deleteEvent = (e) => {
        let eventId = parseInt(e.target.id)
        this.props.deleteEvent(eventId)
    }

    edited = (text) => {
        console.log(text)
    }

    eventDots = () => {
        if (this.props.user[0].own_events.length > 0) {
            let usersEvents = this.props.allEvents.filter(event => event.user_id === this.props.user[0].id)
            let sortedByDateEvents = usersEvents.sort((a, b) => new Date(a.date) - new Date(b.date))
            return sortedByDateEvents.map(event => {
                return (
                    <TimelineItem>
                        <TimelineOppositeContent>
                            <Typography color="textSecondary">{moment(event.date).format('MMM DD')}{this.dateEnding(event.date.slice(-1))}</Typography>
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                            <TimelineDot />
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent>
                            <Typography 
                                style={{fontWeight: "bold"}}>
                                    {event.title } 
                                    {this.props.user[0].id === this.props.currentUser.id ? 
                                    <> 
                                        {/* <Icon as={NavLink} to={`/events/new`} style={{paddingLeft: "3px"}} name="edit outline" />   */}
                                        <Icon link={true} id={event.id} name="trash alternate outline" onClick={this.deleteEvent} /> 
                                    </> : null}
                            </Typography>
                            <Typography>{event.description}</Typography>
                        </TimelineContent>
                    </TimelineItem>
                )
            })
        }
    }

    render(){
        return(
            <>
            <div style={{textAlign: "center", paddingTop: "100px"}}>
            {this.props.user[0].id === this.props.currentUser.id ? 
                <EditableLabel 
                    text={`${this.state.first_name} ${this.state.last_name}`}
                    inputWidth='125px'
                    inputHeight='25px'
                    inputMaxLength='50'
                    labelFontWeight='bold'
                    labelFontSize="30px"
                    onFocusOut={this.edited}
                /> :
                    <p style={{fontSize: "30px", fontWeight: "bold", marginBottom: "5px"}}>{this.props.user[0].first_name} {this.props.user[0].last_name}</p> }
            {this.props.user[0].birthday ? 
                <p><Icon name="birthday cake"/> {moment(this.props.user[0].birthday).format('MMM DD')}{this.dateEnding(this.props.user[0].birthday.slice(-1))}</p>
                : null }

            {this.props.user[0].partner_name ? 
                <>
                <p><Icon name="heart"/> {this.props.user[0].partner_name} - <Icon size="small" fitted name="birthday cake"/> {moment(this.props.user[0].partner_birthday).format('MMM DD')}{this.dateEnding(this.props.user[0].partner_birthday)}</p>
                </>
                : null }
            {this.props.user[0].id !== this.props.currentUser.id && !this.alreadyFollowed() ? 
                <button onClick={this.followClick}>Follow</button> : null
            }

            {this.alreadyFollowed() ? 
             <button onClick={this.unFollowClick}>Unfollow</button> : null}
            </div>

            <React.Fragment>
                <Timeline align="alternate">
                    {this.eventDots()}
                </Timeline>
            </React.Fragment>

            {this.props.user[0].id === this.props.currentUser.id ? 
            <Item as={NavLink} to={`/events/new`} style={{textAlign: "right", paddingTop: "15%", paddingRight: "15%", paddingBottom: "2%"}}>
                <Item.Content style={{textAlign: "center"}}>
                    <Icon size="big" color='grey' name='calendar plus outline' link={true} /> 
                </Item.Content>
            </Item>
            : null }
           </>
        )
    }
}

const msp = (state) => {
    return {
        currentUser: state.currentUser,
        followedUsers: state.followedUsers,
        allEvents: state.allEvents
    }
}

const mdp = (dispatch) => {
    return {
        newFollow: (followObj) => dispatch(newFollow(followObj)),
        deleteFollow: (followerId, followeeId) => dispatch(deleteFollow(followerId, followeeId)),
        getEvents: () => dispatch(getEvents()),
        deleteEvent: (eventId) => dispatch(deleteEvent(eventId))
    }
}

export default connect(msp, mdp)(UserProfile)