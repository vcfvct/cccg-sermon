import React, { useState, useEffect } from 'react';
import { parse, ParseRemoteConfig, ParseResult } from 'papaparse';
import { HashRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { HeaderComponent } from './header/header';
import { SermonDetailComponent } from './sermon-detail/SermonDetailComponent';
import { SermonList } from './sermon-list/SermonList';
import { PodCastMeta } from './types';
import { SermonContext } from './sermon-context';

let localCachedSermons: Array<PodCastMeta> | null = null;

const GSheetId = '1tLVTEEr9xinmMM00WIaKWkegm2CnHyEJULIhhOfSrl0';
const GSheetTabName = 'sermons';
const GSheetCsvUrl = `https://docs.google.com/spreadsheets/d/${GSheetId}/gviz/tq?tqx=out:csv&sheet=${GSheetTabName}`;
const BackupCsvUrl = './sermons.csv';

const App = () => {

  const [sermons, setSermons] = useState<Array<PodCastMeta>>([]);

  const SermonsKey = 'sermonsCsv';

  const fetchCsv = (url: string, onError?: (error: Error) => void) => {
    const parseRemoteOption: ParseRemoteConfig = {
      download: true,
      header: true,
      complete: (rs: ParseResult<PodCastMeta>) => {
        localCachedSermons = rs.data;
        sessionStorage.setItem(SermonsKey, JSON.stringify(rs.data))
        setSermons(rs.data);
      },
    }
    onError && (parseRemoteOption.error = onError);
    parse(url, parseRemoteOption);
  };

  useEffect(() => {
    if (localCachedSermons) { // check local memory cache first
      setSermons(localCachedSermons);
    } else {
      const sessionCachedSermons = sessionStorage.getItem(SermonsKey);
      if (sessionCachedSermons) { // check session cache
        setSermons(JSON.parse(sessionCachedSermons));
      } else {
        fetchCsv(GSheetCsvUrl, () => fetchCsv(BackupCsvUrl));
      }
    }
  }, [])

  return (
    <div className="App">
      <SermonContext.Provider value={sermons}>
        <HeaderComponent />
        <HashRouter>
          <Routes>
            <Route path="/" element={<SermonList />} />
            <Route path="/detail" element={<SermonDetailComponent />} />
          </Routes>
        </HashRouter>
      </SermonContext.Provider>
    </div>
  );
}

export default App;
