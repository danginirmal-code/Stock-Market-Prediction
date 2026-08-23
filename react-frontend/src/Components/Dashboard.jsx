import { useEffect, useState } from 'react';
import axiosInstance from '../axios';
import { Loader, Search, BarChart2 } from 'lucide-react';
import PredictionResults from './Predictionresult';

const Dashboard = () => {
    const [ticker, setTicker] = useState('');
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const [plot, setPlot] = useState();
    const [ma100, setMA100] = useState();
    const [ma200, setMA200] = useState();
    const [prediction, setPrediction] = useState();
    const [mse, setMSE] = useState();
    const [rmse, setRMSE] = useState();
    const [r2, setR2] = useState();

    useEffect(() => {
        const fetchProtectedData = async () => {
            try {
                await axiosInstance.get('/protected/');
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchProtectedData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axiosInstance.post('/predict/', {
                ticker: ticker,
            });
            const backendRoot = import.meta.env.VITE_BACKEND_ROOT;
            setPlot(`${backendRoot}${response.data.plot_img}`);
            setMA100(`${backendRoot}${response.data.plot_100_dma}`);
            setMA200(`${backendRoot}${response.data.plot_200_dma}`);
            setPrediction(`${backendRoot}${response.data.plot_prediction}`);
            setMSE(response.data.mse);
            setRMSE(response.data.rmse);
            setR2(response.data.r2);
            if (response.data.error) {
                setError(response.data.error);
            }
        } catch (error) {
            console.error('There was an error making the API request', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 mx-auto">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title text-center">
                                <BarChart2 className="me-2" /> Stock Prediction Dashboard
                            </h5>
                            <form onSubmit={handleSubmit}>
                                <div className="input-group mb-3">
                                    <span className="input-group-text">
                                        <Search />
                                    </span>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter Stock Ticker"
                                        onChange={(e) => setTicker(e.target.value)}
                                        required
                                    />
                                </div>
                                {error && <div className="text-danger mb-2">{error}</div>}
                                <button type="submit" className="btn btn-info w-100">
                                    {loading ? (
                                        <span>
                                            <Loader className="me-2" spin /> Please wait...
                                        </span>
                                    ) : (
                                        'See Prediction'
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {prediction && (
                <PredictionResults
                    prediction={prediction}
                    plot={plot}
                    ma100={ma100}
                    ma200={ma200}
                    mse={mse}
                    rmse={rmse}
                    r2={r2}
                    />
            )}
        </div>
    );
};

export default Dashboard;