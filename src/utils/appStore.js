const { configureStore } = require("@reduxjs/toolkit");
import userReducer from "./userSlice";


const appStote = configureStore({
    reducer : {
 user : userReducer
    }
})

export default appStote;