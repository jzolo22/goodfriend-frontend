import React from 'react'
import { connect } from 'react-redux'
import { fetchUsers } from '../redux/actions'
import { NavLink } from 'react-router-dom'
import {
    Menu,
    Segment,
    Sidebar,
  } from 'semantic-ui-react'



class SideBar extends React.Component {

    state = { 
        activeItem: '',
        userIds: []
    }

    handleItemClick = (e, data) => {
        console.log(data)
        this.setState({ activeItem: data.name })
    }


    componentDidMount() {
        if (this.props.currentUser.id) {
            // console.log("i'm fetching users")
            this.props.fetchUsers(this.props.currentUser.id)
        } 
    }

    fullName = (user) => {
        return `${user.first_name} ${user.last_name}`
    }

    initials = (user) => {
        return user.first_name[0].toUpperCase() + user.last_name[0].toUpperCase()
    }

    handleHover = (e) => {
        const hoveredUserId = parseInt(e.target.id)
        const { userIds } = this.state
        if (userIds.includes(hoveredUserId)) {
            let updatedList = [...userIds]
            let indexOfDeleted = updatedList.findIndex(userId => userId === hoveredUserId)
            updatedList.splice(indexOfDeleted, 1)
            this.setState({userIds: updatedList})
        } else {
            this.setState((prevState) => ({userIds: [...prevState.userIds, hoveredUserId]}))
        }
    }

    getInitials = () => {
        let alphabetized = this.props.followedUsers.sort((a, b) => a.first_name.localeCompare(b.first_name))
        return alphabetized.map(user => {
            return (
            <Menu.Item 
                // icon="user outline" 
                as={NavLink} to={`/users/${user.id}`}
                id={user.id}
                key={user.id}
                onMouseEnter={this.handleHover}
                onMouseLeave={this.handleHover}
            >
                {this.state.userIds.includes(user.id) ? 
                    this.fullName(user)
                    : 
                    this.initials(user)
                }
            </Menu.Item>
            )
        })
    }

    render(){
        console.log(this.state)
        return(
            <>
                <Sidebar
                    style={{paddingTop: "4px"}}
                    as={Menu}
                    animation='overlay'
                    icon='labeled'
                    inverted
                    // onHide={() => setVisible(false)}
                    vertical
                    visible={true}
                    width='thin'
                >
                    
                    <Menu.Item 
                        as={NavLink} exact to="/"
                        name='home'
                        active={this.state.activeItem === 'home'}
                        onClick={this.handleItemClick}
                        style={{paddingBottom: "20px"}}
                    >
                        goodFriend
                    </Menu.Item>

                    {this.getInitials()}

                </Sidebar>     
            </>
        )
    }
}

const msp = (state) => {
    return {
        followedUsers: state.followedUsers,
        currentUser: state.currentUser
    }
}

const mdp = (dispatch) => {
    return {fetchUsers: (userId) => dispatch(fetchUsers(userId))}
}

export default connect(msp, mdp)(SideBar)