import React from 'react'
// import { Divider, Header, Segment,  } from 'semantic-ui-react'
import styled from "styled-components";


class Wishlist extends React.Component {

    state = {
        wishlist_id: this.props.user.wishlist.id,
        name: "",
        link: ""
    }

    wishlistItems = () => {
        const wishlistItems = this.props.user.wishlist_items
        return wishlistItems.map(item => {
            return <li>{item.name}-{item.link}</li>
        })
    }

    render() {
        console.log(this.props.user)
        return (
            <Container>
            <h3>Wishlist</h3>
            {this.wishlistItems()}
            </Container>
        )
    }
}

export default Wishlist

const Container = styled.div`
    display: flex;
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