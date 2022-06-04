import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { parse, ParseResult } from 'papaparse';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component

import 'ag-grid-community/dist/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'; // Optional theme 
import { ColDef, RowClickedEvent } from 'ag-grid-community';
import { useNavigate } from 'react-router-dom';

export const SermonList = () => {

  const [sermons, setSermons] = useState<Array<PodCastMeta>>([]);
  const navigate = useNavigate();
  const SermonsKey = 'sermonsCsv';

  useEffect(() => {
    const cachedSermons = sessionStorage.getItem(SermonsKey);
    if (cachedSermons) {
      setSermons(JSON.parse(cachedSermons));
    } else {
      parse('./sermons.csv', {
        download: true,
        header: true,
        // dynamicTyping: true,
        complete: (rs: ParseResult<PodCastMeta>) => {
          sessionStorage.setItem(SermonsKey, JSON.stringify(rs.data))
          setSermons(rs.data);
        }
      });
    }
  }, [])

  // Each Column Definition results in one Column.
  const columnDefs: ColDef[] = [
    { field: 'title', filter: true, sortable: false },
    { field: 'author', filter: 'agSetColumnFilter', },
    { field: 'eventDate', filter: true, resizable: true, valueFormatter: param => param.data.eventDate ? new Date(param.data.eventDate).toLocaleDateString(): ''},
    { field: 'eventName', filter: true },
    { field: 'description', sortable: false },
  ];

  // DefaultColDef sets props common to all Columns
  const defaultColDef = useMemo(() => ({
    sortable: true
  }), []);

  // Example of consuming Grid Event
  const cellClickedListener = useCallback((e: RowClickedEvent) => {
    navigate('/detail', { state: e.data });
  }, [navigate]);

  return (
    <div className="ag-theme-alpine" style={{ maxWidth: 1024, height: '100%', margin: '0 auto' }}>
      <AgGridReact
        rowData={sermons} // Row Data for Rows
        columnDefs={columnDefs} // Column Defs for Columns
        defaultColDef={defaultColDef} // Default Column Properties
        animateRows={true} // Optional - set to 'true' to have rows animate when sorted
        // rowSelection='multiple' // Options - allows click selection of rows
        pagination={true}
        domLayout="autoHeight"
        // paginationPageSize={50}
        onCellClicked={cellClickedListener} // Optional - registering for Grid Event
      />
    </div>
  );
}

export interface PodCastMeta {
  id: number;
  title: string;
  body: string;
  author: string;
  eventDate: string;
  eventName: string;
  audio?: string;
  video?: string;
  youtubeUrl?: string;
  description?: string;
}

