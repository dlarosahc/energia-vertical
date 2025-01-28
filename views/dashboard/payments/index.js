const paymentsContent = document.querySelector('#payments-content');
const filterPaymentsContent = document.querySelector('#filter-payments-content');
const paymentsTable = document.querySelector('#payments-table');
const searchInput = document.querySelector('#search-input');
const titleClient = document.querySelector('#title-client')
const titleAdmin = document.querySelector('#title-admin')
let userLoggedIn = null;
(async () => {
    const {data } = await axios.get('/api/users/logged');
    userLoggedIn = data;
    

    if (userLoggedIn.rol === 'client') {
      paymentsTable.children[0].children[0].children[0].classList.add('hidden');
      paymentsTable.children[0].children[0].children[2].classList.add('hidden');
      paymentsTable.children[0].children[0].children[3].classList.add('hidden');
      paymentsTable.children[0].children[0].children[8].classList.add('hidden');
      searchInput.classList.add('hidden');
      console.log(searchInput);
      titleClient.classList.add('flex');
      titleClient.classList.remove('hidden');
      
    };

    if (userLoggedIn.rol === 'admin') {
        
        titleAdmin.classList.add('flex');
        titleAdmin.classList.remove('hidden');
        
      };

})();


paymentsContent.addEventListener('click', async e => {
    // Select delete-btn
  if (e.target.closest(".delete-btn")) {
    const tr = e.target.closest(".delete-btn").parentElement.parentElement;
    console.log(tr);
    await axios.delete(`/api/payments/${tr.id}`);
    tr.remove();
  }

   // Select check-icon
  if (e.target.closest(".check-btn")) {
   const checkBtn = e.target.closest('.check-btn');
   const tableItem = checkBtn.parentElement.parentElement;

   
   
   const checkIcon = checkBtn.children[0];
   if (!tableItem.classList.contains('approved')){
    await axios.patch(`/api/payments/${tableItem.id}/checked`, { approved: true });
    checkIcon.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="text-green-500 size-8">
    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
    `;
    tableItem.classList.add('approved');
    } else {
        await axios.patch(`/api/payments/${tableItem.id}`, { approved: false });
        tableItem.classList.remove('approved');  
        checkIcon.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="pending text-red-500 size-8">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                      </svg>
        `
    };
    
   
   }

});

filterPaymentsContent.addEventListener('click', async e => {
    // Select delete-btn
  if (e.target.closest(".delete-btn")) {
    const tr = e.target.closest(".delete-btn").parentElement.parentElement;
    console.log(tr);
    await axios.delete(`/api/payments/${tr.id}`);
    tr.remove();
  }

   // Select check-icon
  if (e.target.closest(".check-btn")) {
   const checkBtn = e.target.closest('.check-btn');
   const tableItem = checkBtn.parentElement.parentElement;
   console.log('jeje');
   
   
   const checkIcon = checkBtn.children[0];
   if (!tableItem.classList.contains('approved')){
    await axios.patch(`/api/payments/${tableItem.id}/checked`, { approved: true });
    checkIcon.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="text-green-500 size-8">
    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
    `;
    tableItem.classList.add('approved');
    } else {
        await axios.patch(`/api/payments/${tableItem.id}`, { approved: false });
        tableItem.classList.remove('approved');  
        checkIcon.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="pending text-red-500 size-8">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                      </svg>
        `
    };
    
   
   }

});





(async () => {
    try {
        const { data } = await axios.get('/api/payments', {
            withCredentials: true
        });
        
       
         

        if (!data.length) {
            // No hay pagos registrados
            const tableItem = document.createElement('div');
            tableItem.classList.add = ('flex', 'justify-center', 'items-center')
            tableItem.innerHTML = '<p class="text-center text-gray-500 font-medium">Sin pagos registrados.</p>';
            titleClient.append(tableItem);
          } else {
            // Ordenar pagos por fecha (descendente - más reciente primero)
         data.sort((a, b) => new Date(b.date) - new Date(a.date));
        

        data.forEach(payments => {
            const tableItem = document.createElement('tr');
            tableItem.id = payments.id
            if(payments.classQuantity === 0) {
                tableItem.classList.add('line-through', 'text-red-500')
            };
            tableItem.classList.add('w-full',  'text-sd', 'text-center', 'rtl:text-right', 'text-gray-500', 'overflow-x-auto');
            tableItem.innerHTML = `
             ${userLoggedIn?.rol === 'admin'? (
                                `<tr class="bg-white border-b">
                 <td scope="row" class="flex justify-center px-6 py-4  font-medium text-red-500 whitespace-nowrap">
                    <button class="delete-btn">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                      </svg>
                    </button> 
                </td>
                <td class="px-6 py-4">
                    ${payments.date}
                </td>
                <td class="px-6 py-4">
                    ${payments.user.idNumber}
                </td>
                <td class="px-6 py-4">
                    ${payments.user.name}
                </td>
                <td class="px-6 py-4">
                    ${payments.package.name}
                </td>
                <td class="px-6 py-4">
                    ${payments.method}
                </td>
                <td class="text-center px-6 py-4">
                    ${payments.ref}
                </td>
                <td class="text-center px-6 py-4">
                    ${payments?.method === 'pagomovil'? (`Bs.`):(`$`)}${payments.amount}
                </td>
                <td class="flex justify-center px-6 py-4">
                   <button class="check-btn">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="text-red-500 size-8">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                      </svg>
                   </button>  
                </td>
                <td class="text-center px-6 py-4">
                    ${payments.classQuantity}
                </td>
            </tr>`
                             ) : (
                                `<tr class="bg-white border-b">
                 
                <td class="px-6 py-4">
                    ${payments.date}
                </td>
                
                
                <td class="px-6 py-4">
                    ${payments.package.name}
                </td>
                <td class="px-6 py-4">
                    ${payments.method}
                </td>
                <td class="text-center px-6 py-4">
                    ${payments.ref}
                </td>
                <td class="text-center px-6 py-4">
                    ${payments?.method === 'pagomovil'? (`Bs.`):(`$`)}${payments.amount}
                </td>
                
                <td class="text-center px-6 py-4">
                    ${payments.classQuantity}
                </td>
            </tr>`
                             )}
             
            `;
         if(userLoggedIn.rol === 'admin'){
           if(payments.approved){
            tableItem.children[8].children[0].innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="text-green-500 size-8">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            `;
            } else {
                tableItem.children[8].children[0].innerHTML = `
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="text-red-500 size-8">
                     <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                     </svg>
                `;   
            };
            
            
            
        };
            
            paymentsContent.append(tableItem);
        });
        searchInput.addEventListener('input', async e => {
            const searchTerm = e.target.value.toLowerCase();
          
            const filteredData = data.filter(payments => {
              return payments.user.name.toLowerCase().startsWith(searchTerm);
            });
             console.log(filteredData);
             
            paymentsContent.classList.add('hidden');
            
            if(searchTerm === ''){
                paymentsContent.classList.remove('hidden');
                filterPaymentsContent.classList.add('hidden');
                filterPaymentsContent.innerHTML = '';
                
            } else {
                paymentsContent.classList.add('hidden');
                filterPaymentsContent.classList.remove('hidden');
                
                filterPaymentsContent.innerHTML = '';
                filteredData.forEach(payments => {
                    const tableItem = document.createElement('tr');
                    tableItem.id = payments.id
                    if(payments.classQuantity === 0) {
                      tableItem.classList.add('line-through', 'text-red-500')
                    };
                    tableItem.classList.add('w-full',  'text-sd', 'text-center', 'rtl:text-right', 'text-gray-500', 'overflow-x-auto');
                    tableItem.innerHTML = `
                     ${userLoggedIn?.rol === 'admin'? (
                                        `<tr class="bg-white border-b">
                         <td scope="row" class="flex justify-center px-6 py-4  font-medium text-red-500 whitespace-nowrap">
                            <button class="delete-btn">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                              </svg>
                            </button> 
                        </td>
                        <td class="px-6 py-4">
                            ${payments.date}
                        </td>
                        <td class="px-6 py-4">
                            ${payments.user.idNumber}
                        </td>
                        <td class="px-6 py-4">
                            ${payments.user.name}
                        </td>
                        <td class="px-6 py-4">
                            ${payments.package.name}
                        </td>
                        <td class="px-6 py-4">
                            ${payments.method}
                        </td>
                        <td class="text-center px-6 py-4">
                            ${payments.ref}
                        </td>
                        <td class="text-center px-6 py-4">
                            ${payments?.method === 'pagomovil'? (`Bs.`):(`$`)}${payments.amount}
                        </td>
                        <td class="flex justify-center px-6 py-4">
                           <button class="check-btn">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="text-red-500 size-8">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                              </svg>
                           </button>  
                        </td>
                        <td class="text-center px-6 py-4">
                            ${payments.classQuantity}
                        </td>
                    </tr>`
                                     ) : (
                                        `<tr class="bg-white border-b">
                         
                        <td class="px-6 py-4">
                            ${payments.date}
                        </td>
                        
                        
                        <td class="px-6 py-4">
                            ${payments.package.name}
                        </td>
                        <td class="px-6 py-4">
                            ${payments.method}
                        </td>
                        <td class="text-center px-6 py-4">
                            ${payments.ref}
                        </td>
                        <td class="text-center px-6 py-4">
                            ${payments?.method === 'pagomovil'? (`Bs.`):(`$`)}${payments.amount}
                        </td>
                        
                        <td class="text-center px-6 py-4">
                            ${payments.classQuantity}
                        </td>
                    </tr>`
                                     )}
                     
                    `;
                 if(userLoggedIn.rol === 'admin'){
                   if(payments.approved){
                    tableItem.children[8].children[0].innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="text-green-500 size-8">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    `;
                    } else {
                        tableItem.children[8].children[0].innerHTML = `
                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="text-red-500 size-8">
                             <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                             </svg>
                        `;   
                    };
                    
                    
                    
                };
                    
                    filterPaymentsContent.append(tableItem);
                });
            }
          });
    };
        
    } catch (error) {
        console.log(error);
        window.location.pathname = '/login'
        
    };

     
    
    })();