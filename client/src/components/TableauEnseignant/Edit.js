import React, { useState } from "react"
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

export default function (props) {
    const [openEdit, setOpenEdit] = React.useState(false);
    const [email, setEmail] = useState(props.email)
    const [nom, setNom] = useState(props.nom)
    const [prenom, setPrenom] = useState(props.prenom)
    const [numero, setNumero] = useState()

    const handleClickOpenEdit = () => {
        setOpenEdit(true);
    };

    const handleCloseEdit = () => {
        setOpenEdit(false);
    };

    const handleEdit = () => {
        fetch(`http://localhost:4000/enseignants/${props.id}`, {
            method: 'PUT',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({nom: nom, prenom:prenom, email: email, numero:numero}),
            withCredentials: true,
        })
            .then(() => {
                window.location.reload()
            })
    }
    return (
        <div>
            <Tooltip title="تحديث" onClick={handleClickOpenEdit}>
                <IconButton aria-label="edit">
                    <EditIcon />
                </IconButton>
            </Tooltip>
            <Dialog open={openEdit} onClose={handleCloseEdit} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">تحيين البيانات الخاصة بالمعلم {props.nom} {props.prenom}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        الرجاء ادخال البيانات التالية
                    </DialogContentText>
                    <TextField
                        required
                        defaultValue={props.nom}
                        margin="dense"
                        id="nombre"
                        label="اللقب"
                        fullWidth
                        onChange={(e) => setNom(e.target.value)}
                        style={{ width: "30%", margin: "3%" }}
                    />

                    <TextField
                        defaultValue={props.prenom}
                        margin="dense"
                        id="filled-error"
                        label=" الإسم"
                        required
                        fullWidth
                        onChange={(e) => setPrenom(e.target.value)}
                        style={{ width: "30%", margin: "3%" }}
                    />

                    <TextField
                        defaultValue={props.email}
                        margin="dense"
                        id="filled-error"
                        label="البريد الإلكتروني"
                        required
                        fullWidth
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ width: "30%", margin: "3%" }}
                    />

                    <TextField
                        defaultValue={props.numero}
                        margin="dense"
                        id="filled-error"
                        label="رقم الهاتف"
                        required
                        fullWidth
                        onChange={(e) => setNumero(e.target.value)}
                        style={{ width: "30%", margin: "3%" }}
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEdit} color="primary">
                        الغاء
                    </Button>
                    <Button onClick={handleEdit} color="primary">
                        تسجيل
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}