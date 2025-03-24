import { useContext, useEffect, useState } from 'react';
import NoteCard from '../../components/Card/NoteCard';
import { MdAdd } from "react-icons/md";
import '../../index.css';
import "./homeStyle.css";
import NoteForm from '../../components/AddNote/NoteForm';
import Vide from '../../components/VidNotes/Vide';
import { addNote, deleteNote, editNote, getNotes } from '../../utils/axiosInstance';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [notes, setNotes] = useState([]);
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await getNotes(token);
        setNotes(response.data.data);
      } catch (error) {
        console.error("Error fetching notes:", error);
        logout();
        navigate("/login");
      }
    };

    if (token) fetchNotes();
  }, [token]);

  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newTags, setNewTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentNoteId, setCurrentNoteId] = useState(null);

  const handlePinToggle = (id) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, isPinned: !note.isPinned } : note
      )
    );
  };

  const onEditNote = (id) => {
    const noteToEdit = notes.find(note => note.id === id);
    if (noteToEdit) {
      setNewTitle(noteToEdit.title);
      setNewContent(noteToEdit.content);
      setNewTags(noteToEdit.tags);
      setCurrentNoteId(id);
      setIsEditing(true);
      const addNote = document.getElementById("addNote");
      addNote.style.display = "flex";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      try {
        await editNote(currentNoteId, newTitle, newContent, newTags, token); 
        setNotes(notes.map(note =>
          note.id === currentNoteId
            ? { ...note, title: newTitle, content: newContent, tags: newTags }
            : note
        ));
        setIsEditing(false);
        setCurrentNoteId(null);
        onCloseNote();
      } catch (error) {
        console.error("Error updating note:", error);
      }
    } else {
      try {
        const response = await addNote(newTitle, newContent, false, newTags, token);
        setNotes([...notes, response]);
        setNewTitle('');
        setNewContent('');
        setNewTags([]);
        onCloseNote();
      } catch (error) {
        console.error("Error adding note:", error);
      }
    }
  };

  const onAddNoteButtonHandle = () => {
    setIsEditing(false);
    setNewTitle('');
    setNewContent('');
    setNewTags([]);
    const addNote = document.getElementById("addNote");
    addNote.style.display = "flex";
  };

  const onCloseAddNote = (e) => {
    const addNote = document.getElementById("addNote");
    if (e.target === addNote) {
      addNote.style.display = "none";
    }
  };

  const onCloseNote = () => {
    const addNote = document.getElementById("addNote");
    addNote.style.display = "none";
  };

  const addTag = () => {
    if (tagInput.trim() !== '') {
      setNewTags([...newTags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const removeTag = (index) => {
    setNewTags(newTags.filter((_, i) => i !== index));
  };

  const onDeleteNote = async (id) => {
    try {
      await deleteNote(id, token);
      setNotes(notes.filter(note => note.id !== id));
    } catch (error) {
      console.error(error.response?.data?.message || 'Error deleting note');
    }
  };

  return (
    <div className="second-container notes">
      <div className={notes.length === 0 ? "notes-container-vide" : "notes-container"}>
        {notes.length === 0 ? <Vide /> : notes.map((note) => (
          <NoteCard
            key={note.id}
            title={note.title}
            dateCreated={note.dateCreated}
            content={note.content}
            isPinned={note.isPinned}
            tags={note.tags}
            onEditNote={() => onEditNote(note.id)}
            onPinNote={() => handlePinToggle(note.id)}
            onDeleteNote={() => onDeleteNote(note.id)}
          />
        ))}
      </div>

      <div className='add-note' onClick={onAddNoteButtonHandle}>
        <MdAdd className='add-icon' />
      </div>

      <NoteForm
        newTitle={newTitle}
        setNewTitle={setNewTitle}
        newContent={newContent}
        setNewContent={setNewContent}
        newTags={newTags}
        tagInput={tagInput}
        setTagInput={setTagInput}
        addTag={addTag}
        onCloseAddNote={onCloseAddNote}
        handleSubmit={handleSubmit}
        removeTag={removeTag}
        onCloseNote={onCloseNote}
        isEditing={isEditing}
      />
    </div>
  );
}
