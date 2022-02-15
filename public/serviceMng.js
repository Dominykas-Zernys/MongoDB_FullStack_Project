const mainContentWrapper = document.querySelector('#main-content-wrapper');

function loadMembershipData() {
  fetch('http://localhost:3000/memberships')
    .then((res) => res.json())
    .then((services) => {
      mainContentWrapper.innerHTML = '';
      services.data.forEach((service) => {
        const createServiceWrapper = document.createElement('div');
        createServiceWrapper.classList.add('content-wrapper');
        createServiceWrapper.innerHTML = `<div class="membership-content">
            <h3>$${service.price.toFixed(2)} ${service.name}</h3>
            <p>${service.description}</p>
        </div>
        <div class="membership-delete-wrapper">
            <button class = "delete-button del-btn" data-id = "${service._id}">
                <img src="img/delete.png" alt="delete-button" class = "delete-button-img del-btn" data-id = "${
                  service._id
                }">
            </button>
        </div>`;
        mainContentWrapper.append(createServiceWrapper);
      });
    });
}

loadMembershipData();

mainContentWrapper.addEventListener('click', (event) => {
  if (event.target.classList.contains('del-btn')) {
    const idToDelete = event.target.dataset.id;
    fetch('http://localhost:3000/memberships/' + idToDelete, {
      method: 'DELETE',
    });
    loadMembershipData();
  }
});
