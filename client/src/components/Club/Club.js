import React from 'react'
import "./Club.css"

export default function Club (props){
  return (
    <div id='club' className='text-center'>
      <div className='container' style={{width:"100%"}}>
        <div className='col-md-8 col-md-offset-2 section-title'>
          <h2>النوادي</h2>
          <p style={{textAlign:"center"}}> 
          الحياة المدرسية لا تنتهي بعد الدرس<br/>
          من بين أمور أخرى ، يستفيد الطلاب من العديد من النوادي
         <br/>
         هذا يهدف إلى إيقاظ الذوق واكتشاف المواهب وخلق أماكن للوفاء 
          </p>
        </div>
        <div id='row'>
          {props.data
            ? props.data.map((d, i) => (
              <div key={`${d.name}-${i}`} className='col-lg-3 col-md-6 col-sm-6 Club'>
                <div class="card" style={{backgroundImage: `url(${d.img})`}}>
                  <div class="card-body">
                    <br/>
                    <br/>
                    <h2 class="card-title">{d.name}</h2>
                    <p>{d.description}</p>
                    <a href="#" class="button">+</a>
                  </div>
                </div>
                </div>
            ))
            : 'loading'}
        </div>
      </div>
    </div>
  )
}
