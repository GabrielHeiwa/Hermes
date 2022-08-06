import { createSlice, configureStore, PayloadAction } from '@reduxjs/toolkit'

const messengerSlice = createSlice({
    name: 'messengerSlice',
    initialState: {
        messengerIdSelected: ''
    },
    reducers: {
        setSelectedMessengerId: (state, action: PayloadAction<string>) => {
            state.messengerIdSelected = action.payload
        }
    }
})

export const { setSelectedMessengerId } =  messengerSlice.actions

export default messengerSlice.reducer
