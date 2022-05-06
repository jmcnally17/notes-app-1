/**
 * @jest-environment jsdom
 */

const fs = require("fs");
const { Z_VERSION_ERROR } = require("zlib");
const EmojiApi = require("./emojiApi");
const NotesApi = require("./notesApi");
const NotesModel = require("./notesModel");
const NotesView = require("./notesView");

jest.mock("./notesModel");
jest.mock("./notesApi");
jest.mock("./emojiApi");

describe("NotesView", () => {
  beforeEach(() => {
    NotesModel.mockClear();
    NotesApi.mockClear();
    EmojiApi.mockClear();
    document.body.innerHTML = fs.readFileSync("./index.html");
    mockModel = new NotesModel();
    mockApi = new NotesApi();
    mockEmojiApi = new EmojiApi();
    view = new NotesView(mockModel, mockApi, mockEmojiApi);
  });

  describe("displayNotes", () => {
    it("gets the notes from model and displays it as a new div element with class 'note'", () => {
      view.model.getNotes.mockImplementation(() => ["This is an example note"]);
      view.emojiApi.createEmoji.mockImplementation(
        (note, callbackOne, callbackTwo) => callbackTwo(note)
      );
      view.displayNotes();
      expect(document.querySelector("div.note").innerText).toBe(
        "This is an example note"
      );
    });

    it("correct number of notes are displayed when display notes is called twice", () => {
      view.model.getNotes.mockImplementation(() => ["This is an example note"]);
      view.emojiApi.createEmoji.mockImplementation(
        (note, callbackOne, callbackTwo) => callbackTwo(note)
      );
      view.displayNotes();
      view.displayNotes();
      expect(document.querySelectorAll("div.note").length).toBe(1);
    });
  });

  it("adds a note to the list of notes displayed", () => {
    const messageInputEl = document.querySelector("#note-text");
    messageInputEl.value = "Walk the dogs";

    view.model.convertString.mockImplementation(() => ({
      content: messageInputEl.value,
    }));
    view.model.addNote.mockImplementation(() => undefined);
    view.api.createNote.mockImplementation((note, callback) => callback(note));
    view.model.getNotes.mockImplementation(() => [messageInputEl.value]);
    view.emojiApi.createEmoji.mockImplementation(
      (note, callbackOne, callbackTwo) => callbackTwo(note)
    );

    const addNotebuttonEl = document.querySelector("#add-button");
    addNotebuttonEl.click();

    expect(document.querySelector("div.note").innerText).toBe("Walk the dogs");
  });

  it("displayNotesFromApi loads notes from the server and displays them", () => {
    view.model.getNotes.mockImplementation(() => ["This is an example note"]);
    view.model.setNotes.mockImplementation(() => undefined);
    view.api.loadNotes.mockImplementation((callback) =>
      callback(["This is an example note"])
    );
    view.emojiApi.createEmoji.mockImplementation(
      (note, callbackOne, callbackTwo) => callbackTwo(note)
    );

    view.displayNotesFromApi();
    expect(view.api.loadNotes).toHaveBeenCalledTimes(1);
    expect(view.model.setNotes).toHaveBeenCalledTimes(1);
    expect(view.model.getNotes).toHaveBeenCalledTimes(1);
    expect(document.querySelector("div.note").innerText).toBe(
      "This is an example note"
    );
  });

  it("adds a note to the server when the form is submitted", () => {
    const messageInputEl = document.querySelector("#note-text");
    messageInputEl.value = "Walk the dogs";

    view.model.convertString.mockImplementation(() => ({
      content: messageInputEl.value,
    }));
    view.model.addNote.mockImplementation(() => undefined);
    view.api.createNote.mockImplementation((note, callback) => callback(note));
    view.model.getNotes.mockImplementation(() => [messageInputEl.value]);
    view.emojiApi.createEmoji.mockImplementation(
      (note, callbackOne, callbackTwo) => callbackTwo(note)
    );

    const addNotebuttonEl = document.querySelector("#add-button");
    addNotebuttonEl.click();

    expect(view.model.convertString).toHaveBeenCalledTimes(1);
    expect(view.api.createNote).toHaveBeenCalledTimes(1);
    expect(view.model.addNote).toHaveBeenCalledTimes(1);
    expect(view.model.getNotes).toHaveBeenCalledTimes(1);

    view.displayNotesFromApi();

    expect(document.querySelector("div.note").innerText).toBe("Walk the dogs");
  });

  it("displayError prints an error on the page when fetch fails", () => {
    view.displayError();
    expect(document.querySelector("div.error").innerText).toBe(
      "Oops, something went wrong!"
    );
  });

  it("clears all notes from the server", () => {
    view.model.getNotes.mockImplementation(() => []);
    view.api.reset.mockImplementation(() => []);
    view.model.reset.mockImplementation(() => []);

    const resetButtonEl = document.querySelector("#delete-button");
    resetButtonEl.click();

    expect(view.api.reset).toHaveBeenCalledTimes(1);
    expect(view.model.getNotes).toHaveBeenCalledTimes(1);
    expect(view.model.reset).toHaveBeenCalledTimes(1);
  });
});
