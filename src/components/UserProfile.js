import React from 'react'
import { connect } from 'react-redux'
import { deleteFollow, newFollow, getEvents, deleteEvent, editProfile } from '../redux/actions'
import Wishlist from './Wishlist'
import EditEventForm from './EditEventForm'
import { NavLink } from 'react-router-dom'
import EditableLabel from 'react-inline-editing';
import moment from 'moment'
import { Icon, Item, Image, Transition, Button } from 'semantic-ui-react'
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import Typography from '@material-ui/core/Typography';
import styled from "styled-components";


// const {first_name, last_name, birthday} = this.props.user[0]

class UserProfile extends React.Component {


    state = {
        first_name: this.props.user[0].first_name,
        last_name: this.props.user[0].last_name,
        birthday: moment(this.props.user[0].birthday).format('MMM Do'),
        partner_name: this.props.user[0].partner_name,
        partner_birthday: moment(this.props.user[0].partner_birthday).format('MMM Do'),
        visible: true
    }


    componentDidMount() {
        this.props.getEvents()
    }

    ownBirthdayDisplay = () => {
        const { user, currentUser } = this.props
        if (user[0].birthday){
            if(user[0].id === currentUser.id) {
                return (
                    <div style={{display: "flex", justifyContent: "center"}}>
                        🎂 
                         <EditableLabel 
                            text={`${this.state.birthday}`}
                            inputWidth='75px'
                            inputHeight='25px'
                            inputMaxLength='50'
                            labelFontSize="20px"
                            onFocusOut={this.editedBirthday}
                        />
                    </div>
                )
            } else {
                return (
                    <p>🎂 {moment(user[0].birthday).format('MMM Do')}</p>
            )
            }
        }
    }

    partnerBirthdayDisplay = () => {
        const { user, currentUser } = this.props
        if(user[0].partner_name && user[0].partner_birthday) {
            if(user[0].id === currentUser.id) {
                return (
                    <div style={{display: "flex", justifyContent: "center"}}> 💞 
                    <EditableLabel 
                        text={`${user[0].partner_name}`}
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
               return ( <p> 💞 {user[0].partner_name} -  🎂 {moment(user[0].partner_birthday).format('MMM Do')}</p>)
            }
        } else if (user[0].partner_name) {
            if(user[0].id === currentUser.id) {
                return (
                    <div style={{display: "flex", justifyContent: "center"}}> 💞 
                    <EditableLabel 
                        text={`${user[0].partner_name}`}
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

    toggleVisibility = () => {
        this.setState((prevState) => ({visible: !prevState.visible}))
    }

    render(){
        const { user, currentUser } = this.props

        return(
        <>
        <Container>
            {user[0].profile_picture ? 
                <Image style={{display: "block", marginLeft: "auto", marginRight: "auto", marginBottom: "3%"}}  src={user[0].profile_picture.url} circular size="small"/>
                : null }
            {user[0].id === currentUser.id ? 
            <>
                <EditableLabel 
                    text={`${user[0].first_name} ${user[0].last_name}`}
                    inputWidth='125px'
                    inputHeight='25px'
                    inputMaxLength='50'
                    labelFontWeight='bold'
                    labelFontSize="30px"
                    onFocusOut={this.editedName}
                /> 
            </>
                :
                    <p style={{fontSize: "30px", fontWeight: "bold", marginBottom: "5px"}}>{user[0].first_name} {user[0].last_name}</p> }
            {user[0].id !== currentUser.id && !this.alreadyFollowed() ? 
                    <button onClick={this.followClick}>Follow</button> : null
                }

                {this.alreadyFollowed() ? 
                    <button onClick={this.unFollowClick}>Unfollow</button> : null}

            {this.ownBirthdayDisplay()}
            {this.partnerBirthdayDisplay()}

            <Button onClick={this.toggleVisibility} style={{margin: "7px"}}>
                {this.state.visible ? "See Wishlist" : "See Timeline"}
            </Button>


            {/* <Image 
                inline={true} 
                centered={true} 
                style={{textAlign: "center"}} 
                src={"https://p7.hiclipart.com/preview/141/282/535/5bbb8b02e74ba.jpg"} 
                circular={true} 
                size="mini"
            /> 
            {user[0].venmo_handle ? 
                user[0].venmo_handle 
                :
                null} */}

        </Container>

        <Transition.Group animation="slide left" duration="500">
            {this.state.visible && (
                <StyledTimeline>
                    <React.Fragment>
                        <Timeline align="alternate">
                            {this.eventDots()}
                        </Timeline>
                        {user[0].id === currentUser.id ? 
                            <Item as={NavLink} to={`/events/new`} style={{textAlign: "center", paddingTop: "15%", paddingRight: "15%", paddingBottom: "2%"}}>
                                <Item.Content style={{textAlign: "center", paddingLeft: ".5%"}}>
                                    <Icon size="big" color='grey' name='calendar plus outline' link={true} /> 
                                </Item.Content>
                            </Item>
                            : null }
                    </React.Fragment>
                </StyledTimeline>
            )}
        </Transition.Group>

        <Transition.Group animation="slide left" duration="500">
            {!this.state.visible && (
               <WishlistContainer>   
                    <Wishlist user={user[0]}/>
            </WishlistContainer> 
            )}
        </Transition.Group>
        
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

const Container = styled.div`
    text-align: center;
    padding-top: 100px;
    justify-content: center;
    
`;

const WishlistContainer = styled.div`
    text-align: center;
    padding: 0% 18%
`;

const ProfileContainer = styled.div`
`;

const StyledTimeline = styled.div`
    // display: block;
`;
