import React from 'react';
import { Table } from 'reactstrap';

const calcRowStyle = (leftVal, rightVal) => {
  if (leftVal === rightVal) return 'table-default';
  if (leftVal > rightVal) return 'table-success';
  return 'table-danger';
};

export default ({ decklistComparison, displayNoDifference }) => {
  const sortedDecklistComparison = Object.entries(decklistComparison).sort((a, b) => {
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
        {
          sortedDecklistComparison
            .filter(([, {
              left,
              right,
            }]) => (displayNoDifference ? true : left !== right))
            .map(([name, {
              left,
              right,
            }]) => (
              <tr className={calcRowStyle(left, right)} key={name}>
                <th scope="row">{name}</th>
                <td>{left}</td>
                <td>{right}</td>
                <td>{left - right}</td>
              </tr>
            ))
        }
      </tbody>
    </Table>
  );
};
