import React, { useState } from 'react';
import arrowImage from './assets/images/arrow.png';

const points = [
    {
        image: process.env.PUBLIC_URL + '/assets/images/01.png',  neighbors: [
           {
                degree: 0,
                imageIndex: 1
            },
           {
                degree: 270,
                imageIndex: 4
            },
          
        ],
        info: {
            position: {
                x: 0,
                y: 0,
                z: 0,
            },
            title: "title",
            description: "description description description description description description description description ",
        }
    },
    {
        image: process.env.PUBLIC_URL + '/assets/images/02.png',
     neighbors: [
           {
                degree: 0,
                imageIndex: 2
            },
            {
                degree: 270,
                imageIndex: 5
            },
            {
                degree: 180,
                imageIndex: 0
            },
       
          
        ],
        info: {
            position: {
                x: 0,
                y: 0,
                z: 0,
            },
            title: "title",
            description: "description description description description description description description description ",
        }
    },
    {
        image: process.env.PUBLIC_URL + '/assets/images/03.png',
       neighbors: [
           {
                degree: 0,
                imageIndex: 3
            },
            {
                degree: 270,
                imageIndex: 6
            },
            {
                degree: 180,
                imageIndex: 1
            },
     
          
        ],
        info: {
            position: {
                x: 0,
                y: 0,
                z: 0,
            },
            title: "title",
            description: "description description description description description description description description ",
        }
    },
    {
        image: process.env.PUBLIC_URL + '/assets/images/04.png',
        neighbors: [
      
            {
                degree: 270,
                imageIndex: 7
            },
            {
                degree: 180,
                imageIndex: 2
            },
         
          
        ],
        info: {
            position: {
                x: 0,
                y: 0,
                z: 0,
            },
            title: "title",
            description: "description description description description description description description description ",
        }
    },
    {
        image: process.env.PUBLIC_URL + '/assets/images/05.png',
      neighbors: [
           {
                degree: 0,
                imageIndex: 5
            },
            {
                degree: 270,
                imageIndex: 8
            },
       
            {
                 degree: 90,
                 imageIndex: 0
             },
          
        ],
        info: {
            position: {
                x: 0,
                y: 0,
                z: 0,
            },
            title: "title",
            description: "description description description description description description description description ",
        }
    },
   
    {
        image: process.env.PUBLIC_URL + '/assets/images/06.png',
       neighbors: [
           {
                degree: 0,
                imageIndex: 6
            },
            {
                degree: 270,
                imageIndex: 9
            },
            {
                degree: 180,
                imageIndex: 4
            },
            {
                 degree: 90,
                 imageIndex: 1
             },
          
        ],
        info: {
            position: {
                x: 0,
                y: 0,
                z: 0,
            },
            title: "title",
            description: "description description description description description description description description ",
        }
  },
     {
        image: process.env.PUBLIC_URL + '/assets/images/07.png',
    neighbors: [
           {
                degree: 0,
                imageIndex: 7
            },
            {
                degree: 270,
                imageIndex: 10
            },
            {
                degree: 180,
                imageIndex: 5
            },
            {
                 degree: 90,
                 imageIndex: 2
             },
          
        ],
        info: {
            position: {
                x: 0,
                y: 0,
                z: 0,
            },
            title: "title",
            description: "description description description description description description description description ",
        }
  },

      {
        image: process.env.PUBLIC_URL + '/assets/images/08.png',
     neighbors: [
      
            {
                degree: 270,
                imageIndex: 11
            },
            {
                degree: 180,
                imageIndex: 6
            },
            {
                 degree: 90,
                 imageIndex: 3
             },
          
        ],
        info: {
            position: {
                x: 0,
                y: 0,
                z: 0,
            },
            title: "title",
            description: "description description description description description description description description ",
        }
  },
      
            {
        image: process.env.PUBLIC_URL + '/assets/images/09.png',
      neighbors: [
           {
                degree: 0,
                imageIndex: 9
            },
            {
                degree: 270,
                imageIndex: 12
            },
   
            {
                 degree: 90,
                 imageIndex: 4
             },
          
        ],
        info: {
            position: {
                x: 0,
                y: 0,
                z: 0,
            },
            title: "title",
            description: "description description description description description description description description ",
        }
    },
            {
        image: process.env.PUBLIC_URL + '/assets/images/10.png',
  neighbors: [
           {
                degree: 0,
                imageIndex: 10
            },
            {
                degree: 270,
                imageIndex: 13
            },
            {
                degree: 180,
                imageIndex: 8
            },
            {
                 degree: 90,
                 imageIndex: 5
             },
          
        ],
        info: {
            position: {
                x: 0,
                y: 0,
                z: 0,
            },
            title: "title",
            description: "description description description description description description description description ",
        }
    },
            {
        image: process.env.PUBLIC_URL + '/assets/images/11.png',
  neighbors: [
           {
                degree: 0,
                imageIndex: 11
            },
            {
                degree: 270,
                imageIndex: 14
            },
            {
                degree: 180,
                imageIndex: 9
            },
            {
                 degree: 90,
                 imageIndex: 6
             },
          
        ],
        info: {
            position: {
                x: 0,
                y: 0,
                z: 0,
            },
            title: "title",
            description: "description description description description description description description description ",
        }
    },
            {
        image: process.env.PUBLIC_URL + '/assets/images/12.png',
 neighbors: [
     
            {
                degree: 270,
                imageIndex: 15
            },
            {
                degree: 180,
                imageIndex: 10
            },
            {
                 degree: 90,
                 imageIndex: 7
             },
          
        ],
        info: {
            position: {
                x: 0,
                y: 0,
                z: 0,
            },
            title: "title",
            description: "description description description description description description description description ",
        }
    },
            {
        image: process.env.PUBLIC_URL + '/assets/images/13.png',
  neighbors: [
           {
                degree: 0,
                imageIndex: 13
            },
 
      
            {
                 degree: 90,
                 imageIndex: 8
             },
          
        ],
        info: {
            position: {
                x: 0,
                y: 0,
                z: 0,
            },
            title: "title",
            description: "description description description description description description description description ",
        }
    },
            {
        image: process.env.PUBLIC_URL + '/assets/images/14.png',
  neighbors: [
           {
                degree: 0,
                imageIndex: 14
            },
    
            {
                degree: 180,
                imageIndex: 12
            },
            {
                 degree: 90,
                 imageIndex: 9
             },
          
        ],
        info: {
            position: {
                x: 0,
                y: 0,
                z: 0,
            },
            title: "title",
            description: "description description description description description description description description ",
        }
    },
            {
        image: process.env.PUBLIC_URL + '/assets/images/15.png',
 neighbors: [
           {
                degree: 0,
                imageIndex: 15
            },
    
            {
                degree: 180,
                imageIndex: 13
            },
            {
                 degree: 90,
                 imageIndex: 10
             },
          
        ],
        info: {
            position: {
                x: 0,
                y: 0,
                z: 0,
            },
            title: "title",
            description: "description description description description description description description description ",
        }
    },
            {
        image: process.env.PUBLIC_URL + '/assets/images/16.png',
  neighbors: [
    
    
            {
                degree: 180,
                imageIndex: 14
            },
            {
                 degree: 90,
                 imageIndex: 11
             },
          
        ],
        info: {
            position: {
                x: 0,
                y: 0,
                z: 0,
            },
            title: "title",
            description: "description description description description description description description description ",
        }
    },
   
  ]

 function App() {

const [currentPoint, setCurrentPoint] = useState(0)
const [oldPoint, setOldPoint] = useState(0)
const [isFirstSky, setIsFirstSky] = useState(true)

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
 
  
  return (
    <>
      <a-scene cursor="rayOrigin: mouse" >
        <a-camera wasd-controls='acceleration=1'  rotation="0 0 0"></a-camera>
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
          <a-entity key={index} position="0 -5 0" rotation={`0 ${neighbor.degree} 0`}>
            <a-triangle rotation="-90 0 0" material="color:black" geometry="" position="0 0.6 -9" scale="2 2 2" onClick={() => move(neighbor.imageIndex)} animation="property: material.opacity; from: 0; to: 1; dur: 1000; dir: alternate; loop: true;"></a-triangle>
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
