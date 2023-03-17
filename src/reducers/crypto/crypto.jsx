import {
  CRYPTO_LISTS,
  CRYPTO_ADD,
  CRYPTO_EDIT,
  CRYPTO_REMOVE,
  CRYPTO_SEARCH,
  CRYPTO_DATA,
  CRYPTO_ITEM,
} from '../../constants/constant';
import _ from 'lodash';

const cryptoState = (state = CRYPTO_DATA, action) => {
  switch (action.type) {
    case CRYPTO_LISTS:
      return action.value;
    case CRYPTO_ADD:
      return [
        ...state,
        {
          ...action.value,
          id:
            state.length > 0
              ? state.reduce((acc, item) =>
                  acc.id > item.id ? acc.id : item.id
                ) + 1
              : 1,
        },
      ];
    case CRYPTO_EDIT:
      const cloneState = _.cloneDeep(state);
      return cloneState.reduce((acc, item) => {
        if(item.id === action.value.id) {
          acc.push(action.value)
        } else {
          acc.push(item)
        }
        return acc;
      }, [])
    case CRYPTO_REMOVE:
      return state;
    default:
      return state;
  }
};

const searchData = (state = [], action) => {
  switch (action.type) {
    case CRYPTO_SEARCH:
      return action.value;
    default:
      return state;
  }
};

const cryptoItem = (state = {}, action) => {
  switch (action.type) {
    case CRYPTO_ITEM:
      return action.value;

    default:
      return state;
  }
};

export { cryptoState, searchData, cryptoItem };
