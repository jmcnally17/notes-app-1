const NotesModel = require('./notesModel');
const NotesApi = require('./notesApi');

class NotesView {
  constructor(model = new NotesModel, api = new NotesApi) {
    this.model = model;
    this.api = api;

    this.mainContainerEl = document.querySelector('#main-container');
    this.buttonEl = document.querySelector('#add-button');
    this.textFieldEl = document.querySelector('#note-text');

    this.buttonEl.addEventListener('click', () => {
      // this.api.createNote(this.textFieldEl.value, )
      this.model.addNote(this.textFieldEl.value);
      this.displayNotes();
      this.textFieldEl.value = '';
    });
  }

  displayNotes() {
    document.querySelectorAll('div.note').forEach(note => {
      note.remove();
    });

    this.model.getNotes().forEach(note => {
      const noteEl = document.createElement('div');
      noteEl.innerText = note;
      noteEl.classList.add('note');
      this.mainContainerEl.append(noteEl);
    });
  }

  displayNotesFromApi() {
    this.api.loadNotes(notes => {
      this.model.setNotes(notes);
      this.displayNotes();
    });
  }
}

module.exports = NotesView;