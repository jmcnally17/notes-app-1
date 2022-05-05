class NotesApi {
  loadNotes(callback) {
    fetch('http://localhost:3000/notes')
      .then(response => response.json())
      .then(notes => {
        callback(notes)
      });
  }
}

module.exports = NotesApi;