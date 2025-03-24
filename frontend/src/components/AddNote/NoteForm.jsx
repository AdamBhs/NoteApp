import { MdAdd, MdClose } from 'react-icons/md';
import "./addNoteStyle.css";

export default function NoteForm({
  // eslint-disable-next-line react/prop-types
  newTitle, setNewTitle, newContent, setNewContent, newTags, tagInput, setTagInput, addTag, onCloseAddNote, handleSubmit, removeTag, onCloseNote, isEditing
}) {
  return (
    <form className='add-note-form' id="addNote" onClick={onCloseAddNote} onSubmit={handleSubmit}>
            <div className='add-note-content'>
              <label>TITLE</label>
              <input 
                className='input-title' 
                type='text' 
                required
                placeholder='Go To Gym At 5' 
                value={newTitle} 
                onChange={(e) => setNewTitle(e.target.value)}
              />
    
              <label>CONTENT</label>
              <textarea 
                className='input-content' 
                type="text" 
                required
                placeholder='Content'  
                value={newContent} 
                onChange={(e) => setNewContent(e.target.value)}
              />
    
              <label>TAGS</label>
              <div className='tags'>
                <div className='tags-list'>
                  {// eslint-disable-next-line react/prop-types
                  newTags.map((tag, index) => (
                    <div key={index} className='name-tag'>
                      <h3># {tag}</h3>
                      <MdClose className='delete-name-tag' onClick={() => removeTag(index)} />
                    </div>
                  ))}
                </div>
                <div className='add-tag-container'>
                  <input 
                    className='input-add-tag' 
                    type='text' 
                    placeholder='Add tags' 
                    value={tagInput} 
                    maxLength="6"
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addTag();
                      }
                    }}
                  />
                  <div 
                    // eslint-disable-next-line react/prop-types
                    className={`add-tag ${(tagInput.trim() === '') || (newTags.length === 5) ? 'disabled' : ''}`}
                     
                    onClick={addTag}
                  >
                    <MdAdd className='add-tag-icon' />
                  </div>
                </div>
              </div>
    
              <button type='submit' className='add-final-note'>{isEditing ? 'Edit' : 'Add'}</button>
              <MdClose className='close-add-note' onClick={onCloseNote} />
            </div>
          </form>
  )
}
