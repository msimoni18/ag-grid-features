import "./App.css";
import TableWithColumnSelector from "./components/TableWithColumnSelector/TableWithColumnSelector";
import TableWithColumnSelector2 from "./components/TableWithColumnSelector2/TableWithColumnSelector";
import { data } from "./data/data";
import { defaultColumns } from "./data/defaultColumns";

function App() {
  return (
    <div className="route-body">
      <TableWithColumnSelector data={data} defaultColumns={defaultColumns} />
      <br />
      <TableWithColumnSelector2 data={data} defaultColumns={defaultColumns} />
    </div>
  );
}

export default App;
