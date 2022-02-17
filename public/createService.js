const membershipName = document.getElementById('name');
const price = document.getElementById('price');
const membershipDescription = document.getElementById('description');
const submitButton = document.getElementById('submit-button');
const createInfoText = document.getElementById('new-user-created');

submitButton.addEventListener('click', (event) => {
  event.preventDefault();
  if (!membershipName.value || !price.value || !description.value) {
    createInfoText.textContent = 'Some fields are left empty!';
    createInfoText.classList.add('red-temporary-text');
  } else {
    fetch('http://localhost:3000/memberships/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: membershipName.value,
        price: Number(price.value),
        description: membershipDescription.value,
      }),
    });
    createInfoText.textContent = 'service successfully created!';
    createInfoText.classList.add('green-temporary-text');
    setTimeout(() => {
      createInfoText.textContent = '';
      createInfoText.classList.remove('green-temporary-text');
    }, 3000);
    membershipName.value = '';
    price.value = '';
    membershipDescription.value = '';
  }
});
