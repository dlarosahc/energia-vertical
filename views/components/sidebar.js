const sideBar = document.querySelector('#side-bar');


const createSideBarDashboard = () => {
    sideBar.innerHTML = `
    <div id="side-bar">
   <!-- Version Mobil -->
   <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" class="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200">
      <span class="sr-only">Open sidebar</span>
      <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
      </svg>
   </button>
   
   <!-- Version Escritorio -->
   
   <aside id="default-sidebar" class="showSideBar  duration-500 ease-in-out fixed top-0 left-0 z-40 w-64 h-screen transition -translate-x-full lg:translate-x-0" aria-label="Sidebar">
      
   <div class="flex flex-col h-full px-3 py-4 overflow-y-auto bg-purple-700  gap-4">
   <div class="flex justify-end pr-4 md:hidden"> 
   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="close-icon size-6 text-white   cursor-pointer">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
  </svg>
   </div>
   

         <div class="flex justify-center">
         <img class="w-48 h-25" src="/images/Logo EV Blanco.png" alt="">
      </div>
         <ul class="space-y-2 font-medium">
            <li>
               <a href="/dashboard" class="flex items-center p-2 text-white hover:rounded-lg hover:bg-white hover:text-purple-700 group">
                  <svg class="w-5 h-5 text-white transition duration-75  group-hover:text-purple-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                     <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
                     <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
                  </svg>
                  <span class="ms-3">Resumen</span>
               </a>
            </li>
            <li>
               <a href="/dashboard/attendance" class="flex items-center p-2 text-white hover:rounded-lg hover:bg-white hover:text-purple-700  group">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                   </svg>


                  <span class="ms-3">Asistencias</span>
               </a>
            </li>
            <li>
               <a href="/dashboard/package" class="flex items-center p-2 text-white hover:rounded-lg hover:bg-white hover:text-purple-700  group">
                  <svg class="w-5 h-5 text-white transition duration-75  group-hover:text-purple-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                     <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
                     <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
                  </svg>
                  <span class="ms-3">Paquetes</span>
               </a>
            </li>
            <li>
               <a href="/dashboard/schedule" class="flex items-center p-2 text-white hover:rounded-lg hover:bg-white hover:text-purple-700 group">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                  </svg>
                  <span class="ms-3">Calendario</span>
               </a>
            </li>
            <li>
               <a href="/dashboard/payments" class="flex items-center p-2 text-white hover:rounded-lg hover:bg-white hover:text-purple">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                     <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
                  </svg>

                  <span class="ms-3">Pagos</span>
               </a>
            </li>

             <li>
               <button id="close-btn" class="flex items-center p-2 text-white hover:rounded-lg hover:bg-white hover:text-purple-700  group">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                  </svg>


                  <span class="ms-3">Cerrar Sesión</span>
               </button>
            </li>
           
         </ul>
      </div>
   </aside>
</div> 
`;
};

createSideBarDashboard();
const closeBtn = sideBar.children[0].children[1].children[0].children[2].children[5].children[0];

const sideBtn = sideBar.children[0].children[0];

const closeSideBar = sideBar.children[0].children[1].children[0].children[0].children[0];

closeSideBar.addEventListener('click', e => {
   const menu = sideBar.children[0].children[1];
    menu.classList.add('-tranlate-x-full');
    menu.classList.remove('translate-x-0');
    console.log(menu);
   
})

sideBtn.addEventListener('click', e => {
   if (sideBtn){
    const menu = sideBar.children[0].children[1];
    menu.classList.remove('-tranlate-x-full');
    menu.classList.add('translate-x-0');
    console.log(menu);
   
    

   }

});

closeBtn.addEventListener('click', async e => {
   try {
    await axios.get('/api/logout');
    window.location.pathname = '/login'
   } catch (error) {
    console.log(error);
    
   }
 });