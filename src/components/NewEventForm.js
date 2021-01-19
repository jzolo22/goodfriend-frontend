import React from 'react'
import { connect } from 'react-redux'
import { newEvent } from '../redux/actions'
import { Button, Checkbox, Form } from 'semantic-ui-react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';

class NewEventForm extends React.Component {

    state = {
        user_id: this.props.currentUser.id,
        date: "",
        title: "",
        description: "",
        annual: false
    }

    dateSelect = (e) => {
        this.setState({date: new Date (e)})
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    onCheck = () => {
        this.setState((prevState) => ({annual: !prevState.annual}))
    }

    onSubmit = (e) => {
        e.preventDefault()
        this.props.newEvent(this.state)
        this.setState({
                date: "",
                title: "",
                description: "",
                annual: false
        })
    }

    render() {
        console.log(this.state)
        return (
            <div style={{marginTop: "15%", textAlign: "center"}}>

            <Form onSubmit={this.onSubmit}>
                <Form.Field style={{margin: "1% 40% 0% 40%"}}>
                    <label>Title</label>
                    <input placeholder='Graduation, Promotion, Move-in' name="title" value={this.state.title} onChange={this.onChange}/>
                </Form.Field>
                
                <Form.Field style={{margin: "1% 40% 0% 40%"}}>
                     <Form.TextArea label='Description' placeholder='Will be looking for jobs after graduation!' name="description" value={this.state.description} onChange={this.onChange}/>
                </Form.Field>

                <Form.Field style={{margin: "1% 35% 3% 35%"}}>
                    <label>Date</label>
                    <Calendar  onChange={this.dateSelect}/>
                </Form.Field>

                <Form.Field>
                    <Checkbox label='Annual Event' name="annual" value={this.state.annual} onChange={this.onCheck}/>
                </Form.Field>
                <Button type='submit'>Submit New Event</Button>
            </Form>
            </div>
        )
    }
}



const msp = (state) => {
    return {
        currentUser: state.currentUser
    }
}

const mdp = (dispatch) => {
    return {
        newEvent: (eventObj) => dispatch(newEvent(eventObj))
    }
}

export default connect(msp, mdp)(NewEventForm)