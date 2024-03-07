import { downloadFolder } from './downloadFolder.js';
const fileOutput = document.querySelector('.fileOutput');

// Function to display the contents of a repository
export const fileDisplay = async (repoUrl) => {
    try {
        const url = new URL(repoUrl);
        const pathname = url.pathname;
        const pathParts = pathname.split('/');

        const username = pathParts[1];
        const repo = pathParts[2];
        const folderPath = pathParts.slice(5).join('/');
        // console.log(folderPath)

        // GitHub API URL to get the contents of a repository
        const apiUrl = `https://api.github.com/repos/${username}/${repo}/contents/${folderPath}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        // console.log(data);

        // Display the contents of the repository
        fileOutput.innerHTML = `<h3 class="text-center text-2xl font-bold bg-gradient-to-r from-green-600 to-cyan-700 bg-clip-text text-transparent">Folder Contents</h3>
            <h4 class="text-center text-xl font-bold bg-gradient-to-r from-green-600 to-cyan-700 bg-clip-text text-transparent">Repository: ${repo}</h4>
            <h4 class="text-center text-xl font-bold bg-gradient-to-r from-green-600 to-cyan-700 bg-clip-text text-transparent"> ${folderPath && `Folder: ${folderPath}`} </h4>
            <h4 class="text-center text-xl font-bold bg-gradient-to-r from-green-600 to-cyan-700 bg-clip-text text-transparent">Total Files: ${data.length}</h4>
    
            <hr>
          <div class="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-xl bg-clip-border">
            <table class="w-full text-left table-auto min-w-max">
                <thead>
                <tr>
                    <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                    <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                        #
                    </p>
                    </th>
                    <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                    <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                        File Name
                    </p>
                    </th>
                    <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                    <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                       File Type
                    </p>
                    </th>
                    <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                    <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                        File Size
                    </p>
                    </th>
                    <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                    <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70"></p>
                    </th>
                </tr>
                </thead>
                <tbody>
                ${data.map(file => `
                    <tr>
                        <td class="p-4 border-b border-blue-gray-50">
                        <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                            ${data.indexOf(file) + 1}
                        </p>
                        </td>
                        <td class="p-4 border-b border-blue-gray-50">
                        <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                            ${file.name}
                        </p>
                        </td>
                        <td class="p-4 border-b border-blue-gray-50">
                        <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900 capitalize">
                            ${file.type}
                        </p>
                        </td>
                        <td class="p-4 border-b border-blue-gray-50">
                        <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                            ${file.size === 0 ? '' : file.size > 1000000 ? `${(file.size / 1000000).toFixed(2)} MB` : `${(file.size / 1000).toFixed(2)} KB`}
                        </p>
                        </td>
                        <td class="p-4 border-b border-blue-gray-50">
                       
                            ${file.type === 'file' ? `<a href="${file.download_url}" target="_blank" class="bg-gradient-to-r from-green-600 to-cyan-700 text-white py-1 px-2 rounded" download>Download file</a>` : ''}
                        
                        </td>
                    </tr>
                    `).join('')}
                </tbody>
            </table>
            </div>
            <div class="flex justify-center flex-col space-y-2 py-2 mx-4">
                <h3 class="text-center font-bold"> Total Size: ${((data.reduce((acc, file) => acc + file.size, 0)) / 1000000).toFixed(2)} MB</h3>
                <button id="gitDown" class="bg-gradient-to-r from-green-600 to-cyan-700 text-white py-2 px-2 rounded">
                    Download as zip
                </button>
            </div>

           `;

    } catch (error) {
        alert(error.message, 'Invalid URL!  Enter extact URL of the repository!');
    }
};

// Event listener to download the entire repository as a zip file
fileOutput.addEventListener('click', async (e) => {
    if (e.target.id === 'gitDown') {
        console.log('Downloading...');
        await downloadFolder(repoUrl);
    }
});