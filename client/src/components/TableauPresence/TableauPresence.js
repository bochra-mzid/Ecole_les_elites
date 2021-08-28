import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Eleve from "./Eleve.js"
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: "100vw",
        backgroundColor: theme.palette.background.paper,
        marginTop: "3%",
        marginBottom: "3%"
    },
}));

export default function TableauPresence(props) {
    const [id, setId] = useState(props.id)
    const [isLoaded, setIsLoaded] = useState(false)
    const [eleves, setEleves] = useState([])
    const [matieres, setMatieres] = useState([])
    const [idMatiere, setIdMatiere] = useState([])
    const [presents, setPresents] = useState([])
    const [absents, setAbsents] = useState([])
    const classes = useStyles();

    function handleSave() {
        console.log({ "pres": presents })
        presents.map((id) => {
            fetch(`http://localhost:4000/presences`, {
                method: 'POST',
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },

                body: JSON.stringify({ etat: "présent", eleve: id, matiere: idMatiere, debut: props.debut, fin: props.fin }),
                withCredentials: true,
            })
                .then(() => {
                    window.location.reload()
                })
        })
        absents.map((id) => {
            fetch(`http://localhost:4000/presences`, {
                method: 'POST',
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify({ etat: "absent", eleve: id, matiere: idMatiere, debut: props.debut, fin: props.fin }),
                withCredentials: true,
            })
                .then(() => {
                    window.location.reload()
                })
        })
    }

    const handleMatierechange = (e) => {
        setIdMatiere(e.target.value)
    }

    useEffect(() => {
        setId(localStorage.getItem("id"))
        setIsLoaded(false)
    }, [(localStorage.getItem("id"))])

    useEffect(() => {
        setIsLoaded(false)
        if (!isLoaded) {
            console.log("loaded")
            fetch(`http://localhost:4000/classes/${id}/matieres`).then(response =>
                response.json()
            ).then(data => {
                setMatieres(data)
                setIsLoaded(true)
                console.log({ "matieres": data })
                console.log(matieres)

            }).catch(err => {
                console.log(err)
            })
            fetch(`http://localhost:4000/eleves/classe/${id}`).then(response =>
                response.json()
            ).then(data => {
                setIsLoaded(true)
                setEleves(data)
                console.log({ "data": data })
                console.log(eleves)
            }).catch(err => {
                console.log(err)
            })
        }
    }, [id])

    return (
        <div style={{ display: "inline" }}>
            {isLoaded &&
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel htmlFor="outlined-age-native-simple">المادة</InputLabel>
                    <Select
                        native
                        onChange={handleMatierechange}
                        label="Classe"
                        value={idMatiere}
                        inputProps={{
                            name: 'classe',
                            id: 'outlined-age-native-simple',
                        }}
                    >
                        {console.log(matieres)}
                        <option value=""></option>
                        {matieres.map((matiere) => {
                            return (
                                <option value={matiere._id}>{matiere.libele}</option>)
                        })}
                    </Select>
                </FormControl>}

            <List dense className={classes.root} style={{ maxWidth: "100vw" }}>
                {eleves.map((eleve) => {
                    localStorage.setItem("id_eleve", eleve._id)
                    return (
                        <>
                            <Eleve nom={eleve.nom} prenom={eleve.prenom} id={eleve._id} setPresents={setPresents} presents={presents} absents={absents} setabsents={setAbsents} />
                        </>
                    );
                })}
            </List>
            <Button
                variant="contained"
                color="primary"
                size="large"
                className={classes.button}
                startIcon={<SaveIcon />}
                onClick={handleSave}
            >
                تسجيل
            </Button>
        </div>)
}