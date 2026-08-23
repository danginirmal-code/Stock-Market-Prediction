import React from 'react';

const Footer=()=>{
    return (
        <footer className="bg-dark text-center text-light py-3">
            <div className="container">
                <p className="mb-2">© 2025 Stock Prediction Portal</p>
                <div className="d-flex justify-content-center">
                    <a className="text-light mx-2" href="#">Privacy Policy</a>
                    <a className="text-light mx-2" href="#">Terms of Service</a>
                    <a className="text-light mx-2" href="#">Contact Us</a>
                    <a className="text-light mx-2" href="#">About Us</a>
                </div>
            </div>
        </footer>
    )
}
export default Footer;