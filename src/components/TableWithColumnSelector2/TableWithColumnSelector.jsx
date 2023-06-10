import { useState, useMemo, useEffect } from "react";
import { data } from "../../data/data";
import { defaultColumns } from "../../data/defaultColumns";
import { AgGridReact } from "ag-grid-react";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import SearchableList from "./SearchableList";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

export default function TableWithColumnSelector() {
  const [list, setList] = useState(defaultColumns);
  const [collapsed, setCollapsed] = useState(false);

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
    console.log(newOrder);
    // const newItems = [];
    // newOrder.forEach((col) => {
    //   const checkedStatus = items.filter((item) => {
    //     if (col === item.name) {
    //       return col;
    //     }
    //   });
    //   newItems.push(checkedStatus);
    // });
    // setItems(newItems);
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
        <SearchableList defaultList={list} />
      </div>
    </div>
  );
}
