import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import {
  makeStyles,
  TableContainer,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Table,
  withStyles
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3)
  },
  head: {
    backgroundColor: "#fff",
    minWidth: "50px"
  },
  tableContainer: {
    maxHeight: window.innerHeight - 150
  },
  cell: {
    minWidth: "100px"
  }
}));

const StickyTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    left: 0,
    position: "sticky",
    zIndex: theme.zIndex.appBar + 2
  },
  body: {
    backgroundColor: "#ddd",
    // minWidth: "20px",
    left: 0,
    position: "sticky",
    zIndex: theme.zIndex.appBar + 1
  }
}))(TableCell);

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover
    }
  }
}))(TableRow);

const StockPriceComponent = () => {
  let id = 0;
  function createData(name, calories, fat, carbs, protein) {
    id += 1;
    return { id, name, calories, fat, carbs, protein };
  }

  // hooks
  const [dataLength, setDataLength] = useState(0);
  const [keepLoading, setKeepLoading] = useState(true);
  const [stockDataArr, setStockDataArr] = useState([]);

  // Socket Connection
  const ENDPOINT = "wss://production-esocket.delta.exchange";

  //   Fetching data from Api
  const fetchStocks = () => {
    fetch('https://api.delta.exchange/v2/products')
    .then(res => res.json())
    .then(data => {
      console.log(data);
      setDataLength(data.result.length)
      setStockDataArr(data.result)
    })

  }

  // Post data on Socket Connection
  const SendDataOnline = () => {
    const socket = io(ENDPOINT);
    console.log(socket);
  }

  useEffect(() => {
    SendDataOnline();
    fetchStocks();
  }, [])

  const classes = useStyles();

  return (
    <div>
      <TableContainer className={classes.tableContainer}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <StickyTableCell className={classes.head}>
                <StyledTableCell className={classes.head}>
                  Symbol
                </StyledTableCell>
              </StickyTableCell>
              <StyledTableCell className={classes.head}>
                  Description
                </StyledTableCell>
              <StyledTableCell className={classes.head}>
                Underlying Asset
              </StyledTableCell>
              <StyledTableCell className={classes.head}>
                Mark Price
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stockDataArr.slice(0,100).map((stock,id) => {
              return (
                <StyledTableRow key={id}>
                  <StickyTableCell>
                    <StyledTableCell
                      
                      className={classes.cell}
                    >
                      {stock.symbol}
                    </StyledTableCell>
                  </StickyTableCell>
                  <StyledTableCell
                    className={classes.cell}
                  >
                    {stock.description}
                  </StyledTableCell>
                  <StyledTableCell
                    
                    className={classes.cell}
                  >
                    {stock.underlying_asset.symbol}
                  </StyledTableCell>
                  <StyledTableCell
                    className={classes.cell}
                  >
                    Market Price
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default StockPriceComponent;
