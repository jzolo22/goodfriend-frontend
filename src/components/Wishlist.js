import React from 'react'
import { Checkbox, List } from 'semantic-ui-react'
import styled from "styled-components";
import { connect } from 'react-redux'
import AddItem from './AddItem';
import { getItems } from '../redux/actions'


class Wishlist extends React.Component {

    state = {
        itemIds: []
    }

    componentDidMount() {
        this.props.getItems()
    }

    wishlistItems = () => {
        if (this.props.items.length > 0) {
            const usersWishlistItems = this.props.items.filter(item => item.wishlist_id === this.props.user.wishlist.id)
            return usersWishlistItems.map(item => {
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
    }


    render() {
        console.log(this.props)
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