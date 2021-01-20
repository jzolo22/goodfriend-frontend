import React from 'react'
import { connect } from 'react-redux'
import { newUser } from '../redux/actions'
import { Form, Button, Checkbox } from 'semantic-ui-react'


class SignUpForm extends React.Component {

    state = {
        first_name: "",
        last_name: "",
        username: "",
        password: "",
        birthday: "",
        address: "",
        partner_name: "",
        partner_birthday: "",
        venmo_handle: "",
        flowers: false,
        profile_picture: null
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    onCheckboxChange = (e) => {
        this.setState((prevState) => ({flowers: !prevState.flowers}))
    }
    
    onUpload = (e) => {
        this.setState({profile_picture: e.target.files[0]})
    }

    onSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('user[first_name]', this.state.first_name)
        formData.append('user[last_name]', this.state.last_name)
        formData.append('user[username]', this.state.username)
        formData.append('user[password]', this.state.password)
        formData.append('user[birthday]', this.state.first_name)
        formData.append('user[address]', this.state.address)
        formData.append('user[partner_name]', this.state.partner_name)
        formData.append('user[partner_birthday]', this.state.partner_birthday)
        formData.append('user[venmo_handle]', this.state.venmo_handle)
        formData.append('user[flowers]', this.state.flowers)
        formData.append('user[profile_picture]', this.state.profile_picture)
        console.log(formData)
        this.props.newUser(formData)
    }

    render() {
        console.log(this.state)
        return(
            <div style={{marginTop: "15%", textAlign: "center"}}>

            <Form onSubmit={this.onSubmit}>
                <Form.Group widths='equal' style={{margin: "1% 10% 0% 10%"}}>
                    <Form.Field >
                        <Form.Input 
                            label='First Name' 
                            // placeholder='Will be looking for jobs after graduation!' 
                            name="first_name" 
                            value={this.state.first_name} 
                            onChange={this.onChange}/>
                    </Form.Field>
                    
                    <Form.Field >
                        <Form.Input 
                            label='Last Name' 
                            // placeholder='Will be looking for jobs after graduation!' 
                            name="last_name" 
                            value={this.state.last_name} 
                            onChange={this.onChange}/>
                    </Form.Field>
                    <Form.Field >
                        <Form.Input 
                            label='Birthday' 
                            placeholder='put the format here' 
                            name="birthday" 
                            value={this.state.birthday} 
                            onChange={this.onChange}/>
                    </Form.Field>
                    <Form.Field >
                        <Form.Input 
                            label='Address' 
                            // placeholder='put the format here' 
                            name="address" 
                            value={this.state.address} 
                            onChange={this.onChange}/>
                    </Form.Field>
                </Form.Group>

            <Form.Group inline widths="equal" style={{margin: "3% 15% 0% 15%"}}>
                <Form.Field >
                     <Form.Input 
                        label='Venmo Handle' 
                        placeholder='$ gifts are the best gifts' 
                        name="venmo_handle" 
                        value={this.state.venmo_handle} 
                        onChange={this.onChange}/>
                </Form.Field>
                <Form.Field >
                     <Checkbox 
                        label='Like receiving flowers?' 
                        name="flowers" 
                        value={this.state.flowers} 
                        onChange={this.onCheckboxChange}/>
                </Form.Field>
                <Form.Field >
                     <Form.Input 
                        label='Upload a profile picture' 
                        type="file"
                        accept="image/*"
                        multiple={false}
                        // placeholder='$ gifts are the best gifts' 
                        name="profile_picture" 
                        onChange={this.onUpload}
                        />
                </Form.Field>
            </Form.Group>

            <Form.Group widths="equal" style={{margin: "3% 10% 0% 10%"}}>
                <Form.Field >
                     <Form.Input 
                        label='Username' 
                        placeholder={this.state.first_name !== "" ? `${this.state.first_name.toLowerCase()}${this.state.last_name.toLowerCase()} perhaps?` : ""} 
                        name="username" 
                        value={this.state.username} 
                        onChange={this.onChange}/>
                </Form.Field>
                <Form.Field >
                     <Form.Input
                        type="password" 
                        label='Password' 
                        placeholder='something nice and secure' 
                        name="password" 
                        value={this.state.password} 
                        onChange={this.onChange}/>
                </Form.Field>
            </Form.Group>

            <Form.Group widths="equal" style={{margin: "3% 20% 3% 20%"}}>
                <Form.Field >
                     <Form.Input 
                        label='Partner Name' 
                        placeholder='plants & pets count too...' 
                        name="partner_name" 
                        value={this.state.partner_name} 
                        onChange={this.onChange}/>
                </Form.Field>
                <Form.Field >
                     <Form.Input 
                        label='Partner Birthday' 
                        // placeholder='Will be looking for jobs after graduation!' 
                        name="partner_birthday" 
                        value={this.state.partner_birthday} 
                        onChange={this.onChange}/>
                </Form.Field>
            </Form.Group>

                
                <Button type='submit'>Sign Up</Button>
            </Form>
            </div>
        )
    }
}

const mdp = (dispatch) => {
    return {
        newUser: (newUserObj) => dispatch(newUser(newUserObj))
    }
}

export default connect(null, mdp)(SignUpForm)