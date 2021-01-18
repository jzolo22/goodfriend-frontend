import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { Icon } from 'semantic-ui-react'
import { deleteFollow, newFollow } from '../redux/actions'


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
        if (this.props.currentUser.you_follow){
            let idArray = this.props.currentUser.you_follow.map(user => user.id)
            return idArray.includes(this.props.user[0].id)
        }
    }

    render(){
        console.log(this.props)
        return(
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
        )
    }
}

const msp = (state) => {
    return {
        currentUser: state.currentUser
    }
}

const mdp = (dispatch) => {
    return {
        newFollow: (followObj) => dispatch(newFollow(followObj)),
        deleteFollow: (followerId, followeeId) => dispatch(deleteFollow(followerId, followeeId))
    }
}

export default connect(msp, mdp)(UserProfile)