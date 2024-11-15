// Daz's emailjs account info
// const EMAIL = {
//     PUBLIC_KEY: 'Pje4_CaDdmEL3bbnu',
//     SERVICE_ID: 'service_a7x8nl7',
//     TEMPLATE_ID: 'template_cojnswr',
// };

// Julia's emailjs account info
const EMAIL = {
  PUBLIC_KEY: 'tY7StYuJjS7lWHLwM',
  SERVICE_ID: 'service_pirb8os',
  TEMPLATE_ID: 'template_8vt7ehk',
};

// Initialize EmailJS with the public key
emailjs.init(EMAIL.PUBLIC_KEY);

document.getElementById('event-form').addEventListener('submit', function (e) {
    e.preventDefault();

    let hasError = false;

    // Event Type validation
    const selectedEventTypes = Array.from(document.querySelectorAll('input[name="eventType"]:checked'));
    const eventError = document.querySelector('#error-event-type');
    if (selectedEventTypes.length === 0) {
        eventError.textContent = 'Please select at least one event type.';
        document.querySelectorAll('.event-type').forEach(function (element) {
            element.classList.add('error-box');
        });
        hasError = true;
    } else {
        eventError.textContent = '';
        document.querySelectorAll('.event-type').forEach(function (element) {
            element.classList.remove('error-box');
        });
    }

    // Event Date validation
    const eventDate = document.querySelector('#event-date');
    const notDecidedDate = document.querySelector('#not-decided-date');
    const dateError = document.querySelector('#error-event-date');
    if (! notDecidedDate.checked && eventDate.value === '') {
        dateError.textContent = 'Please select a date.';
        eventDate.classList.add('error-box');
        hasError = true;
    } else {
        dateError.textContent = '';
        eventDate.classList.remove('error-box');
    }

    // Event Time validation
    const eventTime = document.querySelector('#event-time');
    const notDecidedTime = document.querySelector('#not-decided-time');
    const timeError = document.querySelector('#error-event-time');
    if (! notDecidedTime.checked && eventTime.value === '') {
        timeError.textContent = 'Please select a time.';
        eventTime.classList.add('error-box');
        hasError = true;
    } else {
        timeError.textContent = '';
        eventTime.classList.remove('error-box');
    }

    // Name validation
    const name = document.querySelector('#name');
    const nameError = document.querySelector('#error-name');
    if (name.value === '') {
        nameError.textContent = 'Please input name.';
        name.classList.add('error-box');
        hasError = true;
    } else {
        nameError.textContent = '';
        name.classList.remove('error-box');
    }

    // Contact Method validation
    const selectedContactMethod = document.querySelector('input[name="contact-item"]:checked');
    const contactError = document.querySelector('#error-contact-method');
    const phone = document.querySelector('#phone');
    if (! selectedContactMethod) {
        contactError.textContent = 'Please select a contact method.';
        document.querySelectorAll('.contact-item').forEach(function (element) {
            element.classList.add('error-box');
        });
        hasError = true;
    } else {
        contactError.textContent = '';
        document.querySelectorAll('.contact-item').forEach(function (element) {
            element.classList.remove('error-box');
        });
    }

    // Phone number validation if "Call" is selected
    if (selectedContactMethod.value === 'Call' && phone.value === '') {
        contactError.textContent = 'Please enter your phone number for a call.';
        phone.classList.add('error-box');
        hasError = true;
    } else {
        phone.classList.remove('error-box');
    }


    if (! hasError) {
        // form date to be sent
        const formData = {
            eventType: selectedEventTypes.map(checkbox => checkbox.value).join(', '),
            eventDate: notDecidedDate.checked ? 'Not decided' : eventDate.value,
            eventTime: notDecidedTime.checked ? 'Not decided' : eventTime.value,
            name: name.value,
            contactMethod: selectedContactMethod?.value || '',
            phone: phone.value,
            countryCode: document.getElementById('country-code').value,
        };

        // send the form data
        emailjs.send(EMAIL.SERVICE_ID, EMAIL.TEMPLATE_ID, formData)
            .then(function () {
                alert('Form submitted successfully!');
            })
            .catch(function (error) {
                alert('Failed to send the form. Please try again.');
                console.error(error);
            });
    }
});
