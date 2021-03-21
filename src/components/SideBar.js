import React from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from '../redux/actions';
import { NavLink } from 'react-router-dom';
import {
  Menu,
  Segment,
  Sidebar,
  Grid,
  Icon,
} from 'semantic-ui-react';

class SideBar extends React.Component {
  state = {
    activeItem: '',
    userIds: [],
    visible: false,
  };

  handleItemClick = (e, data) => {
    this.setState({ activeItem: data.name });
  };

  componentDidMount() {
    if (this.props.currentUser.id) {
      this.props.fetchUsers(this.props.currentUser.id);
    }
  }

  fullName = (user) => {
    return `${user.first_name} ${user.last_name}`;
  };

  initials = (user) => {
    return (
      user.first_name[0].toUpperCase() +
      user.last_name[0].toUpperCase()
    );
  };

  handleHover = (e) => {
    const hoveredUserId = parseInt(e.target.id);
    const { userIds } = this.state;
    if (userIds.includes(hoveredUserId)) {
      let updatedList = [...userIds];
      let indexOfDeleted = updatedList.findIndex(
        (userId) => userId === hoveredUserId,
      );
      updatedList.splice(indexOfDeleted, 1);
      this.setState({ userIds: updatedList });
    } else {
      this.setState((prevState) => ({
        userIds: [...prevState.userIds, hoveredUserId],
      }));
    }
  };

  getInitials = () => {
    let alphabetized = this.props.followedUsers.sort((a, b) =>
      a.first_name.localeCompare(b.first_name),
    );
    return alphabetized.map((user) => {
      return (
        <Menu.Item
          // icon="user outline"
          as={NavLink}
          to={`/users/${user.id}`}
          id={user.id}
          key={user.id}
          onMouseEnter={this.handleHover}
          onMouseLeave={this.handleHover}
          onClick={this.props.toggleOff}
        >
          {this.state.userIds.includes(user.id)
            ? this.fullName(user)
            : this.initials(user)}
        </Menu.Item>
      );
    });
  };

  render() {
    return (
      <>
        <Grid columns={1}>
          <Grid.Column>
            <Sidebar.Pushable as={Segment}>
              <Sidebar
                as={Menu}
                animation="overlay"
                icon="labeled"
                inverted
                // onHide={() => setVisible(false)}
                vertical
                visible={this.props.visible}
                width="wide"
                style={{ maxWidth: '225px' }}
              >
                <Menu.Item
                  // as={NavLink} exact to="/"
                  name="home"
                  active={this.state.activeItem === 'home'}
                  onClick={this.props.toggleOff}
                >
                  <Icon link={true} name="bars" size="big" />
                </Menu.Item>

                {this.getInitials()}
              </Sidebar>
            </Sidebar.Pushable>
          </Grid.Column>
        </Grid>
      </>
    );
  }
}

const msp = (state) => {
  return {
    followedUsers: state.followedUsers,
    currentUser: state.currentUser,
  };
};

const mdp = (dispatch) => {
  return { fetchUsers: (userId) => dispatch(fetchUsers(userId)) };
};

export default connect(msp, mdp)(SideBar);
