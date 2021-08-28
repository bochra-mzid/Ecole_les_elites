import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Delete from "./Delete.js"
import Edit from "./Edit.js"
import styles from "../../assets/jss/material-dashboard-react/components/tableStyle.js";
import "./TableauClasses.css"

const useStyles = makeStyles(styles);

export default function CustomTable(props) {
  const classes = useStyles();
  const { tableHead, tableData, tableHeaderColor } = props;
  
  return (
    <div className={classes.tableResponsive}>
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
          {tableData.map((prop, key) => {
            return (
              <TableRow>
                <TableCell key={key} className="cell">
                  {prop.niveau}
                </TableCell>
                <TableCell key={key} className="cell">
                  {prop.nom}
                </TableCell>
                <TableCell key={key} className="cell">
                  {prop.nb_eleve}
                </TableCell>
                <TableCell key={key} className="cell">
                  {prop.année}
                </TableCell>
                <TableCell key={key} className="cell">
                  <Delete id={prop._id} nom={prop.nom} />
                </TableCell>
                <TableCell key={key} className="cell">
                  <Edit id={prop._id} nb={prop.nb_eleve} nom={prop.nom}/>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
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
