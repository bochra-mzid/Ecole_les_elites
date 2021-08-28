import React, { useState, useEffect } from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

export default function Eleve(props) {
    const [presents, setPresents] = useState(props.presents)
    const [absents, setAbsents] = useState(props.absents)
    const [ etat, setEtat]= useState('')

    const handleRadioChange = (e) => {
        setEtat(e.target.value)
    };

    useEffect(()=>{
        if (etat=="present"){
            var index = absents.indexOf(props.id)
            if (index !== -1) {
              absents.splice(index, 1);
              console.log({"absents": absents});
            }
            (props.presents.push(props.id))
        }
        else if (etat=="absent"){
            var index = presents.indexOf(props.id)
            if (index !== -1) {
              presents.splice(index, 1);
              console.log({"presents": presents})
            }
            (props.absents.push(props.id))
        }
    },[etat])
    
    return (
        <div>
             <ListItem key={props.id} button>
                        <ListItemAvatar>
                            <Avatar
                                src={`/static/images/avatar/${props.nom}.jpg`}
                            />
                        </ListItemAvatar>
                        <ListItemText id={props.id} primary={props.nom + " " + props.prenom} />
                    <RadioGroup value={etat} onChange={
                    handleRadioChange        
                }>
                    <p>حاضر(ة)</p>
                    <Radio value="present" label="present"/>
                    <p>غائب(ة)</p>
                    <Radio value="absent" label="absent"/>
                    </RadioGroup>
                    </ListItem>
                    {console.log({"etat": etat})}
                    {console.log({"presents":presents})}
        </div>
    )
}
