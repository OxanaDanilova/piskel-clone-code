/* eslint-disable no-param-reassign */
/* eslint-disable prefer-const */
/* eslint-disable no-shadow */
import './style.css';
import '../app.html';

export default function piskel() {
  let drawing = false;
  let currentColor = 'red';
  let currentSecColor = 'black';
  let radius;
  let mode = 'pen';
  let button;
  let userUnitX;
  let userUnitY;
  const frames = []; // all frames
  let frame = []; // current frame
  let numb = 1;
  let x0;
  let y0;
  let x1;
  let y1;
  let mirrorX;
  let mirrorX0;
  let mirrorY;
  let mirrorY0;
  let count = 0;
  const fpsRange = document.querySelector('input[type="range"]');
  const fpsValue = document.querySelector('.value');
  let fps = fpsRange.value;


  // Define Canvas///
  const canvasMain = document.getElementsByClassName('canvas-main')[0];

  const canvas = document.getElementById('canvas-draw');
  const ctx = canvas.getContext('2d');

  const canvasClone = document.getElementById('canvas-clone');
  const ctxClone = canvasClone.getContext('2d');

  // const canvasFrame = document.getElementsByClassName('frame-item')[0];
  const canvasCloneAnim = document.getElementById('canvas-preview-clone');
  const cta = canvasCloneAnim.getContext('2d');

  const canvasPrev = document.getElementById('canvas-preview');
  const cprev = canvasPrev.getContext('2d');

  // Canvas size //////
  let canvasSize = 32;
  const size = document.getElementsByClassName('wrap-sizes')[0];

  // //////////////////
  const pickBtn = document.getElementById('color-picker-btn');
  const erBtn = document.getElementById('eraser-btn');
  const penBtn = document.getElementById('pen-btn');
  const vertMirBtn = document.getElementsByClassName('vert-mir-btn')[0];
  const horizMirBtn = document.getElementsByClassName('horiz-mir-btn')[0];
  const rectBtn = document.getElementById('rect-btn');
  const strokeBtn = document.getElementById('stroke-btn');
  const circBtn = document.getElementById('circle-btn');
  const colorBtn = document.getElementById('color');
  const secColorBtn = document.getElementById('sec-color');


  function penMode() {
    mode = 'pen';
    document.getElementsByClassName('selected')[0].classList.toggle('selected');
    penBtn.classList.add('selected');
  }

  function vertPenMode() {
    mode = 'vertMirrorPen';
    document.getElementsByClassName('selected')[0].classList.toggle('selected');
    vertMirBtn.classList.add('selected');
  }

  function horizPenMode() {
    mode = 'horizMirrorPen';
    document.getElementsByClassName('selected')[0].classList.toggle('selected');
    horizMirBtn.classList.add('selected');
  }

  function colPickerMode() {
    mode = 'colPicker';
    document.getElementsByClassName('selected')[0].classList.toggle('selected');
    pickBtn.classList.add('selected');
  }


  function eraserMode() {
    mode = 'eraser';
    document.getElementsByClassName('selected')[0].classList.toggle('selected');
    erBtn.classList.add('selected');
  }

  function strokeMode() {
    mode = 'stroke';
    canvasClone.style.visibility = 'visible';
    document.getElementsByClassName('selected')[0].classList.toggle('selected');
    strokeBtn.classList.add('selected');
  }

  function rectMode() {
    mode = 'rectangle';
    canvasClone.style.visibility = 'visible';
    document.getElementsByClassName('selected')[0].classList.toggle('selected');
    rectBtn.classList.add('selected');
  }

  function circleMode() {
    mode = 'circle';
    canvasClone.style.visibility = 'visible';
    document.getElementsByClassName('selected')[0].classList.toggle('selected');
    circBtn.classList.add('selected');
  }


  pickBtn.addEventListener('click', colPickerMode);

  erBtn.addEventListener('click', eraserMode);

  penBtn.addEventListener('click', penMode);

  vertMirBtn.addEventListener('click', vertPenMode);

  horizMirBtn.addEventListener('click', horizPenMode);

  rectBtn.addEventListener('click', rectMode);

  strokeBtn.addEventListener('click', strokeMode);

  circBtn.addEventListener('click', circleMode);


  function getColor() {
    currentColor = this.value;
  }

  function getSecColor() {
    currentSecColor = this.value;
  }

  colorBtn.addEventListener('input', getColor);
  secColorBtn.addEventListener('input', getSecColor);

  // //////////////////////

  function defineRadioButtonValue() {
    for (let i = 0; i < size.children.length; i += 1) {
      if (size.children[i].checked === true) {
        canvasSize = +size.children[i].value;
      }
    }
  }

  size.addEventListener('click', defineRadioButtonValue);


  // ///////////////
  const defineUserUnit = (x, y) => {
    if (x > 768) { x = 768; }
    if (y > 768) { y = 768; }
    if (canvasSize === 32) {
      userUnitX = Math.ceil(x / 24);
      userUnitY = Math.ceil(y / 24);
    }
    if (canvasSize === 64) {
      userUnitX = Math.ceil(x / 12);
      userUnitY = Math.ceil(y / 12);
    }
    if (canvasSize === 128) {
      userUnitX = Math.ceil(x / 6);
      userUnitY = Math.ceil(y / 6);
    }
  };


  function fillUnit(x, y, ctx) {
    if (button === 'right') { ctx.fillStyle = currentSecColor; }
    if (button === 'left') { ctx.fillStyle = currentColor; }
    if (canvasSize === 32) {
      const startX = (x - 1) * 24;
      const startY = (y - 1) * 24;
      ctx.beginPath();
      if (mode === 'pen' || mode === 'vertMirrorPen' || mode === 'horizMirrorPen' || mode === 'stroke' || mode === 'rectangle' || mode === 'circle') {
        ctx.fillRect(startX, startY, 24, 24);
        ctx.fill();
      }
      if (mode === 'eraser') { ctx.clearRect(startX, startY, 24, 24); }
    }
    if (canvasSize === 64) {
      const startX = (x - 1) * 12;
      const startY = (y - 1) * 12;
      ctx.beginPath();
      if (mode === 'pen' || mode === 'vertMirrorPen' || mode === 'horizMirrorPen' || mode === 'stroke' || mode === 'rectangle' || mode === 'circle') {
        ctx.fillRect(startX, startY, 12, 12);
        ctx.fill();
      }
      if (mode === 'eraser') { ctx.clearRect(startX, startY, 12, 12); }
    }
    if (canvasSize === 128) {
      const startX = (x - 1) * 6;
      const startY = (y - 1) * 6;
      ctx.beginPath();
      if (mode === 'pen' || mode === 'vertMirrorPen' || mode === 'horizMirrorPen' || mode === 'stroke' || mode === 'rectangle' || mode === 'circle') {
        ctx.fillRect(startX, startY, 6, 6);
        ctx.fill();
      }
      if (mode === 'eraser') { ctx.clearRect(startX, startY, 6, 6); }
    }
  }
  // //////////////////////////////////////////////////

  function BrezAlgCirc(x0, y0, radius, ctxClone) {
    let x = 0;
    let y = radius;
    let delta = 1 - 2 * radius;
    let error = 0;
    while (y >= 0) {
      defineUserUnit(x0 + x, y0 + y);
      fillUnit(userUnitX, userUnitY, ctxClone);
      defineUserUnit(x0 + x, y0 - y);
      fillUnit(userUnitX, userUnitY, ctxClone);
      defineUserUnit(x0 - x, y0 + y);
      fillUnit(userUnitX, userUnitY, ctxClone);
      defineUserUnit(x0 - x, y0 - y);
      fillUnit(userUnitX, userUnitY, ctxClone);
      error = 2 * (delta + y) - 1;
      if (delta < 0 && error <= 0) {
        x += 1;
        // eslint-disable-next-line no-continue
        delta += 2 * x + 1; continue;
      }
      error = 2 * (delta - x) - 1;
      if (delta > 0 && error > 0) {
        y -= 1;
        // eslint-disable-next-line no-continue
        delta += 1 - 2 * y; continue;
      }
      x += 1;
      delta += 2 * (x - y);
      y -= 1;
    }
  }

  // BrezAlg/////////////////////

  function BrezAlg(x0, x1, y0, y1, ctx) {
    const deltax = Math.abs(x1 - x0);
    const deltay = Math.abs(y1 - y0);
    let error = 0;
    let deltaerr = deltay / deltax;
    let missedY = y0;
    let diry = y1 - y0;
    if (diry > 0) { diry = 1; }
    if (diry < 0) { diry = -1; }
    if (x0 < x1) {
      for (let missedX = x0; missedX <= x1; missedX += 1) {
        defineUserUnit(missedX, missedY);
        fillUnit(userUnitX, userUnitY, ctx);
        error += deltaerr;
        if (error >= 0.5) {
          missedY += diry;
          error -= 1;
        }
      }
    } else if (x0 > x1) {
      for (let missedX = x0; missedX >= x1; missedX -= 1) {
        defineUserUnit(missedX, missedY);
        fillUnit(userUnitX, userUnitY, ctx);
        error += deltaerr;
        if (error >= 0.5) {
          missedY += diry;
          error -= 1;
        }
      }
    }

    if (deltay > deltax) {
      deltaerr = deltax / deltay;
      let missedX = x0;
      let dirx = x1 - x0;
      if (dirx > 0) { dirx = 1; }
      if (dirx < 0) { dirx = -1; }
      if (y0 < y1) {
        for (missedY = y0; missedY <= y1; missedY += 1) {
          defineUserUnit(missedX, missedY);
          fillUnit(userUnitX, userUnitY, ctx);
          error += deltaerr;
          if (error >= 0.5) {
            missedX += dirx;
            error -= 1;
          }
        }
      } else if (y0 > y1) {
        for (missedY = y0; missedY >= y1; missedY -= 1) {
          defineUserUnit(missedX, missedY);
          fillUnit(userUnitX, userUnitY, ctx);
          error += deltaerr;
          if (error >= 0.5) {
            missedX += dirx;
            error -= 1;
          }
        }
      }
    }
  }

  // ///////////////////////////////////////////////
  function strokeLineAlg(x0, x1, y0, y1, ctx) {
    let x; let y;
    let dx; let dy; let dx1;
    let dy1; let px; let py; let xe; let ye; let i;
    dx = x1 - x0; dy = y1 - y0;
    dx1 = Math.abs(dx); dy1 = Math.abs(dy);
    px = 2 * dy1 - dx1; py = 2 * dx1 - dy1;
    if (dy1 <= dx1) {
      if (dx >= 0) {
        x = x0; y = y0; xe = x1;
      } else {
        x = x1; y = y1; xe = x0;
      }
      defineUserUnit(x, y);
      fillUnit(userUnitX, userUnitY, ctx);

      for (i = 0; x < xe; i += 1) {
        x += 1;
        if (px < 0) {
          px += 2 * dy1;
        } else {
          if ((dx < 0 && dy < 0) || (dx > 0 && dy > 0)) {
            y += 1;
          } else {
            y -= 1;
          }
          px += 2 * (dy1 - dx1);
        }
        defineUserUnit(x, y);
        fillUnit(userUnitX, userUnitY, ctx);
      }
    } else {
      if (dy >= 0) {
        x = x0; y = y0; ye = y1;
      } else {
        x = x1; y = y1; ye = y0;
      }
      defineUserUnit(x, y);
      fillUnit(userUnitX, userUnitY, ctx);
      for (i = 0; y < ye; i += 1) {
        y += 1;
        if (py <= 0) {
          py += 2 * dx1;
        } else {
          if ((dx < 0 && dy < 0) || (dx > 0 && dy > 0)) {
            x += 1;
          } else {
            x -= 1;
          }
          py += 2 * (dx1 - dy1);
        }
        defineUserUnit(x, y);
        fillUnit(userUnitX, userUnitY, ctx);
      }
    }
  }

  // //////////////////////////////////////////////////////////////////////////////////

  const coord = document.getElementsByClassName('wrap-info')[0];


  function displayCoordinates(event) {
    const x = event.clientX;
    const y = event.clientY;
    defineUserUnit(x, y);
    coord.children[1].innerHTML = `x ${userUnitX} user unit, ${x} px`;
    coord.children[2].innerHTML = `y ${userUnitY} user unit, ${y} px`;
  }


  canvas.addEventListener('mousemove', displayCoordinates);

  function cancelContextMenu(event) {
    event.preventDefault();
  }

  function pickColor(event) {
    if (mode === 'colPicker') {
      x0 = event.pageX - canvasMain.offsetLeft;
      y0 = event.pageY - canvasMain.offsetTop;
      const imageData = ctx.getImageData(x0, y0, 1, 1);
      const pixel = imageData.data;
      let red = pixel[0].toString(16);
      if (red.length === 1) { red = `0${red}`; }
      let green = pixel[1].toString(16);
      if (green.length === 1) { green = `0${green}`; }
      let blue = pixel[2].toString(16);
      if (blue.length === 1) { blue = `0${blue}`; }
      if (event.button === 0) {
        currentColor = `#${red}${green}${blue}`;
        colorBtn.value = currentColor;
      }
      if (event.button === 2) {
        currentSecColor = `#${red}${green}${blue}`;
        secColorBtn.value = currentSecColor;
      }
    }
  }

  // ////////////////start Drawing///////////////
  function startDrawing(event) {
    if (event.button === 0) { button = 'left'; }
    if (event.button === 2) { button = 'right'; }
    if (mode === 'pen' || mode === 'eraser') {
      drawing = true;
      x0 = undefined;
      y0 = undefined;
    }
    if (mode === 'vertMirrorPen') {
      drawing = true;
      x0 = undefined;
      y0 = undefined;
      mirrorX = undefined;
      mirrorX0 = undefined;
    }

    if (mode === 'horizMirrorPen') {
      drawing = true;
      x0 = undefined;
      y0 = undefined;
      mirrorY = undefined;
      mirrorY0 = undefined;
    }

    if (mode === 'stroke' || mode === 'rectangle' || mode === 'circle') {
      canvasClone.style.visibility = 'visible';
      x0 = event.pageX - canvasMain.offsetLeft;
      y0 = event.pageY - canvasMain.offsetTop;
      drawing = true;
      defineUserUnit(x0, y0);
      fillUnit(userUnitX, userUnitY, ctxClone);
    }
  }
  // ///////////////////////////////////
  function drawFrame() {
    let canvasFrame = document.getElementsByClassName('frame current')[0].children[1]; // define canvas in the current frame
    let ctf = canvasFrame.getContext('2d');
    ctf.clearRect(0, 0, 100, 100);
    ctf.drawImage(canvas, 0, 0, 100, 100);
    frame = ctx.getImageData(0, 0, 768, 768);
  }
  // /////////////////////////////

  function startCloneDrawing(event) {
    if (event.button === 0) { button = 'left'; }
    if (event.button === 2) { button = 'right'; }
    if (mode === 'stroke' || mode === 'rectangle' || mode === 'circle') {
      x0 = event.pageX - canvasMain.offsetLeft;
      y0 = event.pageY - canvasMain.offsetTop;
      drawing = true;
      defineUserUnit(x0, y0);
      fillUnit(userUnitX, userUnitY, ctxClone);
    }
  }

  function stopDrawing() {
    if (mode === 'pen' || mode === 'eraser') {
      drawing = false;
      x0 = undefined;
      x1 = undefined;
      y0 = undefined;
      y1 = undefined;
      drawFrame();
    }
    if (mode === 'vertMirrorPen' || mode === 'horizMirrorPen') {
      drawing = false;
      x0 = undefined;
      x1 = undefined;
      y0 = undefined;
      y1 = undefined;
      mirrorX = undefined;
      mirrorX0 = undefined;
      mirrorY = undefined;
      mirrorY0 = undefined;
      drawFrame();
    }
  }

  function stopCloneDrawing() {
    if (mode === 'circle') {
      drawing = false;
      x1 = undefined;
      y1 = undefined;
      canvasClone.style.visibility = 'hidden';
      BrezAlgCirc(x0, y0, radius, ctx);
      ctxClone.clearRect(0, 0, 768, 768);
      x0 = undefined;
      y0 = undefined;
    }
    if (mode === 'stroke') {
      drawing = false;
      canvasClone.style.visibility = 'hidden';
      strokeLineAlg(x0, x1, y0, y1, ctx);
      ctxClone.clearRect(0, 0, 768, 768);
      x0 = undefined;
      x1 = undefined;
      y0 = undefined;
      y1 = undefined;
    }
    if (mode === 'rectangle') {
      drawing = false;
      canvasClone.style.visibility = 'hidden';
      BrezAlg(x0, x0, y0, y1, ctx);
      BrezAlg(x0, x1, y1, y1, ctx);
      BrezAlg(x1, x1, y1, y0, ctx);
      BrezAlg(x0, x1, y0, y0, ctx);
      ctxClone.clearRect(0, 0, 768, 768);
      x0 = undefined;
      x1 = undefined;
      y0 = undefined;
      y1 = undefined;
    }
    drawFrame();
  }

  // /////////////////////////////////////////////////////////////////


  function rectDrawingProcess(event) {
    if (mode === 'rectangle' && drawing === true) {
      ctxClone.clearRect(0, 0, 780, 780);
      x1 = event.pageX - canvasMain.offsetLeft;
      y1 = event.pageY - canvasMain.offsetTop;
      BrezAlg(x0, x0, y0, y1, ctxClone);
      BrezAlg(x0, x1, y1, y1, ctxClone);
      BrezAlg(x1, x1, y1, y0, ctxClone);
      BrezAlg(x0, x1, y0, y0, ctxClone);
    }
  }

  function circleDrawingProcess(event) {
    if (mode === 'circle' && drawing === true) {
      ctxClone.clearRect(0, 0, 780, 780);
      x1 = event.pageX - canvasMain.offsetLeft;
      y1 = event.pageY - canvasMain.offsetTop;
      // eslint-disable-next-line no-restricted-properties
      radius = Math.ceil(Math.sqrt(Math.pow(Math.abs(x1 - x0), 2) + (Math.abs(y1 - y0), 2)));
      BrezAlgCirc(x0, y0, radius, ctxClone);
    }
  }

  // /////////////////////
  function lineDrawingProcess(event) {
    if (mode === 'stroke' && drawing === true) {
      ctxClone.clearRect(0, 0, 780, 780);
      x1 = event.pageX - canvasMain.offsetLeft;
      y1 = event.pageY - canvasMain.offsetTop;
    }
    strokeLineAlg(x0, x1, y0, y1, ctxClone);
  }

  // //////////////////////
  function drawingProcess(event) {
    if ((mode === 'pen' && drawing === true) || (mode === 'eraser' && drawing === true)) {
      x1 = event.pageX - canvasMain.offsetLeft;
      y1 = event.pageY - canvasMain.offsetTop;
      defineUserUnit(x1, y1);
      fillUnit(userUnitX, userUnitY, ctx);
      if ((x0) && (y0)) { BrezAlg(x0, x1, y0, y1, ctx); }
      x0 = x1;
      y0 = y1;
    }
    if (mode === 'vertMirrorPen' && drawing === true) {
      x1 = event.pageX - canvasMain.offsetLeft;
      mirrorX = 768 - x1 + 1;
      y1 = event.pageY - canvasMain.offsetTop;
      defineUserUnit(x1, y1);
      fillUnit(userUnitX, userUnitY, ctx);
      defineUserUnit(mirrorX, y1);
      fillUnit(userUnitX, userUnitY, ctx);
      if ((x0) && (y0)) { BrezAlg(x0, x1, y0, y1, ctx); }
      if ((mirrorX0) && (y0)) { BrezAlg(mirrorX0, mirrorX, y0, y1, ctx); }
      x0 = x1;
      y0 = y1;
      mirrorX0 = mirrorX;
    }
    if (mode === 'horizMirrorPen' && drawing === true) {
      x1 = event.pageX - canvasMain.offsetLeft;
      y1 = event.pageY - canvasMain.offsetTop;
      mirrorY = 768 - y1 + 1;
      defineUserUnit(x1, y1);
      fillUnit(userUnitX, userUnitY, ctx);
      defineUserUnit(x1, mirrorY);
      fillUnit(userUnitX, userUnitY, ctx);
      if ((x0) && (y0)) { BrezAlg(x0, x1, y0, y1, ctx); }
      if ((mirrorY0) && (x0)) { BrezAlg(x0, x1, mirrorY0, mirrorY, ctx); }
      x0 = x1;
      y0 = y1;
      mirrorY0 = mirrorY;
    }
  }

  // drawing events
  canvas.addEventListener('mousedown', startDrawing);
  canvas.addEventListener('mousedown', pickColor);
  canvas.addEventListener('mouseup', stopDrawing);
  canvas.addEventListener('mousemove', drawingProcess);
  canvas.addEventListener('contextmenu', cancelContextMenu);
  canvasClone.addEventListener('mousedown', startCloneDrawing);
  canvasClone.addEventListener('mouseup', stopCloneDrawing);
  canvasClone.addEventListener('mousemove', lineDrawingProcess);
  canvasClone.addEventListener('mousemove', rectDrawingProcess);
  canvasClone.addEventListener('mousemove', circleDrawingProcess);

  // Work with frames////////////////////////////////////////////////////

  function hoverFrame(event) {
    const delBtn = event.target.closest('.frame').children[2];
    delBtn.style.visibility = 'visible';
  }

  function leaveFrame(event) {
    const delBtn = event.target.closest('.frame').children[2];
    delBtn.style.visibility = 'hidden';
  }

  const frameItem = document.querySelectorAll('.frame');
  for (let i = 0; i < frameItem.length; i += 1) {
    frameItem[i].addEventListener('mouseover', hoverFrame);
    frameItem[i].addEventListener('mouseleave', leaveFrame);
  }

  let curFrame = document.getElementById('frame');
  const addBtn = document.getElementById('add-frame');

  // Animation /////////////////////////////////////

  function animation() {
    if (!frames.length) { return; }
    setTimeout(() => {
      window.requestAnimationFrame(animation);
      cprev.clearRect(0, 0, 140, 140);
      if (!frames[count]) { count = 0; }
      cta.putImageData(frames[count], 0, 0, 0, 0, 768, 768);
      cprev.drawImage(canvasCloneAnim, 0, 0, 140, 140);
      if ((count < frames.length - 1) && (frames[count + 1])) {
        count += 1;
      } else { count = 0; }
    }, 1000 / fps);
  }

  // ///////////////////////////////////////////////////////////////////////////

  // Add new frame //
  function addFrame(event) {
    if (!frame) {
      event.stopPropagation();
      return;
    }
    ctx.clearRect(0, 0, 768, 768);
    event.stopPropagation();
    frames.push(frame); // add last frame to the frames array
    animation();
    const div = document.createElement('div');
    curFrame.classList.toggle('current');
    div.className = 'frame current';
    document.getElementById('frames').insertBefore(div, addBtn); // add new frame before button
    curFrame = div;

    const numDiv = document.createElement('div');
    numDiv.className = 'numb';
    curFrame.appendChild(numDiv);
    numb = curFrame.parentElement.children.length - 1;
    numDiv.textContent = numb;

    const canv = document.createElement('canvas');
    canv.setAttribute('id', 'frame-item');
    canv.setAttribute('width', '100');
    canv.setAttribute('height', '100');
    canv.className = 'frame-item';
    curFrame.appendChild(canv);

    const btn = document.createElement('div');
    btn.setAttribute('id', 'delete');
    btn.className = 'delete';
    curFrame.appendChild(btn);

    const frameItem = document.querySelectorAll('.frame');
    for (let i = 0; i < frameItem.length; i += 1) {
      frameItem[i].addEventListener('mouseover', hoverFrame);
      frameItem[i].addEventListener('mouseleave', leaveFrame);
    }
  }

  // ///////////////////////////////////////////////////
  function rangeValue() {
    const newValue = fpsRange.value;
    fpsValue.innerHTML = `${newValue} FPS`;
    fps = newValue;
  }

  fpsRange.addEventListener('input', rangeValue);

  // ////////////////////////////////////////////////////


  addBtn.addEventListener('click', addFrame);

  // Draw main "canvas" in according to current Frame
  function drawMain() {
    if (frame) {
      ctx.clearRect(0, 0, 768, 768);
      ctx.putImageData(frame, 0, 0, 0, 0, 768, 768);
    }
  }

  function searchFrame() {
    const pos = curFrame.children[0].textContent;
    frame = frames[pos - 1];
  }

  // Make frame - current by clicking

  function makeCurrentFrame(event) {
    const { target } = event;
    const item = target.closest('.frame');
    if (item.classList.contains('current')) { return; }

    // let copy = frame; // save changes in current frame
    if (frame) {
      frames[curFrame.children[0].textContent - 1] = frame/* copy */;
      // frame.length = 0;
    }
    // ///////////////////////////////////////
    /*    if (!frame.length) {
      const delFrame = curFrame;
      const parentFrame = delFrame.parentElement;
      parentFrame.removeChild(delFrame);
      for (let i = 0; i <= parentFrame.children.length - 2; i += 1) {
        parentFrame.children[i].children[0].textContent = i + 1;
      }
    } */
    if (!item) { return; }
    if (curFrame.classList.contains('current')) { curFrame.classList.toggle('current'); }
    curFrame = item;
    frame = frames[curFrame.children[0].textContent - 1];
    if (!item.classList.contains('current')) { item.classList.toggle('current'); }

    searchFrame();
    drawMain();
  }

  // Delete frame ///////////

  function deleteFrame(event) {
    const { target } = event;
    const btnDel = target.closest('.delete');
    const delFrame = target.closest('.frame');
    const parentFrame = delFrame.parentElement;
    if (!btnDel) { return; }
    if (parentFrame.children.length === 2) { return; }
    if (delFrame.classList.contains('current')) { delFrame.classList.toggle('current'); }
    parentFrame.removeChild(delFrame);
    frames.splice(delFrame.children[0].textContent - 1, 1);
    curFrame = parentFrame.children[parentFrame.children.length - 2];
    if (!curFrame.classList.contains('current')) { curFrame.classList.toggle('current'); }
    for (let i = 0; i <= parentFrame.children.length - 2; i += 1) {
      parentFrame.children[i].children[0].textContent = i + 1;
    }

    searchFrame();
    drawMain();
  }

  const containerFrames = document.getElementById('frames');
  containerFrames.addEventListener('click', deleteFrame);
  containerFrames.addEventListener('click', makeCurrentFrame);


  // Full screen//////////////
  function fullScreen() {
    canvasPrev.requestFullscreen();
  }

  const fullScr = document.getElementsByClassName('fullscr')[0];
  fullScr.addEventListener('click', fullScreen);

  // Export as .gif ////////
  function exportGif() {
    if (!frames.length) { return; }
    // eslint-disable-next-line no-undef
    const gif = new GIF({
      workers: 2,
      quality: 10,
      repeat: 0,
    });

    for (let i = 0; i < frames.length; i += 1) {
      gif.addFrame(frames[i], { copy: true }, { delay: 1000 / fps });
    }

    const a = document.getElementsByClassName('download-gif')[0];
    a.style.display = 'block';

    gif.on('finished', (blob) => {
      a.href = URL.createObjectURL(blob);
    });

    gif.render();
    a.download = 'piskel-clone';
  }

  const expGif = document.getElementsByClassName('exp-gif')[0];
  expGif.addEventListener('click', exportGif);
}
