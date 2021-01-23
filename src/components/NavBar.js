import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { fetchAllUsers, checkLogin, logOut } from '../redux/actions'
import SideBar from './SideBar'
import { Menu, Search, Item, Icon, Image } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'


class NavBar extends React.Component {

    state = {
        search: "",
        visible: false
    }

    componentDidMount(){
        this.props.fetchAllUsers()
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
                image: user.profile_picture ? user.profile_picture.url  : "https://thumbs.dreamstime.com/b/avatar-icon-black-round-avatar-flat-symbol-isolated-white-background-avatar-simple-icon-avatar-abstract-icon-black-vector-124920467.jpg"
            })
        })
    }


    handleSearch = (e, data) => {
        this.setState({search: data.value})
    }

    handleClick = (e, data) => {
        this.props.history.push(`/users/${data.result.id}`)
        this.setState({search: ""})
    }

    logOut = () => {
        this.props.logOut()
        this.props.history.push('/')
    }

    turnOff = () => {
        this.setState({visible: false})
    }

    render() {
        return(
        <>
        {this.props.currentUser && this.props.currentUser.id ? <SideBar visible={this.state.visible} toggleOff={this.turnOff}/> : null}
            
            <Menu fixed="top" inverted={true} size="mini">
                <Menu.Item
                >
                    <Icon 
                        name="bars" 
                        size="big"
                        link={true}
                        onClick={() => this.setState((prevState) => ({visible: !prevState.visible}))}
                    />
                    
                </Menu.Item>
                <Menu.Item as={NavLink} to={"/"}
                    name="goodFriend"
                >
                    goodfriend
                </Menu.Item>.


                <Menu.Menu position='right'>
                <Menu.Item>
                    <Search icon='search' 
                        placeholder={this.props.currentUser && this.props.currentUser.id ? 'first or last name' : 'log in to search'}
                        value={this.state.search} 
                        results={this.matchingNames(this.state.search)} 
                        onSearchChange={this.handleSearch}
                        onResultSelect={this.handleClick}
                    />
                </Menu.Item>
                <Menu.Item as={NavLink} to={this.props.currentUser && this.props.currentUser.id ? `/users/${this.props.currentUser.id}` : '/'}>
                    <Item.Content >
                        {this.props.currentUser.profile_picture ? 
                            <Image src={this.props.currentUser.profile_picture.url} circular size="mini"/> :
                            <>
                                <Icon size="big" name='user outline' link={true} /> My profile
                            </>
                        }
                    </Item.Content>
                </Menu.Item>

                {this.props.currentUser.id ? 
                    <Menu.Item onClick={this.logOut}>
                        Log Out
                    </Menu.Item>
                : null }
                </Menu.Menu>
            </Menu>
        </>
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
        checkLogin: (token) => dispatch(checkLogin(token)),
        logOut: () => dispatch(logOut())
    }
}

export default connect(msp, mdp)(withRouter(NavBar))