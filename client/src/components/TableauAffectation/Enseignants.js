import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}));
export default function Enseignants(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(props.open);
    const [enseignant, setEnseignant] = useState()
    const [id, setId] = useState(localStorage.getItem("id_aff"))

    useEffect(() => {
        setId(localStorage.getItem("id_aff"))
    }, [(localStorage.getItem("id_aff"))])

    const handleClose = () => {
        props.setOpen(false)
    };

    const handleOk = async () => {
        await fetch(`http://localhost:4000/affectation/${localStorage.getItem("id_aff")}/${enseignant}`, {
            method: 'POST',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            withCredentials: true,
        })
            .then(() => {
                props.setOpen(false)
            })
    }

    const handleChangeMultiple = (e) => {
        setEnseignant(e.target.value);
    };

    return (
        <div>
            {props.open &&
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>تعيين مدرس</DialogTitle>
                    <DialogContent>
                        <form className={classes.container}>
                            <FormControl className={classes.formControl}>
                                <InputLabel id="demo-dialog-select-label">المدرس</InputLabel>
                                <Select
                                    native
                                    onChange={handleChangeMultiple}
                                    inputProps={{
                                        id: 'select-multiple-native',
                                    }}
                                >
                                    <option value=""></option>

                                    {props.ens.map((ens) => {
                                        return (
                                            <option key={ens._id} value={ens._id}>
                                                {ens.nom + " " + ens.prénom}
                                            </option>)
                                    })}
                                </Select>
                            </FormControl>
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            الغاء
                        </Button>
                        <Button onClick={handleOk} color="primary">
                            تسجيل
                        </Button>
                    </DialogActions>
                </Dialog>}
        </div>
    );
}



