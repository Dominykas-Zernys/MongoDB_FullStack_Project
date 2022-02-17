const dropdownMenu = document.getElementById('select-membership');
const submitButton = document.getElementById('submit-button');
const firstName = document.getElementById('first-name');
const lastName = document.getElementById('last-name');
const email = document.getElementById('email');
const createInfoText = document.getElementById('new-user-created');

fetch('http://localhost:3000/memberships/')
  .then((res) => res.json())
  .then((memberships) => {
    memberships.data.map((membership) => {
      const createOption = document.createElement('option');
      createOption.textContent = membership.name;
      createOption.value = membership._id;
      dropdownMenu.append(createOption);
    });
  });

submitButton.addEventListener('click', (event) => {
  event.preventDefault();
  if (
    !firstName.value ||
    !lastName.value ||
    !email.value ||
    !dropdownMenu.value
  ) {
    createInfoText.textContent = 'Some fields are left empty!';
    createInfoText.classList.add('red-temporary-text');
  } else {
    fetch('http://localhost:3000/users/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: firstName.value,
        surname: lastName.value,
        email: email.value,
        service_id: dropdownMenu.value,
      }),
    });
    createInfoText.textContent = 'user successfully created!';
    createInfoText.classList.add('green-temporary-text');
    setTimeout(() => {
      createInfoText.textContent = '';
      createInfoText.classList.remove('green-temporary-text');
    }, 3000);
    firstName.value = '';
    lastName.value = '';
    email.value = '';
    document.getElementById('empty-dropdown-option').selected = 'selected';
  }
});
