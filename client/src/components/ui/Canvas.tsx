import React, { useRef, useState, useEffect } from 'react';
import { ReactSketchCanvas } from 'react-sketch-canvas';
import { gql, useMutation } from '@apollo/client';

// Define the mutation
const SUBMIT_DRAWING = gql`
  mutation SubmitDrawing($image: String!) {
    submitDrawing(image: $image) {
      _id
      submissionDate
    }
  }
`;

const Canvas: React.FC = () => {
  const canvasRef = useRef<any>(null);
  const [submitDrawingMutation] = useMutation(SUBMIT_DRAWING);
  const [timeLeft, setTimeLeft] = useState(15); // 15 seconds timer
  const [strokeColor, setStrokeColor] = useState('black'); // Default stroke color
  const [loading, setLoading] = useState(false); // Loading state for submitting

  // Timer Logic: Countdown and submission handling
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
    const image = await canvasRef.current?.exportImage("url");
    if (!image) return;

    setLoading(true); // Set loading state to true while submitting

    try {
      await submitDrawingMutation({ variables: { image } });
      const today = new Date().toISOString().slice(0, 10);
      localStorage.setItem('lastSubmittedDate', today);
      console.log('Drawing submitted and submission date stored in localStorage');
    } catch (err) {
      console.error("GRAPHQL ERROR:", err);
      try {
        localStorage.setItem('pendingDrawing', JSON.stringify({ image, createdAt: new Date().toISOString() }));
      } catch (e) {
        console.error("Failed to save to localStorage:", e);
      }
    } finally {
      setLoading(false); // Reset loading state after submission or error
    }
  };

  return (
    <div className="canvas-container justify-center items-center">
      <ReactSketchCanvas
        ref={canvasRef}
        width="600px"
        height="400px"
        strokeColor={strokeColor} // Updated stroke color
        strokeWidth={4}
        canvasColor="white"
      />

      <div className="controls flex justify-center space-x-4 mt-4">
        {/* Color Picker */}
        <input
          type="color"
          value={strokeColor}
          onChange={(e) => setStrokeColor(e.target.value)}
          className="w-10 h-10 p-0 border-1 border-gray-300 rounded-full cursor-pointer"
          title="Pick a color"
        />

        {/* Clear Canvas Button */}
        <button
          onClick={clearCanvas}
          className="py-2 px-6 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none"
        >
          Clear
        </button>

        {/* Save Drawing Button */}
        <button
          onClick={submitDrawing}
          disabled={loading}
          className="py-2 px-6 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
        >
          {loading ? 'Submitting...' : 'Save Drawing'}
        </button>

        {/* Timer Display */}
        <div className="text-xl font-bold mt-4">
          {timeLeft <= 0 ? "Time's up!" : `${timeLeft}s`}
        </div>
      </div>
    </div>
  );
};

export default Canvas;
