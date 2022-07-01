import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onFormInput, 500));

populateForm();

function onFormSubmit(evt) {
  evt.preventDefault();
  const formData = JSON.parse(localStorage.getItem('feedback-form-state'));
  console.log(formData);
  evt.currentTarget.reset();
  localStorage.removeItem('feedback-form-state');
}

function onFormInput(e) {
  let savedForm = localStorage.getItem('feedback-form-state');

  if (savedForm) {
    savedForm = JSON.parse(savedForm);
  } else {
    savedForm = {};
  }

  savedForm[e.target.name] = e.target.value;
  localStorage.setItem('feedback-form-state', JSON.stringify(savedForm));
}

function populateForm() {
  let savedForm = localStorage.getItem('feedback-form-state');
  if (savedForm) {
    savedForm = JSON.parse(savedForm);
    form.elements.email.value = savedForm.email ? savedForm.email : '';
    form.elements.message.value = savedForm.message ? savedForm.message : '';
  }
}
