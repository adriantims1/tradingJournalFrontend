/* eslint-disable react/prop-types */
// import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState } from 'react';

import { connect } from 'react-redux';
// material
import {
  Card,
  Table,
  Stack,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Snackbar,
  Alert,
} from '@mui/material';
// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../sections/@dashboard/user';
import Dialog from '../components/Dialog';
import TradeDetailDialog from '../components/TradeDetailDialog';
// mock
import USERLIST from '../_mock/user';
import { fDateTime } from '../utils/formatTime';
import { fCurrency } from '../utils/formatNumber';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'dateTime', label: 'Date Time', alignRight: false },
  { id: 'market', label: 'Market', alignRight: false },
  { id: 'amount', label: 'P/L Amount', alignRight: false },
  { id: 'real', label: 'Real', alignRight: false },
  { id: 'openUsing', label: 'FB/Indicator', alignRight: false },
  { id: '' },
];

// ----------------------------------------------------------------------

// function descendingComparator(a, b, orderBy) {
//   if (b[orderBy] < a[orderBy]) {
//     return -1;
//   }
//   if (b[orderBy] > a[orderBy]) {
//     return 1;
//   }
//   return 0;
// }

// function getComparator(order, orderBy) {
//   return order === 'desc'
//     ? (a, b) => descendingComparator(a, b, orderBy)
//     : (a, b) => -descendingComparator(a, b, orderBy);
// }

// function applySortFilter(array, comparator, query) {
//   const stabilizedThis = array.map((el, index) => [el, index]);
//   stabilizedThis.sort((a, b) => {
//     const order = comparator(a[0], b[0]);
//     if (order !== 0) return order;
//     return a[1] - b[1];
//   });
//   if (query) {
//     return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
//   }
//   return stabilizedThis.map((el) => el[0]);
// }

function User({ future }) {
  const [openDialog, setOpenDialog] = useState(false);

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [openTradeDetailDialog, setOpenTradeDetailDialog] = useState(false);

  const [selectedTradeDetail, setSelectedTradeDetail] = useState('');

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  // const filteredTrades = applySortFilter(future.trades, getComparator(order, orderBy), filterName);
  const filteredTrades = future.trades;

  const isTradeNotFound = filteredTrades.length === 0;

  return (
    <Page title="User">
      <Container>
        <Dialog
          open={openDialog}
          handleClose={() => {
            setOpenDialog(false);
          }}
          openSnackbar={() => {
            setOpenSnackbar(true);
          }}
        />
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Trade
          </Typography>
          <Button
            variant="contained"
            onClick={() => {
              setOpenDialog(true);
            }}
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            New Trade
          </Button>
        </Stack>

        <Card>
          {selected.length > 0 ? (
            <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />
          ) : null}

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={USERLIST.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredTrades.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const {
                      _id,
                      timestamp,
                      marketInformation,
                      profitOrLossValue,
                      real,
                      breakInformation,
                      indicatorSignalInformation,
                    } = row;
                    const isItemSelected = selected.indexOf(_id) !== -1;
                    const checkBreakOrIndicatorColor = () => {
                      if (breakInformation === 'None' && indicatorSignalInformation === 'None') {
                        return 'error';
                      }
                      if (breakInformation !== 'None' && indicatorSignalInformation === 'None') {
                        return 'primary';
                      }
                      if (breakInformation === 'None' && indicatorSignalInformation !== 'None') {
                        return 'secondary';
                      }
                      return 'success';
                    };
                    const checkBreakOrIndicatorText = () => {
                      if (breakInformation === 'None' && indicatorSignalInformation === 'None') {
                        return 'None';
                      }
                      if (breakInformation !== 'None' && indicatorSignalInformation === 'None') {
                        return 'False Break';
                      }
                      if (breakInformation === 'None' && indicatorSignalInformation !== 'None') {
                        return 'Indicator';
                      }
                      return 'Both';
                    };

                    return (
                      <TableRow
                        hover
                        key={_id}
                        tabIndex={-1}
                        role="checkbox"
                        selected={isItemSelected}
                        aria-checked={isItemSelected}
                        // onClick={() => {
                        //   setOpenTradeDetailDialog(true);
                        //   setSelectedTradeDetail(_id);
                        // }}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, _id)} />
                        </TableCell>
                        <TableCell align="left">{fDateTime(timestamp)}</TableCell>
                        <TableCell align="left">{marketInformation}</TableCell>
                        <TableCell align="left">{fCurrency(profitOrLossValue)}</TableCell>
                        <TableCell align="left">{real ? 'Yes' : 'No'}</TableCell>
                        <TableCell align="left">
                          <Label variant="ghost" color={checkBreakOrIndicatorColor()}>
                            {sentenceCase(checkBreakOrIndicatorText())}
                          </Label>
                        </TableCell>

                        <TableCell align="right">
                          <UserMoreMenu
                            openSnackbar={() => {
                              setOpenSnackbar(true);
                            }}
                            tradeId={_id}
                            setOpenTradeDetailDialog={() => {
                              setOpenTradeDetailDialog(true);
                              setSelectedTradeDetail(_id);
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isTradeNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[10, 20, 50]}
            component="div"
            count={future.trades.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => {
          setOpenSnackbar(false);
        }}
      >
        <Alert
          onClose={() => {
            setOpenSnackbar(false);
          }}
          severity={future.hasError ? 'error' : 'success'}
        >
          {future.hasError ? future.errorMessage : 'Operation Succeeded'}
        </Alert>
      </Snackbar>
      {openTradeDetailDialog ? (
        <TradeDetailDialog
          open={openTradeDetailDialog}
          handleClose={() => {
            setOpenTradeDetailDialog(false);
            setSelectedTradeDetail('');
          }}
          tradeId={selectedTradeDetail}
        />
      ) : null}
    </Page>
  );
}

const mapStateToProps = ({ future }) => ({
  future,
});

const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(User);
