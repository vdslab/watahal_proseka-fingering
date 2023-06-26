"use client";
import React, { useState } from "react";
import { Tabs, Tab } from "@mui/material";
import Search from "./Search";
import ClusteringVis from "./ClusteringVis";
import MusicSearch from "@/components/Search";
import MusicTable from "@/components/MusicTable";
import SideMenu from "@/components/SideMenu";

function TabPanel({ value, index, children }) {
  return (
    <div hidden={value !== index}>
      {value === index && <div>{children}</div>}
    </div>
  );
}

export default function MainPage() {
  const [currentTab, setCurrentTab] = useState(0);
  function handleTabChange(e, tabIndex) {
    // console.log(tabIndex);
    setCurrentTab(tabIndex);
  }

  return (
    <div>
      <Tabs value={currentTab} onChange={handleTabChange}>
        <Tab label="曲検索" />
        <Tab label="曲一覧" />
      </Tabs>

      <TabPanel value={currentTab} index={0}>
        <div>
          <ClusteringVis />
          <Search />
        </div>
      </TabPanel>

      <TabPanel value={currentTab} index={1}>
        <div>
          <nav>
            <ul className="flex">
              <li className="w-3/4 mr-3">
                <MusicSearch />
              </li>
              <li className="w-1/12 mr-3">
                <SideMenu />
              </li>
            </ul>
          </nav>

          <MusicTable />
        </div>
      </TabPanel>
    </div>
  );
}
