const initialState = { 
  darkTheme : false,
  showPersonalizedAds : false
};

export default function settingsReducer(state = initialState, action) {
  switch(action.type) {
    case 'UPDATE_SETTINGS':
      return {...state,...action.payload}
    default : return state
  }
}