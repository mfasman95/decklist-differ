import React from 'react';
import {
  Container,
  Row,
  Col,
  Button,
} from 'reactstrap';
import { DecklistInput } from '../../Components';

export default ({ decklists, update, history }) => (
  <Container>
    <Row>
      <Col xs="12">
        <br />
        <Button color="primary" onClick={() => history.push('/display')}>Compare Lists</Button>
      </Col>
    </Row>
    <Row>
      <Col xs="6">
        <h2>Left</h2>
        <DecklistInput
          title="Main Deck"
          side="left"
          type="main"
          list={decklists.left.main}
          update={value => update('left', 'main', value)}
        />
        <hr />
        <DecklistInput
          title="Sideboard"
          side="left"
          type="side"
          list={decklists.left.side}
          update={value => update('left', 'side', value)}
        />
      </Col>
      <Col xs="6">
        <h2>Right</h2>
        <DecklistInput
          title="Main Deck"
          side="right"
          type="main"
          list={decklists.right.main}
          update={value => update('right', 'main', value)}
        />
        <hr />
        <DecklistInput
          title="Sideboard"
          side="right"
          type="side"
          list={decklists.right.side}
          update={value => update('right', 'side', value)}
        />
      </Col>
    </Row>
  </Container>
);
