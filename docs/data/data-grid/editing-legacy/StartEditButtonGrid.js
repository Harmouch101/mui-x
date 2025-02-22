import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useGridApiRef, DataGridPro } from '@mui/x-data-grid-pro';
import {
  randomCreatedDate,
  randomTraderName,
  randomUpdatedDate,
} from '@mui/x-data-grid-generator';

function EditToolbar(props) {
  const { selectedCellParams, apiRef, setSelectedCellParams } = props;

  const handleClick = async () => {
    if (!selectedCellParams) {
      return;
    }
    const { id, field, cellMode } = selectedCellParams;
    if (cellMode === 'edit') {
      // Wait for the validation to run
      const isValid = await apiRef.current.commitCellChange({ id, field });
      if (isValid) {
        apiRef.current.setCellMode(id, field, 'view');
        setSelectedCellParams({ ...selectedCellParams, cellMode: 'view' });
      }
    } else {
      apiRef.current.setCellMode(id, field, 'edit');
      setSelectedCellParams({ ...selectedCellParams, cellMode: 'edit' });
    }
  };

  const handleMouseDown = (event) => {
    // Keep the focus in the cell
    event.preventDefault();
  };

  return (
    <Box
      sx={{
        justifyContent: 'center',
        display: 'flex',
        borderBottom: 1,
        borderColor: 'divider',
      }}
    >
      <Button
        onClick={handleClick}
        onMouseDown={handleMouseDown}
        disabled={!selectedCellParams}
        color="primary"
      >
        {selectedCellParams?.cellMode === 'edit' ? 'Save' : 'Edit'}
      </Button>
    </Box>
  );
}

EditToolbar.propTypes = {
  apiRef: PropTypes.shape({
    current: PropTypes.object.isRequired,
  }).isRequired,
  selectedCellParams: PropTypes.any,
  setSelectedCellParams: PropTypes.func.isRequired,
};

export default function StartEditButtonGrid() {
  const apiRef = useGridApiRef();
  const [selectedCellParams, setSelectedCellParams] = React.useState(null);

  const handleCellClick = React.useCallback((params) => {
    setSelectedCellParams(params);
  }, []);

  const handleDoubleCellClick = React.useCallback((params, event) => {
    event.defaultMuiPrevented = true;
  }, []);

  // Prevent from rolling back on escape
  const handleCellKeyDown = React.useCallback((params, event) => {
    if (['Escape', 'Delete', 'Backspace', 'Enter'].includes(event.key)) {
      event.defaultMuiPrevented = true;
    }
  }, []);

  // Prevent from committing on focus out
  const handleCellFocusOut = React.useCallback((params, event) => {
    if (params.cellMode === 'edit' && event) {
      event.defaultMuiPrevented = true;
    }
  }, []);

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGridPro
        rows={rows}
        columns={columns}
        apiRef={apiRef}
        onCellClick={handleCellClick}
        onCellDoubleClick={handleDoubleCellClick}
        onCellFocusOut={handleCellFocusOut}
        onCellKeyDown={handleCellKeyDown}
        components={{
          Toolbar: EditToolbar,
        }}
        componentsProps={{
          toolbar: {
            selectedCellParams,
            apiRef,
            setSelectedCellParams,
          },
        }}
      />
    </div>
  );
}

const columns = [
  { field: 'name', headerName: 'Name', width: 180, editable: true },
  { field: 'age', headerName: 'Age', type: 'number', editable: true },
  {
    field: 'dateCreated',
    headerName: 'Date Created',
    type: 'date',
    width: 180,
    editable: true,
  },
  {
    field: 'lastLogin',
    headerName: 'Last Login',
    type: 'dateTime',
    width: 220,
    editable: true,
  },
];

const rows = [
  {
    id: 1,
    name: randomTraderName(),
    age: 25,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  },
  {
    id: 2,
    name: randomTraderName(),
    age: 36,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  },
  {
    id: 3,
    name: randomTraderName(),
    age: 19,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  },
  {
    id: 4,
    name: randomTraderName(),
    age: 28,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  },
  {
    id: 5,
    name: randomTraderName(),
    age: 23,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  },
];
