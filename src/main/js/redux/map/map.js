export const CURRENT_POSITION = 'CURRENT_POSITION';

export const getCurrentPosition = (position) => {
  return {
    type: CURRENT_POSITION,
    position
  }
}

export const doGetCurrentPosition = (position) => {
  return dispatch => {
    dispatch(getCurrentPosition(position));
  }
}