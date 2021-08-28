import React, { useState, useEffect } from 'react'
import './Gallery.css'
import { photos } from './Data'
import Button from './Button'
import { SRLWrapper } from "simple-react-lightbox";
import Zoom from 'react-reveal/Zoom';


export default function Gallery (props){
  const [event, setEvent] = useState('All')
    const [filteredPhotos, setFilteredPhotos] = useState([])
    const options = {
        buttons: {
            showDownloadButton: false,
            showFullscreenButton: false,
            showThumbnailsButton: true,
            showAutoplayButton: false,
        },
        thumbnails: {
            showThumbnails: true,
        }
    }
    useEffect(() => {
        if (event == "All") {
            setFilteredPhotos(photos)
        }
        else {
            setFilteredPhotos(photos.filter(photo => photo.event == event))
        }
    }, [event])
  return (
    <div id='portfolio' className='text-center'>
      <div className='container'>
        <div className='section-title'>
          <h2>ألبوم الصور</h2>
        </div>
        <div className="GalleryBody">
                <div className="GalleryWrapper">
                    <nav>
                        <div className="items">
                            <Button name="الكل" handleSetEvent={setEvent} />
                            <Button name="حفل إختتام السنة الدراسية" handleSetEvent={setEvent} />
                            <Button name="رحلة زغوان" handleSetEvent={setEvent} />
                            <Button name="رحلة المنستير" handleSetEvent={setEvent} />
                            <Button name="اليوم الوطني للباس التقليدي" handleSetEvent={setEvent} />
                        </div>
                    </nav>
                </div>
                <SRLWrapper options={options}>
                    <div className="gallery">
                        {filteredPhotos.map(photo =>
                            <Zoom>
                                <div key={photo.id} className="photo">
                                    <img srl_gallery_image="true" src={photo.img} className="photo" />
                                </div>
                            </Zoom>)}
                    </div>
                </SRLWrapper>
            </div>  
        </div>
      </div>
  )
}
