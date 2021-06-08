import {DELETE_SLIDERS } from "../Actions/actionTypes";

const initialState ={
  sliderList:[]
};

export default(state = initialState, action)=> {
  
  console.log(action);
  switch (action.type) {
  
      case DELETE_SLIDERS:
        return {...state,sliderList:action.payload};

    default:
      return state;
  }
}