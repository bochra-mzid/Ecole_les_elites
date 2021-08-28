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
import SaveIcon from "@material-ui/icons/Save";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

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
  const [ens, setEns] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = useState();
  const [prénom, setPrénom] = useState()
  const [nom, setNom] = useState()
  const [sexe, setSexe] = useState()
  const [msg, setMsg] = useState("")
  const [mdp, setMdp] = useState()

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setSexe()
    setNom()
    setPrénom()
    setEmail()
    setOpen(false);
  };

  useEffect(() => {
    if (!isLoaded) {
      console.log("loaded")
      fetch("http://localhost:4000/enseignants").then(response =>
        response.json()
      ).then(data => {
        setIsLoaded(true)
        setEns(data)
        console.log(data)
      }).catch(err => {
        console.log(err)
      })
    }
  }, [ens])

  const handleAdd = () => {
    if (!nom) {
      setMsg("Vous devez remplir tous les champs")
    }
    else {
      setMsg("")
      fetch(`http://localhost:4000/enseignants`, {
        method: 'POST',
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({ email: email, nom: nom, prénom: prénom, sexe: sexe, mdp: mdp }),
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
                tableHead={["البريد الإلكتروني", "الإسم", "اللقب", "الجنس", "التخصص", "", ""]}
                tableData={ens}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      <Tooltip title="Ajouter" aria-label="Ajouter" onClick={handleClickOpen}>
        <Fab color="secondary" className={classes.absolute} style={{ float: "right", backgroundColor: "#8e24aa" }}>
          <AddIcon />
        </Fab>
      </Tooltip>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">إضافة معلم جديد</DialogTitle>
        <DialogContent>
          <DialogContentText>
            لإضافة معلم جديد أدخل المعلومات التالية
          </DialogContentText>
          <TextField
            value={email}
            margin="dense"
            id="filled-error"
            label="البريد الإلكتروني"
            required
            fullWidth
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "30%", margin: "3%" }}
          />

          <TextField
            value={prénom}
            margin="dense"
            id="filled-error"
            label=" الإسم"
            required
            fullWidth
            onChange={(e) => setNom(e.target.value)}
            style={{ width: "30%", margin: "3%" }}
          />

          <TextField
            required
            value={nom}
            margin="dense"
            id="nombre"
            label="اللقب"
            fullWidth
            onChange={(e) => setPrénom(e.target.value)}
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
            <Button onClick={handleClose} color="primary" startIcon={<ExitToAppIcon />}>
              إلغاء
            </Button>
            <Button onClick={handleAdd} color="primary" startIcon={<SaveIcon />}>
              تسجيل
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  )
}
