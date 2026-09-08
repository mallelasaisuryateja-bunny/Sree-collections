import {configureStore,createSlice} from "@reduxjs/toolkit";
const cart=createSlice({name:"cart",initialState:{items:[]},reducers:{setItems:(s,a)=>{s.items=a.payload}}});
export const {setItems}=cart.actions;
export const store=configureStore({reducer:{cart:cart.reducer}});
