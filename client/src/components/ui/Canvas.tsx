import React, { useRef, useEffect, useState } from 'react';
import { ReactSketchCanvas } from 'react-sketch-canvas';
import { gql, useMutation } from '@apollo/client';
import { useUser } from '../../App';
import { SubmitDrawingResult } from '../../models/submitDrawing';

// Define the mutation
const SUBMIT_DRAWING = gql`
  mutation SubmitDrawing($image: String!) {
    submitDrawing(image: $image) {
      _id
      imageUrl
      createdAt
      prompt {
        date
        prompt {
          text
        }
        drawings {
          _id
        }
      }
      artist {
        _id
        username
        email
        submissionDate
        drawings {
          _id
        }
      }
    }
  }
`;

const Canvas: React.FC = () => {
  const { setUser } = useUser()
  const canvasRef = useRef<any>(null);
  const [submitDrawingMutation] = useMutation<SubmitDrawingResult>(SUBMIT_DRAWING);
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    if (timeLeft <= 0) {
      submitDrawing(); 
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
          const { data } = await submitDrawingMutation({ variables: { image } });
  
          if (data && data.submitDrawing && data.submitDrawing.artist) {
            //sets User with new drawing attached
            setUser(data.submitDrawing.artist)
            localStorage.setItem('drawing', data.submitDrawing.imageUrl)
            console.log("successfully set user",setUser)
          }
        
        const today = new Date().toISOString().split('T')[0];
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


