import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import LayoutReducer from "../slices/layouts/reducer";
import CalendarReducer from "../slices/calendar/reducer";
// Authentication
import LoginReducer from "../slices/auth/login/reducer";
import AccountReducer from "../slices/auth/register/reducer";
import ForgetPasswordReducer from "../slices/auth/forgetpwd/reducer";
import ProfileReducer from "../slices/auth/profile/reducer";
import DashboardReducer from "../slices/dashboard/reducer"
import { categorySlice} from "../features/category/categorySlice"; 
import { subCategorySlice } from "features/subCategory/subCategorySlice";
import { produitSlice } from "../features/produit/productSlice";
import { fournisseurSlice } from "../features/fournisseur/fournisseurSlice";


export const store = configureStore({
    reducer: { 
        [categorySlice.reducerPath]:categorySlice.reducer,
        [subCategorySlice.reducerPath]:subCategorySlice.reducer,
        [produitSlice.reducerPath]: produitSlice.reducer,
        [fournisseurSlice.reducerPath]: fournisseurSlice.reducer,
    Layout: LayoutReducer,
    Calendar: CalendarReducer,
    Login: LoginReducer,
    Account: AccountReducer,
    ForgetPassword: ForgetPasswordReducer,
    Profile: ProfileReducer,
    Dashboard: DashboardReducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat([categorySlice.middleware,subCategorySlice.middleware, produitSlice.middleware, fournisseurSlice.middleware])
    }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>