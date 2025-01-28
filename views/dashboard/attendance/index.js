const classesContent = document.querySelector('#classes-content');
const attendanceHead = document.querySelector('#attendance-head');
const titleClient = document.querySelector('#title-client');
const searchInput = document.querySelector('#search-input');
const assistantTable = document.querySelector('#assistant-table');


let userLoggedIn = null;
let userId = null;
let activePackage = null;
(async () => {
    const {data } = await axios.get('/api/users/logged');
    userLoggedIn = data;

    if(userLoggedIn.rol === 'client'){
        assistantTable.children[0].children[0].children[0].classList.add('hidden');
        assistantTable.children[0].children[0].children[6].classList.add('hidden');
        attendanceHead.children[0].children[1].classList.remove('flex');
        attendanceHead.children[0].children[1].classList.add('hidden');
        searchInput.classList.add('hidden');
    }
    
    
  
    
    
    
    
    
    

   

})();

classesContent.addEventListener('click', async e => {

    //Marcar asistencia 
    if(e.target.closest('.check-btn')){
      const checkBtn = e.target.closest('.check-btn');
      const tableItem = checkBtn.parentElement.parentElement;
     
        
      const checkIcon = checkBtn.children[0];
      if (!tableItem.classList.contains('approved')){
       await axios.patch(`/api/class/${tableItem.id}/attended`, { attended: true });
       checkIcon.innerHTML = `
       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="text-green-500 size-8">
       <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
       </svg>
       `;
       tableItem.classList.add('approved');
       } else {
           await axios.patch(`/api/payments/${tableItem.id}`, { attended: false });
           tableItem.classList.remove('approved');  
           checkIcon.innerHTML = `
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="pending text-red-500 size-8">
                           <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                         </svg>
           `
       };
       
      }    

    //Eliminar asistencia
    if(e.target.closest('.delete-asist-btn')){
        const deleteBtn = e.target.closest('.delete-asist-btn');
        const tr = deleteBtn.parentElement.parentElement;
       

        
        await axios.delete(`/api/class/${tr.id}`);
        tr.remove();
        }
    
     //Cargar la clase (reducir en 1 la cantidad de clases disponibles, se puede reducir aunque hayan asistido o no)
      if(e.target.closest('.load-asist-btn')){
        const loadAsistBtn = e.target.closest('.load-asist-btn');
        // const paymentId = activePackage.id;
        const tableItem = loadAsistBtn.parentElement.parentElement;
         console.log(tableItem.id);
         
         

        const { data } = await axios.get('/api/class/two', {
            withCredentials: true
        });

        console.log(data);

        const selectedClass =  data.find(({ id }) => id === tableItem.id  );
         console.log(selectedClass.payment);
        
        
        try {

            await axios.patch(`/api/payments/${selectedClass.payment}/classQuantity`, {  classQuantity: -1});

        } catch (error) {
            console.log(error);
            
        }
       
        try {
            const loadIcon = loadAsistBtn.children[0];
      if (!tableItem.classList.contains('loaded')){
       await axios.patch(`/api/class/${tableItem.id}/loaded`, { loaded: true });
       loadIcon.innerHTML = `
       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-green-500 opacity-50 hover:text-white hover:bg-green-500">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                                  </svg>
       `;
       tableItem.classList.add('loaded');
       loadAsistBtn.disabled = true;
       } else {
           await axios.patch(`/api/payments/${tableItem.id}`, { attended: false });
           tableItem.classList.remove('approved');  
           checkIcon.innerHTML = `
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="pending text-red-500 size-8">
                           <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                         </svg>
           `
       };
        } catch (error) {
            console.log(error);
            
        }
       
      
        
    
      };
  
  });





(async () => {
    try {
        const { data } = await axios.get('/api/class/two', {
            withCredentials: true
        });
        console.log(data);
        
      if (data.lenght === 0) {
        const tableItem = document.createElement('div');
        tableItem.classList.add = ('flex', 'justify-center', 'items-center')
        tableItem.innerHTML = '<p class="text-center text-gray-500 font-medium">Sin asistencias registradas.</p>';
        titleClient.append(tableItem);
        
      } else { 
      
     
      
     if (userLoggedIn.rol === 'client'){
        
       
        
        data.sort((a, b) => new Date(b.date) - new Date(a.date));
        data.forEach(data => {
            const tableItem = document.createElement('tr');
            tableItem.classList.add('w-full',  'text-sd', 'text-center', 'rtl:text-right', 'text-gray-500', 'overflow-x-auto');
            tableItem.innerHTML = `<tr class="bg-white border-b">
                
                 <td class="px-6 py-4">
                     ${data.date}
                 </td>
                 
                 <td class="px-6 py-4">
                     ${data.schedule.discipline}
                 </td>
                 <td class="px-6 py-4">
                     ${data.schedule.time}
                 </td>
                  ${data?.attended === false? (
                                `<td class="flex justify-center px-6 py-4">
                   <button disabled class="check-btn cursor-default">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="text-red-500 size-8">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                      </svg>
                   </button>  
                </td>`
                             ) : (
                                `
                               <td class="flex  justify-center px-6 py-4">
                   <button class="check-btn cursor-default">
                       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="text-green-500 size-8">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
                   </button>  
                </td>
                
                                `
                             )}
                
             </tr>`;
             classesContent.append(tableItem);
        });

        
        
     } else if (userLoggedIn.rol === 'admin'){
        data.sort((a, b) => new Date(b.date) - new Date(a.date));
        data.forEach(data => {
            const tableItem = document.createElement('tr');
            tableItem.id = data.id;
            tableItem.classList.add('w-full',  'text-sd', 'text-center', 'rtl:text-right', 'text-gray-500', 'overflow-x-auto');
            tableItem.innerHTML = `<tr class="bg-white border-b">
                <td scope="row" class="flex justify-center px-6 py-4 font-medium   whitespace-nowrap">
                                <button class="delete-asist-btn">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-red-500 hover:text-white hover:bg-red-500">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                  </svg>
                                </button> 
                            </td>    
                 <td class="px-6 py-4">
                     ${data.date}
                 </td>
                 <td class="px-6 py-4">
                     ${data.user.name}
                 </td>
                 <td class="px-6 py-4">
                     ${data.schedule.discipline}
                 </td>
                 <td class="px-6 py-4">
                     ${data.schedule.time}
                 </td>
                  ${data?.attended === false? (
                                `<td class="flex justify-center px-6 py-4">
                   <button class="check-btn cursor-pointer">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="text-red-500 size-8 hover:text-white hover:bg-red-500">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                      </svg>
                   </button>  
                </td>`
                             ) : (
                                `
                               <td class="flex  justify-center px-6 py-4">
                   <button disabled class="check-btn cursor-default">
                       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="text-green-500 size-8">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
                   </button>  
                </td>
                                `
                             )}
                ${data?.loaded === false? (
                    `<td id="${data.id}" class="px-6 py-4">
                                <button class="load-asist-btn"> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-green-500 hover:text-white hover:bg-green-500">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                                  </svg></button>
                            </td>`
                ) : (
                    `<td id="${data.id}" class="px-6 py-4">
                                <button disabled class="load-asist-btn"> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-green-500 opacity-50 cursor-default">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                                  </svg></button>
                            </td>`
                )}
                
                
             </tr>`;
             classesContent.append(tableItem);
        });

    } 
}    
} catch (error) {
         console.log(error);
        //  window.location.pathname = '/login'
    }
  
        
})();
        
        
        
   
    