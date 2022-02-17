const dropdownMenu = document.getElementById('select-membership');
const Form = document.querySelector('form');
const firstName = document.getElementById('first-name');
const lastName = document.getElementById('last-name');
const email = document.getElementById('email');
const createInfoText = document.getElementById('new-user-created');

async function createDropdown() {
  const res = await fetch('http://localhost:3000/memberships/');
  const memberships = await res.json();
  memberships.data.forEach(({ _id, name }) => {
    const createOption = document.createElement('option');
    createOption.textContent = name;
    createOption.value = _id;
    dropdownMenu.append(createOption);
  });
}

createDropdown();

Form.addEventListener('submit', (event) => {
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
