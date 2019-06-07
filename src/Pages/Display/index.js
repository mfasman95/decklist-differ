import { connect } from 'react-redux';
import Display from './Display';
import { actionCreators } from '../../redux';

const mapStateToProps = state => ({
  decklists: state.decklists,
  displayNoDifference: state.ui.displayNoDifference,
});

const mapDispatchToProps = dispatch => ({
  setDisplayNoDifference: bool => dispatch(actionCreators.setDisplayNoDifference(bool)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Display);
