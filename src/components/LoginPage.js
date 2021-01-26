import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { logIn } from '../redux/actions'
import { Divider, Segment, Image } from 'semantic-ui-react'

class LoginPage extends React.Component {

    state = {
        username: "",
        password: ""
    }

    onChange = (e) => {
        // console.log(e.target.value)
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit = (e) => {
        e.preventDefault()
        this.props.signIn({user: this.state})
    }

    render(){
        // console.log(this.state)
        return(
            <div style={{marginTop: "7%", textAlign: "center"}}>
                <Image src="/images/goodfriendtransparent.png" size="medium" style={{textAlign: "center", margin: "auto", paddingBottom: "5px"}}/>
                <Segment raised style={{margin: "0% 40%"}}>
                    <h1>Log In</h1>
                    <form class="ui form" onSubmit={this.onSubmit}>
                        <div  class="field">
                            <label>Username</label>
                            <input  type="text" name="username" placeholder="Username" value={this.state.username}onChange={this.onChange}></input>
                        </div>
                        <div  class="field">
                            <label>Password</label>
                            <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.onChange}></input>
                        </div>
                        <button class="ui button" type="submit">Submit</button>
                    </form>
                </Segment>
                
                    <Divider horizontal style={{marginTop: "30px"}}>or</Divider>
                    <NavLink to={'/users/new'}>
                        Sign Up
                    </NavLink>
            </div>
        
        )
    }
}

const mdp = (dispatch) => {
    return {
        signIn: (userObj) => dispatch(logIn(userObj))
    }
}

export default connect(null, mdp)(LoginPage)