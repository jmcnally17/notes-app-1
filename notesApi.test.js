const NotesApi = require('./notesApi');
require('jest-fetch-mock').enableMocks();

describe('NotesApi', () => {
  it('loadNotes fetches notes', () => {
    const api = new NotesApi();

    fetch.mockResponseOnce(JSON.stringify([
      'This note is from the server'
    ]));

    api.loadNotes((returnedNotesFromApi) => {
      expect(returnedNotesFromApi[0]).toEqual('This note is from the server');
    });
  });
});