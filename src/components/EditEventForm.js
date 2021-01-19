import React from 'react'
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

    render() {
        console.log(this.state)
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
                        <Form.Input label="Title" type="text" placeholder="title" value={this.state.title}/>
                        <Form.Input label="Description" type="text" placeholder="Your name" value={this.state.description}/>
                        <Form.Field >
                            <label>Date</label>
                            <Calendar  onChange={this.dateSelect} />
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

// const mdp = () ={
//     // will need a PATCH to events/:id action
// }

export default connect(msp)(EditEventForm)
