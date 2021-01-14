import React from 'react'


class UserProfile extends React.Component {

    render(){
        return(
            <div style={{paddingTop: "56px", textAlign: "center"}}>
                <h1 style={{textAlign: "center", paddingTop: "56px"}}>{this.props.user[0].first_name} {this.props.user[0].last_name}</h1>
            </div>
        )
    }
}

export default UserProfile