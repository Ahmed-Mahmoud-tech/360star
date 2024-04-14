import React, { useEffect, useRef, useState } from 'react';
import clickIcon from './assets/images/click.png';
import { models } from './objects';
import StartingPopUp from './components/StartingPopUp/StartingPopUp';
import mapIcon from './assets/images/mapIcon.png'
import map from './assets/images/map.png'
const currentModel = 'star';

const points = models[currentModel].points

// let currentPoint = 0;
// const setCurrentPoint = (x) => { 
//   currentPoint = x
// }

function App() {
   
  const [startingPopUp, setStartingPopUp] = useState(true)
  const [mapStatus, setMapStatus] = useState(false)
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

const [currentPoint, setCurrentPoint] = useState(0)
const [oldPoint, setOldPoint] = useState(0)
const [isFirstSky, setIsFirstSky] = useState(true)
// const [toggleCursor, setToggleCursor] = useState(true)

  // const images = [process.env.PUBLIC_URL + '/assets/images/1.jpg', process.env.PUBLIC_URL + '/assets/images/2.jpg', process.env.PUBLIC_URL + '/assets/images/3.jpg', process.env.PUBLIC_URL + '/assets/images/4.jpg', process.env.PUBLIC_URL + '/assets/images/5.jpg', process.env.PUBLIC_URL + '/assets/images/6.jpg', process.env.PUBLIC_URL + '/assets/images/7.jpg', process.env.PUBLIC_URL + '/assets/images/8.jpg', process.env.PUBLIC_URL + '/assets/images/9.jpg', process.env.PUBLIC_URL + '/assets/images/10.jpg', process.env.PUBLIC_URL + '/assets/images/11.jpg', process.env.PUBLIC_URL + '/assets/images/12.jpg', process.env.PUBLIC_URL + '/assets/images/13.jpg', process.env.PUBLIC_URL + '/assets/images/14.jpg', process.env.PUBLIC_URL + '/assets/images/15.jpg'];

  const  changeSky = (current, next) => {
    // console.log(current, next,)
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
 
    
// document.querySelector("canvas").style.transform ="scale(1.2)"    
// document.querySelector("canvas").style.transition ="0.1s"      
//     setTimeout(() => {
// document.querySelector("canvas").style.transform ="scale(1)"      
// document.querySelector("canvas").style.transition ="0s"      
//     }, 200);
    document.querySelector(current).setAttribute('radius',  '100')
    document.querySelector(next).setAttribute('radius', '101')

  }

   const move = (index) => {
   
    setIsFirstSky(!isFirstSky);
    isFirstSky ? changeSky('#fSky', '#fSky2') : changeSky('#fSky2', '#fSky')
      console.log("newPoint", index);
         setCurrentPoint(index)
        setTimeout(() => {
          setOldPoint(index)
        }, 505);
 
  }
  
   
   const disablePointerLock = () => {
      document.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock || document.webkitExitPointerLock;
     document.exitPointerLock();
 }

  
  const getAngleBetween = (deg1, deg2) => {
    // Calculate the raw difference between the degrees
    let rawDifference = deg2 - deg1;

    // Normalize the raw difference to be within the range [-180, 180]
    while (rawDifference > 180) {
        rawDifference -= 360;
    }
    while (rawDifference <= -180) {
        rawDifference += 360;
    }

    // Return the absolute value of the normalized difference
    return Math.abs(rawDifference);
  }

  const findNearestPoint = (x, neighbors) => {
  // Normalize x to be within the range [0, 360)
  x = (x % 360 + 360) % 360;
  
  // Sort the neighbors array based on the degree values
  neighbors.sort((a, b) => a.degree - b.degree);
  
  // Initialize variables to store the nearest degree and image index
  let nearestDegree = neighbors[0].degree;
  let nearestImageIndex = neighbors[0].imageIndex;
  
  // Loop through the neighbors array to find the nearest point
  for (let i = 1; i < neighbors.length; i++) {
    const prevDegree = neighbors[i - 1].degree;
    const currDegree = neighbors[i].degree;
    
    // Check if x is between the previous and current degrees
    if (x >= prevDegree && x <= currDegree) {
      // Determine the nearest degree based on the midpoint between the previous and current degrees
      nearestDegree = Math.abs(x - prevDegree) < Math.abs(x - currDegree) ? prevDegree : currDegree;
      nearestImageIndex = nearestDegree === prevDegree ? neighbors[i - 1].imageIndex : neighbors[i].imageIndex;
      break;
    }
  }
  
  return { degree: nearestDegree, imageIndex: nearestImageIndex };
  }

  const beforeMove = (yRotation, neighbors) => {
    const nearest = findNearestPoint(yRotation, neighbors)
    
    // Return the first element (nearest neighbor) from the sorted array
    if (getAngleBetween(yRotation, nearest.degree) < 70) {
        // console.log(yRotation , nearest.degree, getAngleBetween(yRotation, nearest.degree) < 70, "in",  nearest.imageIndex);
        move(nearest.imageIndex)
    }
  }
  
const scene = useRef()

  const clickMovement = () => { 
    console.log(startingPopUp, "startingPopUp");
    const yRotation = ((document.querySelector('a-camera').getAttribute('rotation').y % 360) + 360) % 360
    beforeMove(yRotation, points[currentPoint].neighbors )
  }

  useEffect(() => {
    
        scene.current.addEventListener('click', ()=> console.log("000000"))
        // scene.current.addEventListener('click', clickMovement) 
        // scene.current.addEventListener('dblclick', disablePointerLock)
        // if (document.pointerLockElement === null) { 
        //   scene.current.addEventListener('click', clickMovement)
        // }

     /***************** */

    if ('Gyroscope' in window) {
        let gyroscope = new window.Gyroscope({frequency: 60});

        // gyroscope.addEventListener('reading', e => {
        //     console.log("Angular velocity along the X-axis " + gyroscope.x);
        //     console.log("Angular velocity along the Y-axis " + gyroscope.y);
        //     console.log("Angular velocity along the Z-axis " + gyroscope.z);
        // });
        gyroscope.start();
    } else {
        console.log("Gyroscope API is not supported in this browser.");
    }
     
     
       return () => { 
        scene.current?.removeEventListener('click', clickMovement)
        scene.current?.removeEventListener('dblclick', disablePointerLock)
       }
     
   }, [currentPoint])
   
     
  return (
    <>
      {!isMobile && startingPopUp && <StartingPopUp setStartingPopUp={setStartingPopUp} />}
      {!isMobile && <span className='cross' style={{ backgroundImage: `url(${clickIcon}` }}>  </span>}
      {map && <span className= {`mapIcon ${mapStatus && 'active'}`} onClick={()=> setMapStatus(!mapStatus)} ><img src={mapIcon} alt="mapIcon" /></span> }
      {mapStatus && <div className='map'>
        <img src={map} alt="map" className='mapImage' />

        <div className="pins">
          {models[currentModel].points.map((point, index) => {
             return  <span key={index}  style={{ right: point.map.x + '%' , top: point.map.y + '%' }} className={`pinIcon ${ index == currentPoint && 'active'}`} onClick={()=> {move(index)}}></span>
           })}
        </div>
      </div>}
      <a-scene cursor="rayOrigin: mouse" ref={scene}>
 
        {/* <a-camera wasd-controls='acceleration=1' id="camera"  rotation="0 0 0" reverseMouseDrag="true" pointerLockEnabled="true"></a-camera> */}
        <a-camera look-controls="pointerLockEnabled:true;magicWindowTrackingEnabled:true;enabled:true" wasd-controls='acceleration=1;' reverseMouseDrag="true" id="camera" >
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
            <a-triangle className="clickable" rotation="-90 0 0" material="shader:flat; color:black" geometry="" position="0 0.6 -9" scale="2 2 2"
              // onClick={() => move(neighbor.imageIndex)}
              animation="property: material.opacity; from: 0.5; to: 0; dur: 1000; dir: alternate; loop: true;"></a-triangle>
          </a-entity>
        )}

      </a-scene>
 
   

    </>
  );
}

export default App;
