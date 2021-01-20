import React from 'react'
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
        profile_picture: ""
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    onCheckboxChange = (e) => {
        this.setState((prevState) => ({flowers: !prevState.flowers}))
    }

    onSubmit = (e) => {
        e.preventDefault()
        console.log(this.state)
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
                </Form.Group>

            <Form.Group inline widths="equal" style={{margin: "3% 12% 0% 12%"}}>
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
                        // placeholder='$ gifts are the best gifts' 
                        name="profile_picture" 
                        value={this.state.profile_picture} 
                        // onChange={this.onChange}
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
                <Form.Field style={{margin: "1% 40% 0% 40%"}}>
                     <Form.Input 
                        label='Partner Name' 
                        placeholder='plants & pets count too...' 
                        name="partner_name" 
                        value={this.state.partner_name} 
                        onChange={this.onChange}/>
                </Form.Field>
                <Form.Field style={{margin: "1% 40% 0% 40%"}}>
                     <Form.Input 
                        label='Partner Birthday' 
                        // placeholder='Will be looking for jobs after graduation!' 
                        name="partner_birthday" 
                        value={this.state.partner_birthday} 
                        onChange={this.onChange}/>
                </Form.Field>
              

                
                <Button type='submit'>Submit New Event</Button>
            </Form>
            </div>
        )
    }
}

export default SignUpForm