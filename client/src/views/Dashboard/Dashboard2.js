import React, {useState, useEffect} from "react";
import CanvasJSReact from './canvasjs.react';
import { saveAs } from "file-saver";
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import Button from '@material-ui/core/Button';
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

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
const useStyles = makeStyles(styles);


const downlaodImage1 = () => {
    saveAs('https://madrassatii.com/wp-content/uploads/2018/09/%D8%B4%D9%87%D8%A7%D8%AF%D8%A9-%D8%AD%D8%B6%D9%88%D8%B1-%D9%88-%D8%B4%D9%87%D8%A7%D8%AF%D8%A9-%D9%85%D8%AF%D8%B1%D8%B3%D9%8A%D8%A9-%D8%AE%D8%A7%D8%B5%D8%A9-%D8%A8%D9%85%D8%AF%D9%8A%D8%B1-%D8%A7%D9%84%D9%85%D8%B9%D9%87%D8%AF-madrassatii.com_002.png',
        'image.jpg') // Put your image url here.
}

const downlaodImage2 = () => {
    saveAs('https://1.bp.blogspot.com/-VmFdohKH8a0/V4lOxuvuo_I/AAAAAAAAjvQ/8tfEkIT5CF8fb1JO4mNaxIjY2MNVo2IPgCLcB/s1600/4.jpg',
        'image.jpg') // Put your image url here.
}

const downlaodImage3 = () => {
    saveAs('https://madrassatii.com/wp-content/uploads/2019/09/69505954_666541107176343_7060140719465299968_n.jpg',
        'image.jpg') // Put your image url here.
}


export default function Dashboard() {
    const classes = useStyles();
    const [nbEleves, setNbEleves] = useState(0)
    const [nbEnseignants, setNbEnseignants] = useState(0)
    const [nbSalles, setNbSalles] = useState(0)
    useEffect(() => {
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

    }, [])



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
            text: "عدد التلاميذ"
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
                { name: "اناث ", y: 55 },
                { name: "ذكور", y: 45 }
            ]
        }]
    }
    return (
        <div>
            <GridContainer>
                <GridItem xs={12} sm={6} md={3}>
                    <Card>
                        <CardHeader color="danger" stats icon>
                            <CardIcon color="danger">
                                <Icon><h9>الوثائق  لترسيم الأطفال</h9></Icon>
                            </CardIcon>
                            <br></br>
                            <br></br>
                            <p className={classes.cardCategory}></p>
                            <br></br>
                            <br></br>
                            <h3 className={classes.cardTitle}></h3>
                            <br></br>
                            <br></br>
                            <Button variant="contained" color="primary" onClick={downlaodImage2}>
                                استخراج
                            </Button>
                        </CardHeader>
                        <CardFooter stats>
                            <div className={classes.stats}>
                            </div>
                        </CardFooter>
                    </Card>
                </GridItem>
                <GridItem xs={12} sm={6} md={3}>
                    <Card>
                        <CardHeader color="warning" stats icon>
                            <CardIcon color="primary">
                                <Icon>رزنامة العطل المدرسية</Icon>
                            </CardIcon>
                            <br></br>
                            <br></br>
                            <br></br>
                            <h3 className={classes.cardTitle}>
                                <br></br>
                                <br></br>
                            </h3>
                            <Button variant="contained" color="secondary" onClick={downlaodImage3}>
                                استخراج
                            </Button>
                        </CardHeader>
                        <CardFooter stats>
                        </CardFooter>
                    </Card>
                </GridItem>
                <GridItem xs={12} sm={6} md={3}>
                    <Card>
                        <CardHeader color="warning" stats icon>
                            <CardIcon color="warning">
                                <Icon>شهادة حضور</Icon>
                            </CardIcon>
                            <br></br>
                            <h3 className={classes.cardTitle}>
                                <br></br>
                                <br></br>
                            </h3>
                            <Button variant="contained" color="secondary" onClick={downlaodImage1}>
                                استخراج
                            </Button>
                        </CardHeader>
                        <CardFooter stats>
                        </CardFooter>
                    </Card>
                </GridItem>
                <GridItem>

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
            </GridContainer>
            <div>
                <div>
                    <CanvasJSChart options={options3}
                    /* onRef={ref => this.chart = ref} */
                    />
                    {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
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