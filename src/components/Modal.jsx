import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.css";

function Modal({ onSubmit, onClose }) {
  const [groupName, setGroupName] = useState("");
  const [groupColor, setGroupColor] = useState("#ff0000");

  const handleSubmit = () => {
    if (groupName && groupColor) {
      onSubmit(groupName, groupColor);
      onClose();
    } else {
      alert("Please enter a group name and select a color.");
    }
  };

  // useEffect(() => {
  //   const modalContainer = document.getElementById("modal");
  //   modalContainer.innerHTML = "";
  //   modalContainer.appendChild(document.createElement("div"));
  //   const modalElement = modalContainer.children[0];
  //   modalElement.className = styles.modalContainer;
  //   return () => {
  //     modalElement.remove();
  //   };
  // }, []);

  return ReactDOM.createPortal(
    <>
      {/* <div id="modal"> */}
      <div className={styles.modalContainer}>
        <div className={styles.shadowback} onClick={onClose} />
        <div className={styles.modal}>
          <h1 className={styles.heading}>Create New Group</h1>
          <div className={styles.groupName}>
            <h1 className={styles.groupHead}>Group Name</h1>
            <input
              type="text"
              placeholder="Enter group name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
          </div>
          <div className={styles.chooseColor}>
            <h1 className={styles.colorHead}>Choose color</h1>
            <div className={styles.colors}>
              <div
                className={styles.color1}
                onClick={() => setGroupColor("#b38bfa")}
              ></div>
              <div
                className={styles.color2}
                onClick={() => setGroupColor("#ff79f2")}
              ></div>
              <div
                className={styles.color3}
                onClick={() => setGroupColor("#43e6fc")}
              ></div>
              <div
                className={styles.color4}
                onClick={() => setGroupColor("#f19576")}
              ></div>
              <div
                className={styles.color5}
                onClick={() => setGroupColor("#0047ff")}
              ></div>
              <div
                className={styles.color6}
                onClick={() => setGroupColor("#6691ff")}
              ></div>
            </div>
          </div>
          <button onClick={handleSubmit}>Create</button>
        </div>
      </div>
      {/*  </div> */}
    </>,
    document.getElementById("modal")
  );
}

export default Modal;
