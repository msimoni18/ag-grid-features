import "./App.css";
import TableWithColumnSelector from "./components/TableWithColumnSelector/TableWithColumnSelector";
import { data } from "./data/data";
import { defaultColumns } from "./data/defaultColumns";

function App() {
  return (
    <div className="route-body">
      <TableWithColumnSelector data={data} defaultColumns={defaultColumns} />
    </div>
  );
}

export default App;
