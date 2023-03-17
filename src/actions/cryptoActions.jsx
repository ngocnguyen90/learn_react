import {
  CRYPTO_LISTS,
  CRYPTO_SEARCH,
  CRYPTO_ADD,
  CRYPTO_EDIT,
  CRYPTO_ITEM
} from '../constants/constant';

export const setListCrypto = (value) => (dispatch) => {
  dispatch({
    type: CRYPTO_LISTS,
    value
  })
}

export const setSearchData = (value) => (dispatch) => {
  dispatch({
    type: CRYPTO_SEARCH,
    value
  })
}

export const addCrypto = (value) => (dispatch) => {
  dispatch({
    type: CRYPTO_ADD,
    value
  })
}

export const editCrypto = (value) => (dispatch) => {
  dispatch({
    type: CRYPTO_EDIT,
    value
  })
}

export const setCryptoItem = (value) => (dispatch) => {
  dispatch({
    type: CRYPTO_ITEM,
    value
  })
}
