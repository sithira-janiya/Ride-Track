import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Ticket {
  id: string;
  routeNo: string;
  from: string;
  to: string;
  qrCodeData: string;
  validUntil: string;
  isUsed: boolean;
}

interface TicketState {
  myTickets: Ticket[];
  activeTicket: Ticket | null;
  loading: boolean;
}

const initialState: TicketState = {
  myTickets: [],
  activeTicket: null,
  loading: false,
};

export const ticketSlice = createSlice({
  name: 'ticket',
  initialState,
  reducers: {
    addTicket: (state, action: PayloadAction<Ticket>) => {
      state.myTickets.unshift(action.payload);
      state.activeTicket = action.payload;
    },
    markTicketAsUsed: (state, action: PayloadAction<string>) => {
      const ticket = state.myTickets.find((t) => t.id === action.payload);
      if (ticket) {
        ticket.isUsed = true;
      }
    },
  },
});

export const { addTicket, markTicketAsUsed } = ticketSlice.actions;
export default ticketSlice.reducer;