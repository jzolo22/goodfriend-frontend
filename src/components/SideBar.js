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

    state = { activeItem: '' }

    handleItemClick = (e, data) => {
        console.log(data)
        this.setState({ activeItem: data.name })
    }


    componentDidMount() {
        this.props.fetchUsers()
    }

    getInitials = () => {
        return this.props.followedUsers.map(user => {
            return (
            <Menu.Item 
                // icon="user outline" 
                as={NavLink} to={`/users/${user.id}`}
                key={user.id}
            >
                {user.first_name[0].toUpperCase() + user.last_name[0].toUpperCase()}
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
    return {followedUsers: state.followedUsers}
}

const mdp = (dispatch) => {
    return {fetchUsers: () => dispatch(fetchUsers())}
}

export default connect(msp, mdp)(SideBar)