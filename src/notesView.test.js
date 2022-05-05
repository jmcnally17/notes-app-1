/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const { Z_VERSION_ERROR } = require('zlib');
const NotesApi = require('./notesApi');
const NotesModel = require('./notesModel');
const NotesView = require('./notesView');

jest.mock('./notesModel');
jest.mock('./notesApi');

describe('NotesView', () => {
  beforeEach(() => {
    NotesModel.mockClear();
    NotesApi.mockClear();
    document.body.innerHTML = fs.readFileSync('./index.html');
    mockModel = new NotesModel();
    mockApi = new NotesApi();
    view = new NotesView(mockModel, mockApi);
  });

  describe('displayNotes', () => {
    it("gets the notes from model and displays it as a new div element with class 'note'", () => {
      view.model.getNotes.mockImplementation(() => ['This is an example note']);
      view.displayNotes();
      expect(document.querySelector('div.note').innerText).toBe('This is an example note');
    });

    it('correct number of notes are displayed when display notes is called twice', () => {
      view.model.getNotes.mockImplementation(() => ['This is an example note']);
      view.displayNotes();
      view.displayNotes();
      expect(document.querySelectorAll('div.note').length).toBe(1);
    });
  });

  it('adds a note to the list of notes displayed', () => {
    const messageInputEl = document.querySelector('#note-text');
    messageInputEl.value = 'Walk the dogs';

    view.model.convertString.mockImplementation(() => ({ content: messageInputEl.value }));
    view.model.addNote.mockImplementation(() => undefined);
    view.api.createNote.mockImplementation((note, callback) => callback(note));
    view.model.getNotes.mockImplementation(() => [messageInputEl.value]);

    const addNotebuttonEl = document.querySelector('#add-button');
    addNotebuttonEl.click();

    expect(document.querySelector('div.note').innerText).toBe('Walk the dogs');
  });

  it('displayNotesFromApi loads notes from the server and displays them', () => {
    view.model.getNotes.mockImplementation(() => ['This is an example note']);
    view.model.setNotes.mockImplementation(() => undefined);
    view.api.loadNotes.mockImplementation((callback) => callback(['This is an example note']));

    view.displayNotesFromApi();
    expect(view.api.loadNotes).toHaveBeenCalledTimes(1);
    expect(view.model.setNotes).toHaveBeenCalledTimes(1);
    expect(view.model.getNotes).toHaveBeenCalledTimes(1);
    expect(document.querySelector('div.note').innerText).toBe('This is an example note');
  });

  it('adds a note to the server when the form is submitted', () => {
    const messageInputEl = document.querySelector('#note-text');
    messageInputEl.value = 'Walk the dogs';

    view.model.convertString.mockImplementation(() => ({ content: messageInputEl.value }));
    view.model.addNote.mockImplementation(() => undefined);
    view.api.createNote.mockImplementation((note, callback) => callback(note));
    view.model.getNotes.mockImplementation(() => [messageInputEl.value]);

    const addNotebuttonEl = document.querySelector('#add-button');
    addNotebuttonEl.click();

    expect(view.model.convertString).toHaveBeenCalledTimes(1);
    expect(view.api.createNote).toHaveBeenCalledTimes(1);
    expect(view.model.addNote).toHaveBeenCalledTimes(1);
    expect(view.model.getNotes).toHaveBeenCalledTimes(1);

    view.displayNotesFromApi();

    expect(document.querySelector('div.note').innerText).toBe('Walk the dogs');
  });
});