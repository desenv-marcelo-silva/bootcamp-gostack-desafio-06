import React from 'react';
import PropTypes from 'prop-types';

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
  Loading,
} from './styles';

import api from '../../services/api';

export default class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stars: [],
      loading: true,
      page: 1,
      refreshing: false,
    };
  }

  async componentDidMount() {
    this.load();
  }

  load = async (page = 1) => {
    this.startLoading();

    const { stars } = this.state;

    const user = this.getUserDataFromRoute();
    const response = await api
      .get(`/users/${user.login}/starred?page=${page}`);

    this.setState({ 
      stars: page >= 2 
            ? [...stars, ...response.data] 
            : response.data, 
      loading: false, 
      page
    });
  }

  loadMore = async () => {
    const { page } = this.state;
    const nextPage = page + 1;
    this.load(nextPage);
  }

  startLoading() {
    this.setState({ loading: true });
  }

  startRefresh() {
    this.setState({refreshing: true});
  }

  endRefresh() {
    this.setState({refreshing: false});
  }

  refreshList = async() => {
    this.startRefresh();
    
    this.load(1);

    this.endRefresh();
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
          ? (<Loading />)
          : (<Stars
              data={stars}
              keyExtractor={star => String(star.id)}
              onEndReachedThreshold={0.2} // Carrega mais itens quando chegar em 20% do fim
              onEndReached={this.loadMore} // Função que carrega mais itens          
              onRefresh={this.refreshList} // Função dispara quando o usuário arrasta a lista pra baixo
              refreshing={this.state.refreshing} // Variável que armazena um estado true/false que representa se a lista está atualizando
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
