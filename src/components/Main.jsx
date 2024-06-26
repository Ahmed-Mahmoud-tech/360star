import React, { useEffect, useRef, useState } from 'react';
import clickIcon from '../assets/images/click.png';
import { models } from '../objects';
import StartingPopUp from '../components/StartingPopUp/StartingPopUp';
import mapIcon from '../assets/images/map2.png'
// import mapIcon from '../assets/images/mapIcon.png'
import vr from '../assets/images/vr.png'
 
import Loading from '../components/Loading/Loading';

import { useLocation } from 'react-router-dom';
 import { useParams } from 'react-router-dom';

let batchSize = 15;

function Main() {
   const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const start = parseInt(queryParams.get('start')) || 0;
  const { model } = useParams() || "tower"


  // const model = queryParams.get('model') || "tower";
  const map = models[model].map
  const points = models[model].points

    const [loadingStatus, setLoadingStatus] = useState(true)
  
  if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/env/sw.js')
      .then(registration => {
        console.log('Service Worker registered:', registration);
      })
      .catch(error => {
        console.error('Service Worker registration failed:', error);
      });
  });
}
   
  const [startingPopUp, setStartingPopUp] = useState(true)
  const [mapStatus, setMapStatus] = useState(false)
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const [currentPoint, setCurrentPoint] = useState(start)
  const [oldPoint, setOldPoint] = useState(start)
  const [isFirstSky, setIsFirstSky] = useState(true)
  const [currentPointTimeGapStatus, setCurrentPointTimeGapStatus] = useState(true)
   

  const moveTimeGap = () => {
    setCurrentPointTimeGapStatus(false);
    setTimeout(() => {
      setCurrentPointTimeGapStatus(true);
    }, 500);
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

    // if ('Gyroscope' in window) {
    //     let gyroscope = new window.Gyroscope({frequency: 60});

    //     // gyroscope.addEventListener('reading', e => {
    //     //     console.log("Angular velocity along the X-axis " + gyroscope.x);
    //     //     console.log("Angular velocity along the Y-axis " + gyroscope.y);
    //     //     console.log("Angular velocity along the Z-axis " + gyroscope.z);
    //     // });
    //     gyroscope.start();
    // } else {
    //     console.log("Gyroscope API is not supported in this browser.");
    // }

    /***************************** */
     // Check if the device supports DeviceMotionEvent
if (window.DeviceMotionEvent) {
    // Define a function to handle device motion events
    function handleMotion(event) {
        // Extract rotation rate data from the event
        var rotationRate = event.rotationRate;

        // Check if rotationRate is not null (available on some devices)
        if (rotationRate) {
            // Extract data for each axis (x, y, z)
            var alpha = rotationRate.alpha; // rotation rate around the z-axis
            var beta = rotationRate.beta;   // rotation rate around the x-axis
            var gamma = rotationRate.gamma; // rotation rate around the y-axis

            // Do something with the gyroscope data
            console.log("Alpha:", alpha, "Beta:", beta, "Gamma:", gamma);
        }
    }

    // Add an event listener for the device motion event
    window.addEventListener('devicemotion', handleMotion, false);
} else {
    // DeviceMotionEvent is not supported, handle the error
    console.log("DeviceMotionEvent is not supported on this device.");
}
    
    
    
    if (window.DeviceOrientationEvent) {
    // Define a function to handle device orientation events
    function handleOrientation(event) {
        // Extract rotation data from the event
        var alpha = event.alpha; // rotation around the z-axis
        var beta = event.beta;   // rotation around the x-axis
        var gamma = event.gamma; // rotation around the y-axis

        // Do something with the gyroscope data
        console.log("Alpha:", alpha, "Beta:", beta, "Gamma:", gamma);
    }

    // Add an event listener for the device orientation event
    window.addEventListener('deviceorientation', handleOrientation, false);
} else {
    // DeviceOrientationEvent is not supported, handle the error
    console.log("DeviceOrientationEvent is not supported on this device.");
    }
    


    function handleOrientation(event) {
 const alpha = event.alpha;
 const beta = event.beta;
 const gamma = event.gamma;
 // Handle orientation data
}

function handleMotion(event) {
 const acceleration = event.acceleration;
 const rotationRate = event.rotationRate;
 // Handle motion data
}

function requestAndAddListeners() {
 if (typeof DeviceMotionEvent.requestPermission === 'function') {
    // Request permission for iOS 13+
    DeviceMotionEvent.requestPermission()
      .then(permissionState => {
        if (permissionState === 'granted') {
          window.addEventListener('deviceorientation', handleOrientation, true);
          window.addEventListener('devicemotion', handleMotion, true);
        } else {
          console.error('Permission to access motion data was denied');
        }
      })
      .catch(console.error);
 } else {
    // For non-iOS 13+ devices, add event listeners directly
    window.addEventListener('deviceorientation', handleOrientation, true);
    window.addEventListener('devicemotion', handleMotion, true);
 }
}

// Call this function in response to a user action, e.g., a button click
    requestAndAddListeners();
    

     /******************************** */
       return () => { 
        scene.current?.removeEventListener('click', clickMovement)
        scene.current?.removeEventListener('dblclick', disablePointerLock)
       }
     
   }, [currentPoint, currentPointTimeGapStatus])
    
  
  useEffect(() => {

    let imageUrls = [];
    
    for (let i = 0; i < points.length; i++){
      imageUrls.push(points[i].image)
    }
          
    if (batchSize >= imageUrls.length) {
      batchSize = imageUrls.length - 1
    } 
          console.log(imageUrls, "imageUrls")
    // eslint-disable-next-line no-undef
    loadImagesInBatches(imageUrls, batchSize, "containerId");
  }, [])


  
function loadImagesInBatches(imageUrls, batchSize, containerId) {
    let currentIndex = 0;
    let container = document.getElementById(containerId);
    function loadBatch() {
        let endIndex = Math.min(currentIndex + batchSize, imageUrls.length);
        let batch = imageUrls.slice(currentIndex, endIndex);
      let imagesLoaded = 0;
 
      batch.forEach(function (url, index) {
          console.log(index , endIndex , batchSize, currentIndex)

            let img = new Image();
            img.onload = function() {
                imagesLoaded++;
                if (imagesLoaded === batch.length) {
                    console.log(`Batch ${currentIndex / batchSize + 1} loaded`);
                    currentIndex += batchSize;
                    if (currentIndex < imageUrls.length) {
                        if(currentIndex !== batchSize){
                            loadBatch();
                        }else{
                          setTimeout(() => {
                              setLoadingStatus(false)
                                loadBatch();
                            }, 100);
                        }
                    } else {
                        console.log("All images loaded");
                    }
                }
            };
            img.onerror = function() {
                imagesLoaded++;
                console.error(`Error loading image ${url}`);
                if (imagesLoaded === batch.length) {
                    currentIndex += batchSize;
                    if (currentIndex < imageUrls.length) {
                        loadBatch();
                    } else {
                        console.log("All images loaded");
                    }
                }
            };
          img.src = url;
          img.alt = `point-${index + currentIndex}` 
          img.id =  `point-${index + currentIndex}` 
            
 
            container.appendChild(img); // Append image to container
        });
    }

    loadBatch();
}

 
  return (
    <>

       {loadingStatus && <Loading />}
      {!isMobile && startingPopUp && <StartingPopUp setStartingPopUp={setStartingPopUp} />}
      {!isMobile && <span className='cross' style={{ backgroundImage: `url(${clickIcon}` }}>  </span>}
      {map && <span className= {`mapIcon ${mapStatus && 'active'}`} onClick={()=> setMapStatus(!mapStatus)} ><img src={mapIcon} alt="mapIcon" /></span> }
   {isMobile && <span className= {`vrIcon ${mapStatus && 'active'}`} onClick={()=>     document.querySelector('a-scene').enterVR()} ><img src={vr} alt="mapIcon" /></span>}  
      {mapStatus && <div className='map'>
        <img src={map} alt="map" className='mapImage' />

        <div className="pins">
          {models[model].points.map((point, index) => {
             return  <span key={index}  style={{ right: point.map.x + '%' , top: point.map.y + '%' }} className={`pinIcon ${ index == currentPoint && 'active'}`} onClick={()=> {move(index)}}></span>
           })}
        </div>
      </div>}

      <a-scene ref={scene} vr-mode-ui>

 
      
        <a-assets id="containerId">
  
        </a-assets>
        
      {/* <a-scene cursor="rayOrigin: mouse" ref={scene}> */}
         <a-camera look-controls="pointerLockEnabled:true;magicWindowTrackingEnabled:true;enabled:true" wasd-controls='acceleration=1;' reverseMouseDrag="true" id="camera" >
              {/* <a-entity  cursor="click:true;"  position="0 0 -1"  geometry="primitive: ring; radiusInner: 0.025; radiusOuter: 0.03" material=" shader:flat; opacity:0" raycaster="object: .dinosaurmodel"></a-entity> */}
        </a-camera>
        {/* <a-camera look-controls="reverseMouseDrag:true" wasd-controls='acceleration=1' reverseMouseDrag="true"  id="camera" ></a-camera> */}

  
    {!loadingStatus &&  <>
            <a-sky
          radius="100"
          rotation="0 270 0"
          position="0 0 0"
          side="double"
          id="fSky"
          material=" transparent: false; opacity: 1;"
           src={`#point-${ isFirstSky ? currentPoint : oldPoint }` }
          >
        </a-sky>
        <a-sky
          radius="100"
          rotation="0 270 0"
          position="0 0 0"
          side="double"
          id="fSky2"
          material=" transparent: false; opacity: 0;"
          src={`#point-${ isFirstSky ? oldPoint : currentPoint }` }
        > 
        </a-sky>
   
     
          </>}
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
 
   
      <footer>
        Powered by <a href="https://virtualscene.tech" target="_blank" rel="noreferrer" >virtual Scene</a> 
      </footer>
    </>
  );
  
}

export default Main