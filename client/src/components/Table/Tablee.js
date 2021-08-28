import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import CreateIcon from "@material-ui/icons/Create";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import styles from "../../assets/jss/material-dashboard-react/components/tableStyle";

const useStyles = makeStyles(styles);

export default function CustomTable(props) {
  const classes = useStyles();
  const { tableHead, tableData, tableHeaderColor } = props;
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
              <TableRow key={key} className={classes.tableBodyRow}>
               
                  
                    <TableCell className={classes.tableCell} key={key}>
                      {prop.prénom}
                    </TableCell>
                    <TableCell className={classes.tableCell} key={key}>
                      {prop.nom}
                    </TableCell>
                    <TableCell className={classes.tableCell} key={key}>
                      {prop.email}
                    </TableCell>
                  
                

                <Tooltip title="Modifier">
                  <IconButton aria-label="Modifiet">
                    <CreateIcon />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Delete">
                  <IconButton aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </TableRow>
            );
          })}
        </TableBody>

        <Tooltip title="Add" aria-label="add">
          <Fab size="medium" color="primary" className={classes.absolute}>
            <AddIcon onClick={handleClickOpen} />
          </Fab>
        </Tooltip>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Ajouter un enseignant</DialogTitle>
          <DialogContent>
            <form className={classes.container}>
              <FormControl className={classes.formControl}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="firstName"
                      name="Nom"
                      label="Nom"
                      fullWidth
                      autoComplete="given-name"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="lastName"
                      name="Prénom"
                      label="Prénom"
                      fullWidth
                      autoComplete="family-name"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="firstName"
                      name="Sexe"
                      label="Sexe"
                      fullWidth
                      autoComplete="given-name"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="lastName"
                      name="Prénom"
                      label="Spécialité"
                      fullWidth
                      autoComplete="family-name"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      id="address1"
                      name="adresse de domicile"
                      label="Mot de passe"
                      fullWidth
                      autoComplete="shipping address-line1"
                    />
                  </Grid>
                  <DialogActions>
                    <Button
                      onClick={handleClose}
                      color="primary"
                      variant="contained"
                      size="small"
                      className={classes.button}
                      startIcon={<SaveIcon />}
                    >
                      Enregistrer
                    </Button>
                    <Button
                      onClick={handleClose}
                      color="secondary"
                      variant="contained"
                      size="small"
                      className={classes.button}
                      startIcon={<ExitToAppIcon />}
                    >
                      Annuler
                    </Button>
                  </DialogActions>
                </Grid>
              </FormControl>
            </form>
          </DialogContent>
        </Dialog>
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
