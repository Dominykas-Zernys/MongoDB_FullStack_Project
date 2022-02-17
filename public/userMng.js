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

async function getUsers() {
  const resUsers = await fetch('http://localhost:3000/users/' + sortingOrder);
  const users = await resUsers.json();
  mainContentWrapper.innerHTML = '';
  users.data.forEach((user) => {
    const createServiceWrapper = document.createElement('div');
    createServiceWrapper.classList.add('content-wrapper');
    createServiceWrapper.innerHTML = `<div class="full-name-wrapper">
        <h4 class="full-name">${user.name} ${user.surname}</h4>
        </div>
        <ul class="user-data">
        <li>Email Address: <a href="mailto: ${user.email}" class="email-address">${user.email}</a></li>
        <li>Membership: <a href="serviceMng.html">${user.membership}</a></li>
        <li>ip: 00.000.00.00</li>
    </ul>`;
    mainContentWrapper.append(createServiceWrapper);
  });
}
// async function getUsers() {
//   const resServices = await fetch('http://localhost:3000/memberships');
//   const services = await resServices.json();
//   const resUsers = await fetch('http://localhost:3000/users/' + sortingOrder);
//   const users = await resUsers.json();
//   mainContentWrapper.innerHTML = '';
//   users.data.forEach((user) => {
//     const userMembership = services.data.find(
//       (service) => service._id === user.service_id
//     );
//     const createServiceWrapper = document.createElement('div');
//     createServiceWrapper.classList.add('content-wrapper');
//     createServiceWrapper.innerHTML = `<div class="full-name-wrapper">
//         <h4 class="full-name">${user.name} ${user.surname}</h4>
//         </div>
//         <ul class="user-data">
//         <li>Email Address: <a href="mailto: ${user.email}" class="email-address">${user.email}</a></li>
//         <li>Membership: <a href="serviceMng.html">${userMembership.name}</a></li>
//         <li>ip: 00.000.00.00</li>
//     </ul>`;
//     mainContentWrapper.append(createServiceWrapper);
//   });
// }

getUsers();
