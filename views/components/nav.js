const navbar = document.querySelector('#navbar');

const createNavHome = () => {
    navbar.innerHTML = `
    <div class="max-w-7xl h-16 flex flex-wrap items-center justify-between mx-auto p-4">
      <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
          <span class="self-center text-2xl text-purple-700 font-semibold whitespace-nowrap">ENERGIA VERTICAL</span>
      </a>
      <button data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="navbar-default" aria-expanded="false">
          <span class="sr-only">Open main menu</span>
          <svg class="w-5 h-5 text-purple-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
          </svg>
      </button>
      <div class="hidden w-full lg:block md:w-auto" id="navbar-default">
        <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white">
          <li>
            <a href="/" class="block py-2 px-3 text-white bg-purple-700 rounded md:bg-transparent md:text-purple-700 md:p-0" aria-current="page">Home</a>
          </li>
          <li>
            <a href="/us/" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-200 hover:text-purple-700 md:hover:bg-transparent md:border-0 md:hover:text-purple-700 md:p-0">Nosotros</a>
          </li>
         
          <li>
            <a href="/login/" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-200 hover:text-purple-700 md:hover:bg-transparent md:border-0 md:hover:text-purple-700 md:p-0">Iniciar Sesión</a>
          </li>
          <li>
            <a href="/signup/" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-200 hover:text-purple-700 md:hover:bg-transparent md:border-0 md:hover:text-purple-700 md:p-0">Registro</a>
          </li>
        </ul>
      </div>
    </div>
    `;
};

const createNavSignup = () => {
    navbar.innerHTML = `
    <div class="max-w-7xl h-16 flex flex-wrap items-center justify-between mx-auto p-4">
      <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
          <span class="self-center text-2xl text-purple-700 font-semibold whitespace-nowrap">ENERGIA VERTICAL</span>
      </a>
      <button data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="navbar-default" aria-expanded="false">
          <span class="sr-only">Open main menu</span>
          <svg class="w-5 h-5 text-purple-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
          </svg>
      </button>
      <div class="hidden w-full lg:block md:w-auto" id="navbar-default">
        <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white">
          <li>
            <a href="/" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-200 hover:text-purple-700 md:hover:bg-transparent md:hover:text-purple-700  md:p-0">Home</a>
          </li>
          <li>
            <a href="/us/" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-200 hover:text-purple-700 md:hover:bg-transparent md:border-0 md:hover:text-purple-700 md:p-0">Nosotros</a>
          </li>
          
          <li>
            <a href="/login/" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-200 hover:text-purple-700 md:hover:bg-transparent md:border-0 md:hover:text-purple-700 md:p-0">Iniciar Sesión</a>
          </li>
          <li>
            <a href="/signup/" class="block py-2 px-3 text-white bg-purple-700 rounded md:bg-transparent md:text-purple-700 md:p-0" aria-current="page">Registro</a>
          </li>
        </ul>
      </div>
    </div>
    `;
};

const createNavLogin = () => {
  navbar.innerHTML = `
  <div class="max-w-7xl h-16 flex flex-wrap items-center justify-between mx-auto p-4">
    <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
        <span class="self-center text-2xl text-purple-700 font-semibold whitespace-nowrap">ENERGIA VERTICAL</span>
    </a>
    <button data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="navbar-default" aria-expanded="false">
        <span class="sr-only">Open main menu</span>
        <svg class="w-5 h-5 text-purple-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
    <div class="hidden w-full lg:block md:w-auto" id="navbar-default">
      <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white">
        <li>
          <a href="/" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-200 hover:text-purple-700 md:hover:bg-transparent md:hover:text-purple-700  md:p-0">Home</a>
        </li>
        <li>
          <a href="/us/" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-200 hover:text-purple-700 md:hover:bg-transparent md:border-0 md:hover:text-purple-700 md:p-0">Nosotros</a>
        </li>
        
          <a href="/login/" class="block py-2 px-3 text-white bg-purple-700 rounded md:bg-transparent md:text-purple-700 md:p-0" aria-current="page">Iniciar Sesión</a>
        </li>
        <li>
          <a href="/signup/" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-200 hover:text-purple-700 md:hover:bg-transparent md:border-0 md:hover:text-purple-700 md:p-0">Registro</a>
        </li>
      </ul>
    </div>
  </div>
  `;
};

const createNavUs = () => {
  navbar.innerHTML = `
  <div class="max-w-7xl h-16 flex flex-wrap items-center justify-between mx-auto p-4">
    <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
        <span class="self-center text-2xl text-purple-700 font-semibold whitespace-nowrap">ENERGIA VERTICAL</span>
    </a>
    <button data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="navbar-default" aria-expanded="false">
        <span class="sr-only">Open main menu</span>
        <svg class="w-5 h-5 text-purple-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
    <div class="hidden w-full lg:block md:w-auto" id="navbar-default">
      <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white">
        <li>
          <a href="/" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-200 hover:text-purple-700 md:hover:bg-transparent md:hover:text-purple-700  md:p-0">Home</a>
        </li>
        <li>
          <a href="/us/" class="block py-2 px-3 text-white bg-purple-700 rounded md:bg-transparent md:text-purple-700 md:p-0" aria-current="page">Nosotros</a>
        </li>
       
        <li>
          <a href="/login/" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-200 hover:text-purple-700 md:hover:bg-transparent md:border-0 md:hover:text-purple-700 md:p-0">Iniciar Sesión</a>
        </li>
        <li>
          <a href="/signup/" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-200 hover:text-purple-700 md:hover:bg-transparent md:border-0 md:hover:text-purple-700 md:p-0">Registro</a>
        </li>
      </ul>
    </div>
  </div>
  `;
};


if(window.location.pathname === '/'){
    createNavHome();
} else if (window.location.pathname === '/signup/'){
    createNavSignup();
} else if (window.location.pathname === '/login/'){
  createNavLogin()
}else if (window.location.pathname === '/us/'){
  createNavUs()};


const navBtn = navbar.children[0].children[1];

navBtn.addEventListener('click', e => {
    
    const menuMobile = navbar.children[0].children[2];
    menuMobile.classList.toggle('hidden');
    
})