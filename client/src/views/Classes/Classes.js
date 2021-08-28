import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import Table from "../../components/TableauClasses/TableauClasses";
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardBody from "../../components/Card/CardBody.js";
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
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import './Classes.css'

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
};

const useStyles = makeStyles(styles);

export default function TableList() {
  const classes = useStyles();

  const [nosClasses, setNosClasses] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [open, setOpen] = React.useState(false);
  const [niveau, setNiveau] = React.useState();
  const [nombre, setNombre] = useState()
  const [nom, setNom] = useState()
  const [annee, setAnnee] = useState()
  const [msg, setMsg] = useState("")

  const handleChange = (event) => {
    setNiveau(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setNombre()
    setAnnee()
    setNiveau()
    setMsg()
    setNom()
    setOpen(false);
  };


  useEffect(() => {
    if (!isLoaded) {
      console.log("loaded")
      fetch("http://localhost:4000/classes").then(response =>
        response.json()
      ).then(data => {
        setIsLoaded(true)
        setNosClasses(data)
        console.log(data)
      }).catch(err => {
        console.log(err)
      })
    }
  }, [nosClasses])

  const handleAdd = () => {
    if (!nom || !nombre || !annee || !niveau) {
      setMsg("Vous devez remplir tous les champs")
    }
    else {
      setMsg("")
      fetch(`http://localhost:4000/classes`, {
        method: 'POST',
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        },

        body: JSON.stringify({ nom: nom, niveau: niveau, nb_eleve: nombre, année: annee }),
        withCredentials: true,
      })
        .then(() => {
          window.location.reload()
        })
    }
  }

  return (
    <div>

      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>الأقسام</h4>

            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="primary"
                tableHead={["المستوى", "الإسم", "عدد التلاميد في القسم", "السنة الدراسية", "", ""]}
                tableData={nosClasses}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      <Tooltip title="اضافة" aria-label="Ajouter" onClick={handleClickOpen}>
        <Fab color="secondary" className={classes.absolute} style={{ float: "right", backgroundColor: "#8e24aa" }}>
          <AddIcon />
        </Fab>
      </Tooltip>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">إضافة قسم جديد</DialogTitle>
        <DialogContent>
          <DialogContentText>
            لإضافة قسم جديد أدخل المعلومات التالية
          </DialogContentText>
          <FormControl required className={classes.formControl} style={{ width: "20%", margin: "3%" }}>

            <InputLabel id="demo-simple-select-label">المستوى</InputLabel>
            <Select
              native
              value={niveau}
              onChange={handleChange}
              name="niveau"
              inputProps={{
                id: 'niveau-native-required',
              }}
            >
              <option aria-label="None" value="" />
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
            </Select>
          </FormControl>
          <TextField
            value={nombre}
            margin="dense"
            id="filled-error"
            label="عدد التلاميد في القسم"
            required
            fullWidth
            onChange={(e) => setNombre(e.target.value)}
            style={{ width: "30%", margin: "3%" }}
          />
          <TextField
            required
            value={annee}
            margin="dense"
            id="nombre"
            label="السنة الدراسية"
            fullWidth
            onChange={(e) => setAnnee(e.target.value)}
            style={{ width: "30%", margin: "3%" }}
          />
          <TextField
            required
            value={nom}
            margin="dense"
            id="name"
            label="إسم القسم"
            fullWidth
            style={{ width: "40%", margin: "3%" }}
            onChange={(e) => setNom(e.target.value)}
          />
        </DialogContent>
        <div>
          <div className="msg">{msg}</div>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              إلغاء
            </Button>
            <Button onClick={handleAdd} color="primary">
              تسجيل
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </div>

  )
}
