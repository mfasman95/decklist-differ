import React from 'react';
import {
  FormGroup,
  Label,
  Input,
} from 'reactstrap';

const mainPlaceholder = 'Insert the main deck here...';
const maindeckStyle = {
  height: '600px',
};

const sidePlaceholder = 'Insert the sideboard here...';
const sideboardStyle = {
  height: '250px',
};

export default ({
  title,
  side,
  type,
  list,
  update,
}) => (
  <FormGroup>
    <Label for="exampleText"><h4>{title}</h4></Label>
    <Input
      className="form-control-lg"
      type="textarea"
      name={`${side}-${type}`}
      id={`${side}-${type}-decklist`}
      placeholder={type === 'main' ? mainPlaceholder : sidePlaceholder}
      value={list}
      onChange={e => update(e.target.value)}
      style={type === 'main' ? maindeckStyle : sideboardStyle}
    />
  </FormGroup>
);
