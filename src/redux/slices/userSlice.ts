import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "../../types/UserTypes";

export interface UserState {
  user: UserType | undefined;
}

const initialState: UserState = {
  user: undefined,
};

export const useSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserType>) => {
      state.user = action.payload;
      return state;
    },
  },
});

export const { setUser } = useSlice.actions;

export default useSlice.reducer;
