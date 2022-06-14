import React, { useMemo, useCallback, useContext } from 'react';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component

import 'ag-grid-community/dist/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'; // Optional theme 
import { ColDef, ColumnState, FirstDataRenderedEvent, PaginationChangedEvent, RowClickedEvent, SortChangedEvent } from 'ag-grid-community';
import { useNavigate } from 'react-router-dom';
import { SermonContext } from '../sermon-context';

let localCachedColumnState: Array<ColumnState> | null = null;
let localCachedPageNumber = -1;
let localCachedLastClicked: number | null = null;

export const SermonList = () => {

  const navigate = useNavigate();
  const sermons = useContext(SermonContext)

  // Each Column Definition results in one Column.
  const columnDefs: ColDef[] = [
    { field: 'title', filter: true, sortable: false },
    { field: 'author', filter: 'agSetColumnFilter', },
    { field: 'eventDate', filter: true, resizable: true, valueFormatter: param => param.data.eventDate ? new Date(param.data.eventDate).toLocaleDateString() : '' },
    { field: 'eventName', filter: true },
    { field: 'description', sortable: false },
  ];

  // DefaultColDef sets props common to all Columns
  const defaultColDef = useMemo(() => ({
    sortable: true
  }), []);

  // Example of consuming Grid Event
  const cellClickedListener = useCallback((e: RowClickedEvent) => {
    localCachedLastClicked = e.rowIndex;
    navigate(`/detail?id=${e.data.id}`, { state: e.data });
  }, [navigate]);
  // store column state
  const onColumnChanged = (event: SortChangedEvent) => localCachedColumnState = event.columnApi.getColumnState();
  // store page number
  const onPaginationChanged = (event: PaginationChangedEvent) => {
    if (event.newPage) { // only set page when it is a newPage as this event is fired also on Grid initial render.
      localCachedLastClicked = null;
      localCachedPageNumber = event.api.paginationGetCurrentPage()
    }
  }

  const onFirstDataRendered = (event: FirstDataRenderedEvent) => {
    localCachedColumnState && event.columnApi.applyColumnState({ state: localCachedColumnState, applyOrder: true });
    localCachedPageNumber >= 0 && event.api.paginationGoToPage(localCachedPageNumber);
    localCachedLastClicked !== null && event.api.ensureIndexVisible(localCachedLastClicked, 'middle');
  }

  return (
    <div className="ag-theme-alpine" style={{ maxWidth: 1024, height: '100%', width: '100%', margin: '0 auto' }}>
      <AgGridReact
        rowData={sermons} // Row Data for Rows
        columnDefs={columnDefs} // Column Defs for Columns
        defaultColDef={defaultColDef} // Default Column Properties
        animateRows={true} // Optional - set to 'true' to have rows animate when sorted
        // rowSelection='multiple' // Options - allows click selection of rows
        pagination={true}
        // domLayout="autoHeight"
        // paginationPageSize={50}
        onCellClicked={cellClickedListener} // Optional - registering for Grid Event
        onSortChanged={onColumnChanged}
        onColumnResized={onColumnChanged}
        onColumnMoved={onColumnChanged}
        onColumnPinned={onColumnChanged}
        onColumnVisible={onColumnChanged}
        onPaginationChanged={onPaginationChanged}
        onFirstDataRendered={onFirstDataRendered}
      />
    </div>
  );
}

