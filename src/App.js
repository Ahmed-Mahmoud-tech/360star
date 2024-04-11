import React, { useEffect, useState } from 'react';
import clickIcon from './assets/images/click.png';
import { models } from './objects';
import StartingPopUp from './components/StartingPopUp/StartingPopUp';
const currentModel = 'star';


const points = models[currentModel].points

function App() {
   
  const [startingPopUp, setStartingPopUp] = useState(true)
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

const [currentPoint, setCurrentPoint] = useState(0)
const [oldPoint, setOldPoint] = useState(0)
const [isFirstSky, setIsFirstSky] = useState(true)
// const [toggleCursor, setToggleCursor] = useState(true)

  // const images = [process.env.PUBLIC_URL + '/assets/images/1.jpg', process.env.PUBLIC_URL + '/assets/images/2.jpg', process.env.PUBLIC_URL + '/assets/images/3.jpg', process.env.PUBLIC_URL + '/assets/images/4.jpg', process.env.PUBLIC_URL + '/assets/images/5.jpg', process.env.PUBLIC_URL + '/assets/images/6.jpg', process.env.PUBLIC_URL + '/assets/images/7.jpg', process.env.PUBLIC_URL + '/assets/images/8.jpg', process.env.PUBLIC_URL + '/assets/images/9.jpg', process.env.PUBLIC_URL + '/assets/images/10.jpg', process.env.PUBLIC_URL + '/assets/images/11.jpg', process.env.PUBLIC_URL + '/assets/images/12.jpg', process.env.PUBLIC_URL + '/assets/images/13.jpg', process.env.PUBLIC_URL + '/assets/images/14.jpg', process.env.PUBLIC_URL + '/assets/images/15.jpg'];

  const  changeSky = (current, next) => {
    console.log(current, next,)
    // if (oldPoint == 1) { setOldPoint(0); setCurrentPoint(1) } else { setOldPoint(1); setCurrentPoint(0) }
    document.querySelector(next).setAttribute('animation', {
      property: 'material.opacity',
      from: 0,
      delay: 0, 
      to: 1,  // Target opacity (1 for fully visible)
      dur: 0,  // Duration of the animation in milliseconds
      easing: 'linear'
    })
    document.querySelector(current).setAttribute('animation', {
      property: 'material.opacity',
      delay: 0, 
        from:1,
        to: 0,  // Target opacity (1 for fully visible)
        dur: 505,  // Duration of the animation in milliseconds
        easing: 'linear'
    })
 
    
    document.querySelector(current).setAttribute('radius',  '100')
    document.querySelector(next).setAttribute('radius', '101')

  }

   const move = (index) => {
   
    setIsFirstSky(!isFirstSky);
    isFirstSky ? changeSky('#fSky', '#fSky2') : changeSky('#fSky2', '#fSky')
 
         setCurrentPoint(index)
        setTimeout(() => {
          setOldPoint(index)
        }, 505);
 
  }
 

//    useEffect(() => {
   
//      const toggleCursorFunction = () => {
       
//        setToggleCursor(false);
//        setTimeout(() => {
//          setToggleCursor(true);
//         }, 100);
//      }
     
//  document.querySelector('body').addEventListener('click', function() {
//     toggleCursorFunction();
//        });
     

//    }, [])
   
   const disablePointerLock = () => {
      document.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock || document.webkitExitPointerLock;
     document.exitPointerLock();
 }

 
   useEffect(() => {
     setTimeout(() => {
       const canvas = document.querySelector('canvas');
       canvas.addEventListener('dblclick', disablePointerLock)
      }, 1000);
     
     
     
     /***************** */


       if ('Gyroscope' in window) {
        let gyroscope = new window.Gyroscope({frequency: 60});

        gyroscope.addEventListener('reading', e => {
            console.log("Angular velocity along the X-axis " + gyroscope.x);
            console.log("Angular velocity along the Y-axis " + gyroscope.y);
            console.log("Angular velocity along the Z-axis " + gyroscope.z);
        });
        gyroscope.start();
    } else {
        console.log("Gyroscope API is not supported in this browser.");
    }
   }, [])
   
     
  return (
    <>
      {!isMobile && startingPopUp && <StartingPopUp setStartingPopUp={setStartingPopUp} />}
      {!isMobile && <span className='cross' style={{backgroundImage: `url(${clickIcon}`}}>  </span>}
      <a-scene cursor="rayOrigin: mouse" >
 
        {/* <a-camera wasd-controls='acceleration=1' id="camera"  rotation="0 0 0" reverseMouseDrag="true" pointerLockEnabled="true"></a-camera> */}
        <a-camera look-controls="pointerLockEnabled:true;magicWindowTrackingEnabled:true" wasd-controls='acceleration=1;' reverseMouseDrag="true" id="camera" >
         {/* {<a-entity

            cursor="fuse: false"
            position="0 0 -0.01"
            geometry="primitive: ring; radiusInner: 0; radiusOuter: 0.0001"
            material="color: red; shader: flat">
  </a-entity>} */}

              <a-entity  cursor="click:true;"  position="0 0 -1"  geometry="primitive: ring; radiusInner: 0.025; radiusOuter: 0.03" material=" shader:flat; opacity:0"
                        raycaster="object: .dinosaurmodel"></a-entity>
</a-camera>
{/* <a-entity raycaster="showLine: true; far: 200; lineColor: red; lineOpacity: 0.5"></a-entity> */}
{/* <a-camera look-controls="reverseMouseDrag:true" wasd-controls='acceleration=1' reverseMouseDrag="true"  id="camera" ></a-camera> */}

        <a-sky
          radius="100"
          rotation="0 270 0"
          position="0 0 0"
          // position="-70 0 150"
          side="double"
          id="fSky"
          material=" transparent: false; opacity: 1;"
          // src={points[0].image}
           src={points[isFirstSky ? currentPoint : oldPoint].image}
          >
        </a-sky>
        <a-sky
          radius="100"
          rotation="0 270 0"
          position="0 0 0"
          // position="70 0 150"
          side="double"
          id="fSky2"
          material=" transparent: false; opacity: 0;"
          // src={points[1].image}
          src={points[isFirstSky ? oldPoint : currentPoint].image}
        > 
        </a-sky>
   
        {points[currentPoint].neighbors.map((neighbor, index) => 
          <a-entity key={Math.random()} position="0 -5 0" rotation={`0 ${neighbor.degree} 0`} className="" >
            <a-triangle className="clickable" rotation="-90 0 0" material="shader:flat; color:black" geometry="" position="0 0.6 -9" scale="2 2 2" onClick={() => move(neighbor.imageIndex)} animation="property: material.opacity; from: 0.5; to: 0; dur: 1000; dir: alternate; loop: true;"></a-triangle>
          </a-entity>
        )}

      </a-scene>
 
      {/* <button onClick={()=>move()} className='fixed top-0 left-10 z-50 '>move</button> */}
      {/* <button onClick={() => {
        move(0);
      }} className='fixed top-0 left-10 z-50 '>zero</button>
      <button onClick={() => {
        move(1);
      }} className='fixed top-0 left-10 z-50 '>one</button>
      <button onClick={() => {
        move(2);
      }} className='fixed top-0 left-10 z-50 '>two</button> */}


      {/* /********************************** */}
      {/* <button   className='fixed top-0 left-10 z-50 '>{isFirstSky.toString()}</button>
      <button   className='fixed top-0 left-10 z-50 '>{oldPoint}</button>
      <button   className='fixed top-0 left-10 z-50 '>{currentPoint}</button> */}

      
    
      
      
    </>
  );
}

export default App;
