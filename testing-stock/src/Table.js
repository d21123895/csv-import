import * as React from 'react';
import { useState} from 'react';
import './App.css'

const TableApp = () => {
  const [file, setFile] = useState();
  const [array, setArray] = useState([
    {TU : '',
    Task : ''}
  ]);
  const [query, setQuery] = useState("");

  const fileReader = new FileReader();

  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
  };

  const csvFileToArray = string => {
    const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
    const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");

    const array = csvRows.map(i => {
      const values = i.split(",");
      const obj = csvHeader.reduce((object, header, index) => {
        object[header] = values[index];
        return object;
      }, {});
      return obj;
    });

    setArray(array);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (file) {
      fileReader.onload = function (event) {
        const text = event.target.result;
        csvFileToArray(text);
      };

      fileReader.readAsText(file);
    }
  };

  const headerKeys = Object.keys(Object.assign({}, ...array));
  const [search, setSearch] = useState([]);
    
  const handleSearch = (event) => {
    event.preventDefault();
          setSearch(array.filter(post => {
            if (query === "") {
              //if query is empty
              return post;
            } else if (post.TU.includes(query)) {
              //returns filtered array
              return post;
            }}))};
          
       
        
  return (
    <div className="tucheck">
      <h1 className="App-header">TU CHECKER</h1>
      <div className="action">
      <form>
        <input
          type={"file"}
          id={"csvFileInput"}
          accept={".csv"}
          onChange={handleOnChange}
        />

        <button
          onClick={(e) => {
            handleOnSubmit(e);
          }}
        >
          IMPORT CSV
        </button>
      </form>

    <label htmlFor="search">
    Search by TU:
    <input type="text" className="px-4 py-2 w-80" onChange={event => setQuery(event.target.value)} placeholder="Search..." >
    </input>
    <button className="px-4 text-white bg-gray-600" onClick={handleSearch}>
        Search
    </button>
  </label>
  </div>
  <table> 
  <thead>
    <tr key={"header"}>
      {headerKeys.map((key) => (
        <th>{key}</th>
      ))}
    </tr>
  </thead>
  <tbody>
    {search.map((item) => (
      <tr key={item.id}>
        {Object.values(item).map((val) => (
          <td>{val}</td>
        ))}
      </tr>
    ))}
  </tbody>
</table>
      </div>
  )
              }
export default TableApp