import React from 'react'
import AirportShuttleIcon from '@material-ui/icons/AirportShuttle';
import LocalDiningIcon from '@material-ui/icons/LocalDining';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import './Services.css'

export default function Services() {
    return (
        <div id='features' className='text-center'>
            <div className='container'>
                <div className='col-md-10 col-md-offset-1 section-title'>
                    <h2>خدماتنا</h2>
                </div>
                <div className='row'>
                    <div className='col-xs-6 col-md-3'>

                        <AirportShuttleIcon color="primary" style={{ fontSize: 60 }} />
                        <h3>التوصيل.</h3>
                        <p>يضع معهدنا على ذمة تلاميه شاحناتان صغيرتان ليتم نقلهم من البيوتهم ألى المدرسة صباحا و إرجاعهم مساء </p>
                    </div>
                    <div  id='west' className='col-xs-6 col-md-3'>
                        <LocalDiningIcon color="primary" style={{ fontSize: 60 }} />
                        <h3>المطعم</h3>
                        <p>لأن العقل السليم في الجسم السليم يوفر مطعمنا أطيب الأطعمة لضمان صحة أولادنا العقلية و نموهم الجسدي</p>
                    </div>
                    <div id='ekher' className='col-xs-6 col-md-3'>
                        <LocalLibraryIcon color="primary" style={{ fontSize: 60 }} />
                        <h3>حضانة</h3>
                        <p>
من أجل ضمان التميز لطلابنا ، تقدم مدرستنا أنشطة رياضية وفكرية وثقافية بالإضافة إلى دروس تداركلجميع المستويات</p>
                    </div>
                   
                    
                </div>
            </div>

        </div>
    )
}



