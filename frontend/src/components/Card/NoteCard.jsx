/* eslint-disable react/prop-types */
import { MdOutlinePushPin } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";

// eslint-disable-next-line react/prop-types
const NoteCard = ({ title,dateCreated, content, tags, isPinned, onEditNote, onPinNote, onDeleteNote }) => {
 return (
  <div className="card-container">
    <h3 className="card-title">{title}</h3>
    <p className="card-date">{dateCreated.split("T")[0]}</p>
    <p className="card-content">{content}</p>
    <div className="card-tags">
      {
        // eslint-disable-next-line react/prop-types
        tags && tags.length > 0 ? (
          // eslint-disable-next-line react/prop-types
          tags.map((tag, index) => (
            <span key={index} className="tag">
              #{tag}
            </span>
          ))
        ): (
          <p className="no-tags">There is no tags</p>
        )
      }
    </div>
    <MdOutlinePushPin 
      className={`pin-icon ${isPinned ? `pinned`: ''}`}
      onClick={onPinNote} 
    />

    <div className="edit-delete-note">
      <MdModeEdit className="edit-note" onClick={onEditNote}/>
      <MdDelete className="delete-note" onClick={onDeleteNote}/>
    </div>
  </div>
 );
};

export default NoteCard;
