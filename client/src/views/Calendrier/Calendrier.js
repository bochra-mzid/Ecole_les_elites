import * as React from "react";
import { useState, useEffect } from 'react'
import * as ReactDOM from "react-dom";
import { guid } from "@progress/kendo-react-common";
import { timezoneNames } from "@progress/kendo-date-math";
import {
  IntlProvider,
  load,
  LocalizationProvider,
  loadMessages,
} from "@progress/kendo-react-intl";
import {
  Scheduler,
  TimelineView,
  DayView,
  WeekView,
  MonthView,
  AgendaView,
} from "@progress/kendo-react-scheduler";
import weekData from "cldr-core/supplemental/weekData.json";
import currencyData from "cldr-core/supplemental/currencyData.json";
import likelySubtags from "cldr-core/supplemental/likelySubtags.json";
import numbers from "cldr-numbers-full/main/es/numbers.json";
import dateFields from "cldr-dates-full/main/es/dateFields.json";
import currencies from "cldr-numbers-full/main/es/currencies.json";
import caGregorian from "cldr-dates-full/main/es/ca-gregorian.json";
import timeZoneNames from "cldr-dates-full/main/es/timeZoneNames.json";
import "@progress/kendo-date-math/tz/Etc/UTC";
import "@progress/kendo-date-math/tz/Europe/Sofia";
import "@progress/kendo-date-math/tz/Europe/Madrid";
import "@progress/kendo-date-math/tz/Asia/Dubai";
import "@progress/kendo-date-math/tz/Asia/Tokyo";
import "@progress/kendo-date-math/tz/America/New_York";
import "@progress/kendo-date-math/tz/America/Los_Angeles";
import esMessages from "./es.json";
import { FormWithCustomEditor } from "./custom-form";
import { SchedulerEditItem } from "@progress/kendo-react-scheduler";

load(
  likelySubtags,
  currencyData,
  weekData,
  numbers,
  currencies,
  caGregorian,
  dateFields,
  timeZoneNames
);

export default function Calendrier() {
  const [seances, setSeances] = useState([])
  loadMessages(esMessages, "es-ES");
  const currentYear = new Date().getFullYear();

  const parseAdjust = eventDate => {
    const date = new Date(eventDate);
    date.setFullYear(currentYear);
    return date;
  };

  const displayDate = new Date();

  const locales = [
    {
      language: "en-US",
      locale: "en",
    },
    {
      language: "es-ES",
      locale: "es",
    },
  ];

  const sampleDataWithCustomSchema = seances.map((dataItem) => 
    

    ({
    ...dataItem,
    _id: guid(),

    Start: parseAdjust(dataItem.Start),
    End: parseAdjust(dataItem.End),
    title: dataItem.Classe.nom + " -- " + dataItem.Enseignant.nom + " " + dataItem.Enseignant.prénom + " -- " + dataItem.Matiere.libele
  }));

  const [view, setView] = React.useState("day");
  const [date, setDate] = React.useState(displayDate);
  const [locale, setLocale] = React.useState(locales[0]);
  const [timezone, setTimezone] = React.useState("Etc/UTC");
  const [orientation, setOrientation] = React.useState("horizontal");
  const [sallesLoaded, setSallesLoaded] = useState(false)
  const [seancesLoaded, setSeancesLoaded] = useState(false)
  const [salles, setSalles] = useState([])
  const [data, setData] = useState([])

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


  const EditItemWithDynamicTitle = (props) => {
    console.log({ "da": props.dataItem })
    const [classesLoaded, setClassesLoaded] = useState(false)
    const [matieresLoaded, setMatieresLoaded] = useState(false)
    const [matieres, setMatieres] = useState([])
    const [classes, setClasses] = useState([])

    useEffect(() => {
      if (!classesLoaded) {
        fetch("http://localhost:4000/classes").then(response =>
          response.json()
        ).then(data => {
          setClasses(data)
          console.log(classes)
          setClassesLoaded(true)
        }).catch(err => {
          console.log(err)
        })
      }
      if (!matieresLoaded) {
        fetch("http://localhost:4000/matieres").then(response =>
          response.json()
        ).then(data => {
          setMatieres(data)
          console.log(matieres)
          setMatieresLoaded(true)
        }).catch(err => {
          console.log(err)
        })

      }
    })
    console.log({ "GeneratedataItem": props.dataItem })
    const classe = classes.find((p) => p._id === props.dataItem.Classe._id);
    const matiere = matieres.find((t) => t._id === props.dataItem.Matiere._id);
    return <SchedulerEditItem {...props} title={`${classe && classe.nom} - ${matiere && matiere.libele}`} />;

  }


  useEffect(() => {
    if (!sallesLoaded) {
      fetch("http://localhost:4000/salles").then(response =>
        response.json()
      ).then(data => {
        setSalles(data)
        setSallesLoaded(true)


      }).catch(err => {
        console.log(err)
      })
    }
  }, [salles])

  useEffect(() => {
    if (!seancesLoaded) {
      fetch("http://localhost:4000/seances").then(response =>
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



  const handleViewChange = React.useCallback(
    (event) => {
      setView(event.value);
    },
    [setView]
  );
  const handleDateChange = React.useCallback(
    (event) => {
      setDate(event.value);
    },
    [setDate]
  );

  const handleOrientationChange = React.useCallback((event) => {
    setOrientation(event.target.getAttribute("data-orientation"));
  }, []);
  const handleDataChange = React.useCallback(
    ({ created, updated, deleted }) => {
      setData((old) =>
        old
          .filter(
            (item) =>
              deleted.find((current) => current._id === item._id) ===
              undefined
          )
          .map(
            (item) =>
              updated.find((current) => current._id === item._id) || item
          )
          .concat(
            created.map((item) =>
              Object.assign({}, item, {
                _id: guid(),
              })
            )
          )
      );
    },
    [setData]
  );
  return (
    <div>
      {console.log(data)}
      <div className="example-config">
        <div className="row">
          <div className="col">
            <h5>الاتجاه:</h5>
            <input
              type="radio"
              name="orientation"
              id="horizontal"
              data-orientation="horizontal"
              className="k-radio"
              checked={orientation === "horizontal"}
              onChange={handleOrientationChange}
            />
            <label className="k-radio-label" htmlFor="horizontal">
              أفقي
            </label>
            <br />
            <input
              type="radio"
              name="orientation"
              id="vertical"
              data-orientation="vertical"
              className="k-radio"
              checked={orientation === "vertical"}
              onChange={handleOrientationChange}
            />
            <label className="k-radio-label" htmlFor="vertical">
              عمودي
            </label>
          </div>
        </div>
      </div>
      <LocalizationProvider language={locale.language}>
        <IntlProvider locale={locale.locale}>
          <Scheduler
            data={data}
            onDataChange={handleDataChange}
            editable={true}


            view={view}
            onViewChange={handleViewChange}
            defaultDate={date}
            onDateChange={handleDateChange}
            timezone={timezone}
            modelFields={customModelFields}

            group={{
              resources: ["Rooms"],
              orientation,
            }}
            resources={[
              {
                name: "Rooms",
                data: salles,
                field: "Room",
                valueField: "id",
                textField: "title",
                colorField: "color",
              },
            ]}
            editItme={EditItemWithDynamicTitle}
            form={FormWithCustomEditor}
          >
            <TimelineView />
            <DayView />
            <WeekView />
            <MonthView />
            <AgendaView />
          </Scheduler>
        </IntlProvider>
      </LocalizationProvider>
    </div>
  );
};

