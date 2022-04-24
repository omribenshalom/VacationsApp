import { combineReducers, createStore } from 'redux';
import { vacationsReducer } from './VacationsState';
import { authReducer } from './AuthState';
import { composeWithDevTools } from 'redux-devtools-extension';

const reducers = combineReducers({
  vacationsState: vacationsReducer,
  authState: authReducer,
});

const store = createStore(reducers, composeWithDevTools());

export default store;
