class EmojiApi {
  createEmoji(note, callbackOne, callbackTwo) {
    note = { text: note };
    fetch("https://makers-emojify.herokuapp.com/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    }).then((response) =>
      response
        .json()
        .then((notes) => {
          callbackOne(notes);
        })
        .catch(callbackTwo)
    );
  }
}

module.exports = EmojiApi;
