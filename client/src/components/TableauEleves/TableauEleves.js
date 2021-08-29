import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Button from '@material-ui/core/Button';
import styles from "../../assets/jss/material-dashboard-react/components/tableStyle.js";
import "./TableauEleves.css"
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Delete from "./Delete.js"
import Edit from "./Edit.js"


const useStyles = makeStyles(styles);

export default function CustomTable(props) {
  const classes = useStyles();
  const { tableHead, tableData, tableHeaderColor } = props;
  const [isLoaded, setIsLoaded] = useState(false)
  const [eleves, setEleves] = useState([])
  const [nom, setNom] = useState()
  const [prenom, setPrenom]= useState()
  const [id, setId] = useState(props.id)
  const [msg, setMsg] = useState()
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    setId(localStorage.getItem("id_c"))
    setIsLoaded(false)
  }, [(localStorage.getItem("id_c"))])

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setNom()
    setPrenom()
    setMsg()
    setOpen(false);
  };

  const handleAdd = () => {
    if (!nom || !prenom) {
      setMsg("الرجاء ادخال جميع البيانات المطلوبة")
    }
    else {
      setMsg("")
      fetch('http://localhost:4000/eleves', {
        method: 'POST',
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({ nom: nom, prenom:prenom, classe:id}),
        withCredentials: true,
      })
        .then(() => {
          window.location.reload()
        })
    }
  }


  useEffect(() => {
    setIsLoaded(false)
    if (!isLoaded) {
      console.log("loaded")
      fetch(`http://localhost:4000/classes/${props.id}/eleves`).then(response =>
        response.json()
      ).then(data => {
        setEleves(data)
        setIsLoaded(true)
        console.log({ "d": data })
        console.log(eleves)
      }).catch(err => {
        console.log(err)
      })
    }
    console.log(eleves)
  }, [id])


  return (
    <div className={classes.tableResponsive}>
      {isLoaded &&
        <Table className={classes.table}>
          {tableHead !== undefined ? (
            <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
              <TableRow className={classes.tableHeadRow}>
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
            {eleves.map((prop, key) => {
              return (
                <TableRow>
                  <TableCell key={key} className="cell">
                    {prop.nom}
                  </TableCell>
                  <TableCell key={key} className="cell">
                    {prop.prenom}
                  </TableCell>
                  <TableCell key={key} className="cell">
                  <Delete id={prop._id} nom={prop.nom} prenom={prop.prenom} />
                </TableCell>
                <TableCell key={key} className="cell">
                  <Edit id={prop._id} nom={nom} prenom={prenom}/>
                </TableCell>
                </TableRow>
              )
            })}
            <TableRow>
              <TableCell colSpan={4}>
                <Tooltip title="اضافة" aria-label="Ajouter" onClick={handleOpen}>
                  <Fab color="secondary" className={classes.absolute} style={{ float: "right", backgroundColor: "#8e24aa" }}>
                    <AddIcon />
                  </Fab>
                </Tooltip>
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                  <DialogTitle id="form-dialog-title">اضافة تلميذ</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      أدخل البيانات التالية لاضافة تلميذ جدبد لهذا القسم {props.i}
                    </DialogContentText>

                    <TextField
                      value={nom}
                      margin="dense"
                      id="filled-error"
                      label="اللقب"
                      required
                      fullWidth
                      onChange={(e) => setNom(e.target.value)}
                      style={{ width: "50%", margin: "3%" }}
                    />

                    <TextField
                      required
                      value={prenom}
                      margin="dense"
                      id="nombre"
                      label="الاسم"
                      fullWidth
                      onChange={(e) => setPrenom(e.target.value)}
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
        </Table>}
    </div>
  );
}

CustomTable.defaultProps = {
  tableHeaderColor: "gray",
};

CustomTable.propTypes = {
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
