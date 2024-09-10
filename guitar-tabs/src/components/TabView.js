import React, { useEffect, useState } from "react";

export default function TabView({ line, currentBeat, tabNum, editable, handleEditedSong }) {
  // each tab line has 10 notes.
  // e.g. of notes: "1--0|--1-|--1-|--3-|--2-|-1--"

  const STRINGS = ["E", "B", "G", "D", "A", "E"];
  const [stringNotes, setStringNotes] = useState(line.notes.split("|"));

  const [editNote, setEditNote] = useState(null);
  const [noteInput, setNoteInput] = useState("");

  const [editLyric, setEditLyric] = useState(null);
  const [lyricInput, setLyricInput] = useState(line.lyric);

  const changeNote = (ev) => {
    // change/add note here
    // add an input box at this place
    if (editNote == null) {
      let index = ev.target.getAttribute("index");
      setEditNote(index);
      // if this already had a note, change it to the value of the input
      if (stringNotes[index.split("|")[0]][index.split("|")[1]] != "-") {
        setNoteInput(stringNotes[index.split("|")[0]][index.split("|")[1]]);
      }
    }
  };

  const confirmNote = (e) => {
    if (e) e.preventDefault();
    const row = editNote.split("|")[0];
    const col = editNote.split("|")[1];

    const updatedNotes = stringNotes.map((rowArray, rowIndex) =>
      rowIndex == row
        ? rowArray
            .split("")
            .map((value, colIndex) => (colIndex == col ? noteInput : value))
            .join("")
        : rowArray
    );

    // Update the state with the new matrix
    setStringNotes(updatedNotes);
    setEditNote(null);
    setNoteInput("");
  };

  const submitLyric = (e) => {
    e.preventDefault();
    setEditLyric(false);
  };

  const handleKey = (e, id, k) => {
    if (e.key == "Tab" && k != stringNotes[0].length - 1) {
      // if noteInput == "", no need to run confirm note, because value didn't change
      if (noteInput != "") {
        confirmNote(null);
      }
      setEditNote(id + "|" + (k + 1).toString());
      if (stringNotes[id][k + 1] != "-") setNoteInput(stringNotes[id][k + 1]);
    }
  };

  useEffect(() => {
    handleEditedSong({
      id: tabNum,
      tabs: stringNotes.join("|"),
      lyrics: lyricInput,
    });
  }, [stringNotes, lyricInput])

  useEffect(() => {
    setEditLyric(true)
  }, [editable])

  return (
    <div className="tab-component">
      {/* Display Lyric */}
      {(lyricInput == "" || editLyric) && editable ? (
        <form onSubmit={(e) => submitLyric(e)}>
          <input
            className="lyric-input"
            type="text"
            value={lyricInput}
            placeholder={"Enter lyric..."}
            onChange={(ev) => {
              setLyricInput(ev.target.value);
              !editLyric && setEditLyric(true);
            }}
          />
        </form>
      ) : (
        <div className="lyric-wrapper">
          <p>{lyricInput}</p>
        </div>
      )}
      {/* Display Tab */}
      {STRINGS.map((letter, id) => {
        const notes = stringNotes[id].split("");
        return (
          <div key={id} className="string-row">
            <p className="string-letter">{letter}</p>
            <form onSubmit={confirmNote}>
              <p className="notes" onClick={(ev) => changeNote(ev)}>
                {notes.map((note, k) => {
                  return editNote == id + "|" + k && editable ? (
                    <input
                      onSubmit={confirmNote}
                      key={k}
                      className="note-input"
                      type="text"
                      maxLength={1}
                      onChange={(ev) => setNoteInput(ev.target.value)}
                      value={noteInput}
                      onKeyDown={(ev) => handleKey(ev, id, k)}
                    />
                  ) : (
                    // if it is 0, then use e has the letter to differentiate between first and last string
                    <span
                      key={k}
                      index={id + "|" + k}
                      className={
                        currentBeat % 40 == k &&
                        Math.floor(currentBeat / 40) == tabNum
                          ? "playing"
                          : ""
                      }
                    >
                      {note}
                    </span>
                  );
                })}
              </p>
            </form>
          </div>
        );
      })}
    </div>
  );
}
