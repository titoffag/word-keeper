import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";

const Api = {
  fetchWord: async (word: string) => {
    const { data } = await axios.get(
      `https://wordsapiv1.p.rapidapi.com/words/${word}`,
      {
        headers: {
          "X-Mashape-Key": "f5d3d0bd7emsh2da11de5613cd89p18ae4ajsnc3ad8f4238e6",
        },
      }
    );

    return data;
  },
};

function* fetchWord(action: PayloadAction<string>) {
  try {
    const word = yield call(Api.fetchWord, action.payload);
    yield put({ type: "WORD_FETCH_SUCCEEDED", payload: word });
  } catch (e) {
    yield put({ type: "WORD_FETCH_FAILED", payload: e.message, error: true });
  }
}

export function* watchFetchWord() {
  yield takeLatest("WORD_FETCH_REQUESTED", fetchWord);
}

interface InitialState {
  value: number;
  loading: boolean;
  error: string | null;
}

export const initialState: InitialState = {
  value: 0,
  loading: false,
  error: null,
};

export const slice = createSlice({
  name: "word",
  initialState,
  reducers: {},
  extraReducers: {
    WORD_FETCH_REQUESTED: (state) => {
      state.loading = true;
    },
    WORD_FETCH_SUCCEEDED: (state, action) => {
      state.value = action.payload;
      state.loading = false;
    },
    WORD_FETCH_FAILED: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export default slice.reducer;
