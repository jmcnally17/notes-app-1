const NotesApi = require("./notesApi");
require("jest-fetch-mock").enableMocks();

describe("NotesApi", () => {
  it("loadNotes fetches notes", () => {
    const api = new NotesApi();

    fetch.mockResponseOnce(JSON.stringify(["This note is from the server"]));

    api.loadNotes((returnedNotesFromApi) => {
      expect(returnedNotesFromApi[0]).toBe("This note is from the server");
    });
  });

  it("createNote adds a new note to the server", () => {
    const api = new NotesApi();

    fetch.mockResponseOnce(
      JSON.stringify(["This note has been added to the server"])
    );

    api.createNote("This is a note", (response) => {
      expect(response[0]).toBe("This note has been added to the server");
    });
  });

  it("deletes all notes in the backend", () => {
    const api = new NotesApi();

    const consoleSpy = jest.spyOn(console, "log");

    fetch.mockResponseOnce([]);

    api.reset();
    expect(consoleSpy).toHaveBeenCalledWith("Notes deleted");
  });
});
