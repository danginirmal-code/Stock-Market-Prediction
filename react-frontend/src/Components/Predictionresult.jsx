import { useState, useRef, useEffect } from "react";

function PredictionResults({ prediction, plot, ma100, ma200, mse, rmse, r2 }) {
    const [showModal, setShowModal] = useState(false);
    const [zoomImage, setZoomImage] = useState(null);
    const [zoom, setZoom] = useState(1);
    const [fullscreen, setFullscreen] = useState(false);
    const zoomRef = useRef(null);

    const handleZoom = (src) => {
        setZoomImage(src);
        setZoom(1);
        setFullscreen(false);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setZoomImage(null);
        setZoom(1);
        setFullscreen(false);
    };

    const handleWheel = (e) => {
        e.preventDefault();
        const delta = e.deltaY > 0 ? -0.1 : 0.1;
        setZoom((prev) => Math.max(0.5, Math.min(prev + delta, 5)));
    };

    const handleDoubleClick = () => {
        setZoom((prev) => (prev >= 2 ? 1 : prev + 1));
    };

    const handleDownload = async () => {
        try {
            const response = await fetch(zoomImage);
            const blob = await response.blob();
    
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = "prediction-image.jpg";
    
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
    
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Download failed:", error);
            alert("Failed to download the image.");
        }
    };

    const toggleFullscreen = () => {
        setFullscreen((prev) => !prev);
    };

    useEffect(() => {
        const img = zoomRef.current;
        if (img) {
            img.addEventListener("wheel", handleWheel);
            return () => img.removeEventListener("wheel", handleWheel);
        }
    }, [zoomRef, zoomImage]);

    return (
        <>
            {prediction && (
                <div className="container mt-5">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h4 className="text-center mb-4">📈 Prediction Results</h4>

                            <div className="row g-4">
                                {plot && (
                                    <div className="col-12">
                                        <div className="card p-3">
                                            <h5>Original Plot</h5>
                                            <img
                                                src={plot}
                                                alt="Plot"
                                                className="img-fluid rounded cursor-pointer"
                                                onClick={() => handleZoom(plot)}
                                            />
                                        </div>
                                    </div>
                                )}
                                {ma100 && (
                                    <div className="col-12">
                                        <div className="card p-3">
                                            <h5>100 Day Moving Average</h5>
                                            <img
                                                src={ma100}
                                                alt="100 DMA"
                                                className="img-fluid rounded cursor-pointer"
                                                onClick={() => handleZoom(ma100)}
                                            />
                                        </div>
                                    </div>
                                )}
                                {ma200 && (
                                    <div className="col-12">
                                        <div className="card p-3">
                                            <h5>200 Day Moving Average</h5>
                                            <img
                                                src={ma200}
                                                alt="200 DMA"
                                                className="img-fluid rounded cursor-pointer"
                                                onClick={() => handleZoom(ma200)}
                                            />
                                        </div>
                                    </div>
                                )}
                                {prediction && (
                                    <div className="col-12">
                                        <div className="card p-3">
                                            <h5>Predicted Graph</h5>
                                            <img
                                                src={prediction}
                                                alt="Prediction"
                                                className="img-fluid rounded cursor-pointer"
                                                onClick={() => handleZoom(prediction)}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="mt-5">
                                <h5 className="mb-4 text-center">📊 Model Evaluation Metrics</h5>
                                <div className="row g-4">
                                    <div className="col-md-4">
                                        <div className="card border-info shadow-sm h-100">
                                            <div className="card-body text-center">
                                                <h6 className="card-title">Mean Squared Error (MSE)</h6>
                                                <p className="card-text fs-5 text-info fw-bold">{mse}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="card border-success shadow-sm h-100">
                                            <div className="card-body text-center">
                                                <h6 className="card-title">Root Mean Squared Error (RMSE)</h6>
                                                <p className="card-text fs-5 text-success fw-bold">{rmse}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="card border-primary shadow-sm h-100">
                                            <div className="card-body text-center">
                                                <h6 className="card-title">R-Squared (R²)</h6>
                                                <p className="card-text fs-5 text-primary fw-bold">{r2}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            )}

            {/* Modal */}
            {showModal && (
                <div
                    className="modal d-block"
                    tabIndex="-1"
                    onClick={closeModal}
                    style={{ backgroundColor: "rgba(0, 0, 0, 0.8)", zIndex: 9999 }}
                >
                    <div
                        className={`modal-dialog modal-lg modal-dialog-centered ${fullscreen ? "modal-fullscreen" : ""}`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="modal-content bg-dark text-white">
                            <div className="modal-header">
                                <h5 className="modal-title">Image Preview</h5>
                                <button type="button" className="btn-close btn-close-white" onClick={closeModal}></button>
                            </div>
                            <div className="modal-body text-center">
                                <img
                                    src={zoomImage}
                                    ref={zoomRef}
                                    alt="Zoomed"
                                    onDoubleClick={handleDoubleClick}
                                    style={{
                                        transform: `scale(${zoom})`,
                                        transition: "transform 0.2s ease-in-out",
                                        maxWidth: "100%",
                                        maxHeight: "80vh",
                                        cursor: "zoom-in",
                                    }}
                                />
                            </div>
                            <div className="modal-footer justify-content-between">
                                <button className="btn btn-secondary" onClick={toggleFullscreen}>
                                    {fullscreen ? "Exit Fullscreen" : "Fullscreen"}
                                </button>
                                <button className="btn btn-success" onClick={handleDownload}>
                                    Download Image
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default PredictionResults;
