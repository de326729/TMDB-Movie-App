import {genreReducer} from "../reducers/genreReducer";
import {filterReducer} from "../reducers/filterReducer"
import {imageReducer} from "../reducers/imageReducer"
import {nowPlayingReducer} from "../reducers/nowPlayingReducer"
import * as actions from "../config/action-constants"
import genremock from "./mock/mockGenre"
import selectedFilter from "./mock/mockfillter"


describe('genre reducer', () => {
    it('should return the initial state', () => {
      expect(genreReducer([], {})).toEqual([]);
    });

    it('should update after HANDLE_GENRE_CHANGE action', () => {
        const SAVE_GENRE_LIST_Action = {
            type: actions.SAVE_GENRE_LIST,
            list:genremock
          };
        expect(genreReducer([],SAVE_GENRE_LIST_Action)).toEqual(genremock);
      });
});

describe('imageReducer reducer', () => {
    it('should return the initial state', () => {
      expect(imageReducer([], {})).toEqual([]);
    });
});


describe('filterReducer reducer', () => {
    it('should return data after HANDLE_GENRE_CHANGE', () => {

        const selectGenreAction = {
            type: actions.HANDLE_GENRE_CHANGE,
            data:selectedFilter.genresSelected
          };
      expect(filterReducer({}, selectGenreAction)).toEqual(selectedFilter);
    });
});