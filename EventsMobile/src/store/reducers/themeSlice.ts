import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface InitialStateProps {
    isDark: boolean
}

const initialState: InitialStateProps = {
    isDark: true
}

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        setIsDark: (state, action: PayloadAction<boolean>) => {
            state.isDark = action.payload
        }
    }
})

export default themeSlice.reducer
export const {setIsDark} = themeSlice.actions
