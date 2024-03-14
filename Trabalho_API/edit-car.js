const carList = document.getElementById('car-list');
const params = new URLSearchParams(window.location.search);
const carId = params.get('id');

function listCars() {
    fetch('http://localhost:4000/carros')
        .then(response => response.json())
        .then(data => {
            carList.innerHTML = '';

            data.forEach(car => {
                if(car.id == carId){
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
                        <div/>
                    `;
                    li.dataset.carId = car.id;
                    li.addEventListener('click', () => {
                        displayEditForm(car);
                    });
                    carList.appendChild(li);
                }
            });
        })
        .catch(error => console.error('Erro:', error));
}

listCars();

const editCarForm = document.getElementById('edit-car-form');

editCarForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const editedName   = document.getElementById('edit-name').value;
    const editedPilots = document.getElementById('edit-pilots').value;
    const editedTeam   = document.getElementById('edit-team').value;

    const params = new URLSearchParams(window.location.search);
    const carId = params.get('id');

    fetch(`http://localhost:4000/carros/${carId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: editedName, pilots: editedPilots, team: editedTeam }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
        .then(() => {
        window.location.href = 'index.html';
    })
    .catch(error => console.error('Erro:', error));
});
