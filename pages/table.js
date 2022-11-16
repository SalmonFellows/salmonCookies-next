import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import styles from '../styles/Home.module.css';



function createData(name, minCust, maxCust, avgCookie) {
  return { name, minCust, maxCust, avgCookie };
}

const rows = [
  createData('Seattle', 159, 6.0, 24),
  createData('Tokyo', 237, 9.0, 37),
  createData('Dubai', 262, 16.0, 24),
  createData('Paris', 305, 3.7, 67),
  createData('Lima', 356, 16.0, 49),
];

export default function TableData() {
  return (
    <TableContainer className={styles.table} component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Locations</TableCell>
            <TableCell align="right">Min Customers</TableCell>
            <TableCell align="right">Max Customers</TableCell>
            <TableCell align="right">Average Cookies</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.minCust}</TableCell>
              <TableCell align="right">{row.maxCust}</TableCell>
              <TableCell align="right">{row.avgCookie}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

