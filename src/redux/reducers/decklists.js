import { actionTypes } from '../actions';

const initialStateKey = 'initialState';

const storedState = localStorage.getItem(initialStateKey);

const initialState = storedState !== null ? JSON.parse(storedState) : {
  left: {
    main: '',
    side: '',
  },
  right: {
    main: '',
    side: '',
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_DECKLIST: {
      const { side, section, content } = action;

      const newState = {
        ...state,
        [side]: {
          // maintain the existing lists
          main: state[side].main,
          side: state[side].side,
          // only update the intended list
          [section]: content,
        },
      };

      localStorage.setItem(initialStateKey, JSON.stringify(newState));

      return newState;
    }
    default: {
      return state;
    }
  }
};
