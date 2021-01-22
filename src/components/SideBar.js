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
        hovered: false
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

    getInitials = () => {
        let alphabetized = this.props.followedUsers.sort((a, b) => a.first_name.localeCompare(b.first_name))
        return alphabetized.map(user => {
            return (
            <Menu.Item 
                // icon="user outline" 
                as={NavLink} to={`/users/${user.id}`}
                key={user.id}
                onMouseEnter={() => this.setState({hovered: true})}
                onMouseLeave={() => this.setState({hovered: false})}
            >
                {this.state.hovered ? 
                    `${user.first_name} ${user.last_name}`
                    : 
                    user.first_name[0].toUpperCase() + user.last_name[0].toUpperCase()}
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