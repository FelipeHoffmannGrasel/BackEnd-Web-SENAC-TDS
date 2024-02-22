const carForm = document.getElementById('car-form');
const carList = document.getElementById('car-list');
const carDetails = document.getElementById('car-details'); 
const updateCarForm = document.getElementById('update-car-form'); 

function listCars() {
    fetch('http://localhost:4000/carros')
        .then(response => response.json())
        .then(data => {
            carList.innerHTML = '';

            data.forEach(car => {
                const li = document.createElement('li');
                li.className = 'car-list-item';
                li.innerHTML = `
                    <div class='car-card'>
                        <div class="car-image">
                            <img src="${car.img}" alt="${car.name} Image">
                        </div>
                        <div class="car-info">
                            <p>${car.name}</p>
                            <p>Pilotos: ${car.pilots}</p> 
                            <p>Equipe: ${car.team}</p>
                        </div>
                        <div class="car-buttons">
                            <button class="details-button" onclick="showCarDetails(${car.id})">Detalhes</button>
                            <button class="delete-button" onclick="deleteCar(${car.id})">Excluir</button>
                        </div>
                    <div/>
                `;
                li.dataset.carId = car.id;
                carList.appendChild(li);
            });
        })
        .catch(error => console.error('Erro:', error));
}

function showCarDetails(carId) {
    window.location.href = `edit-car.html?id=${carId}`; 
    console.log(window.location.href)
}

function deleteCar(carId) {
    fetch(`http://localhost:4000/carros/${carId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(() => {
        listCars();
    })
    .catch(error => console.error('Erro:', error));
}

carForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name   = document.getElementById('name').value;
    const pilots = document.getElementById('pilots').value;
    const team   = document.getElementById('team').value;
    const img    = document.getElementById('img').value;

    fetch('http://localhost:4000/carros', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: name, pilots: pilots, team: team, img: img }),
    })
    .then(response => response.json())
    .then(() => {
        listCars();
        carForm.reset();
    })
    .catch(error => console.error('Erro:', error));
});

listCars();
