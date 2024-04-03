import React, { useEffect, useState } from 'react';

function App() {


  const [imageUrl, setImageUrl] = useState(process.env.PUBLIC_URL + '/assets/images/1.jpg')
const images = [process.env.PUBLIC_URL + '/assets/images/1.jpg', process.env.PUBLIC_URL + '/assets/images/2.jpg', process.env.PUBLIC_URL + '/assets/images/3.jpg', process.env.PUBLIC_URL + '/assets/images/4.jpg', process.env.PUBLIC_URL + '/assets/images/5.jpg', process.env.PUBLIC_URL + '/assets/images/6.jpg', process.env.PUBLIC_URL + '/assets/images/7.jpg', process.env.PUBLIC_URL + '/assets/images/8.jpg', process.env.PUBLIC_URL + '/assets/images/9.jpg', process.env.PUBLIC_URL + '/assets/images/10.jpg', process.env.PUBLIC_URL + '/assets/images/11.jpg', process.env.PUBLIC_URL + '/assets/images/12.jpg', process.env.PUBLIC_URL + '/assets/images/13.jpg', process.env.PUBLIC_URL + '/assets/images/14.jpg', process.env.PUBLIC_URL + '/assets/images/15.jpg'];

  const [index, setIndex] = useState(0)

  const getNext = () => {
    const nextIndex = index === images.length - 1 ? 0 : index + 1;
    setIndex(nextIndex)
    console.log(nextIndex, "nextIndex")
    setImageUrl(images[nextIndex]);
  }

  const goBack = () => {
    const nextIndex = index === 0 ? images.length - 1 : index - 1;
    setIndex(nextIndex)
    console.log(nextIndex, "nextIndex")
    setImageUrl(images[nextIndex]);
  }

/*

new position for came x and y coordinates

*/
 
  const  two = (newPosition = "0 0 -41") => {
   document.querySelector('a-camera').setAttribute('animation', 'property: position; dur: 303; to: 0 0 -41;');
    
  
    document.querySelector('#fSky').setAttribute('animation', {
                    property: 'material.opacity',
                    from:1,
                    to: 0,  // Target opacity (1 for fully visible)
                    dur: 303,  // Duration of the animation in milliseconds
                    easing: 'linear'
    })
    document.querySelector('#fSky2').setAttribute('animation', {
                    property: 'material.opacity',
                    from:0,
                    to: 1,  // Target opacity (1 for fully visible)
                    dur: 0,  // Duration of the animation in milliseconds
                    easing: 'linear'
                })
  }
  const  one = () => {
   document.querySelector('a-camera').setAttribute('animation', 'property: position; dur: 303; to:  0 0 0;');

    document.querySelector('#fSky').setAttribute('animation', {
                    property: 'material.opacity',
                    from: 0,
                    delay: 0, 
                    to: 1,  // Target opacity (1 for fully visible)
                    dur: 0,  // Duration of the animation in milliseconds
                    easing: 'linear'
    })
    document.querySelector('#fSky2').setAttribute('animation', {
      property: 'material.opacity',
      // delay:202,
                    from:1,
                    to: 0,  // Target opacity (1 for fully visible)
                    dur: 303,  // Duration of the animation in milliseconds
                    easing: 'linear'
                })
  }
  return (
    <>
    

      <a-scene cursor="rayOrigin: mouse">

<a-camera wasd-controls='acceleration=1'  rotation="250 0 0"></a-camera>

 
{/* <a-camera wasd-controls-enabled="true"  rotation="250 0 0"></a-camera> */}
<a-camera wasd-controls='acceleration=1'  rotation="250 0 0"></a-camera>

 
        <a-sky
          radius="100"
          rotation="0 45 0"
          position="0 0 0"
        side="double"
          id="fSky"
          material=" transparent: false; opacity: 1;"
          src={images[0]}>
          </a-sky>
        <a-sky
          radius="100"
          rotation="0 45 0"
          position="0 0 -41"
          side="double"
          id="fSky2"
           material=" transparent: false; opacity: 1;"
          src={images[1]}>
          </a-sky>
      
        
      </a-scene>
      <button onClick={two} className='fixed top-0 left-0 z-50 '>two</button>
      <button onClick={one} className='fixed top-0 left-10 z-50 '>one</button>
    </>
  );
}

export default App;
