/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const NotesView = require('./notesView');
require('jest-fetch-mock').enableMocks();

describe('NotesView', () => {

  const mockModel = {
    addNote: () => undefined,
    getNotes: () => ['This is an example note'],
    setNotes: () => undefined,
  }
  
  const mockApi = {
    loadNotes: () => ['This is an example note'],
  };

  describe('displayNotes', () => {
    it("gets the notes from model and displays it as a new div element with class 'note'", () => {
      document.body.innerHTML = fs.readFileSync('./index.html');
      const view = new NotesView(mockModel);

      view.displayNotes();

      expect(document.querySelector('div.note').innerText).toBe('This is an example note');
    });

    it('correct number of notes are displayed when display notes is called twice', () => {
      document.body.innerHTML = fs.readFileSync('./index.html');
      const view = new NotesView(mockModel);

      view.displayNotes();
      view.displayNotes();

      expect(document.querySelectorAll('div.note').length).toBe(1);
    });
  });

  it('adds a note which is then added to the list of notes displayed', () => {
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

    const view = new NotesView(mockModel, mockApi);

    view.displayNotesFromApi(() => {
      console.log('here');
      expect(document.querySelectorAll('div.note').length).toEqual(1);
    });
  });
});