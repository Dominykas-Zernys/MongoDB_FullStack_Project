const mainContentWrapper = document.querySelector('#main-content-wrapper');
const sortingButtonText = document.getElementById('asc-or-dsc');

let sortingOrder = 'asc';

document.getElementById('sorting-button').addEventListener('click', () => {
  sortingButtonText.classList.toggle('asc');
  if (sortingButtonText.classList.contains('asc')) {
    sortingOrder = 'asc';
  } else {
    sortingOrder = 'dsc';
  }
  sortingButtonText.textContent = sortingOrder.toUpperCase();
  getUsers();
});

function getUsers() {
  fetch('http://localhost:3000/memberships')
    .then((res) => res.json())
    .then((services) => {
      fetch('http://localhost:3000/users/' + sortingOrder)
        .then((res) => res.json())
        .then((users) => {
          mainContentWrapper.innerHTML = '';
          users.data.forEach((user) => {
            const userMembership = services.data.find(
              (service) => service._id === user.service_id
            );
            const createServiceWrapper = document.createElement('div');
            createServiceWrapper.classList.add('content-wrapper');
            createServiceWrapper.innerHTML = `<div class="full-name-wrapper">
        <h4 class="full-name">${user.name} ${user.surname}</h4>
        </div>
        <ul class="user-data">
        <li>Email Address: <a href="mailto: ${user.email}" class="email-address">${user.email}</a></li>
        <li>Membership: <a href="serviceMng.html">${userMembership.name}</a></li>
        <li>ip: 00.000.00.00</li>
    </ul>`;
            mainContentWrapper.append(createServiceWrapper);
          });
        });
    });
}

getUsers();
