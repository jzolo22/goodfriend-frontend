import React from 'react'
import { connect } from 'react-redux'
import { deleteFollow, newFollow } from '../redux/actions'
import moment from 'moment'
import { Icon } from 'semantic-ui-react'
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import Typography from '@material-ui/core/Typography';


class UserProfile extends React.Component {

    state={
        clicked: true
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
        this.setState({clicked: true})
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

    eventDots = () => {
        if (this.props.user[0].own_events.length > 0) {
            return this.props.user[0].own_events.map(event => {
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
                            <Typography style={{fontWeight: "bold"}}>{event.title}</Typography>
                            <Typography>{event.description}</Typography>
                        </TimelineContent>
                    </TimelineItem>
                )
            })
        }
    }

    render(){
        console.log(this.props.user[0].own_events)
        return(
            <>
            <div style={{textAlign: "center", paddingTop: "100px"}}>
                <p style={{fontSize: "30px", marginBottom: "5px"}}>{this.props.user[0].first_name} {this.props.user[0].last_name}</p>
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
           </>
        )
    }
}

const msp = (state) => {
    return {
        currentUser: state.currentUser,
        followedUsers: state.followedUsers
    }
}

const mdp = (dispatch) => {
    return {
        newFollow: (followObj) => dispatch(newFollow(followObj)),
        deleteFollow: (followerId, followeeId) => dispatch(deleteFollow(followerId, followeeId))
    }
}

export default connect(msp, mdp)(UserProfile)