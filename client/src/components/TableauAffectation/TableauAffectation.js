import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Button from '@material-ui/core/Button';
import Enseignants from './Enseignants.js'
import styles from "../../assets/jss/material-dashboard-react/components/tableStyle.js";
import "./TableauAffectation.css"

const useStyles = makeStyles(styles);

export default function CustomTable(props) {
  const classes = useStyles();
  const { tableHead, tableData, tableHeaderColor } = props;
  const [isLoaded, setIsLoaded] = useState(false)
  const [aff, setAff] = useState([])
  const [ens, setEns] = useState([])
  const [id, setId] = useState(props.id)
  const [open, setOpen] = React.useState();

  useEffect(() => {
    setId(localStorage.getItem("id"))
    setIsLoaded(false)
  }, [(localStorage.getItem("id"))])

  useEffect(() => {
    setIsLoaded(false)
    if (!isLoaded) {
      console.log("loaded")
      fetch(`http://localhost:4000/affectation/classe/${id}`).then(response =>
        response.json()
      ).then(data => {
        setIsLoaded(true)
        setAff(data.affectation)
        console.log(aff)
      }).catch(err => {
        console.log(err)
      })
    }
    console.log(aff)
  }, [id])

  const handleClickOpen = async (matiere, id) => {
    setOpen(true);
    await fetch(`http://localhost:4000/enseignants/specialite/${matiere}`).then(response =>
      response.json()
    ).then(data => {
      setEns(data)
      localStorage.setItem("id_aff", id)
    }).catch(err => {
      console.log(err)
    })
  };

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
            {aff.map((prop, key) => {
              localStorage.setItem("id_aff", prop._id)

              return (
                <TableRow>
                  <TableCell key={key} className="cell">
                    {prop.matiere.libele}
                  </TableCell>
                  <TableCell key={key} className="cell">
                    {prop.matiere.chargeHoraire}
                  </TableCell>
                  <TableCell key={key} className="cell">
                    {prop.enseignant &&
                      <Button onClick={() => { handleClickOpen(prop.matiere.libele, prop._id) }}>{prop.enseignant.nom} {prop.enseignant.prénom}</Button>
                    }
                    {!prop.enseignant &&
                      <Button onClick={() => { handleClickOpen(prop.matiere.libele, prop._id) }}>غير معين</Button>
                    }
                    {open &&
                      <Enseignants open={open} setOpen={setOpen} ens={ens} id_aff={prop._id} />
                    }

                  </TableCell>
                </TableRow>
              )
            })}
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
