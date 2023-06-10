import { useState } from "react";
import PropTypes from "prop-types";
import DragIcon from "../../icons/DragIcon";

export default function SearchableList({
  list,
  toggleItem,
  sortByCheck,
  sortByName,
  isDragging,
  dragEnter,
  dragStart,
  dropItem,
}) {
  const [searchInput, setSearchInput] = useState("");
  const renderList =
    searchInput !== ""
      ? list.filter((item) =>
          item.name.toLowerCase().includes(searchInput.toLowerCase())
        )
      : list;

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
              onDragStart={(event) => dragStart(event, index)}
              onDragEnter={(event) => dragEnter(event, index)}
              onDragOver={(event) => event.preventDefault()}
              onDrop={dropItem}
              className={isDragging ? "dragging" : null}
            >
              <input
                type="checkbox"
                id={itemId}
                checked={checked}
                onChange={() => toggleItem(name)}
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
      checked: PropTypes.bool.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
  toggleItem: PropTypes.func.isRequired,
  sortByCheck: PropTypes.func.isRequired,
  sortByName: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  dragEnter: PropTypes.func.isRequired,
  dragStart: PropTypes.func.isRequired,
  dropItem: PropTypes.func.isRequired,
};
