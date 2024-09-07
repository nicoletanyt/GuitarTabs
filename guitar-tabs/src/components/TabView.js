import React, { useEffect, useState } from "react";
import { FaPen } from "react-icons/fa";

export default function TabView({ line, currentBeat }) {
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
    e.preventDefault();
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

  return (
    <div>
      {/* Display Lyric */}
      {(lyricInput == "" || editLyric) ? (
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
          {
            <div className="edit-btn" onClick={() => setEditLyric(true)}>
              <FaPen className="icon" />
              <p>Edit</p>
            </div>
          }
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
                  return editNote == id + "|" + k ? (
                    <input
                      onSubmit={confirmNote}
                      key={k}
                      className="note-input"
                      type="text"
                      maxLength={1}
                      onChange={(ev) => setNoteInput(ev.target.value)}
                      value={noteInput}
                    />
                  ) : (
                    // if it is 0, then use e has the letter to differentiate between first and last string
                    <span key={k} index={id + "|" + k} className={currentBeat == k ? "playing" : ""}>
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
