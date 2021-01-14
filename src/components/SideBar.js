import React from 'react'
import { connect } from 'react-redux'
import { fetchUsers } from '../redux/actions'
import {
    Menu,
    Segment,
    Sidebar,
  } from 'semantic-ui-react'



class SideBar extends React.Component {

    componentDidMount() {
        this.props.fetchUsers()
    }

    render(){
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
                    
                    <Menu.Item >goodFriend</Menu.Item>
                    <Menu.Item icon="user outline"></Menu.Item>
                    <Menu.Item as='a'>Channels</Menu.Item>
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