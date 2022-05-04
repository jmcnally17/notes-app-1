/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const NotesView = require('./NotesView');
const NotesModel = require('./notesModel');
require('jest-fetch-mock').enableMocks();

describe('NotesView', () => {
  describe('displayNotes', () => {
    it("gets the notes from model and displays it as a new div element with class 'note'", () => {
      document.body.innerHTML = fs.readFileSync('./index.html');
      const model = new NotesModel();
      model.addNote('This is an example note');
      const view = new NotesView(model);

      view.displayNotes();

      expect(document.querySelectorAll('div.note').length).toBe(1);
    });

    it('correct number of notes are displayed when display notes is called twice', () => {
      document.body.innerHTML = fs.readFileSync('./index.html');
      const model = new NotesModel();
      model.addNote('This is an example note');
      const view = new NotesView(model);

      view.displayNotes();
      view.displayNotes();

      expect(document.querySelectorAll('div.note').length).toBe(1);
    });
  });

  it('addes a note which is then added to the list of notes displayed', () => {
    document.body.innerHTML = fs.readFileSync('./index.html');
    const view = new NotesView();
    const messageInput = document.querySelector('#note-text');
    messageInput.value = 'Walk the dogs';
    const addNotebuttonEl = document.querySelector('#add-button');
    addNotebuttonEl.click();
    const note = document.querySelector('div.note');
    expect(note.innerText).toEqual('Walk the dogs');
  });

  it('displayNotesFromApi loads notes from the server and displays them', () => {
    document.body.innerHTML = fs.readFileSync('./index.html');
    const model = new NotesModel;

    const mockApi = {
      loadNotes: () => ['This note is from the server']
    };
    const view = new NotesView(model, mockApi);

    view.displayNotesFromApi();

    expect(document.querySelector('div.note')).toEqual('This note is from the server');
  });
});