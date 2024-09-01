import React, { useContext, useState } from "react";
import AppContext from "../context/AppContext";
import Modal from "../components/Modal";
import Modalplus from "../assets/modal-plus.png";
import styles from "./SideBar.module.css";

function SideBar() {
  const { groups, addGroup, selectGroup } = useContext(AppContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={styles.SideBar}>
      <h1 className={styles.heading}>Pocket Notes</h1>
      <div className={styles.notesGroup}>
        {groups.map((group, index) => (
          <div
            key={index}
            className={styles.groupItem}
            onClick={() => selectGroup(group)}
          >
            <div
              className={styles.groupSymbol}
              style={{ backgroundColor: group.color }}
            >
              {group.initials}
            </div>
            <span className={styles.groupName}>{group.name}</span>
          </div>
        ))}
      </div>
      <img
        src={Modalplus}
        alt="add-icon"
        className={styles.icon}
        onClick={() => setIsModalOpen(true)}
      />
      {isModalOpen && <Modal onSubmit={addGroup} onClose={closeModal} />}
    </div>
  );
}

export default SideBar;
