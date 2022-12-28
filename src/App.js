import React, { useRef,useState, useEffect } from 'react';
import { fabric } from 'fabric';
const App = () => {
  const [canvas, setCanvas] = useState('');  
  let [isDrawing, setIsDrawing] = useState(false);
  let [currentShape, setCurrentShape] = useState(null);
  const canvasRef = useRef(null);
  const ctx = useRef(null);
  const timeout = useRef(null);
  useEffect(() => {
    setCanvas(initCanvas());
  }, []);  
  
  const initCanvas = () => (
    new fabric.Canvas('canvas', {
      height: 800,
      width: 800,
      backgroundColor: 'pink'
    })
  ); 
  const addRect = canvi => {
    let initialX,initialY,square;
    canvi.on('mouse:down', (e) => {
      
      setIsDrawing(true);
      isDrawing=true;
      

      let pointer = canvi.getPointer(e.e);
      let points = [pointer.x, pointer.y, pointer.x, pointer.y];
      initialX=pointer.x;
      initialY=pointer.y;
       square = new fabric.Rect({
        left: pointer.x,
        top: pointer.y,
        width: 0,
        height: 0,
        strokeWidth: 5,
        stroke: 'black',
        fill: 'red',
      });

      setCurrentShape(square);
      currentShape=square;
      console.log(currentShape)
      canvi.add(square);
    });

    canvi.on('mouse:move', (e) => {
      
      console.log(isDrawing)
      if (!isDrawing) return;
      
      let pointer = canvi.getPointer(e.e);
      let points = [pointer.x, pointer.y, pointer.x, pointer.y];
      let xdiff=pointer.x-currentShape.left;
      let ydiff=pointer.y-currentShape.top;
      
      square.set({ width: xdiff, height: ydiff });
      canvi.renderAll();
    });

    canvi.on('mouse:up', (e) => {
      setIsDrawing(false);
      isDrawing=false;
      currentShape=null;
      let pointer = canvi.getPointer(e.e);
      pointer.x=0;
      pointer.y=0;
    });
  
    }
  
  const addCircle = canvi => {
    let initialX,initialY,circle;
    canvi.on('mouse:down', (e) => {
      
      setIsDrawing(true);
      isDrawing=true;
      

      let pointer = canvi.getPointer(e.e);
      let points = [pointer.x, pointer.y, pointer.x, pointer.y];
      initialX=pointer.x;
      initialY=pointer.y;
       circle = new fabric.Circle({
        radius:0,
        strokeWidth: 5,
        stroke: 'black',
        fill: 'red',
      });

      setCurrentShape(circle);
      currentShape=circle;
      console.log(currentShape)
      canvi.add(circle);
    });

    canvi.on('mouse:move', (e) => {
      
      console.log(isDrawing)
      if (!isDrawing) return;
      
      let pointer = canvi.getPointer(e.e);
      let points = [pointer.x, pointer.y, pointer.x, pointer.y];
      let xdiff=pointer.x-initialX;
      let ydiff=pointer.y-initialY;
      let r=Math.sqrt((xdiff*xdiff)+(ydiff*ydiff))
      circle.set({ radius:(r/2) });
      canvi.renderAll();
    });

    canvi.on('mouse:up', (e) => {
      setIsDrawing(false);
      isDrawing=false;
      currentShape=null;
      let pointer = canvi.getPointer(e.e);
      pointer.x=0;
      pointer.y=0;
    });
  
    
  }
  const addLine = canvi => {
    const circle = new fabric.Line(
      [ 50, 50, 200, 50 ], {
        strokeWidth: 5,
        stroke: '#03A87C'
    });
    canvi.add(circle);
    canvi.renderAll();
  }

  const addPencil=canvi=>{
    canvi.on('mouse:down',startAddingLine)
    canvi.on('mouse:move',startDrawingLine)
    canvi.on('mouse:up',stopDrawing)
    let line;
    let mouseDown=false;
    function startAddingLine(o){
      mouseDown=true;
      let pointer=canvi.getPointer(o.e);
       line=new fabric.Line([pointer.x,pointer.y,pointer.x,pointer.y],{
        stroke:'red',
        strokeWidth:3
      })
      canvi.add(line);
    canvi.renderAll();
    }
    function startDrawingLine(o){
      if(mouseDown===true){
        let pointer=canvi.getPointer(o.e);
      line.set({
        x2:pointer.x,
        y2:pointer.y
      })
      canvi.renderAll();
      }
      
    }
    function stopDrawing(){
      mouseDown=false;

    }
  }
  let clearCanvas=canvi=>{
    canvi.getObjects().forEach((o)=>{canvi.remove(o)});
    //objects.clear();
    
  }
  return(
    <div>
      <button onClick={() => addRect(canvas)}>Rectangle</button>
      
      <button onClick={() => addLine(canvas)}>Line</button>
      <button onClick={() => addPencil(canvas)}>Pencil</button>
      <button onClick={() => clearCanvas(canvas)}>Clear</button>
      <button onClick={() => addCircle(canvas)}>Circle</button>
      <canvas id="canvas" />
      
    </div>
  );
}

export default App;
