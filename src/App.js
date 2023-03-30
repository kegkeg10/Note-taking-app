import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import NoteList from "./components/NoteList";
import Search from "./components/Search";
import Header from "./components/Header";

const App = () => {
  const [notes, setNotes] = useState([
    {
      id: nanoid(),
      text: "Resident evil 4!",
      date: "3/28/2023",
    },
    {
      id: nanoid(),
      text: "Resident evil 5!",
      date: "5/28/2023",
    },
    {
      id: nanoid(),
      text: "Resident evil 6!",
      date: "9/28/2023",
    },
    {
      id: nanoid(),
      text: "Resident evil Villager!",
      date: "10/28/2023",
    },
  ]);

  const [searchText, setSearchText] = useState("");

  const [darkMode, setDarkMode] = useState(false);

  useEffect (() => {
    const savedNotes = JSON.parse(localStorage.getItem('react-notes-data')
    );

    if (savedNotes) {
      setNotes(savedNotes)
    }

  }, [])


  useEffect (() => {
    localStorage.setItem(
      'react-notes-data',
      JSON.stringify(notes)
    )
  }, [notes])

  const addNote = (text) => {
    const date = new Date();
    const newNote = {
      id: nanoid(),
      text: text,
      date: date.toLocaleDateString(),
    };
    const newNotes = [...notes, newNote];
    setNotes(newNotes);
  };

  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  };

  return (
    <div className={`${darkMode && 'dark-mode'}`}>
      <div className="container">
        <Header handleToggleDarkMode={setDarkMode}/>
        <Search handleSearchNote={setSearchText} />
        <NoteList
          notes={notes.filter((note) =>
            note.text.toLowerCase().includes(searchText)
          )}
          handleAddNote={addNote}
          handleDeleteNote={deleteNote}
        />
      </div>
    </div>
  );
};

export default App;
