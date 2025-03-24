import addImg from "../../assets/add.png";
import "./videStyle.css";

export default function Vide() {
  return (
    <div className="vide-dashboard">
        <img src={addImg} alt="img" />
        <p>Start creating your first note! Click the &apos;Add&apos; button to jot down your 
            thoughts, ideas, and reminders. Let&apos;s get started!
        </p>
    </div>
  )
}
