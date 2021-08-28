import * as React from "react";
import { FormElement, Field } from "@progress/kendo-react-form";
import { Label, Error } from "@progress/kendo-react-labels";
import { DatePicker, DateTimePicker } from "@progress/kendo-react-dateinputs";
import {
    TitleEditor,
    MatiereEditor,
    RoomEditor,
    EnseignantEditor,
} from "./editors";

export const CustomFormEditor = (props) => {

    return (
        <FormElement horizontal={true}>
            <div className="k-form-field">
                <Label>القسم</Label>
                <div className="k-form-field-wrap">
                    <Field name={"Classe"} component={TitleEditor} />
                    {props.errors.Classe && <Error>{props.errors.Classe}</Error>}
                </div>
            </div>
            <div className="k-form-field">
                <Label>المادة</Label>
                <div className="k-form-field-wrap">
                    <Field name={"Matiere"} component={MatiereEditor} />
                    {props.errors.Matiere && <Error>{props.errors.Matiere}</Error>}
                </div>
            </div>
            <div className="k-form-field">
                <Label>المعلم</Label>
                <div className="k-form-field-wrap">
                    <Field name={"Enseignant"} component={EnseignantEditor} />
                    {props.errors.Classe && <Error>{props.errors.Classe}</Error>}
                </div>
            </div>
            <div className="k-form-field">
                <Label>بداية الحصة</Label>
                <div className="k-form-field-wrap">
                    <div
                        style={{
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <Field
                            name={"Start"}
                            component={props.startEditor || DatePicker}
                            as={DateTimePicker}
                            rows={1}
                            width={"140px"}
                            format="t"
                        />
                        &nbsp;
                        <Label>ثهاية الحصة</Label>
                        &nbsp;
                        <Field
                            name={"End"}
                            component={props.endEditor || DatePicker}
                            as={DateTimePicker}
                            rows={1}
                            width={"140px"}
                            format="t"
                        />
                    </div>
                </div>
            </div>
            <div className="k-form-field">
                <Label>القاعة</Label>
                <div className="k-form-field-wrap">
                    <Field name="Room" component={RoomEditor} />
                </div>
            </div>
        </FormElement>
    );
};