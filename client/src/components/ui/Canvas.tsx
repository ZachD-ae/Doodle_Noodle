import React, { useRef } from 'react';
import { ReactSketchCanvas } from 'react-sketch-canvas';

const Canvas: React.FC = () => {
    const canvasRef = useRef<any>(null);

    const clearCanvas = () => {
        canvasRef.current?.clear();
    };

    const saveDrawing = () => {
        const drawing = canvasRef.current?.exportImage("png"); // Save the drawing as PNG image
        console.log('Saved drawing:', drawing);
        // You can send it to a backend or save it in the state
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
                <button
                    onClick={saveDrawing}
                    className="py-2 px-6 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
                >
                    Save Drawing
                </button>
            </div>
        </div>
    );
};

export default Canvas;
