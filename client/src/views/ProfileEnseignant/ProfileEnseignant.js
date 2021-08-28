import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import CustomInput from "../../components/CustomInput/CustomInput.js";
import Button from "../../components/CustomButtons/Button.js";
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardAvatar from "../../components/Card/CardAvatar.js";
import CardBody from "../../components/Card/CardBody.js";
import CardFooter from "../../components/Card/CardFooter.js";
import FormControl from "@material-ui/core/FormControl";
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import {
  DatePicker,
} from "@progress/kendo-react-dateinputs";
import Axios from "axios"

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
};

const useStyles = makeStyles(styles);

export default function ProfileEnseignant() {
  const classes = useStyles();

  const [isDisabled, setIsDisabled] = useState(true)
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("")
  const [email, setEmail] = useState("")
  const [mdp, setMdp] = useState("")
  const [poste, setPoste] = useState("")
  const [adresse, setAdresse] = useState("")
  const [numero, setNumero] = useState()
  const [sexe, setSexe] = useState()
  const [age, setAge] = useState()
  const [button, setButton] = useState("تحديث")
  const [specialites, setSpecialites] = useState([])
  const [dateDeNaissance, setDateDeNaissance] = React.useState(new Date());
  const [photo, setPhoto] = useState()
  const [photoUpdate, setPhotoUpdate] = useState(false)
  const [file, setFile] = useState()

  const changeDate = ({ value }) => {
    setDateDeNaissance(value);
  };

  const currentYear = new Date().getFullYear();

  const parseAdjust = eventDate => {
    const date = new Date(eventDate);
    date.setFullYear(currentYear);
    return date;
  };

  const upload = () => {
    const formData = new FormData()
    formData.append('photo', file,)
    Axios.put(`http://localhost:4000/enseignants/${localStorage.getItem("ID")}/photo`, formData)
      .then(() => {
        console.log({ "f": formData })
      })
  }

  const uploadPhoto = (e) => {
    setFile(e.target.files[0])
    setPhotoUpdate(true)
  }

  const handleOnClickButton = () => {
    setButton("تسجيل")
    console.log(isDisabled)
    if (!isDisabled) {
      Axios.put(`http://localhost:4000/enseignants/${localStorage.getItem("ID")}`, {
        nom: nom,
        prénom: prenom,
        email: email,
        adresse: adresse,
        sexe: sexe,
        numero: numero,
        age: age,
        dateDeNaissance: dateDeNaissance
      })
        .then(() => {
          window.location.reload()
        })
    }
  }

  useEffect(() => {
    Axios.get(`http://localhost:4000/enseignants/${localStorage.getItem("ID")}`)
      .then(data => {
        console.log(data.data)
        setNom(data.data.nom)
        setPrenom(data.data.prénom)
        setEmail(data.data.email)
        setAdresse(data.data.adresse)
        setNumero(data.data.numero)
        setSexe(data.data.sexe)
        setSpecialites(data.data.spécialités)
        setAge(data.data.age)
        setDateDeNaissance(parseAdjust(data.data.date_de_naissance))
        setPhoto(data.data.photo)
      })
      .catch(err => {
        console.log(err)
      })
  }
    , [])

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Edit Profile</h4>
              <p className={classes.cardCategoryWhite}>Complete your profile</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    value={nom}
                    labelText="اللقب"
                    id="Nom"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      disabled: isDisabled,
                    }}
                    onChange={(e) => setNom(e.target.value)}
                    setValue={setNom}

                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    value={prenom}
                    labelText="الاسم"
                    id="Prénom"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      disabled: isDisabled,
                    }}
                    onChange={(e) => setPrenom(e.target.value)}
                    setValue={setPrenom}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    value={email}
                    labelText="البريد الالكتروني "
                    id="email-address"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      disabled: isDisabled,
                    }}
                    onChange={(e) => setEmail(e.target.value)}
                    setValue={setEmail}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    value={numero}
                    labelText="رقم الهاتف"
                    id="Numéro"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      disabled: isDisabled,
                    }}
                    onChange={(e) => setNumero(e.target.value)}
                    setValue={setNumero}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>

                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="العنوان"
                    id="Adresse"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      disabled: isDisabled,
                    }}
                    value={adresse}
                    onChange={(e) => setAdresse(e.target.value)}
                    setValue={setAdresse}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6} style={{ marginTop: "3%" }}>
                  <FormControl>
                    <DatePicker format="dd-MMM-yyyy" value={dateDeNaissance} placeholder="" style={{ marginTop: "5%" }} label="تاريخ الولادة" onChange={changeDate} disabled={isDisabled} />
                  </FormControl>
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="العمر"
                    id="age"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      disabled: isDisabled,
                    }}
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    setValue={setAge}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="الجنس"
                    id="Sexe"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      disabled: isDisabled,
                    }}
                    value={sexe}
                    onChange={(e) => setSexe(e.target.value)}
                    setValue={setSexe}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button color="primary" onClick={() => {
                setIsDisabled(false)
                handleOnClickButton()
              }}>{button}</Button>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            {photo &&
              <CardAvatar profile>
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                  <img src={`../../../uploads/${photo}`} alt="..." />
                </a>
              </CardAvatar>
            }
            {(!photo) &&
              <CardAvatar profile>
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                  <img src={`../../../uploads/unknown.png`} alt="..." />
                </a>
              </CardAvatar>
            }
            <div className={classes.root}>
              <input accept="image/*" className={classes.input} id="icon-button-file" type="file" onChange={uploadPhoto}/>
              <label htmlFor="icon-button-file">
                <IconButton color="primary" aria-label="upload picture" component="span" style={{marginTop:"15px"}}>
                  <PhotoCamera color="primary" />
                </IconButton>
              </label>
              {photoUpdate&&
              <Button color="primary" onClick={upload}>تسجيل</Button>}
            </div>
            <CardBody profile style={{marginTop:0}}>
              <h4 className={classes.cardTitle}>{prenom} {nom}</h4>
              {specialites.map((s)=>{
              return(<span>{s},</span>)})}
              
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
