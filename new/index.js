/** @jsxImportSource https://esm.sh/react@18.2.0 */
import React from "https://esm.sh/react@18.2.0";
import { createRoot } from "https://esm.sh/react-dom@18.2.0/client";
import BookMyShowApp from './components/BookMyShowApp';

const root = createRoot(document.getElementById("root"));
root.render(<BookMyShowApp />);

import React, { useState, useEffect } from "https://esm.sh/react@18.2.0";

import SeatSelection from './SeatSelection';
import PaymentPage from './PaymentPage';
import ConfirmationPage from './ConfirmationPage';

function BookMyShowApp() {
  const [movies, setMovies] = useState([]);
  const [theaters, setTheaters] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedTheater, setSelectedTheater] = useState(null);
  const [selectedShowTime, setSelectedShowTime] = useState(null);
  const [bookingStage, setBookingStage] = useState('movies');
  const [bookingDetails, setBookingDetails] = useState(null);

  useEffect(() => {
    fetchMovies();
    fetchTheaters();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await fetch('/api/movies');
      const data = await response.json();
      setMovies(data);
    } catch (error) {
      console.error("Failed to fetch movies", error);
    }
  };

  const fetchTheaters = async () => {
    try {
      const response = await fetch('/api/theaters');
      const data = await response.json();
      setTheaters(data);
    } catch (error) {
      console.error("Failed to fetch theaters", error);
    }
  };

  const handleMovieSelect = (movie) => {
    setSelectedMovie(movie);
    setBookingStage('theaters');
  };

  const handleTheaterSelect = (theater) => {
    setSelectedTheater(theater);
    setBookingStage('showtimes');
  };

  const handleShowTimeSelect = (showTime) => {
    setSelectedShowTime(showTime);
    setBookingStage('seats');
  };

  const handleBookingComplete = (details) => {
    setBookingDetails(details);
    setBookingStage('payment');
  };

  const handlePaymentComplete = (paymentResult) => {
    setBookingDetails(prev => ({
      ...prev,
      referenceNumber: paymentResult.referenceNumber
    }));
    setBookingStage('confirmation');
  };

  const renderContent = () => {
    switch(bookingStage) {
      case 'movies':
        return (
          <section className="movies-section">
            <h2>Now Showing</h2>
            <div className="movies-grid">
              {movies.map(movie => (
                <div 
                  key={movie.id} 
                  className="movie-card"
                  onClick={() => handleMovieSelect(movie)}
                >
                  <img 
                    src={movie.poster || 'https://via.placeholder.com/200x300?text=Movie+Poster'} 
                    alt={movie.title} 
                  />
                  </div>))}
                  </div>
                  </section>)}};
}
                