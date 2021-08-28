import React, { useState, useEffect } from 'react'
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from "@material-ui/core/styles";
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import Table from "../../components/TableauAffectation/TableauAffectation";
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardBody from "../../components/Card/CardBody.js";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

function Affectation() {
    const [nosClasses, setNosClasses] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)
    const [idClasse, setIdClasse] = useState("")
    const classes = useStyles();

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

    return (
        <div>
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel htmlFor="outlined-age-native-simple">القسم</InputLabel>
                <Select
                    native
                    onChange={handleOnchange}
                    label="القسم"
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
            <div>
                {idClasse &&
                    < GridContainer >
                        <GridItem xs={12} sm={12} md={12}>
                            <Card>
                                <CardHeader color="primary">
                                    <h4 className={classes.cardTitleWhite}>تعيين المدرسين</h4>

                                </CardHeader>
                                <CardBody>
                                    <Table
                                        tableHeaderColor="primary"
                                        id={idClasse}
                                        tableHead={["المادة", "عدد الساعات", "المعلم"]}
                                    />
                                </CardBody>
                            </Card>
                        </GridItem>
                    </GridContainer>}
            </div>
        </div >
    )
}
export default Affectation