import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { MessengerProps } from '../../pages/dashboard';

export const messengersData: MessengerProps[] = [
  {
    id: '1',
    name: "Lead's 47",
    message:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam impedit provident tenetur excepturi maxime enim, repellendus numquam laborum possimus hic neque, exercitationem unde, vitae incidunt. Excepturi dolorem optio maxime error!',
    totalMessages: 199,
    totalSend: 99,
    totalPending: 100,
    running: false,
    days: ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sabádo', 'Domingo'],
    hours: ['10:00', '18:00'],
    phone: '47984288351',
    numbers: [],
  },
  {
    id: '2',
    name: 'Notícias diárias',
    message:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam impedit provident tenetur excepturi maxime enim, repellendus numquam laborum possimus hic neque, exercitationem unde, vitae incidunt. Excepturi dolorem optio maxime error!',
    totalMessages: 199,
    totalSend: 99,
    totalPending: 100,
    days: ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sabádo', 'Domingo'],
    hours: ['10:00', '18:00'],
    phone: '(47) 9 9999-9999',
    running: true,
    numbers: [],
  },
  {
    id: '3',
    name: 'Alertas',
    message:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam impedit provident tenetur excepturi maxime enim, repellendus numquam laborum possimus hic neque, exercitationem unde, vitae incidunt. Excepturi dolorem optio maxime error!',
    totalMessages: 199,
    totalSend: 99,
    totalPending: 100,
    running: false,
    days: [],
    hours: [],
    phone: '',
    numbers: [],
  },
  {
    id: '4',
    name: 'Reuniões',
    message:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam impedit provident tenetur excepturi maxime enim, repellendus numquam laborum possimus hic neque, exercitationem unde, vitae incidunt. Excepturi dolorem optio maxime error!',
    totalMessages: 199,
    totalSend: 99,
    totalPending: 100,
    running: false,
    days: [],
    hours: [],
    phone: '',
    numbers: [],
  },
  {
    id: '5',
    name: 'CECOM',
    message:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam impedit provident tenetur excepturi maxime enim, repellendus numquam laborum possimus hic neque, exercitationem unde, vitae incidunt. Excepturi dolorem optio maxime error!',
    totalMessages: 199,
    totalSend: 99,
    totalPending: 100,
    running: false,
    days: [],
    hours: [],
    phone: '',
    numbers: [],
  },
  {
    id: '6',
    name: 'Editais',
    message:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam impedit provident tenetur excepturi maxime enim, repellendus numquam laborum possimus hic neque, exercitationem unde, vitae incidunt. Excepturi dolorem optio maxime error!',
    totalMessages: 199,
    totalSend: 99,
    totalPending: 100,
    running: false,
    days: [],
    hours: [],
    phone: '',
    numbers: [],
  },
  {
    id: '7',
    name: 'Curredoria',
    message:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam impedit provident tenetur excepturi maxime enim, repellendus numquam laborum possimus hic neque, exercitationem unde, vitae incidunt. Excepturi dolorem optio maxime error!',
    totalMessages: 199,
    totalSend: 99,
    totalPending: 100,
    running: false,
    days: [],
    hours: [],
    phone: '',
    numbers: [],
  },
];

interface InitialState {
  messengerIdSelected: string;
  messengers: MessengerProps[];
  visibleEditMessengerModal: boolean;
  visibleStopMessengerModal: boolean;
  visibleStartMessengerModal: boolean;
  visibleRemoveMessengerModal: boolean;
  visibleAddMessageGroupModal: boolean;
}

const initialState: InitialState = {
  messengerIdSelected: '',
  messengers: messengersData,
  visibleStartMessengerModal: false,
  visibleStopMessengerModal: false,
  visibleEditMessengerModal: false,
  visibleRemoveMessengerModal: false,
  visibleAddMessageGroupModal: false,
};

const dashboardSlice = createSlice({
  name: 'dashboardSlice',
  initialState,
  reducers: {
    setSelectedMessengerId: (state, action: PayloadAction<string>) => {
      state.messengerIdSelected = action.payload;
    },

    setMessengers: (state, action: PayloadAction<MessengerProps[]>) => {
      state.messengers = action.payload;
    },

    setVisibleEditMessengerModal: (state, action: PayloadAction<boolean>) => {
      state.visibleEditMessengerModal = action.payload;
    },

    setVisibleStopMessengerModal: (state, action: PayloadAction<boolean>) => {
      state.visibleStopMessengerModal = action.payload;
    },

    setVisibleStartMessengerModal: (state, action: PayloadAction<boolean>) => {
      state.visibleStartMessengerModal = action.payload;
    },

    setVisibleRemoveMessengerModal: (state, action: PayloadAction<boolean>) => {
      state.visibleRemoveMessengerModal = action.payload;
    },

    setVisibleMessageGroupModal: (state, action: PayloadAction<boolean>) => {
      state.visibleAddMessageGroupModal = action.payload;
    },
  },
});

export const {
  setSelectedMessengerId,
  setMessengers,
  setVisibleEditMessengerModal,
  setVisibleRemoveMessengerModal,
  setVisibleStartMessengerModal,
  setVisibleStopMessengerModal,
  setVisibleMessageGroupModal,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
