import React, { useRef, useEffect, useState } from 'react';
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
  const [timeLeft, setTimeLeft] = useState(15);

  useEffect(() => {
    if (timeLeft <= 0) {
      submitDrawing(); 
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

    const clearCanvas = () => {
        canvasRef.current?.clear();
    };

    const submitDrawing = async () => {
        const image = await canvasRef.current?.exportImage("png");
        if (!image) return;

        console.log("Image to submit:", image);

        try {
        await submitDrawingMutation({ variables: { image } });

        const today = new Date().toISOString().slice(0, 10);
        localStorage.setItem('lastSubmittedDate', today);

        console.log('Drawing submitted and submission date stored in localStorage');
    } catch (err) {
        console.error("GRAPHQL ERROR:", err);

        try {
            localStorage.setItem('pendingDrawing', JSON.stringify({
            image,
          createdAt: new Date().toISOString()
        }));
      } catch (e) {
        console.error("Failed to save to localStorage:", e);
      }
    }
  };

    return (
        <div className="canvas-container justify-center items-center">
            <ReactSketchCanvas
                ref={canvasRef}
                width="600px"
                height="400px"
                strokeColor="black"
                strokeWidth={4}
                canvasColor="white"
            />

            <div className="controls flex justify-center space-x-4 mt-4">
                <button
                    onClick={clearCanvas}
                    className="py-2 px-6 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none"
                >
                    Clear
                </button>
                {/* <button
                    onClick={submitDrawing}
                    className="py-2 px-6 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
                >
                    Save Drawing
                </button> */}
            </div>
        </div>
    );
};

export default Canvas;
