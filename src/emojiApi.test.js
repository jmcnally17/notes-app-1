const EmojiApi = require("./emojiApi");
require("jest-fetch-mock").enableMocks();

describe("EmojiApi", () => {
  it("createEmoji will a emoji to the note", () => {
    const api = new EmojiApi();

    fetch.mockResponseOnce(
      JSON.stringify({
        status: "OK",
        text: "Hello, :earth_africa:",
        emojified_text: "Hello, :earth_africa:",
      })
    );

    api.createEmoji("Hello, :earth_africa:", (response) => {
      expect(response.emojified_text).toBe("Hello, :earth_africa:");
    });
  });
});
