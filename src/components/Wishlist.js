import React from 'react'
import { Checkbox, List } from 'semantic-ui-react'
import styled from "styled-components";
import { connect } from 'react-redux'
import AddItem from './AddItem';
import { getItems } from '..redux/actions'


class Wishlist extends React.Component {

    state = {
        itemIds: []
    }

    componentDidMount() {
        this.props.getItems()
    }

    wishlistItems = () => {
        const wishlistItems = this.props.user.wishlist_items
        return wishlistItems.map(item => {
            if (!item.purchased) {
                return (
                    <>
                        <Checkbox 
                            label={`${item.name}`} 
                        />
                        <List.Item 
                            icon='linkify'
                            content={<a href={item.link}>Link!</a>}
                        />
                    </>
                )}
        })
    }


    render() {
        console.log(this.state)
        return (
            <Container>
                <h3>Wishlist</h3>
                {this.wishlistItems()}

                <AddItem user={this.props.user}/>
            </Container>
        )
    }
}

const msp = (state) => {
    return {
        items: state.items
    }
}

const mdp = (dispatch) => {
    return {
        getItems: () => dispatch(getItems())
    }
}

export default connect(msp, mdp)(Wishlist)

const Container = styled.div`
    display: block;
`;


{/* <Segment style={{margin: "10% 20% 0%", }}>
                <Header as="h3">
                    Wishlist!
                </Header>

                <Divider clearing />
            </Segment>

            <Segment vertical>
                test
            </Segment> */}