import React,{useEffect} from 'react'
import vid1 from '../Videos/vid1.mp4';
import vid2 from '../Videos/vid2.mp4';
import vid3 from '../Videos/vid3.mp4';

function Ioa() {
    const callback = (entries) => {
        entries.forEach((entry)=>{
            let ele = entry.target.childNodes[0];
            console.log(ele);
            //Play all the videos and stop only when it is niot paused already and not intersecting int 60%THRESHOLD
            ele.play().then(() => {
                if (!ele.isPaused && !entry.isIntersecting) {
                    ele.pause();
                } 
            })  
        })  
        //We have two methods
        //1.We can pause all the videos and play those videos which intersect
        //2.We can play all those videos and play those which doesn;t intersect
        //SInce HTMLMediaElement.play is asynchronous function if we play at the time of inteserction
        //we may get log because that is asuynchrnous
        //so we chose secnod method
    }
    let observer = new IntersectionObserver(callback, { threshold: 0.6 });
    useEffect(() => {
        const elements = document.querySelectorAll('.videos');
        elements.forEach((element)=>{
           observer.observe(element)
        })
    },[])
      
  return (
      <div className='video-cotainerss'>
          <div className="videos">
              <video src={vid1} muted="muted" style={{height:'85vh'}}></video>
          </div>
          <div className="videos">
              <video src={vid2} muted="muted" style={{height:'85vh'}}></video>
          </div>
          <div className="videos">
              <video src={vid3} muted="muted" style={{height:'85vh'}}></video>
          </div>
      
    </div>
  )
}

export default Ioa
