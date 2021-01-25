import React from 'react'
import { editEvent } from '../redux/actions'
import { connect } from 'react-redux'
import { Icon, Item, Modal, Form, Button, Checkbox } from 'semantic-ui-react'
import Calendar from 'react-calendar'


class EditEventForm extends React.Component {

    state = {
        user_id: this.props.currentUser.id,
        date: "",
        title: "",
        description: "",
        annual: false
    }

    componentDidMount() {
        let currentEvent = this.props.allEvents.filter(event => event.id === this.props.eventId)
        this.setState({
            date: currentEvent[0].date,
            title: currentEvent[0].title,
            description: currentEvent[0].description,
            annual: currentEvent[0].annual
        })
    }

    dateSelect = (e) => {
        this.setState({date: new Date (e)})
    }

    onCheck = () => {
        this.setState((prevState) => ({annual: !prevState.annual}))
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    submitEventUpdate = (e) => {
        e.preventDefault()
        this.props.editEvent(this.props.eventId, this.state)
    }

    render() {
        return (
            <>
                <Modal 
                    trigger={<Icon link={true} style={{paddingLeft: "3px"}} name="edit outline" onClick={this.editEventClick}/>}
                    as={Form}
                    onSubmit={this.submitEventUpdate}
                    size="mini"
                    style={{textAlign: "center"}}
                >
                    <Modal.Content>
                        <Form.Input label="Title" type="text" placeholder="title" name="title" value={this.state.title} onChange={this.onChange}/>
                        <Form.Input label="Description" type="text" placeholder="additional details here" name="description" value={this.state.description} onChange={this.onChange}/>
                        <Form.Field >
                            <label>Date</label>
                            <Calendar  onChange={this.dateSelect} defaultValue={new Date(this.state.date)}/>
                        </Form.Field>
                        <Form.Field>
                            <Checkbox label='Annual Event' name="annual" value={this.state.annual} onChange={this.onCheck}/>
                        
                        </Form.Field>
                    </Modal.Content>
                    <Modal.Actions style={{textAlign: "center"}}>
                        <Button type="submit" icon="save" content="Update" />
                    </Modal.Actions>
                </Modal>
            </>
        )
    }
}

const msp = (state) => {
    return {
        currentUser: state.currentUser,
        allEvents: state.allEvents
    }
}

const mdp = (dispatch) => {
    return {
        editEvent: (eventId, eventObj) => dispatch(editEvent(eventId, eventObj))
    }
}

export default connect(msp, mdp)(EditEventForm)
