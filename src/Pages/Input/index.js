import { connect } from 'react-redux';
import Input from './Input';
import { actionCreators } from '../../redux';

const mapStateToProps = state => ({
  decklists: state.decklists,
});

const mapDispatchToProps = dispatch => ({
  update: (side, section, content) => dispatch(
    actionCreators.updateDecklist(side, section, content),
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(Input);
