import React from 'react';
import {
  Container,
  Row,
  Col,
  Button,
} from 'reactstrap';
import { ComparisonTable } from '../../Components';
import _ from 'lodash';

const getAngry = string => console.error('OH NO!!', string);

const convertDecklistStringToObject = (decklistString) => {
  const cards = decklistString.split('\n');
  const decklistObject = cards.reduce((currentObj, cardRow) => {
    const trimmedRow = cardRow.trim();
    if (trimmedRow === '') {
      return currentObj;
    }

    const numberOfCard = parseInt(trimmedRow, 10);
    const numberOfCardString = parseInt(trimmedRow, 10).toString();
    if (numberOfCardString === 'NaN') {
      getAngry(`${trimmedRow} does not have a valid number listed. Write your decklists in the following format:
4 card name
2 other card name
etc...
`);
    }

    const cardName = trimmedRow.slice(numberOfCardString.length + 1);

    return {
      ...currentObj,
      [cardName]: numberOfCard,
    };
  }, {});
  return decklistObject;
};

const compareDecklistStrings = (decklistAString, decklistBString) => {
  const decklistA = convertDecklistStringToObject(decklistAString);
  const decklistB = convertDecklistStringToObject(decklistBString);

  const allCardNames = _.union(Object.keys(decklistA), Object.keys(decklistB));

  return allCardNames.reduce((buildingObject, cardName) => ({
    ...buildingObject,
    [cardName]: {
      left: decklistA[cardName] || 0,
      right: decklistB[cardName] || 0,
    },
  }), {});
};

export default ({
  history,
  decklists,
  displayNoDifference,
  setDisplayNoDifference,
}) => (
  <Container>
    <Row>
      <Col xs="12">
        <br />
        <Button color="primary" onClick={() => history.push('/')}>Go Back</Button>
      </Col>
    </Row>
    <Row>
      <Col xs="12">
        <hr />
        <h4>
          Main Decks
          {' '}
          <Button color="warning" onClick={() => setDisplayNoDifference(true)}>Show No Difference</Button>
          {' '}
          <Button color="warning" onClick={() => setDisplayNoDifference(false)}>Hide No Difference</Button>
        </h4>
        <ComparisonTable
          decklistComparison={compareDecklistStrings(decklists.left.main, decklists.right.main)}
          displayNoDifference={displayNoDifference}
        />
      </Col>
    </Row>
    <Row>
      <Col xs="12">
        <h4>Sideboards</h4>
        <ComparisonTable
          decklistComparison={compareDecklistStrings(decklists.left.side, decklists.right.side)}
          displayNoDifference={displayNoDifference}
        />
      </Col>
    </Row>
  </Container>
);
