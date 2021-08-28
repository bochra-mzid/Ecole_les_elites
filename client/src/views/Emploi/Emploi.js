import * as React from "react";
import { useState, useEffect } from "react"
import { Scheduler, DayView, WeekView } from "@progress/kendo-react-scheduler";
import { guid } from "@progress/kendo-react-common";

export default function Emploi() {
  const currentYear = new Date().getFullYear();

  const parseAdjust = eventDate => {
    const date = new Date(eventDate);
    date.setFullYear(currentYear);
    return date;
  };

  const displayDate = new Date();

  const [seancesLoaded, setSeancesLoaded] = useState(false)
  const [data, setData] = useState([])
  const [seances, setSeances] = useState([])
  const [date, setDate] = React.useState(displayDate);

  const sampleDataWithCustomSchema = seances.map((dataItem) => ({
    ...dataItem,
    _id: guid(),
    Start: parseAdjust(dataItem.Start),
    End: parseAdjust(dataItem.End),
    title: dataItem.Classe.nom + " -- " + " " + " -- " + dataItem.Matiere.libele + " -- " + "القاعة " + dataItem.Room
  }));

  const customModelFields = {
    id: "_id",
    Room: "Room",
    description: "Note",
    start: "Start",
    end: "End",
    title: "title",
    t: "Enseignant.nom",
    recurrenceRule: "RecurrenceRule",
    recurrenceId: "RecurrenceID",
    recurrenceExceptions: "RecurrenceException",
  };

  useEffect(() => {
    if (!seancesLoaded) {
      fetch(`http://localhost:4000/seances/enseignant/${localStorage.getItem("ID")}`).then(response =>
        response.json()
      ).then(data => {
        setSeances(data)
        setData(sampleDataWithCustomSchema)
        setSeancesLoaded(true)
      }).catch(err => {
        console.log(err)
      })
    }
  }, [seances])
  console.log(data)

  return (
    <Scheduler data={data}
      modelFields={customModelFields}
      defaultDate={date}>
      <DayView />
      <WeekView />
    </Scheduler>
  );
};

