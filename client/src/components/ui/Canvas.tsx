import React, { useRef, useState, useEffect } from 'react';
import { ReactSketchCanvas } from 'react-sketch-canvas';

const CanvasPage: React.FC = () => {
  const canvasRef = useRef<any>(null);
  const [strokeColor, setStrokeColor] = useState('#000000'); // Default stroke color in hex format
  const [strokeWidth, setStrokeWidth] = useState(4); // Default stroke width
  const [timeLeft, setTimeLeft] = useState(15); // 15 seconds timer
  const [loading, setLoading] = useState(false); // Loading state for submitting

  useEffect(() => {
    if (timeLeft <= 0) {
      submitDrawing();
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  const clearCanvas = () => {
    canvasRef.current?.clear();
  };

 const submitDrawing = async () => {
  const image = await canvasRef.current?.exportImage("base64");
  if (!image) return;

  // Get existing drawings or start a new array
  const drawings = JSON.parse(localStorage.getItem('drawings') || '[]');
  drawings.push(image);
  localStorage.setItem('drawings', JSON.stringify(drawings));

  // Optionally, still save the latest drawing separately
  localStorage.setItem('drawing', image);

  console.log("Drawing saved:", image);
};

  return (
    <div className="canvas-container justify-center items-center">
      <ReactSketchCanvas
        ref={canvasRef}
        width="600px"
        height="400px"
        strokeColor={strokeColor}
        strokeWidth={strokeWidth}
        canvasColor="white"
      />
      
      <div className="controls flex justify-center space-x-4 mt-4">
        <button onClick={clearCanvas} className="py-2 px-6 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none">
          Clear
        </button>
        <button onClick={submitDrawing} disabled={loading} className="py-2 px-6 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none">
          {loading ? 'Submitting...' : 'Save Drawing'}
        </button>
        <div className="text-xl font-bold mt-4">
          {timeLeft <= 0 ? "Time's up!" : `${timeLeft}s`}
        </div>
      </div>
    </div>
  );
};

export default CanvasPage;
