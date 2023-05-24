import { useState } from "react";
import { data } from "../data/data";
import { AgGridReact } from "ag-grid-react";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import SearchIcon from "@mui/icons-material/Search";
import MenuItem from "./MenuItem";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

export default function TableWithColumnSelector() {
  const availableColumns = [
    { checked: true, name: "Date" },
    { checked: true, name: "Open" },
    { checked: true, name: "High" },
    { checked: true, name: "Low" },
    { checked: true, name: "Close" },
    { checked: true, name: "Volume" },
    { checked: true, name: "Dividends" },
    { checked: true, name: "Stock Splits" },
    { checked: true, name: "Ticker" },
    { checked: false, name: "DUMMY1" },
    { checked: false, name: "DUMMY2" },
    { checked: false, name: "DUMMY3" },
    { checked: false, name: "DUMMY4" },
    { checked: false, name: "DUMMY5" },
    { checked: false, name: "DUMMY6" },
    { checked: false, name: "DUMMY7" },
    { checked: false, name: "DUMMY1" },
    { checked: false, name: "DUMMY2" },
    { checked: false, name: "DUMMY3" },
    { checked: false, name: "DUMMY4" },
    { checked: false, name: "DUMMY5" },
    { checked: false, name: "DUMMY6" },
    { checked: false, name: "DUMMY7" },
  ];

  const [collapsed, setCollapsed] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [filteredItems, setFilteredItems] = useState(availableColumns);
  const [rowData] = useState(data);
  const [columnDefs] = useState([
    { field: "Date" },
    { field: "Open" },
    { field: "High" },
    { field: "Low" },
    { field: "Close" },
    { field: "Volume" },
    { field: "Dividends" },
    { field: "Stock Splits" },
    { field: "Ticker" },
  ]);

  const searchItems = (value) => {
    setSearchInput(value);
    if (value !== "") {
      const filteredParameters = availableColumns.filter((item) => {
        return item.name.toLowerCase().includes(value.toLowerCase());
      });
      setFilteredItems(filteredParameters);
    } else {
      setFilteredItems(availableColumns);
    }
  };

  return (
    <div className="table-container">
      <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
        <AgGridReact rowData={rowData} columnDefs={columnDefs}></AgGridReact>
      </div>
      <div className="collapse-btn" onClick={() => setCollapsed(!collapsed)}>
        <DoubleArrowIcon
          className={collapsed ? "arrow-icon rotate-180" : "arrow-icon"}
        />
      </div>
      <div
        className={collapsed ? "input-selector collapsed" : "input-selector"}
      >
        <TextField
          id="search-field"
          label="Search"
          variant="outlined"
          fullWidth
          size="small"
          value={searchInput}
          onChange={(event) => searchItems(event.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <h4>Available Parameters</h4>
        <hr />
        {filteredItems.map((item, id) => (
          <MenuItem
            key={id}
            id={id}
            label={item.name}
            value={item.name}
            defaultChecked={item.checked}
          />
        ))}
      </div>
    </div>
  );
}
