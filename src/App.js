import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import "./App.css";
import React, { Component }  from 'react';
import axios from "axios";
import { useEffect, useRef, useState } from "react";
function App() {
  const [userData, setUserData] = useState();
  const [dataSearch, setDataSearch] = useState("");
  let typingTime = useRef();
  const debounce = (e) => {
    clearTimeout(typingTime);
    typingTime = setTimeout(() => {
      setDataSearch(e.target.value);
    }, 1000);
  };
  useEffect(() => {
    const fetchAllData = async (dataSearch) => {
      const response = await axios.get(
        `https://hn.algolia.com/api/v1/search?query=${dataSearch}`
      );
      dataSearch && setUserData(response.data.hits);
    };
    fetchAllData(dataSearch);
  }, [dataSearch]);
  
  return (
    <>
      <div className="App">
        <div className="search-field">
          <Input
            prefix={<SearchOutlined />}
            onChange={(e) => {
              debounce(e);
            }}
          />
          {userData &&
            userData.map((item) => {
              if (item.title) return <li>{item.title}</li>;
            })}
        </div>
      </div>
    </>
  );
}

export default App;
