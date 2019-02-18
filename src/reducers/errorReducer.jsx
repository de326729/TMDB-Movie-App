import {SHOW_ERROR} from '../config/action-constants';

const initialState = {
  isError: false,
  error: 'test'
}

/**
* This reducer method is to handle state related to application error.
*/

export const errorReducer = (state = initialState, action) => {

  switch (action.type) {

    case SHOW_ERROR:
      return {
        isError: true,
        error: action.error
      }

    default:
      return state;
  }

}
