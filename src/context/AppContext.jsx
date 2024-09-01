import React, { createContext, useState, useEffect } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [isPageReloaded, setIsPageReloaded] = useState(false);

  useEffect(() => {
    const storedGroups = JSON.parse(localStorage.getItem("groups")) || [];
    console.log("Loaded groups from localStorage:", storedGroups); // Debug log
    if (storedGroups.length > 0) {
      setGroups(storedGroups);
    }

    const storedSelectedGroup = JSON.parse(
      localStorage.getItem("selectedGroup")
    );
    console.log("Loaded selectedGroup from localStorage:", storedSelectedGroup); // Debug log
    if (storedSelectedGroup) {
      setSelectedGroup(storedSelectedGroup);
    }

    setIsPageReloaded(true);
  }, []);

  useEffect(() => {
    if (isPageReloaded) {
      setSelectedGroup(null);
      setIsPageReloaded(false);
    }
  }, [isPageReloaded]);

  useEffect(() => {
    if (groups.length > 0) {
      console.log("Saving groups to localStorage:", groups); // Debug log
      localStorage.setItem("groups", JSON.stringify(groups));
    }
  }, [groups]);

  useEffect(() => {
    if (selectedGroup !== null) {
      console.log("Saving selectedGroup to localStorage:", selectedGroup); // Debug log
      localStorage.setItem("selectedGroup", JSON.stringify(selectedGroup));
    }
  }, [selectedGroup]);

  const addGroup = (name, color) => {
    const initials = name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
    const newGroup = { name, initials, color, notes: [] };
    setGroups([...groups, newGroup]);
  };

  const selectGroup = (group) => {
    setSelectedGroup(group);
  };

  function addNoteToGroup(groupName, noteText) {
    const now = new Date();
    const options = {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    const timestamp = now.toLocaleString("en-GB", options).replace(",", "");

    setGroups((prevGroups) => {
      const updatedGroups = prevGroups.map((group) =>
        group.name === groupName
          ? { ...group, notes: [...group.notes, { text: noteText, timestamp }] }
          : group
      );
      const updatedSelectedGroup = updatedGroups.find(
        (group) => group.name === groupName
      );
      setSelectedGroup(updatedSelectedGroup);
      return updatedGroups;
    });
  }

  return (
    <AppContext.Provider
      value={{
        groups,
        selectedGroup,
        addGroup,
        selectGroup,
        addNoteToGroup,
        isPageReloaded,
        setIsPageReloaded,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppContext;
