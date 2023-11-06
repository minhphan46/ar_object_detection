import {PayloadAction, createSlice} from '@reduxjs/toolkit';

export type Person = {
  id: number;
  name: string;
};

interface PersonState {
  persons: Person[];
}

const initialState: PersonState = {
  persons: [
    {
      id: 1,
      name: 'John Doe',
    },
  ],
};

export const PersonSlice = createSlice({
  name: 'person',
  initialState,
  reducers: {
    addPerson: (state, action: PayloadAction<{name: string}>) => {
      state.persons.push({
        id: state.persons.length,
        name: action.payload.name,
      });
    },
  },
});

export default PersonSlice.reducer;
export const {addPerson} = PersonSlice.actions;
