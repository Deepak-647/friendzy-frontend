import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
  name: "connection",
  initialState: null,
  reducers: {
    addConnections: (state, action) => {
      return action.payload;
    },
    rem0oveConnections: (state, action) => {
      return null;
    },
  },
});

export const {addConnections,rem0oveConnections }= connectionSlice.actions;
export default connectionSlice.reducer;