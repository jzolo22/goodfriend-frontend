import React from 'react'
import { connect } from 'react-redux'
import { fetchAllUsers } from '../redux/actions'
import { Menu, Input, MenuItem, Search } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'

class NavBar extends React.Component {

    state = {
        search: ""
    }

    componentDidMount(){
        this.props.fetchAllUsers()
        // this.props.submitHandler(undefined)
    }

    matchingNames = (searchInput) => {
        let results
        if (this.props.allUsers.length > 0 ){
            results = this.props.allUsers.filter(user => user.first_name.toLowerCase().includes(searchInput.toLowerCase()) || user.last_name.toLowerCase().includes(searchInput.toLowerCase()))
        } else {
            results = []
        }
        

        return results.map(user => {
            return ({
                id: user.id,
                title: user.first_name,
                description: user.last_name,
                image: "https://thumbs.dreamstime.com/b/avatar-icon-black-round-avatar-flat-symbol-isolated-white-background-avatar-simple-icon-avatar-abstract-icon-black-vector-124920467.jpg"
            })
        })
    }


    handleSearch = (e, data) => {
        this.setState({search: data.value})
    }

    handleClick = (e, data) => {
        this.props.history.push(`/users/${data.result.id}`)
    }
    

    render() {
        console.log("navbar props ", this.props)
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
                    <Search icon='search' 
                        placeholder='first or last name' 
                        value={this.state.search} 
                        results={this.matchingNames(this.state.search)} 
                        onSearchChange={this.handleSearch}
                        onResultSelect={this.handleClick}
                    />
                </Menu.Item>
                </Menu.Menu>
            </Menu>
        )
    }
}

const msp = (state) => {
    return {
        allUsers: state.allUsers,
        currentUser: state.currentUser
    }
}

const mdp = (dispatch) => {
    return {
        fetchAllUsers: () => dispatch(fetchAllUsers()),
        // submitHandler: (userObj) => dispatch(logIn(userObj))
    }
}

export default connect(msp, mdp)(withRouter(NavBar))