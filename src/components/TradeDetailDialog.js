/* eslint-disable react/jsx-boolean-value */
import * as React from 'react';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  InputAdornment,
  Stack,
  Typography,
  LinearProgress,
  Paper,
} from '@mui/material';
import { connect } from 'react-redux';
import { fDateTime } from '../utils/formatTime';
import { fCurrency } from '../utils/formatNumber';

function TradeDetailDialog({ open, handleClose, trade, tradeId }) {
  const {
    _id,
    timeframe,
    marketInformation: market,
    takeProfitRatio,
    profitOrLossValue,
    levelInformation: level,
    indicatorSignalInformation: indicatorSignal,
    ATR,
    breakInformation,
    entryScreenshot,
    real,
    timestamp,
  } = trade.trades.find((e) => e._id === tradeId);

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>Trade Detail</DialogTitle>
      <DialogContent>
        <Stack direction={'row'} sx={{ width: '100%', justifyContent: 'space-between' }}>
          <Typography>Id: </Typography>
          <Typography>{_id}</Typography>
        </Stack>
        <Stack direction={'row'} sx={{ width: '100%', justifyContent: 'space-between', mt: 2 }}>
          <Typography>DateTime: </Typography>
          <Typography>{fDateTime(timestamp)}</Typography>
        </Stack>
        <Stack direction={'row'} sx={{ width: '100%', justifyContent: 'space-between', mt: 2 }}>
          <Typography>Market: </Typography>
          <Typography>{market}</Typography>
        </Stack>
        <Stack direction={'row'} sx={{ width: '100%', justifyContent: 'space-between', mt: 2 }}>
          <Typography>Timeframe: </Typography>
          <Typography>{timeframe}</Typography>
        </Stack>
        <Stack direction={'row'} sx={{ width: '100%', justifyContent: 'space-between', mt: 2 }}>
          <Typography>Take Profit Ratio: </Typography>
          <Typography>{`1 : ${takeProfitRatio}`}</Typography>
        </Stack>
        <Stack direction={'row'} sx={{ width: '100%', justifyContent: 'space-between', mt: 2 }}>
          <Typography>Revenue: </Typography>
          <Typography>{fCurrency(profitOrLossValue)}</Typography>
        </Stack>
        <Stack direction={'row'} sx={{ width: '100%', justifyContent: 'space-between', mt: 2 }}>
          <Typography>Level: </Typography>
          <Typography>{level}</Typography>
        </Stack>
        <Stack direction={'row'} sx={{ width: '100%', justifyContent: 'space-between', mt: 2 }}>
          <Typography>Indicator Signal: </Typography>
          <Typography>{indicatorSignal}</Typography>
        </Stack>
        <Stack direction={'row'} sx={{ width: '100%', justifyContent: 'space-between', mt: 2 }}>
          <Typography>ATR: </Typography>
          <Typography>{ATR}</Typography>
        </Stack>
        <Stack direction={'row'} sx={{ width: '100%', justifyContent: 'space-between', mt: 2 }}>
          <Typography>Break: </Typography>
          <Typography>{breakInformation}</Typography>
        </Stack>
        <Stack direction={'row'} sx={{ width: '100%', justifyContent: 'space-between', mt: 2 }}>
          <Typography>Real: </Typography>
          <Typography>{real ? 'Yes' : 'No'}</Typography>
        </Stack>
        <Stack direction={'row'} sx={{ width: '100%', justifyContent: 'space-between', mt: 2 }}>
          <img src={entryScreenshot} alt="trade screenshot" />
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

const mapStateToProps = ({ trade }) => ({ trade });

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TradeDetailDialog);
