import React, { useEffect, useState } from 'react'

export default function TabView({ line }) {
  // each tab line has 10 notes.
  // e.g. of notes: "1--0|--1-|--1-|--3-|--2-|-1--"

  const STRINGS = ["E", "B", "G", "D", "A", "E"];
  const [edit, setEdit] = useState(null)
  const [noteInput, setNoteInput] = useState("")
  const [stringNotes, setStringNotes] = useState(line.notes.split("|"));
  
  
  const changeNote = (ev) => {
    // change/add note here
    // add an input box at this place
    if (edit == null) {
      let index = ev.target.getAttribute("index");
      setEdit(index);
      // if this already had a note, change it to the value of the input
      console.log(stringNotes[index.split("|")[0]][index.split("|")[1]])
      if (stringNotes[index.split("|")[0]][index.split("|")[1]] != "-") {
        setNoteInput(stringNotes[index.split("|")[0]][index.split("|")[1]]);
      }
    }
  }

  const confirmNote = (e) => {
    e.preventDefault();
    const row = edit.split("|")[0]
    const col = edit.split("|")[1]

    const updatedNotes = stringNotes.map((rowArray, rowIndex) =>
      rowIndex == row
        ? rowArray.split("").map((value, colIndex) =>
            colIndex == col ? noteInput : value
          ).join("")
        : rowArray
    );

    // Update the state with the new matrix
    setStringNotes(updatedNotes);
    setEdit(null)
    setNoteInput("")
  }

  useEffect(() => {
    console.log(edit)
  }, [edit])


  return (
    <div>
      {/* Display Lyric */}
      <p>{line.lyric}</p>
      {/* Display Tab */}
      {STRINGS.map((letter, id) => {
        const notes = stringNotes[id].split("");
        console.log(notes);
        return (
          <div key={id} className="string-row">
            <p className="string-letter">{letter}</p>
            <form onSubmit={confirmNote}>
              <p className="notes" onClick={(ev) => changeNote(ev)} >
                {notes.map((note, k) => {
                  return edit == id + "|" + k ? (
                    <input onSubmit={confirmNote} key={k} className='note-input' type="text" maxLength={1} onChange={(ev) => setNoteInput(ev.target.value)} value={noteInput} />
                  ) : (
                    // if it is 0, then use e has the letter to differentiate between first and last string
                    <span key={k} index={id + "|" + k}>
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
