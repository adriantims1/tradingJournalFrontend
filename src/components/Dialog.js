/* eslint-disable react/jsx-boolean-value */
import * as React from 'react';
import { useState } from 'react';
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
} from '@mui/material';
import { connect } from 'react-redux';
import { addTrade } from '../redux/action/trade';
import { fNumber } from '../utils/formatNumber';

function FormDialog({ open, handleClose, addTrade, profile, openSnackbar }) {
  const [market, setMarket] = useState('Mini S&P500');
  const [timeframe, setTimeframe] = useState('1m');
  const [takeProfit, setTakeProfit] = useState(0);
  const [profitOrLoss, setProfitOrLoss] = useState(0);
  const [level, setLevel] = useState('None');
  const [indicatorSignal, setIndicatorSignal] = useState('None');
  const [ATR, setATR] = useState(0);
  const [falseBreak, setFalseBreak] = useState('None');
  const [screenshot, setScreenshot] = useState(null);
  const [loading, setLoading] = useState(false);
  const [real, setReal] = useState(false);

  const handleSubmit = () => {
    const newTrade = {
      userEmail: profile.email,
      timeframe,
      marketInformation: market,
      takeProfitRatio: takeProfit,
      profitOrLossValue: profitOrLoss,
      levelInformation: level,
      indicatorSignalInformation: indicatorSignal,
      ATR,
      breakInformation: falseBreak,
      entryScreenshot: screenshot,
      real,
    };
    setLoading(true);
    addTrade(
      newTrade,
      () => {
        setLoading(false);
        openSnackbar();
        handleClose();
      },
      () => {
        setLoading(false);
        openSnackbar();
      }
    );
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add Trade</DialogTitle>
      <DialogContent>
        <FormControl fullWidth margin="dense">
          <InputLabel>Market Type</InputLabel>
          <Select value={market} onChange={(e) => setMarket(e.target.value)} label="Market Type" id="market">
            <MenuItem value="Mini S&P500">Mini S&P500</MenuItem>
            <MenuItem value="Micro S&P500">Micro S&P500</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth margin="dense">
          <InputLabel>Timeframe</InputLabel>
          <Select
            id="timeframe"
            fullWidth
            variant="outlined"
            label="Timeframe"
            value={timeframe}
            onChange={(e) => {
              setTimeframe(e.target.value);
            }}
          >
            <MenuItem value="1m">1 minute</MenuItem>
            <MenuItem value="5m">5 minutes</MenuItem>
            <MenuItem value="15m">15 minutes</MenuItem>
            <MenuItem value="1h">1 hour</MenuItem>
            <MenuItem value="4h">4 hour</MenuItem>
            <MenuItem value="daily">daily</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth margin="dense">
          <TextField
            id="takeProfit"
            fullWidth
            variant="outlined"
            value={takeProfit}
            label="Take Profit Ratio"
            margin="dense"
            type="number"
            onChange={(e) => {
              setTakeProfit(e.target.value);
            }}
            InputProps={{
              startAdornment: <InputAdornment position="start">1 : </InputAdornment>,
            }}
          />
        </FormControl>
        <FormControl fullWidth margin="dense">
          <TextField
            id="profitOrLossValue"
            fullWidth
            variant="outlined"
            value={profitOrLoss}
            label="Profit Or Loss Value"
            margin="dense"
            type="number"
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
            }}
            onChange={(e) => setProfitOrLoss(e.target.value)}
          />
        </FormControl>
        <FormControl fullWidth margin="dense">
          <InputLabel>Level</InputLabel>
          <Select
            value={level}
            onChange={(e) => {
              setLevel(e.target.value);
            }}
            label="Level"
            id="level"
          >
            <MenuItem value="Trend Break">Trend Break</MenuItem>
            <MenuItem value="Consolidation">Consolidation</MenuItem>
            <MenuItem value="Limit">Limit</MenuItem>
            <MenuItem value="Paranormal">Paranormal</MenuItem>
            <MenuItem value="False Break">False Break</MenuItem>
            <MenuItem value="Daily Highs And Lows">Daily Highs And Lows</MenuItem>
            <MenuItem value="Market Opening">Market Opening</MenuItem>
            <MenuItem value="Mirroring">Mirroring</MenuItem>
            <MenuItem value="Floating">Floating</MenuItem>
            <MenuItem value="None">None</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth margin="dense">
          <InputLabel>Indicator Signal</InputLabel>
          <Select
            value={indicatorSignal}
            onChange={(e) => {
              setIndicatorSignal(e.target.value);
            }}
            label="Indicator Signal"
            id="Indicator Signal"
          >
            <MenuItem value="Single">Single</MenuItem>
            <MenuItem value="Double">Double</MenuItem>
            <MenuItem value="Triple">Triple</MenuItem>
            <MenuItem value="None">None</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth margin="dense">
          <TextField
            id="ATR"
            fullWidth
            variant="outlined"
            value={ATR}
            label="ATR"
            margin="dense"
            type="number"
            onChange={(e) => {
              setATR(e.target.value);
            }}
            InputProps={{
              endAdornment: <InputAdornment position="start">%</InputAdornment>,
            }}
          />
        </FormControl>
        <FormControl fullWidth margin="dense">
          <InputLabel>False Break</InputLabel>
          <Select
            value={falseBreak}
            onChange={(e) => {
              setFalseBreak(e.target.value);
            }}
            label="False Break"
            id="False Break"
          >
            <MenuItem value="Simple">Simple</MenuItem>
            <MenuItem value="Two Candles">Two Candles</MenuItem>
            <MenuItem value="Complex">Complex</MenuItem>
            <MenuItem value="None">None</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth margin="dense">
          <InputLabel>Real</InputLabel>
          <Select
            value={real}
            onChange={(e) => {
              setReal(e.target.value);
            }}
            label="Real"
            id="Real"
          >
            <MenuItem value={true}>Yes</MenuItem>
            <MenuItem value={false}>No</MenuItem>
          </Select>
        </FormControl>

        <Stack>
          <InputLabel>Screenshot</InputLabel>
          <Button variant="contained" component="label">
            <>
              {'Upload Picture'}
              <input
                hidden
                type="file"
                onChange={(e) => {
                  setScreenshot(e.target.files[0]);
                }}
              />
            </>
          </Button>
          <Typography>{screenshot?.name ? screenshot.name : ''}</Typography>
        </Stack>
      </DialogContent>
      {loading ? (
        <LinearProgress />
      ) : (
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      )}
    </Dialog>
  );
}

const mapStateToProps = ({ profile }) => ({ profile });

const mapDispatchToProps = {
  addTrade,
};

export default connect(mapStateToProps, mapDispatchToProps)(FormDialog);
