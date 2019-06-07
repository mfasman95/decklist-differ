const actionTypes = {
  UPDATE_DECKLIST: 'UPDATE_DECKLIST',
  SET_DISPLAY_NO_DIFFERENCE: 'SET_DISPLAY_NO_DIFFERENCE',
};

const updateDecklist = (side, section, content) => ({
  type: actionTypes.UPDATE_DECKLIST,
  side,
  section,
  content,
});

const setDisplayNoDifference = bool => ({ type: actionTypes.SET_DISPLAY_NO_DIFFERENCE, bool });

const actionCreators = {
  updateDecklist,
  setDisplayNoDifference,
};

export default {
  actionTypes,
  actionCreators,
};

export {
  actionTypes,
  actionCreators,
};
