import { useState, useMemo, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { AgGridReact } from "ag-grid-react";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import SearchableList from "./SearchableList";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

export default function TableWithColumnSelector({ data, defaultColumns }) {
  const [collapsed, setCollapsed] = useState(false);
  const [list, setList] = useState(defaultColumns);

  const toggleListItem = (name) => {
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

  const [isDragging, setIsDragging] = useState(false);
  const draggingItem = useRef();
  const dragOverItem = useRef();

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

  const handleDrop = () => {
    setIsDragging(false);
  };

  const [rowData] = useState(data);
  const [columnDefs, setColumnDefs] = useState(null);
  const defaultColDef = useMemo(
    () => ({
      flex: 1,
      minWidth: 100,
      resizable: true,
      sortable: true,
      filter: true,
    }),
    []
  );

  const getCheckedColumns = (items) => {
    const checkedItems = items.filter((item) => {
      if (item.checked) {
        return item;
      }
    });

    const newList = checkedItems.map((item) => ({ field: item.name }));
    return newList;
  };

  useEffect(() => {
    const newColumns = getCheckedColumns(list);
    setColumnDefs(newColumns);
  }, [list]);

  // Reset order of list whenever columns are re-ordered in
  // table with drag and drop
  const handleDragColumnChange = (event) => {
    const newOrder = event.columnApi
      .getAllGridColumns()
      .map((row) => row.colId);

    // Add checked list items first
    const newItems = [];
    newOrder.forEach((col) => {
      const checkedStatus = list.filter((item) => {
        if (col === item.name) {
          return item;
        }
      });
      newItems.push(checkedStatus[0]);
    });

    // Add unchecked list items back into list
    list.forEach((item) => {
      if (!item.checked) {
        newItems.push(item);
      }
    });

    setList(newItems);
  };

  return (
    <div className="table-container">
      <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          onDragStopped={handleDragColumnChange}
        ></AgGridReact>
      </div>
      <div className="collapse-btn" onClick={() => setCollapsed(!collapsed)}>
        <DoubleArrowIcon
          className={collapsed ? "arrow-icon rotate-180" : "arrow-icon"}
        />
      </div>
      <div
        className={collapsed ? "input-selector collapsed" : "input-selector"}
      >
        <SearchableList
          list={list}
          toggleItem={toggleListItem}
          sortByCheck={sortByCheck}
          sortByName={sortByName}
          isDragging={isDragging}
          dragEnter={handleDragEnter}
          dragStart={handleDragStart}
          dropItem={handleDrop}
        />
      </div>
    </div>
  );
}

TableWithColumnSelector.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  defaultColumns: PropTypes.arrayOf(
    PropTypes.shape({
      checked: PropTypes.bool.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
};
