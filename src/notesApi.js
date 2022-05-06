class NotesApi {
  loadNotes(callbackOne, callbackTwo) {
    fetch("http://localhost:3000/notes")
      .then((response) => response.json())
      .then((notes) => {
        callbackOne(notes);
      })
      .catch(callbackTwo);
  }

  createNote(note, callbackOne, callbackTwo) {
    fetch("http://localhost:3000/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    })
      .then((response) => response.json())
      .then((notes) => {
        callbackOne(notes);
      })
      .catch(callbackTwo);
  }

  reset() {
    fetch("http://localhost:3000/notes", {
      method: "DELETE",
    }).then(console.log("Notes deleted"));
  }
}

module.exports = NotesApi;
