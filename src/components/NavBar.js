import React from 'react'
import { connect } from 'react-redux'
import { fetchAllUsers } from '../redux/actions'
import { Menu, Input, MenuItem } from 'semantic-ui-react'

class NavBar extends React.Component {

    state = {
        search: ""
    }

    componentDidMount(){
        this.props.fetchAllUsers()
    }
    

    render() {
        console.log("props in navbar:", this.props)
        return(
            <Menu fixed="top" inverted={true}>
                <Menu.Item 
                name="goodFriend"
                >
                    goodfriend
                </Menu.Item>.
                {/* <Menu.Item 
                name="Calendar"
                /> */}

                <Menu.Menu position='right'>
                <Menu.Item>
                    <Input icon='search' placeholder='first or last name' />
                </Menu.Item>
                </Menu.Menu>
            </Menu>
        )
    }
}

const msp = (state) => {
    return {state: state.allUsers}
}

const mdp = (dispatch) => {
    return {fetchAllUsers: () => dispatch(fetchAllUsers())}
}

export default connect(msp, mdp)(NavBar)