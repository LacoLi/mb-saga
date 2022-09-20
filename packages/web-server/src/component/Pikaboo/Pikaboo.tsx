/*------------------------------------------------------------------------------------------------------------------------------------------
 * Pikaboo.tsx
 * WRITER : 모시깽이
 * DATE : 20XX-XX-XX
 * DISCRIPTION : 
 * TYPE : Component
 * 개정이력 :
--------------------------------------------------------------------------------------------------------------------------------------------*/
import React from 'react';
import gsap from 'gsap';

interface PikabooProps {}

function Pikaboo(props: PikabooProps) {
  /* ――――――――――――――― letiable ――――――――――――――― */
  /* ===== Props ===== */
  const {} = props;
  /* ===== State ===== */
  /* ===== Const ===== */
  let tl2 = gsap.timeline();
  /* ====== API ====== */

  /* ―――――――――――――――― Method ―――――――――――――――― */

  /* ―――――――――――――― Use Effect ―――――――――――――― */
  React.useLayoutEffect(() => {
    gsap.set('#pikaboo', { y: 30, transformOrigin: '50% 50%' });
    gsap.set('#eye1ball', { transformOrigin: '50% 50%' });
    gsap.set('#eye2ball', { transformOrigin: '50% 50%' });

    let pika = document.querySelector('#pikaboo') as Element;
    let pikaBody = document.querySelector('#body') as Element;
    let svg: SVGGraphicsElement = document.querySelector('#svg') as SVGGraphicsElement;
    let pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let mouse = { x: pos.x, y: pos.y };
    let bboxRect = svg.getBBox();
    let svgWidth = bboxRect.width;
    let svgHeight = bboxRect.height;
    let speed = 0.01;
    let xSet = gsap.quickSetter(pika, 'x', 'px');
    let movingRight: boolean;
    let angle1 = 0;
    let angle2 = 0;
    let eye1 = document.querySelector('#eye1ball') as Element;
    let eye2 = document.querySelector('#eye2ball') as Element;

    const getAngle = (eye: Element, e: any) => {
      let x = eye.getBoundingClientRect().left + eye.clientWidth / 2;
      let y = eye.getBoundingClientRect().top + eye.clientHeight / 2;
      const angle = Math.atan2(e.pageX - x, e.pageY - y) * (180 / Math.PI) * -1 + 45;
      return angle;
    };

    window.addEventListener('mousemove', tapOrMove, false);
    window.addEventListener('touchend', tapOrMove, false);

    function tapOrMove(e: any) {
      mouse.x = e.pageX;
      movingRight = e.pageX > window.innerWidth / 2;
      angle1 = getAngle(eye1, e);
      angle2 = getAngle(eye2, e);
      return false;
    }

    // is Pikaboo at the edges?
    const atEdge = () => {
      if (movingRight) {
        if (pika.getBoundingClientRect().right >= svg.getBoundingClientRect().right) {
          return true;
        }
      } else {
        if (pika.getBoundingClientRect().left <= svg.getBoundingClientRect().left) {
          return true;
        }
      }
      return false;
    };

    gsap.ticker.add(() => {
      // let's move Pikaboo!
      let dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio());
      pos.x += (mouse.x - pos.x) * dt;
      let svg = {
        x: (pos.x / window.innerWidth) * svgWidth * 2 - svgWidth,
      };
      if (!atEdge()) {
        xSet(svg.x);
      }

      // flip Pikaboo
      if (mouse.x < pos.x) {
        gsap.set('#pikaboo', { scaleX: -1 });
      } else {
        gsap.set('#pikaboo', { scaleX: 1 });
      }

      // rotate eyeballs
      gsap.set('#eye1ball', { rotation: angle1 });
      gsap.set('#eye2ball', { rotation: angle2 });
    });

    const tl = gsap.timeline({ defaults: { duration: 3, repeat: -1, yoyo: true, ease: 'Power1.easeInOut' } });
    tl.to('#pikabooMain', { yPercent: -30 })
      .to('#pikabooShadow', { scale: 0.8, opacity: 0.05, xPercent: 5, transformOrigin: '50% 50%' }, '<')
      .to(
        '#lamp-light',
        {
          duration: 1,
          opacity: 0.2,
          repeat: -1,
          repeatDelay: 8,
          ease: "rough({ template: none.out, strength: 1, points: 20, taper: 'none', randomize: true, clamp:  false})",
        },
        '<',
      );

    // make Pikaboo shy
    pikaBody.addEventListener('mouseenter', beingShy, false);
    pikaBody.addEventListener('mouseleave', beingNormal, false);

    function beingShy(e: any) {
      if (tl2.reversed()) {
        tl2.play();
      }
      tl2
        .to('#arm-left', { duration: 0, opacity: 0 })
        .to('#expression-regular', { duration: 0, opacity: 0 })
        .to('#expression-afraid', { duration: 0, opacity: 1 }, '<')
        .to('#arm-left-alt', { duration: 0.2, yPercent: -90 }, '<')
        .to('#arm-right', { duration: 0.2, yPercent: -70, xPercent: 20, rotation: -30, transformOrigin: '25% 50%' }, '<')
        .to('#blush', { duration: 0.2, opacity: 0.4 }, '<');
    }
    function beingNormal(e: any) {
      tl2.reverse();
    }
  }, []);

  /* ―――――――――――――――― Return ―――――――――――――――― */
  return (
    <svg id="svg" viewBox="-133 0 1066 600" aria-labelledby="uniqueDescID" preserveAspectRatio="xMidYMin meet" role="img">
      <desc id="uniqueDescID">This Halloween Pikachu follows your mouse or screen taps 🎃</desc>
      <defs>
        <linearGradient id="lightGradient" x1="398" x2="398" y1="604" y2="148" gradientUnits="userSpaceOnUse">
          <stop offset="0.3" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#fff" stopOpacity="1" />
        </linearGradient>
        <filter id="blurry" height="150%" width="150%" x="-25%" y="-25%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2.2" result="blur" />
        </filter>
        <rect id="wallPattern" width="100" height="356" fill="#ea8731" x="0" y="0" />
        <g id="webPattern" fill="none" opacity="0.7" stroke="#fff" strokeMiterlimit="10" strokeWidth="2.83">
          <line x1="579" x2="686" y1="26" />
          <line x1="598" x2="686" y1="66" />
          <line x1="629" x2="686" y1="94" />
          <line x1="663" x2="686" y1="107" />
          <line x1="703" x2="686" y1="112" />
          <line x1="735" x2="686" y1="93" />
          <line x1="775" x2="686" y1="76" />
          <line x1="803" x2="686" y1="41" />
          <line x1="805" x2="686" y1="6" />
          <path d="M588.5,23.5c0-16-6.71-29-15-29" />
          <path d="M617.5,16.5c0-12.16-6.26-22-14-22" />
          <path d="M644.5,10.5c0-8.84-6.71-16-15-16" />
          <path d="M610.5,56.5c0-18.24-9.84-33-22-33" />
          <path d="M632.5,42.5c0-14.37-6.71-26-15-26" />
          <path d="M654.5,23.5c0-7.19-4.47-13-10-13" />
          <path d="M636.5,81.5c0-16-11.63-25-26-25" />
          <path d="M650.5,58.5c0-8.84-8-16-18-16" />
          <path d="M665.5,35.5c0-5-3-12-11-12" />
          <path d="M665.5,96.5c0-11-16-17-29-15" />
          <path d="M671.5,71.5c0-6.63-10-13-21-13" />
          <path d="M677.5,42.5c1-3.56-7-11-13-7" />
          <path d="M697.5,78.5c-4-8-14-13-27-8" />
          <path d="M701.5,103.5c-7-5-15-14-36-8" />
          <path d="M701.5,103.5c9-14,19-17,31-16" />
          <path d="M697.5,76.5c3-8,14-15,22-12" />
          <path d="M693.5,50.5c2-8,9-9,15-8" />
          <path d="M720.5,65.5c4-11,15-17,24-15" />
          <path d="M744.5,50.5c0-12.71,9.39-23,21-23" />
          <path d="M732.5,87.5c0-13.82,11.87-23,29-23" />
          <path d="M761.5,64.5c0-14.92,14.31-27,32-27" />
          <path d="M727.5,35.5c-2-8,4.92-17,11-17" />
          <path d="M708.5,42.5c3-7,10-10,19-7" />
          <path d="M693.5,48.5c-1-5-10-10-17-6" />
          <path d="M738.5,18.5c-2-6,0-14,6-16" />
          <path d="M765.5,27.5c-2-11,4-22,14-23" />
          <path d="M793.5,37.5c-6-13-4-27,7-32" />
          <path d="M744.5,2.5c0-5.53,4-10,9-10" />
          <path d="M777.5,4.5c0-6.63,4.92-12,11-12" />
          <path d="M797.5,5.5c0-6.08,3.13-11,7-11" />
        </g>
        <path
          id="batPattern"
          fill="#23152d"
          d="M-34.53,3.9c-.75-1.37,11.68-18.74,20.47-16.16C-2.87-9-2.59-.47.32-.36,2.44-.27,6.4-10.73,17-11c8-.21,17.66,14.16,17.09,14.85-.39.47-2.74-2.24-6.27-2.38-4.12-.17-6.28,4.28-8.68,4.6-2,.28-2-2.91-7-2.4C8.6,4,9.11,6.78,7.07,7.7,5.63,8.35,5.24.55-1.2,2.41c-4.21,1.22-5.15,4.75-6.53,4C-9.37,5.49-10,2.76-12,1.82a3.77,3.77,0,0,0-2.6.05c-2.15.62-4.41,4.07-5.82,4S-21.69,1.59-25.2.74C-29.51-.31-34.09,4.69-34.53,3.9Z"
        />
        <clipPath id="backgroundClip">
          <rect width="300%" height="100%" fill="#000" x="-150%" y="0" />
        </clipPath>
      </defs>
      <g id="background">
        <rect id="wall" x="-200" y="0" width="1200" height="416" fill="#ea6e30" />
        <rect id="wood" x="-200" y="360" width="1200" height="194" fill="#23152d" />
        <rect
          id="wood-shadow"
          x="-200"
          y="375"
          width="1200"
          height="14"
          opacity="0.3"
          style={{
            mixBlendMode: 'multiply',
          }}
        />
        <rect
          id="wood-highlight"
          x="-200"
          y="361"
          width="1200"
          height="14"
          fill="#fff"
          opacity="0.58"
          style={{
            mixBlendMode: 'soft-light',
          }}
        />
        <line id="wall-separator" x1="-200" y1="359.5" x2="1000" y2="359.5" fill="none" stroke="#ea6e30" strokeMiterlimit="10" strokeWidth="2.83" />
        <rect id="ground" x="-200" y="540" width="1200" height="200" fill="#230d1b" />
        <use xlinkHref="#wallPattern" x="-350" />
        <use xlinkHref="#wallPattern" x="-150" />
        <use xlinkHref="#wallPattern" x="50" />
        <use xlinkHref="#wallPattern" x="250" />
        <use xlinkHref="#wallPattern" x="450" />
        <use xlinkHref="#wallPattern" x="650" />
        <use xlinkHref="#wallPattern" x="850" />
        <use xlinkHref="#wallPattern" x="1050" />
      </g>
      <g id="deco" clipPath="url(#backgroundClip)">
        <use xlinkHref="#webPattern" x="100" y="-10" />
        <use xlinkHref="#webPattern" x="-840" y="-30" />
        <path
          id="deco-string"
          fill="none"
          stroke="#23152d"
          strokeMiterlimit="10"
          strokeWidth="5.67"
          d="M-274-3c79,118,263,258.36,445,148C265,88,263,0,266,0c0,0,24,75,104.5,75.5,106.79.66,116.29-78.24,123-76,12,4,20.06,129.59,144.5,157.5,107,24,204-3,411-159"
        />
        <g id="eye2">
          <line x1="96" y1="169" x2="96" y2="189.5" fill="none" stroke="#23152d" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="8.5" />
          <g id="eye2ball">
            <circle cx="96" cy="207" r="17.5" fill="#fff" stroke="#23152d" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="5.67" />
            <circle cx="102" cy="212" r="6" fill="#23152d" />
          </g>
        </g>
        <g id="eye1">
          <line x1="599" y1="134" x2="599" y2="154.5" fill="none" stroke="#23152d" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="8.5" />
          <g id="eye1ball">
            <circle cx="599" cy="172" r="17.5" fill="#fff" stroke="#23152d" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="5.67" />
            <circle cx="605" cy="178" r="6" fill="#23152d" />
          </g>
        </g>
        <g transform="translate(-200, 80) rotate(120)">
          <use xlinkHref="#batPattern" />
        </g>
        <g transform="translate(-110, 150) rotate(110)">
          <use xlinkHref="#batPattern" />
        </g>
        <g transform="translate(0, 185) rotate(90)">
          <use xlinkHref="#batPattern" />
        </g>
        <g transform="translate(170, 145) rotate(60)">
          <use xlinkHref="#batPattern" />
        </g>
        <g transform="translate(235, 80) rotate(40)">
          <use xlinkHref="#batPattern" />
        </g>
        <g transform="translate(330, 65) rotate(130)">
          <use xlinkHref="#batPattern" />
        </g>
        <g transform="translate(450, 55) rotate(65)">
          <use xlinkHref="#batPattern" />
        </g>
        <g transform="translate(540, 95) rotate(120)">
          <use xlinkHref="#batPattern" />
        </g>
        <g transform="translate(690, 165) rotate(90)">
          <use xlinkHref="#batPattern" />
        </g>
        <g transform="translate(795, 150) rotate(75)">
          <use xlinkHref="#batPattern" />
        </g>
        <g transform="translate(890, 105) rotate(60)">
          <use xlinkHref="#batPattern" />
        </g>
        <g transform="translate(990, 40) rotate(45)">
          <use xlinkHref="#batPattern" />
        </g>
      </g>
      <g id="lamp" clipPath="url(#backgroundClip)">
        <polygon
          id="lamp-light"
          opacity="0.4"
          fill="url(#lightGradient)"
          points="800 604 0 604 364 148 436 148 800 604"
          style={{
            mixBlendMode: 'soft-light',
          }}
        />
        <g id="lamp-2" data-name="lamp">
          <ellipse cx="399.92" cy="148" fill="#fff2bd" stroke="#fff" strokeMiterlimit="10" strokeWidth="2.83" rx="26.5" ry="8.5" />
          <line x1="399.92" x2="399.92" y1="-16.5" y2="97.5" fill="#23152d" stroke="#23152d" strokeMiterlimit="10" strokeWidth="8.5" />
          <polygon fill="#23152d" points="428.92 102 408.42 102 408.42 93 391.42 93 391.42 102 370.92 102 361.92 148 437.92 148 428.92 102" />
        </g>
      </g>
      <g id="pikaboo">
        <g id="pikabooMain">
          <path
            id="tail"
            d="M196,332c-9,2-26,12-27,7-2.19-11-2-45-10-48-4-1.49-57.6,18.18-60,31-3,16,15,52,23,52,9,0,24-26,28-25,5,1.24,3.89,18.7,9,17,6-2,25-12,40-26"
            fill="#fcdc55"
            stroke="#46777f"
            strokeMiterlimit="10"
            strokeWidth="5.67"
          />
          <g id="ear-right">
            <path
              d="M348,277c-10-27-14-74-5-74,14,0,34,52.85,42,95.13"
              fill="#fff"
              stroke="#46777f"
              strokeLinecap="round"
              strokeMiterlimit="10"
              strokeWidth="5.67"
            />
            <path d="M339,231c2,0,7-1,12,0,11,2.19,13,5,16,6-10.76-23.8-18.39-33-23-34C337.05,201.54,339,225,339,231Z" fill="#46777f" />
          </g>
          <path
            id="arm-left"
            opacity="1"
            d="M370,354c12.57-4.41,33.67-3.52,36,3,5,14-34.68,40.11-42,47"
            fill="#fff"
            stroke="#46777f"
            strokeLinecap="round"
            strokeMiterlimit="10"
            strokeWidth="5.67"
          />
          <g id="body">
            <path
              id="body-fill"
              d="M183,331.09c3.79-9.76,26.22-4.14,43.85-11.43,21.38-8.83,18.09-46.23,76.2-56.62,22.34-4,57.93-1,76.74,24.93,23.8,32.86,8.23,57.54,4.39,76.89C366.65,453.18,286.62,487.46,271.82,488c-3.63.13-12.9-.39-17.54-6.23-4-5.08-5.48-11.43-8.22-14-3.84-3.63-17.55,1-28.51-10.39-11.52-12-6-15.39-11-22.86-3.84-5.71-13.16,0-21.93-16.62-7.92-15,1.1-17.66-1.1-28.05-1.09-5.2-8.77-2.08-8.77-20.78,0-14.88,10.89-15.8,9.32-20.26C182.47,344.08,179.18,341,183,331.09Z"
              fill="#fff"
            />
            <circle id="body-cheek-left" cx="281.01" cy="327.69" r="14.01" fill="#e71e25" opacity="0.7" />
            <path
              id="body-cheek-right"
              d="M395.25,315.88c-3.39-.24-6.74-.49-9.28,5.32-2.63,6-1.85,11.91,3.26,16.62.63.58,3.77,3.18,4.77.18C392.83,335.52,395,316,393.25,315.88Z"
              fill="#ec1c24"
              opacity="0.7"
            />
            <path
              id="mounth"
              d="M349,334c3-4,6-8,8-8,3,0,3,3,5,6"
              fill="none"
              stroke="#46777f"
              strokeLinecap="round"
              strokeMiterlimit="10"
              strokeWidth="3.97"
            />
            <path
              id="body-stroke"
              d="M183,331.09c3.79-9.76,26.22-4.14,43.85-11.43,21.38-8.83,18.09-46.23,76.2-56.62,22.34-4,57.93-1,76.74,24.93,23.8,32.86,8.23,57.54,4.39,76.89C366.65,453.18,286.62,487.46,271.82,488c-3.63.13-12.9-.39-17.54-6.23-4-5.08-5.48-11.43-8.22-14-3.84-3.63-17.55,1-28.51-10.39-11.52-12-6-15.39-11-22.86-3.84-5.71-13.16,0-21.93-16.62-7.92-15,1.1-17.66-1.1-28.05-1.09-5.2-8.77-2.08-8.77-20.78,0-14.88,10.89-15.8,9.32-20.26C182.47,344.08,179.18,341,183,331.09Z"
              fill="none"
              stroke="#46777f"
              strokeMiterlimit="10"
              strokeWidth="5.67"
            />
            <g id="expression-regular" opacity="1">
              <path
                id="body-eye-left"
                d="M319.6,298.74c-5.94-1.35-13,2-15.21,8.21-1.38,3.81-1,8.93,2.28,12.34,4.44,4.59,12.33,4.16,17.06.18,4.2-3.52,6.19-10,3.55-15.08A11.81,11.81,0,0,0,319.6,298.74Z"
                fill="#46777f"
              />
              <circle id="body-eye-left-light" cx="319.83" cy="306.5" r="4.58" fill="#fff" />
              <path
                id="body-eye-right"
                d="M371.47,296.32c-5.1,3.63-.61,18.95,4.93,19.88,2.85.48,5.52-2.23,5.72-2.69a13.07,13.07,0,0,0-3-15.44C377.33,296.45,373.65,294.77,371.47,296.32Z"
                fill="#46777f"
              />
              <path
                id="body-eye-right-light"
                d="M372.73,299.09c-2.38,2.69,0,6.21,2.6,6.6a3,3,0,0,0,3-1.66c.5-1.08-.89-4-2.74-4.85C375.34,299.09,373.47,298.24,372.73,299.09Z"
                fill="#fff"
              />
            </g>
            <g id="expression-afraid" opacity="0">
              <path
                id="blush"
                opacity="0.5"
                d="M317.36,326.73a239.48,239.48,0,0,1,16.18-18.53L325,304.67a147.61,147.61,0,0,1,.05,19.73c-.26,4.07,5.85,6.94,8.54,3.53q8.55-10.86,16.8-22l-9.32-2.52-.13,23.82,9.31-2.52-.25-.46c-1.52-2.66-5.73-3.44-7.86-1-2.33,2.65-2,7.24,1.42,9a5.18,5.18,0,0,0,6.06-.78c3.6-3.51,5.73-9.63,8.06-14a117.08,117.08,0,0,1,9-15.08l-9.32-2.52a191.27,191.27,0,0,1,.6,23.7c-.22,6,8,6.34,9.82,1.33a78.28,78.28,0,0,1,9.39-17.68h-8.64a53.52,53.52,0,0,1,5.5,13.19c1.68,6.21,11.33,3.57,9.65-2.66a64.66,64.66,0,0,0-6.51-15.57c-2-3.45-6.54-3-8.64,0a88.4,88.4,0,0,0-10.39,20.06l9.82,1.33a191.27,191.27,0,0,0-.6-23.7c-.45-5.13-6.33-6.57-9.32-2.53a110.31,110.31,0,0,0-8.24,13.64c-1.26,2.37-2.5,4.75-3.77,7.12-.93,1.76-2,4.91-3.49,6.32l6.06-.79-.3-.15,2.3,3,0,.5-1.46,3.54.1-.12-7.85-1,.26.45c2.47,4.35,9.29,2.39,9.32-2.52l.13-23.82c0-5.36-6.53-6.27-9.31-2.52q-7.49,10.08-15.24,19.94l8.53,3.54a147.61,147.61,0,0,0-.05-19.73c-.28-4.15-5.35-6.83-8.53-3.54a239.48,239.48,0,0,0-16.18,18.53c-3.94,5,3.09,12.13,7.07,7.07Z"
                fill="#ff1d25"
              />
              <line x1="308" y1="315" x2="323" y2="320" fill="none" stroke="#46777f" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="5.67" />
              <line x1="382" y1="310" x2="375" y2="315" fill="none" stroke="#46777f" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="5.67" />
              <path
                id="arm-left-alt"
                d="M400,362c0-9.49-20.85-18.68-25-14a6.83,6.83,0,0,0-2,5c0,6.87,0,21,6.42,27,4.32,4,13.19,4.53,16.58,0C399,376,400,370,400,362Z"
                fill="#fff"
                stroke="#46777f"
                strokeLinecap="round"
                strokeMiterlimit="10"
                strokeWidth="5.67"
              />
            </g>
          </g>
          <path
            id="arm-right"
            d="M290,356c23.55-8.39,41.82-9.26,45-3,4.14,8.14-17.87,27.05-19,28"
            fill="#fff"
            stroke="#46777f"
            strokeLinecap="round"
            strokeMiterlimit="10"
            strokeWidth="5.67"
          />
          <g id="ear-left">
            <path
              d="M257,295c-9-23.49-32-57.55-17-92.78,7.4-17.39,38.19,48.76,50,70.47"
              fill="#fff"
              stroke="#46777f"
              strokeLinecap="round"
              strokeMiterlimit="10"
              strokeWidth="5.67"
            />
            <path
              d="M266.94,229l0,0C265,227,250,197,244,200c-11.87,5.94-8,40-7,43.92V244A38.79,38.79,0,0,1,255,231,37.07,37.07,0,0,1,266.94,229Z"
              fill="#46777f"
            />
          </g>
        </g>
        <g id="pikabooShadow">
          <ellipse filter="url(#blurry)" opacity=".1" cx="250" cy="530" rx="100" ry="10" fill="#fff2bd" />
        </g>
      </g>
    </svg>
  );
}

namespace Pikaboo {}

export default Pikaboo;
