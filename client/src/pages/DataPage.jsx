import React, { useEffect, useState } from "react";
import axios from "axios";
import "../style/DataPage.css";

function DataPage() {
  const [dataFilter, setDataFilter] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const myData = await axios.get("http://localhost:3000/loadcsv");
      setData(myData.data);
    };
    getData();
  }, [dataFilter]);

//   const filtered = () => {
//     Object.values(data)
//       .filter((e) => e.city.toLowerCase().includes(dataFilter.toLowerCase()))
//       .map((e) => {
//         return (
//           <tr key={e.eventid}>
//             <td>{e.eventid}</td>
//             <td>{e.iyear}</td>
//             <td>{e.country_txt}</td>
//             <td>{e.city}</td>
//             <td>{e.attacktype1_txt}</td>
//             <td>{e.motive}</td>
//           </tr>
//         );
//       });
//   };

  return (
    <div>
      <input type="text" onChange={(e) => setDataFilter(e.target.value)} />
      <div className="filtredBox">
        <label>Filter by: </label>
        <select onChange={(e) => setDataFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="city">City</option>
          <option value="country_txt">Country</option>
          <option value="year Greater than">year Greater than</option>
          <option value="year Less than">year Less than</option>
        </select>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>event id</th>
              <th>year</th>
              <th>country</th>
              <th>city</th>
              <th>attack type</th>
              <th>motive</th>
            </tr>
          </thead>
          <tbody>
            {Object.values(data)
              .filter((e) =>
                e.city.toLowerCase().includes(dataFilter.toLowerCase()),
              )
              .map((e) => {
                return (
                  <tr key={e.eventid}>
                    <td>{e.eventid}</td>
                    <td>{e.iyear}</td>
                    <td>{e.country_txt}</td>
                    <td>{e.city}</td>
                    <td>{e.attacktype1_txt}</td>
                    <td>{e.motive}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DataPage;
