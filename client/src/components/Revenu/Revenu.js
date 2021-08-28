import React from 'react'
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import CountUp from 'react-countup';
import FaceIcon from '@material-ui/icons/Face';
import './Revenu.css'
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';

export default function Revenu() {
    return (
        <div id='testimonials'>
            <div className='container'>
                <div className='section-title text-center'>
                    <h2>أرقامنا</h2>
                </div>
                

                <div className='row'>
                    <div className='col-xs-6 col-md-3'>

                        <EmojiPeopleIcon color="primary" style={{ fontSize: 60 }} />
                        <h1><CountUp end={150} duration={6} prefix='+' /></h1>
                        <p>معلم</p>
                    </div>
                    <div  id='west' className='col-xs-6 col-md-3'>
                        <FaceIcon id='face' color="primary" style={{ fontSize: 60 }} />
                        <h1><CountUp end={220} duration={6}  prefix='+' /></h1>
                        <p>تلميذ</p>
                    </div>
                    <div id='ekher' className='col-xs-6 col-md-3'>
                        <DoneOutlineIcon color="primary" style={{ fontSize: 60 }} />
                        <h1><CountUp end={60} duration={6} prefix='+' suffix='%' /></h1>
                        <p>مقبولون في مناظرة الدخول إلى المعاهد النموذجية</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

