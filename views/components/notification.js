const div = document.querySelector('#notification');

export const createNotification = (isError, message) => {
    
    if (isError){
        div.innerHTML = `
        <div class="flex fixed left-4 justify-end md:ml-64 max-w-xs bg-white border border-gray-200 rounded-xl shadow-lg" role="alert" tabindex="-1" aria-labelledby="hs-toast-error-example-label">
    <div class="flex p-4">
      <div class="shrink-0">
        <svg class="shrink-0 size-4 text-red-500 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"></path>
        </svg>
      </div>
      <div class="ms-3">
        <p id="hs-toast-error-example-label" class=" text-sm text-gray-700">
          ${message}.
        </p>
      </div>
    </div>
  </div>
    `
    } else {
        div.innerHTML = `
        <div id="toast-success" class="flex fixed left-4 md:ml-64 justify-end items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow" role="alert">
        <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg">
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
        </svg>
        <span class="sr-only">Check icon</span>
        </div>
    <div class="ms-3 text-sm font-normal">${message}.
    </div>
    </div>>
    `
    }
   
}