import React from 'react';
import {
  Container,
  Row,
  Col,
  Button,
  Table,
} from 'reactstrap';

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

const compareDecklistObjects = (decklistAString, decklistBString, displayNoDifference) => {
  const combinedDecklist = {};
  const decklistA = convertDecklistStringToObject(decklistAString);
  const decklistB = convertDecklistStringToObject(decklistBString);

  const decklistAKeys = Object.keys(decklistA);
  decklistAKeys.forEach((key) => {
    const valueA = decklistA[key];
    const valueB = decklistB[key];
    if (valueB === undefined) {
      combinedDecklist[key] = {
        left: valueA,
        right: 0,
        difference: valueA,
        same: false,
        rowStyle: 'success',
      };
    }
    const valueAGreater = valueA > valueB;
    const valueBGreater = valueA < valueB;
    const valuesEqual = valueA === valueB;
    if (valueAGreater) {
      combinedDecklist[key] = {
        left: valueA,
        right: valueB,
        difference: valueA - valueB,
        same: false,
        rowStyle: 'success',
      };
    }
    if (valueBGreater) {
      combinedDecklist[key] = {
        left: valueA,
        right: valueB,
        difference: valueB - valueA,
        same: false,
        rowStyle: 'danger',
      };
    }
    if (valuesEqual && displayNoDifference) {
      combinedDecklist[key] = {
        left: valueA,
        right: valueB,
        difference: 0,
        same: true,
        rowStyle: 'default',
      };
    }
  });

  const decklistBKeys = Object.keys(decklistB);
  decklistBKeys.forEach((key) => {
    const valueB = decklistB[key];
    if (!decklistAKeys.includes(key)) {
      combinedDecklist[key] = {
        left: 0,
        right: valueB,
        difference: valueB,
        same: false,
        rowStyle: 'danger',
      };
    }
  });

  const sortedDecklist = Object.entries(combinedDecklist).sort((a, b) => {
    if (a[0] < b[0]) return -1;
    if (a[0] > b[0]) return 1;
    return 0;
  });

  return (
    <Table responsive className="table-bordered table-hover">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Left</th>
          <th scope="col">Right</th>
          <th scope="col">Difference</th>
        </tr>
      </thead>
      <tbody>
        {sortedDecklist.map(([name, {
          left,
          right,
          rowStyle,
          difference,
        }]) => (
          <tr className={`table-${rowStyle}`} key={name}>
            <th scope="row">{name}</th>
            <td>{left}</td>
            <td>{right}</td>
            <td>{difference}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
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
        {compareDecklistObjects(decklists.left.main, decklists.right.main, displayNoDifference)}
      </Col>
    </Row>
    <Row>
      <Col xs="12">
        <h4>Sideboards</h4>
        {compareDecklistObjects(decklists.left.side, decklists.right.side, displayNoDifference)}
      </Col>
    </Row>
  </Container>
);
