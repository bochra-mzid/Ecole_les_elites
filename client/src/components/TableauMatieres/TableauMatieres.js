import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import styles from "../../assets/jss/material-dashboard-react/components/tableStyle.js";
import './TableauMatieres.css'
import Delete from "./Delete.js"
import Edit from "./Edit.js"

const useStyles = makeStyles(styles);

export default function TableauMatieres(props) {
  const classes = useStyles();
  const { tableHead, tableData, tableHeaderColor, i } = props;
  const [libele, setLibele] = useState()
  const [chargeHoraire, setChargeHoraire] = useState()
  const [msg, setMsg] = useState("")
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setLibele()
    setChargeHoraire()
    setMsg()
    setOpen(false);
  };

  const handleAdd = () => {
    if (!libele || !chargeHoraire) {
      setMsg("الرجاء ادخال جميع البيانات المطلوبة")
    }
    else {
      setMsg("")
      fetch('http://localhost:4000/matieres', {
        method: 'POST',
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({ niveau: props.i , libele: libele, chargeHoraire: chargeHoraire }),
        withCredentials: true,
      })
        .then(() => {
          window.location.reload()
        })
    }
  }

  const n = tableData.filter(m => m.niveau == i)
  return (
    <div className={classes.tableResponsive}>
      <Table className={classes.table}>
        {tableHead !== undefined ? (
          <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
            <TableRow className={classes.tableHeadRow} style={{ textAlignLast: "center" }}>
              {tableHead.map((prop, key) => {
                return (
                  <TableCell
                    className={classes.tableCell + " " + classes.tableHeadCell}
                    key={key}
                  >
                    {prop}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
          {n.map((prop, key) => {
            return (
              <TableRow className={classes.tableBodyRow}>
                <TableCell className={classes.tableCell} key={key} className="cell">
                  {prop.libele}
                </TableCell>
                <TableCell className={classes.tableCell} key={key} className="cell">
                  {prop.chargeHoraire}
                </TableCell>
                <TableCell key={key} className="cell">
                  <Delete id={prop._id} nom={prop.libele} niveau={prop.niveau} />
                </TableCell>
                <TableCell key={key} className="cell">
                  <Edit id={prop._id} ch={prop.chargeHoraire} libele={prop.libele} niveau={prop.niveau} />
                </TableCell>
              </TableRow>
            );
          })}
          <TableRow>
            <TableCell colSpan={4}>
              <Tooltip title="اضافة" aria-label="Ajouter" onClick={handleOpen}>
                <Fab color="secondary" className={classes.absolute} style={{ float: "right", backgroundColor: "#8e24aa" }}>
                  <AddIcon />
                </Fab>
              </Tooltip>
              <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">اضافة مادة</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    أدخل البيانات التالية لاضافة مادة جديدة للمستوى {props.i}
                  </DialogContentText>

                  <TextField
                    value={libele}
                    margin="dense"
                    id="filled-error"
                    label="Matière"
                    required
                    fullWidth
                    onChange={(e) => setLibele(e.target.value)}
                    style={{ width: "50%", margin: "3%" }}
                  />

                  <TextField
                    required
                    value={chargeHoraire}
                    margin="dense"
                    id="nombre"
                    label="Charge Horaire par semaine"
                    fullWidth
                    onChange={(e) => setChargeHoraire(e.target.value)}
                    style={{ width: "50%", margin: "3%" }}
                  />

                </DialogContent>
                <div>
                  <div className="msg">{msg}</div>
                  <DialogActions>
                    <Button onClick={handleClose} color="primary">
                      الغاء
                    </Button>
                    <Button onClick={handleAdd} color="primary">
                      تسجيل
                    </Button>
                  </DialogActions>
                </div>
              </Dialog>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

TableauMatieres.defaultProps = {
  tableHeaderColor: "gray",
};

TableauMatieres.propTypes = {
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray",
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
};
