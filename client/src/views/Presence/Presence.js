import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import "./Presence.css"
import TableauPresence from "../../components/TableauPresence/TableauPresence"
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));

export default function CheckboxListSecondary() {
    const [isLoaded, setIsLoaded] = useState(false)
    const [nosClasses, setNosClasses] = useState([])
    const [idClasse, setIdClasse] = useState("")
    const [debut, setDebut]= useState()
    const [fin, setFin]= useState()

    const currentYear = new Date().getFullYear();

    const parseAdjust = eventDate => {
        const date = new Date(eventDate);
        date.setFullYear(currentYear);
        return date;
      };

    const handleOnchange = (e) => {
        localStorage.setItem("id", e.target.value)
        setIdClasse(e.target.value)
    }

    useEffect(async () => {
        localStorage.removeItem("id")
        if (!isLoaded) {
            console.log("loaded")
            await fetch("http://localhost:4000/classes").then(response =>
                response.json()
            ).then(data => {
                setNosClasses(data)
                setIsLoaded(true)
            }).catch(err => {
                console.log(err)
            })
        }
        console.log(nosClasses)
    }, [])

    const classes = useStyles();
    const [checked, setChecked] = React.useState([1]);

    return (
        <>
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel htmlFor="outlined-age-native-simple">القسم</InputLabel>
                <Select
                    native
                    onChange={handleOnchange}
                    label="Classe"
                    value={idClasse}
                    inputProps={{
                        name: 'classe',
                        id: 'outlined-age-native-simple',
                    }}
                >
                    {console.log(nosClasses)}
                    <option value=""></option>

                    {nosClasses.map((classe) => {
                        return (
                            <option value={classe._id}>{classe.nom}</option>)
                    })}
                </Select>
            </FormControl>
            <form className={classes.container} noValidate style={{ display: "inline" }}>
                <TextField
                    variant="outlined"
                    id="datetime-local"
                    label="بداية الحصة"
                    type="datetime-local"
                    onChange={(e)=>setDebut(e.target.value)}
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={debut}
                    style={{width:"210px"}}
                />
            </form>
            <form className={classes.container} noValidate style={{ display: "inline" }}>
                <TextField
                style={{width:"210px"}}
                    variant="outlined"
                    id="datetime-local"
                    label="نهاية الحصة"
                    type="datetime-local"
                    value={fin}
                    onChange={(e)=>setFin(e.target.value)}
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    style={{width:"210px"}}
                />
            </form>
            {idClasse &&
                <TableauPresence id={idClasse} debut={parseAdjust(debut)} fin={parseAdjust(fin)} />}
        </>
    );
}