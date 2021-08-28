import React, { useState } from 'react'
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function Delete(props) {
    const [openDelete, setOpenDelete] = useState(false);

    const handleClickOpenDelete = () => {
        setOpenDelete(true);
    };

    const handleCloseDelete = () => {
        setOpenDelete(false);
    };

    const handleDelete = () => {
        fetch(`http://localhost:4000/matieres/${props.id}`, {
            method: 'DELETE'
        }).then(() => {
            window.location.reload()
        })
    }
    
    return (
        <div>
            <Tooltip title="حذف" onClick={handleClickOpenDelete}>
                <IconButton aria-label="delete" >
                    <DeleteIcon />
                </IconButton>
            </Tooltip>
            <Dialog
                open={openDelete}
                onClose={handleCloseDelete}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    هل تريد فعلا حذف مادة {props.nom} للمستوى {props.niveau}?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                       بالضغط على نعم سيقع حذف هذه المادة
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDelete} color="primary">
                        لا
                    </Button>
                    <Button onClick={handleDelete} color="primary" autoFocus>
                        نعم
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}