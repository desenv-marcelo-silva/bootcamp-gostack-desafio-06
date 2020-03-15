import React from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator } from 'react-native'

import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
} from './styles';

import api from '../../services/api';

export default class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stars: [],
      loading: false,
    };
  }

  async componentDidMount() {
    const user = this.getUserDataFromRoute();
    console.tron.log("didmount");
    this.setState({ loading: true });
    const response = await api.get(`/users/${user.login}/starred`);

    this.setState({ stars: response.data, loading: false });
  }

  getUserDataFromRoute() {
    const { route } = this.props;
    const { user } = route.params;
    return user;
  }

  render() {
    const { stars, loading } = this.state;
    const user = this.getUserDataFromRoute();

    return (
      <Container>
        <Header>
          <Avatar source={{ uri: user.avatar }} />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>
        
        { loading 
          ? (<ActivityIndicator size="large" color="#7159c1" />)
          : (<Stars
                data={stars}
                keyExtractor={star => String(star.id)}
                renderItem={({ item }) => (
                  <Starred>
                    <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
                    <Info>
                      <Title>{item.name}</Title>
                      <Author>{item.owner.login}</Author>
                    </Info>
                  </Starred>
                )}
          />)
      }

      </Container>
    );
  }
}

User.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      user: PropTypes.shape().isRequired,
    }).isRequired,
  }).isRequired,
};
