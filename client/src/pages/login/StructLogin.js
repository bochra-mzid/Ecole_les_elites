import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import { Avatar } from '@material-ui/core';
import Login from './Login';
import img1 from "../../assets/img/ad1.jpg";
import img2 from "../../assets/img/prof.png"
import Tooltip from '@material-ui/core/Tooltip';


const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: "70vw",
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  photo :{
      marginLeft : '60%' ,
  },
}));


export default function StructLogin() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [id, setId]= useState()


  const steps = ['فضاء', 'الدخول'];

function getStepContent(step) {
  switch (step) {
    case 0:
      return 0;
    case 1:
      return <Login id={id} />;
    default:
      throw new Error('Unknown step');
  }
}

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            تسجيل الدخول
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length -1 ? (
              <React.Fragment>
                {getStepContent(activeStep)}
              </React.Fragment>
            ) : (
              <React.Fragment>
                <div className={classes.root}>
                  <Tooltip title="الإدارة"><Avatar onClick={()=>{
                    handleNext()
                  setId('administrateur')}} src={img1}  className={classes.large}/></Tooltip>
                  <div className={classes.photo}><Tooltip title="المعلمين"><Avatar onClick={()=>{
                    handleNext()
                  setId('enseignant')}} src={img2} className={classes.large}/></Tooltip></div>
                </div>


              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </main>
    </React.Fragment>
  );
}