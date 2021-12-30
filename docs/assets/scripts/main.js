const formulator = new Formulator(document.querySelector('.formula-container'));

const input = document.querySelector('.formula-input');
const button = document.querySelector('.formula-submit');

button.onclick = () => {
    formulator.visualize(input.value);
}

button.click();