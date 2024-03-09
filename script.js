import { fileDisplay } from './utils/fileDisplay.js';
const btn = document.querySelector('button');
const form = document.querySelector('form');


form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const repoUrl = formData.get('repoUrl');
    // empty check 
    if (!repoUrl) {
        alert('Please enter a valid repository URL');
        return;
    }
    await fileDisplay(repoUrl);
 
});

btn.addEventListener('click', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const repoUrl = formData.get('repoUrl');
    // empty check
    if (!repoUrl) {
        alert('Please enter a valid repository URL');
        return;
    }
    await fileDisplay(repoUrl);
}
);