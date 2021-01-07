const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

let ticketPrice = +movieSelect.value;

// Save Selected movie index and price
const setMovieData = function (movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
};

// Update total count
const updateSelectedCount = function () {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));
  const selctedSeatsCount = selectedSeats.length;

  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  count.innerHTML = selctedSeatsCount;
  total.innerHTML = selctedSeatsCount * ticketPrice;
};

// Get data from local storage and populate UI
const populateUI = function () {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  const selectedMovieIndex = JSON.parse(
    localStorage.getItem('selectedMovieIndex')
  );

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) seat.classList.add('selected');
    });
  }

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
};

// movie selected event
movieSelect.addEventListener('change', function (e) {
  ticketPrice = +e.target.value;
  updateSelectedCount();

  setMovieData(e.target.selectedIndex, e.target.value);
});

populateUI();

// Seat click event
container.addEventListener('click', function (e) {
  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
  ) {
    e.target.classList.toggle('selected');

    updateSelectedCount();
  }
});

// Initial count and total set
updateSelectedCount();
