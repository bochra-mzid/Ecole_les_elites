import * as React from "react";
import { SchedulerForm } from "@progress/kendo-react-scheduler";
import { CustomFormEditor } from "./custom-form-editor";
import { CustomDialog } from "./custom-dialog";


export const FormWithCustomEditor = (props) => {
        
    const handleSubmit = (dataItem) => {
        fetch(`http://localhost:4000/seances/${localStorage.getItem("id_classe")}/${localStorage.getItem("id_matiere")}/${localStorage.getItem("id_enseignant")}`, {
            method: 'POST',
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            },
    
            body: JSON.stringify({ Start: dataItem.Start, End: dataItem.End, Room:dataItem.Room }),
            withCredentials: true,
          })
            .then(() => {
                console.log(props)
                console.log(dataItem)
                window.location.reload()

            })
        }

    const requiredValidator = React.useCallback(
        (value) =>
            value === undefined || value === null || value === ""
                ? "Field is required."
                : undefined,
        []
    );

    const formValidator = (_dataItem, formValueGetter) => {
        console.log({"props": props})
        let result = {};
        result.Classe = [requiredValidator(formValueGetter("Classe"))]
            .filter(Boolean)
            .reduce((current, acc) => current || acc, "");
        result.Matiere = [requiredValidator(formValueGetter("Matiere"))]
            .filter(Boolean)
            .reduce((current, acc) => current || acc, "");
        result.Enseignant = [requiredValidator(formValueGetter("Enseignant"))]
            .filter(Boolean)
            .reduce((current, acc) => current || acc, "");
            console.log({"result": result})

        return result;
    };

    return (
        <SchedulerForm
            {...props}
            editor={CustomFormEditor}
            dialog={CustomDialog}
            validator={formValidator}
            onSubmit={()=>{handleSubmit(props.dataItem)}}
        />
    );
};