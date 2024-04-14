import React, { useEffect, useRef, useState } from 'react';
import clickIcon from './assets/images/click.png';
import { models } from './objects';
import StartingPopUp from './components/StartingPopUp/StartingPopUp';
import mapIcon from './assets/images/mapIcon.png'
import map from './assets/images/map.png'
const currentModel = 'star';

const points = models[currentModel].points

function App() {
   
  const [startingPopUp, setStartingPopUp] = useState(true)
  const [mapStatus, setMapStatus] = useState(false)
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const [currentPoint, setCurrentPoint] = useState(0)
  const [oldPoint, setOldPoint] = useState(0)
  const [isFirstSky, setIsFirstSky] = useState(true)
  const [currentPointTimeGapStatus, setCurrentPointTimeGapStatus] = useState(true)
   

  const moveTimeGap = () => {
    setCurrentPointTimeGapStatus(false);
    setTimeout(() => {
      setCurrentPointTimeGapStatus(true);
    }, 500);
}

  
        // Define the animation function
      function animateScale(targetElement, targetScale, duration) {
        var initialScale = targetElement.getAttribute('scale');
        var startTime = performance.now();

        function updateScale(currentTime) {
          var elapsed = currentTime - startTime;
          var progress = elapsed / duration;

          if (progress >= 1) {
            // Animation complete
            targetElement.setAttribute('scale', targetScale.x + ' ' + targetScale.y + ' ' + targetScale.z);
          } else {
            // Animation still in progress
            var currentScale = {
              x: initialScale.x + (targetScale.x - initialScale.x) * progress,
              y: initialScale.y + (targetScale.y - initialScale.y) * progress,
              z: initialScale.z + (targetScale.z - initialScale.z) * progress
            };
            targetElement.setAttribute('scale', currentScale.x + ' ' + currentScale.y + ' ' + currentScale.z);
            requestAnimationFrame(updateScale);
          }
        }

        requestAnimationFrame(updateScale);
      }


  
  const  changeSky = (current, next) => {
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




    /**************************************************** */
 

      // Define the target scale
      var targetScale = { x: 2, y: 2, z: 2 };

      // Define the animation duration in milliseconds
      var duration = 3000;


      // Call the animation function
    // animateScale(document.querySelector(current), targetScale, duration);


  }

  const move = (index) => {
    console.log(currentPointTimeGapStatus, "currentPointTimeGapStatus");
    if (currentPointTimeGapStatus) {
      setIsFirstSky(!isFirstSky);
     isFirstSky ? changeSky('#fSky', '#fSky2') : changeSky('#fSky2', '#fSky')
     console.log("newPoint", index);
     setCurrentPoint(index)
     setTimeout(() => {
       setOldPoint(index)
      }, 505);
      moveTimeGap()}
  }
  
   
   const disablePointerLock = () => {
      document.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock || document.webkitExitPointerLock;
     document.exitPointerLock();
 }

  const beforeMove = (yRotation, neighbors, range = 70) => {
    let index;
    let smallestDegree = range + 1
    const small = yRotation - (range / 2);
    const big = (yRotation + (range / 2));

    neighbors.map((neighbor) => {
      const smallIfDegree = (neighbor.degree - small + 360) % 360
      const bigIfDegree = (big - neighbor.degree + 360) % 360

      if (smallIfDegree < smallestDegree) {
        index = neighbor.imageIndex;
        smallestDegree = smallIfDegree;
      }
      if ( bigIfDegree < smallestDegree) {
        smallestDegree = bigIfDegree;
        index = neighbor.imageIndex
      }
    })
    
    console.log(yRotation, neighbors, index, small, big );

    if (index >= 0) move(index)
  }



  
const scene = useRef()

  const clickMovement = () => { 
    console.log("11111111111111111");

    const yRotation = ((document.querySelector('a-camera').getAttribute('rotation').y % 360) + 360) % 360
    beforeMove(yRotation, points[currentPoint].neighbors )
  }

  useEffect(() => {
    
        scene.current.addEventListener(isMobile ? 'touchstart' : 'click', clickMovement) 
        scene.current.addEventListener('dblclick', disablePointerLock)
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
     
   }, [currentPoint, currentPointTimeGapStatus])
   
     
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
      <a-scene ref={scene}>
      {/* <a-scene cursor="rayOrigin: mouse" ref={scene}> */}
         <a-camera look-controls="pointerLockEnabled:true;magicWindowTrackingEnabled:true;enabled:true" wasd-controls='acceleration=1;' reverseMouseDrag="true" id="camera" >
              {/* <a-entity  cursor="click:true;"  position="0 0 -1"  geometry="primitive: ring; radiusInner: 0.025; radiusOuter: 0.03" material=" shader:flat; opacity:0" raycaster="object: .dinosaurmodel"></a-entity> */}
        </a-camera>
        {/* <a-camera look-controls="reverseMouseDrag:true" wasd-controls='acceleration=1' reverseMouseDrag="true"  id="camera" ></a-camera> */}

        <a-sky
          radius="100"
          rotation="0 270 0"
          position="0 0 0"
          side="double"
          id="fSky"
          material=" transparent: false; opacity: 1;"
          src={points[isFirstSky ? currentPoint : oldPoint].image}
          scale="1 1 1"
          >
        </a-sky>
        <a-sky
            scale="1 1 1"
          radius="100"
          rotation="0 270 0"
          position="0 0 0"
          side="double"
          id="fSky2"
          material=" transparent: false; opacity: 0;"
          src={points[isFirstSky ? oldPoint : currentPoint].image}
        > 
        </a-sky>
   
        {points[currentPoint].neighbors.map((neighbor, index) => 
          <a-entity key={Math.random()} position="0 -5 0" rotation={`0 ${neighbor.degree} 0`} className="" >
            <a-triangle className="clickable" rotation="-90 0 0" material="shader:flat; color:#fde337" geometry="" position="0 0.6 -9" scale="2 2 2"
              // onClick={() => alert(neighbor.imageIndex)}
              animation="property: material.opacity; from: 0.5; to: 0; dur: 500; dir: alternate; loop: true;"></a-triangle>
            <a-triangle className="clickable" rotation="-90 0 0" material="shader:flat; color:#fde337" geometry="" position="0 1.1 -9" scale="1.5 1.5 1.5"
              // onClick={() => alert(neighbor.imageIndex)}
              animation="property: material.opacity; delay: 100; from: 0.5; to: 0; dur: 500; dir: alternate; loop: true;"></a-triangle>
            <a-triangle className="clickable" rotation="-90 0 0" material="shader:flat; color:#fde337" geometry="" position="0 1.6 -9" scale="1 1 1"
              // onClick={() => alert(neighbor.imageIndex)}
              animation="property: material.opacity; delay: 200; from: 0.5; to: 0; dur: 500; dir: alternate; loop: true;"></a-triangle>
          </a-entity>
        )}

      </a-scene>
 
   

    </>
  );
}

export default App;
