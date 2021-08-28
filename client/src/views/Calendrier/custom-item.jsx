import * as React from "react";
import { SchedulerEditItem } from "@progress/kendo-react-scheduler";


export const EditItemWithDynamicTitle = (props) => {
    return <SchedulerEditItem {...props} title={generateTitle(props.dataItem)} />;
};

const generateTitle = (dataItem) => {
    let classes = []
    fetch("http://localhost:4000/classes").then(response =>
        response.json()
    ).then(data => {
        classes = data
        console.log(classes)
    }).catch(err => {
        console.log(err)
    })
    let matieres = []
    fetch("http://localhost:4000/matieres").then(response =>
        response.json()
    ).then(data => {
        matieres = data
    }).catch(err => {
        console.log(err)
    })
    const classe = classes.find((p) => p._id === dataItem.Classe._id);
    const matiere = matieres.find((t) => t._id === dataItem.Matiere._id);
    return `${classe && classe.nom} - ${matiere && matiere.libele}`;
};




