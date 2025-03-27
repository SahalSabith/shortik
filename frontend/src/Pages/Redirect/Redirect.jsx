import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Redirect.css"; // Import the CSS file

function Redirect() {
    const { shortUrl } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUrl = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/redirect/${shortUrl}/`);
                console.log(response.data);

                if (response.data.success) {
                    console.log(response.data);
                    window.location.href = response.data.original_url;
                } else {
                    navigate("/expired");
                }
            } catch (error) {
                console.error("Error fetching short URL:", error);
                navigate("/expired");
            }
        };

        fetchUrl();
    }, [shortUrl, navigate]);

    return (
        <div className="redirect-container">
            <div className="redirect-message">Redirecting you to the destination...</div>
            <div className="loader"></div>
        </div>
    );
}

export default Redirect;