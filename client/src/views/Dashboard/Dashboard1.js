import React, { useState, useEffect } from "react";
import CanvasJSReact from './canvasjs.react';
import { makeStyles } from "@material-ui/core/styles";
import Store from "@material-ui/icons/Store";
import DateRange from "@material-ui/icons/DateRange";
import Update from "@material-ui/icons/Update";
import Accessibility from "@material-ui/icons/Accessibility";
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardIcon from "../../components/Card/CardIcon.js";
import CardFooter from "../../components/Card/CardFooter.js";

import styles from "../../assets/jss/material-dashboard-react/views/dashboardStyle.js";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
const useStyles = makeStyles(styles);

export default function Dashboard() {
  const classes = useStyles();
  const [nbEleves, setNbEleves] = useState(0)
  const [nbEnseignants, setNbEnseignants] = useState(0)
  const [nbSalles, setNbSalles] = useState(0)
  useEffect(()=>{
    fetch("http://localhost:4000/salles/count").then(response =>
    response.json()
  ).then(data => {
    setNbSalles(data)
    console.log(data)
  }).catch(err => {
    console.log(err)
  })

  fetch("http://localhost:4000/eleves/count").then(response =>
    response.json()
  ).then(data => {
    setNbEleves(data)
    console.log(data)
  }).catch(err => {
    console.log(err)
  })

  fetch("http://localhost:4000/salles/count").then(response =>
    response.json()
  ).then(data => {
    setNbEnseignants(data)
    console.log(data)
  }).catch(err => {
    console.log(err)
  })

  },[])
  


  const options1 = {
    animationEnabled: true,
    exportEnabled: true,
    theme: "light1", 
    title: {
      text: " توزيع المعدلات لسنة 2021"
    },
    data: [{
      type: "pie",
      indexLabel: " %{y} : {label}",
      startAngle: -90,
      dataPoints: [
        { y: 60, label: "أكثر من 14" },
        { y: 20, label: "بين 12 و 14" },
        { y: 10, label: "بين 10 و 12" },
        { y: 6, label: "بين 9 و 10" },
        { y: 4, label: "أقل من 9" }
      ]
    }]
  }


  const options2 = {
    title: {
      text: "نتائج مناظرة الالتحاق بالمدارس الاعدادية النموذجية"
    },
    data: [
      {
        type: "column",
        indexLabel: " % {y} ",
        dataPoints: [
          { label: "2016", y: 67 },
          { label: "2017", y: 62 },
          { label: "2018", y: 75 },
          { label: "2019", y: 65 },
          { label: "2020", y: 61 },
          { label: "2021", y: 72 }
        ]
      }
    ]
  }


  const options3 = {
    animationEnabled: true,
    title: {
      text: "نسبة الحضور"
    },
    subtitles: [{
      text: "",
      verticalAlign: "center",
      fontSize: 24,
      dockInsidePlotArea: true
    }],
    data: [{
      type: "doughnut",
      showInLegend: true,
      indexLabel: " {y} : {name}",
      yValueFormatString: "#,'%'###",
      dataPoints: [
        { name: "الحضور ", y: 80 },
        { name: "الغياب", y: 20 }
      ]
    }]
  }
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <Store />
              </CardIcon>
              <p className={classes.cardCategory}>عدد القاعات</p>
              <h3 className={classes.cardTitle}>{nbSalles}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                Last 24 Hours
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Accessibility />
              </CardIcon>
              <p className={classes.cardCategory}> عدد المعلمين</p>
              <h3 className={classes.cardTitle}>{nbEnseignants}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Update />
                Just Updated
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Accessibility />
              </CardIcon>
              <p className={classes.cardCategory}>عدد التلاميذ</p>
              <h3 className={classes.cardTitle}>{nbEleves}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Update />
                Just Updated
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <div>
        <div>
          <CanvasJSChart options={options3}
          />
        </div>
        <br></br>
        <br></br>
        <br></br>
        <div>
          <CanvasJSChart options={options2}
          />
        </div>
        <br></br>
        <br></br>
        <br></br>
        <div>
          <CanvasJSChart options={options1}
          />
        </div>
      </div>
      <br></br>
      <br></br>
      <br></br>
     
    </div>
  );
}
