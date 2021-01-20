import React from 'react'
import { connect } from 'react-redux'
import { deleteFollow, newFollow, getEvents, deleteEvent, editProfile } from '../redux/actions'
import EditEventForm from './EditEventForm'
import { NavLink } from 'react-router-dom'
import EditableLabel from 'react-inline-editing';
import moment from 'moment'
import { Icon, Item, Modal, Form, Button, Image } from 'semantic-ui-react'
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import Typography from '@material-ui/core/Typography';

// const {first_name, last_name, birthday} = this.props.user[0]

class UserProfile extends React.Component {


    state = {
        first_name: this.props.user[0].first_name,
        last_name: this.props.user[0].last_name,
        birthday: moment(this.props.user[0].birthday).format('MMM Do'),
        partner_name: this.props.user[0].partner_name,
        partner_birthday: moment(this.props.user[0].partner_birthday).format('MMM Do')
    }


    componentDidMount() {
        this.props.getEvents()
    }

    ownBirthdayDisplay = () => {
        if (this.props.user[0].birthday){
            if(this.props.user[0].id === this.props.currentUser.id) {
                return (
                    <div style={{display: "flex", justifyContent: "center"}}>
                    🎂 <EditableLabel 
                        text={`${this.state.birthday}`}
                        inputWidth='75px'
                        inputHeight='25px'
                        inputMaxLength='50'
                        labelFontSize="20px"
                        onFocusOut={this.editedBirthday}
                    /></div>)
            } else {
                return (
                    <p>🎂 {moment(this.props.user[0].birthday).format('MMM Do')}</p>
            )
            }
        }
    }

    partnerBirthdayDisplay = () => {
        if(this.props.user[0].partner_name && this.props.user[0].partner_birthday) {
            if(this.props.user[0].id === this.props.currentUser.id) {
                return (
                    <div style={{display: "flex", justifyContent: "center"}}> 💞 
                    <EditableLabel 
                        text={`${this.props.user[0].partner_name}`}
                        inputWidth='70px'
                        inputHeight='25px'
                        inputMaxLength='50'
                        labelFontSize="16px"
                        style={{float: "left"}}
                        onFocusOut={this.editedPartnerName}
                    /> - 🎂 
                    <EditableLabel 
                        text={`${this.state.partner_birthday}`}
                        inputWidth='70px'
                        inputHeight='25px'
                        inputMaxLength='50'
                        labelFontSize="16px"
                        style={{float: "left"}}
                        onFocusOut={this.editedPartnerBirthday}
                    /> </div>)
            }else {
               return ( <p> 💞 {this.props.user[0].partner_name} -  🎂 {moment(this.props.user[0].partner_birthday).format('MMM Do')}</p>)
            }
        } else if (this.props.user[0].partner_name) {
            if(this.props.user[0].id === this.props.currentUser.id) {
                return (
                    <div style={{display: "flex", justifyContent: "center"}}> 💞 
                    <EditableLabel 
                        text={`${this.props.user[0].partner_name}`}
                        inputWidth='90px'
                        inputHeight='25px'
                        inputMaxLength='50'
                        labelFontSize="16px"
                        style={{float: "left"}}
                        onFocusOut={this.editedPartnerName}
                    /></div>)
         }
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

    editedName = (text) => {
        let userId = this.props.user[0].id
        let firstName = text.split(" ")[0]
        let lastName = text.split(" ")[1]
        this.setState({
            first_name: firstName,
            last_name: lastName
        }, () => this.props.editProfile(userId, {first_name: firstName, last_name: lastName}))
    }

    editedBirthday = (text) => {
        let userId = this.props.user[0].id
        let month = text.split(" ")[0]
        let day = text.split(" ")[1].replace(/\D+/g, '')
        let year = this.props.user[0].birthday.split("-")[0]
        let newBirthday = `${month} ${day}, ${year}`
        let newBirthdayDate = new Date(newBirthday)
        this.setState({
            birthday: moment(newBirthdayDate).format('MMM Do'),
        }, () => this.props.editProfile(userId, {birthday: newBirthdayDate}))
    }

    editedPartnerName = (text) => {
        let userId = this.props.user[0].id
        console.log(text)
        this.setState({
            partner_name: text,
        }, () => this.props.editProfile(userId, {partner_name: text}))
    }

    editedPartnerBirthday = (text) => {
        let userId = this.props.user[0].id
        let month = text.split(" ")[0]
        let day = text.split(" ")[1].replace(/\D+/g, '')
        let year = this.props.user[0].partner_birthday.split("-")[0]
        let newBirthday = `${month} ${day}, ${year}`
        let newBirthdayDate = new Date(newBirthday)
        this.setState({
            partner_birthday: moment(newBirthdayDate).format('MMM Do'),
        }, () => this.props.editProfile(userId, {partner_birthday: newBirthdayDate}))
    }

    eventDots = () => {
        if (this.props.user[0].own_events.length > 0) {
            let usersEvents = this.props.allEvents.filter(event => event.user_id === this.props.user[0].id)
            let sortedByDateEvents = usersEvents.sort((a, b) => new Date(a.date) - new Date(b.date))
            return sortedByDateEvents.map(event => {
                return (
                    <TimelineItem>
                        <TimelineOppositeContent>
                            <Typography color="textSecondary">{moment(event.date).format('MMM Do')}</Typography>
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                            <TimelineDot />
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent>
                            <Typography 
                                style={{fontWeight: "bold"}}>
                                    {event.title} 
                                    {this.props.user[0].id === this.props.currentUser.id ? 
                                    <> 
                                        <EditEventForm eventId={event.id}/>
                                        {/* {this.editEventClick(event.id)} */}
                                        {/* <Icon link={true} id={event.id} style={{paddingLeft: "3px"}} name="edit outline" onClick={this.editEventClick}/>   */}
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
        console.log(this.props)
        return(
            <>
            <div style={{textAlign: "center", paddingTop: "100px"}}>
            {this.props.user[0].profile_picture ? 
                <Image style={{display: "block", marginLeft: "auto", marginRight: "auto"}} src={this.props.user[0].profile_picture.url} circular size="mini"/>
                : null }
            {this.props.user[0].id === this.props.currentUser.id ? 
            <>
                <EditableLabel 
                    text={`${this.props.user[0].first_name} ${this.props.user[0].last_name}`}
                    inputWidth='125px'
                    inputHeight='25px'
                    inputMaxLength='50'
                    labelFontWeight='bold'
                    labelFontSize="30px"
                    onFocusOut={this.editedName}
                /> </>
                :
                    <p style={{fontSize: "30px", fontWeight: "bold", marginBottom: "5px"}}>{this.props.user[0].first_name} {this.props.user[0].last_name}</p> }

            {this.ownBirthdayDisplay()}
            {this.partnerBirthdayDisplay()}

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
        deleteEvent: (eventId) => dispatch(deleteEvent(eventId)),
        editProfile: (userId, userObj) => dispatch(editProfile(userId, userObj))
    }
}

export default connect(msp, mdp)(UserProfile)