const NotesModel = require('./notesModel');

describe('notesModel class', () => {
  it('#getNotes on new model returns empty notes array', () => {
    const model = new NotesModel();
    expect(model.getNotes()).toEqual([]);
  });

  it('#addNote adds items to the notes array', () => {
    const model = new NotesModel();
    model.addNote('Buy milk');
    model.addNote('Go to the gym');
    expect(model.getNotes()).toEqual([
      'Buy milk',
      'Go to the gym'
    ]);
  });

  it('#reset deletes existing notes to return to empty notes array', () => {
    const model = new NotesModel();
    model.addNote('Buy milk');
    model.addNote('Go to the gym');
    model.reset();
    expect(model.getNotes()).toEqual([]);
  });

  it('setNotes sets the notes equal to an array object', () => {
    const model = new NotesModel();
    notes = [
      'Note one',
      'Note two'
    ];
    model.setNotes(notes);

    expect(model.getNotes()).toEqual(notes);
  });
});