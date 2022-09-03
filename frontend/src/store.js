import {createStore,applyMiddleware,combineReducers} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { userDetailReducer, userLoginReducer, userRegisterReducer, userUpdateProfileReducer } from "./reducers/userReducer";

const userInfofromStorage=localStorage.getItem('userdetailsinfo')
?JSON.parse(localStorage.getItem('userdetailsinfo')):null;
const init_state={
    userLogin:{userInfo:userInfofromStorage},
};
const reducer = combineReducers({
    userRegister:userRegisterReducer,
    userLogin:userLoginReducer,
    userDetail:userDetailReducer,
    userUpdateProfile:userUpdateProfileReducer
})
const middleware = [thunk]; 
const store = createStore(
  reducer,
  init_state,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;