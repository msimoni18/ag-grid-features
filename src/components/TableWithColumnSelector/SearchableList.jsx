import { useState, useRef } from "react";
import PropTypes from "prop-types";
import DragIcon from "../../icons/DragIcon";

export default function SearchableList({ list, setList }) {
  const [searchInput, setSearchInput] = useState("");
  const renderList =
    searchInput !== ""
      ? list.filter((item) =>
          item.name.toLowerCase().includes(searchInput.toLowerCase())
        )
      : list;

  const handleToggle = (name) => {
    const newList = list.map((row) =>
      row.name === name ? { ...row, checked: !row.checked } : row
    );
    setList(newList);
  };

  const sortByCheck = () => {
    const newList = [...list];
    newList.sort((a, b) => b.checked - a.checked);
    setList(newList);
  };

  const sortByName = () => {
    const newList = [...list];
    newList.sort((a, b) => a.name.localeCompare(b.name));
    setList(newList);
  };

  const draggingItem = useRef();
  const dragOverItem = useRef();
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (event, position) => {
    draggingItem.current = position;
    setIsDragging(true);
  };

  const handleDragEnter = (event, position) => {
    dragOverItem.current = position;
    const listCopy = [...list];
    const draggingItemContent = listCopy[draggingItem.current];
    listCopy.splice(draggingItem.current, 1);
    listCopy.splice(dragOverItem.current, 0, draggingItemContent);
    draggingItem.current = dragOverItem.current;
    dragOverItem.current = null;
    setList(listCopy);
  };

  return (
    <>
      <input
        type="search"
        placeholder="Search"
        className="search"
        value={searchInput}
        onChange={(event) => setSearchInput(event.target.value)}
      ></input>
      <div className="button-container">
        <p>Sort by:</p>
        <button type="button" className="sort-btn" onClick={sortByCheck}>
          Checked
        </button>
        <button type="button" className="sort-btn" onClick={sortByName}>
          Name
        </button>
      </div>
      <hr />
      <ul>
        {renderList.map(({ checked, name }, index) => {
          const itemId = name + "-" + index;
          return (
            <li
              key={itemId}
              draggable={true}
              onDragStart={(event) => handleDragStart(event, index)}
              onDragEnter={(event) => handleDragEnter(event, index)}
              onDragOver={(event) => event.preventDefault()}
              onDrop={() => setIsDragging(false)}
              className={isDragging ? "dragging" : null}
            >
              <input
                type="checkbox"
                id={itemId}
                checked={checked}
                onChange={() => handleToggle(name)}
              />
              <DragIcon className="icon" />
              <label htmlFor={itemId}>{name}</label>
            </li>
          );
        })}
      </ul>
    </>
  );
}

SearchableList.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      checked: PropTypes.bool,
      name: PropTypes.string,
    })
  ),
  setList: PropTypes.func,
};
