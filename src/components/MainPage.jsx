import { useContext, useState } from "react";
import styles from "./MainPage.module.css";
import AppContext from "../context/AppContext";
import Mainbg from "../assets/Mainbg.png";
import lock from "../assets/lock.png";
import sendIcon from "../assets/enb-send.png";
import disabledIcon from "../assets/dis-send.png";
import backButtonIcon from "../assets/back-button-icon.png";

function MainPage() {
  const { setIsPageReloaded } = useContext(AppContext);
  const appContext = useContext(AppContext);
  const [noteText, setNoteText] = useState("");

  const handleAddNoteToGroup = () => {
    if (noteText && appContext.selectedGroup) {
      appContext.addNoteToGroup(appContext.selectedGroup.name, noteText);
      setNoteText("");
    }
  };

  const isSendButtonDisabled = noteText.trim().length === 0;

  if (!appContext.selectedGroup) {
    return (
      <div className={styles.MainPage}>
        <div className={styles.mainbarHeader}>
          <img
            src={Mainbg}
            alt="mainbar-image"
            className={styles.MainPageImage}
          />
          <h1>Pocket Notes</h1>
          <p>Send and receive messages without keeping your phone online.</p>
          <p>Use Pocket Notes on up to 4 linked devices and 1 mobile phone</p>
        </div>
        <div className={styles.footerSection}>
          <img src={lock} alt="lock-img" className={styles.lockImage} />
          <span>end-to-end encrypted</span>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.mainBarContainer}>
      <div className={styles.headerSection}>
        <button
          className={styles.backButton}
          onClick={() => appContext.setIsPageReloaded(true)}
        >
          <img
            src={backButtonIcon}
            alt="back-button-icon"
            className={styles.backButtonIcon}
          />
        </button>
        <div className={styles.header}>
          <div
            className={styles.groupSymbolContainer}
            style={{ backgroundColor: appContext.selectedGroup.color }}
          >
            {appContext.selectedGroup.initials}
          </div>
          <h2 className={styles.groupName}>{appContext.selectedGroup.name}</h2>
        </div>
      </div>
      <div className={styles.notesSection}>
        {appContext.selectedGroup.notes.length > 0 ? (
          appContext.selectedGroup.notes.map((note, index) => (
            <div key={index} className={styles.noteContainer}>
              <p>{note.text}</p>
              <span className={styles.timestamp}>{note.timestamp}</span>
            </div>
          ))
        ) : (
          <p>No notes available.</p>
        )}
      </div>
      <div className={styles.noteInputContainer}>
        <textarea
          placeholder="Enter the text here"
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          className={styles.textarea}
        />
        <button onClick={handleAddNoteToGroup} className={styles.sendButton}>
          <img
            src={isSendButtonDisabled ? disabledIcon : sendIcon}
            alt="send-icon"
            className={styles.sendIcon}
          />
        </button>
      </div>
    </div>
  );
}

export default MainPage;
