import { actionTypes } from '../actions';

const initialState = {
  displayNoDifference: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_DISPLAY_NO_DIFFERENCE: {
      const { bool } = action;

      return {
        ...state,
        displayNoDifference: bool,
      };
    }
    default: {
      return state;
    }
  }
};
