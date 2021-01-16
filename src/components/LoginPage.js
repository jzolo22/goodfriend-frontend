import React from 'react'
import { connect } from 'react-redux'
import { logIn } from '../redux/actions'

class LoginPage extends React.Component {

    state = {
        username: "",
        password: ""
    }

    onChange = (e) => {
        console.log(e.target.value)
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit = () => {
        // this.props.signIn(this.state)
    }

    render(){
        console.log(this.state)
        return(
            <div style={{marginTop: "15%", textAlign: "center"}}>
                <h1>Log In</h1>
                <form class="ui form" onSubmit={this.onSubmit}>
                    <div style={{margin: "0% 40% 0% 40%"}} class="field">
                        <label>Username</label>
                        <input  type="text" name="username" placeholder="Username" value={this.state.username}onChange={this.onChange}></input>
                    </div>
                    <div style={{margin: "0% 40% 1% 40%"}} class="field">
                        <label>Password</label>
                        <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.onChange}></input>
                    </div>
                    <button class="ui button" type="submit">Submit</button>
                </form>
            </div>
        
        )
    }
}

const mdp = (dispatch) => {
    // return {signIn: (userObj) => dispatch(logIn(userObj))}
}

export default connect(null, mdp)(LoginPage)