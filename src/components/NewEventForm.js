import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
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
        this.props.history.push(`/users/${this.props.currentUser.id}`)
    }

    render() {
        return (
            <div style={{marginTop: "7%", textAlign: "center"}}>

            <Form onSubmit={this.onSubmit} style={{margin: "1% 35% 5% 40%", paddingBottom: "5%", maxWidth: "300px"}}>
                <Form.Field >
                    <label>Title</label>
                    <input placeholder='Graduation, Promotion, Move-in' name="title" value={this.state.title} onChange={this.onChange}/>
                </Form.Field>
                
                <Form.Field >
                     <Form.TextArea label='Description' placeholder='Will be looking for jobs after graduation!' name="description" value={this.state.description} onChange={this.onChange}/>
                </Form.Field>

                <Form.Field >
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

export default connect(msp, mdp)(withRouter(NewEventForm))