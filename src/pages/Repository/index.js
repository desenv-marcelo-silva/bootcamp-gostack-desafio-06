import React from 'react';
import { Container, ViewRepository } from './styles';

export default function Repository(props) {
  const { html_url:url } = props.route.params;

  return (
    <Container>
      <ViewRepository source={{uri: url }} />
    </Container>
  );
}
