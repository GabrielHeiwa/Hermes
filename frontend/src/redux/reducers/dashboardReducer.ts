import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface InitialState {
	messengerIdSelected: string
}

const initialState: InitialState = {
    messengerIdSelected: ''
}

const dashboardSlice = createSlice({
    name: 'dashboardSlice',
    initialState,
    reducers: {
        setSelectedMessengerId: (state, action: PayloadAction<string>) => {
            state.messengerIdSelected = action.payload
        }
    }
})

export const { setSelectedMessengerId } =  dashboardSlice.actions

export default dashboardSlice.reducer
