const NotesModel = require("./notesModel");
const NotesApi = require("./notesApi");
const EmojiApi = require("./emojiApi");

class NotesView {
  constructor(
    model = new NotesModel(),
    api = new NotesApi(),
    emojiApi = new EmojiApi()
  ) {
    this.model = model;
    this.api = api;
    this.emojiApi = emojiApi;

    this.mainContainerEl = document.querySelector("#main-container");
    this.buttonEl = document.querySelector("#add-button");
    this.textFieldEl = document.querySelector("#note-text");

    this.resetAllEl = document.querySelector("#delete-button");

    this.resetAllEl.addEventListener("click", () => {
      this.api.reset();
      this.model.reset();
      this.displayNotes();
    });

    this.buttonEl.addEventListener("click", () => {
      const noteObject = this.model.convertString(this.textFieldEl.value);
      this.api.createNote(
        noteObject,
        () => {
          this.model.addNote(noteObject.content);
          this.displayNotes();
          this.textFieldEl.value = "";
        },
        () => {
          this.displayError();
        }
      );
    });
  }

  displayNotes() {
    document.querySelectorAll("div.note").forEach((note) => {
      note.remove();
    });

    this.model.getNotes().forEach((note) => {
      this.emojiApi.createEmoji(
        note,
        (emojiNote) => {
          const noteEl = document.createElement("div");
          noteEl.innerText = emojiNote.emojified_text;
          noteEl.classList.add("note");
          this.mainContainerEl.append(noteEl);
        },
        () => {
          const noteEl = document.createElement("div");
          noteEl.innerText = note;
          noteEl.classList.add("note");
          this.mainContainerEl.append(noteEl);
        }
      );
    });
  }

  displayNotesFromApi() {
    this.api.loadNotes(
      (notes) => {
        this.model.setNotes(notes);
        this.displayNotes();
      },
      () => {
        this.displayError();
      }
    );
  }

  displayError() {
    const errorEl = document.createElement("div");
    errorEl.innerText = "Oops, something went wrong!";
    errorEl.classList.add("error");
    this.mainContainerEl.append(errorEl);
  }
}

module.exports = NotesView;
