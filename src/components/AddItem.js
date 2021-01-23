import React from 'react'
import { addItem } from '../redux/actions'
import { Icon, Modal, Form, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'

class AddItem extends React.Component {

    state = {
        wishlist_id: this.props.user.wishlist.id,
        name: "",
        link: "",
        purchased: false
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit = (e) => {
        e.preventDefault()
        this.props.addItem(this.state)
    }

    render () {
        return (
            <Modal 
                trigger={<Icon link={true} style={{paddingLeft: "3px"}} name="add" onClick={this.addItem} size="big"/>}
                as={Form}
                onSubmit={this.onSubmit}
                size="mini"
                style={{textAlign: "center"}}
                >
                <Modal.Content>
                    <Form.Input label="Name" type="text" placeholder="name" name="name" value={this.state.name} onChange={this.onChange}/>
                    <Form.Input label="Link?" type="text" placeholder="link" name="link" value={this.state.link} onChange={this.onChange}/>
                </Modal.Content>
                <Modal.Actions style={{textAlign: "center"}}>
                    <Button type="submit" icon="add circle" content="Add!" />
                </Modal.Actions>
            </Modal>
        )
    }
}

const mdp = (dispatch) => {
    return {
        addItem: (itemObj) => dispatch(addItem(itemObj))
    }
}

export default connect(null, mdp)(AddItem)