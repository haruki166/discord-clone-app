import { createSlice } from "@reduxjs/toolkit";
import { InitialChannelState } from "../../Types";

const initialState: InitialChannelState = {
  channelId: null,
  channelName: null,
};

export const channelSlice = createSlice({
  name: "channel",
  initialState,
  reducers: {
    channelInfo: (state, action) => {
      state.channelId = action.payload.channelId; //firestoreで設定されるランダムなID
      state.channelName = action.payload.channelName;
    },
  },
});
// console.log(userSlice);
export const { channelInfo } = channelSlice.actions;
export default channelSlice.reducer;
