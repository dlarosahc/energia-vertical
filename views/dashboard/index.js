import { createNotification } from "../../components/notification.js";

const profileUser = document.querySelector('#profile');
let userLoggedIn = null;
const userTitle = document.querySelector('#user-title');
const adminTitle = document.querySelector('#admin-title');
const form = document.querySelector('#form');
const nameInput = document.querySelector('#name-input');
const coachesTable = document.querySelector('#coaches-table');
const coachesContent = document.querySelector('#coaches-content');
const classesTable = document.querySelector('#classes-table');
const classesContent = document.querySelector('#classes-content');
const dateNow = new Date(Date.now()).toISOString().split('T')[0];
const coachesDiv = document.querySelector('#coaches-div');
const classesDiv = document.querySelector('#classes-div');

console.log(dateNow);


(async () => {
    const {data } = await axios.get('/api/users/logged');
    userLoggedIn = data;

    // console.log(userLoggedIn);
    
    

    if (userLoggedIn.rol === 'client') {
      
      userTitle.classList.remove('hidden');
      form.classList.add('hidden');
      form.classList.remove('flex');
      coachesDiv.classList.add('hidden');
      coachesDiv.classList.remove('flex');
      classesDiv.classList.add('hidden');
      classesDiv.classList.remove('flex');
    };

    if (userLoggedIn.rol === 'admin') {
        
       
        adminTitle.classList.remove('hidden');
        
        
      };

})();

form.addEventListener('submit', async e => {
    e.preventDefault();
    try {
        const newCoach = {
            name: nameInput.value,
        }

        
        const { data } = await axios.post('/api/coaches', newCoach);
        nameInput.value = '';
        
        
        createNotification(false, data)
        setTimeout(() => {
            notification.innerHTML = '';
        }, 3000);
        // const listItem = document.createElement('li');
        // listItem.classList.add('flex', 'flex-row', 'package');
        // listItem.innerHTML = `
        // <div class="max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow">
        //                 <div>
        //                     <h5 class="title mb-2 text-2xl font-bold tracking-tight text-gray-900">${newPackage.name}</h5>
        //                 </div>
        //                 <p class="mb-3 font-normal text-gray-700">Descripcion: ${newPackage.description}</p>
        //                 <p class="mb-3 font-normal text-gray-700"> Costo: $${newPackage.price}</p>
        //                 <p class="mb-3 font-normal text-gray-700">Cantidad de clases: ${newPackage.classQuantity}</p>
        //                 <button class="delete-btn inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-purple-500 rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300">
        //                     Eliminar
                            
        //                 </button>
        //                 <button class="edit-btn inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-purple-500 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
        //                     Editar
                            
        //                 </button>
        //                 <button class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-purple-500 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
        //                     Adquirir
                           
        //                 </button>
        //             </div>
        // `
        // packagesList.append(listItem);
        
     
    } catch (error) {
        console.log(error);
        
    }
   
   
});




(async () => {
    try {
        const { data } = await axios.get('/api/coaches', {
            withCredentials: true
        });
        
        console.log(data);
        
        data.forEach(coaches => {
            const tableItem = document.createElement('tr');
            tableItem.id = coaches.id
            
            tableItem.classList.add('w-full',  'text-sd', 'text-center', 'rtl:text-right', 'text-gray-500', 'overflow-x-auto');
            tableItem.innerHTML = `
             <tr class="bg-white border-b">
             <td class="px-6 py-4">
                    ${coaches.name}
                </td>
                 <td scope="row" class="flex justify-center px-6 py-4  font-medium  whitespace-nowrap">
                    <button class="add-btn">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-8 text-green-500 hover:bg-green-500 hover:text-white">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                      </svg>

                    </button> 
                </td>
                
            </tr>
             
            `;
        //  if(userLoggedIn.rol === 'admin'){
        //    if(payments.approved){
        //     tableItem.children[8].children[0].innerHTML = `
        //     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="text-green-500 size-8">
        //     <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        //     </svg>
        //     `;
        //     } else {
        //         tableItem.children[8].children[0].innerHTML = `
        //              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="text-red-500 size-8">
        //              <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        //              </svg>
        //         `;   
        //     };
            
            
            
        // };
            
            coachesContent.append(tableItem);
        });
    
        
    } catch (error) {
        console.log(error);
        // window.location.pathname = '/login'
        
    };

     
    
    })();



(async () => {

    const {data } = await axios.get('/api/users/logged');
    userLoggedIn = data;
    
    
   if(userLoggedIn.rol === 'client') {
    try {
        const { data } = await axios.get('/api/profile',  {
            withCredentials: true
        });
        
        const payments = data.payments;
        console.log(data.payments);
        const activePayment = payments.find(({ approved, classQuantity }) => approved === true && classQuantity > 0 );
        console.log(activePayment);
        console.log(payments.length);
        
        
        
        
            
            const profileCard = document.createElement('div');

            if (payments.length === 0 || !activePayment) {
                profileCard.innerHTML = `
             <div class="bg-white top-6 w-full overflow-hidden shadow rounded-lg border">
        <div class="px-4 py-5 sm:px-6">
            <h3 class="text-lg leading-6 font-medium text-gray-900">
                Mi Perfil
            </h3>
            <p class="mt-1 max-w-2xl text-sm text-gray-500">
                Informacion Personal y Paquetes Activos.
            </p>
        </div>
        <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl class="sm:divide-y sm:divide-gray-200">
                
                <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-500">
                        Documento
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        ${data.idNumber}
                    </dd>
                </div>
                <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-500">
                        Nombre
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        ${data.name}
                    </dd>
                </div>
                <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-500">
                        Fecha de Nacimiento
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        ${data.birthdate}
                    </dd>
                </div>
                <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-500">
                        E-mail
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        ${data.email}
                    </dd>
                </div>
                <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-500">
                        Teléfono
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        ${data.phone}
                    </dd>
                </div>
                <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-500">
                        Estado
                    </dt>
                    <dd class="mt-1 flex flex-row gap-2 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        Sin Paquete
                        <svg class="shrink-0 size-4 text-red-500 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"></path>
                        </svg>
                    </dd>
                    
                </div>
               
            </dl>
        </div>
      </div>
            `;
            } else if (activePayment) {
            profileCard.innerHTML = `
             <div class="bg-white top-6 w-full overflow-hidden shadow rounded-lg border">
        <div class="px-4 py-5 sm:px-6">
            <h3 class="text-lg leading-6 font-medium text-gray-900">
                Mi Perfil
            </h3>
            <p class="mt-1 max-w-2xl text-sm text-gray-500">
                Informacion Personal y Paquetes Activos.
            </p>
        </div>
        <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl class="sm:divide-y sm:divide-gray-200">
                
                <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-500">
                        Documento
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        ${data.idNumber}
                    </dd>
                </div>
                <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-500">
                        Nombre
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        ${data.name}
                    </dd>
                </div>
                <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-500">
                        Fecha de Nacimiento
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        ${data.birthdate}
                    </dd>
                </div>
                <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-500">
                        E-Mail
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        ${data.email}
                    </dd>
                </div>
                <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-500">
                        Teléfono
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        ${data.phone}
                    </dd>
                </div>
                <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-500">
                        Estado
                    </dt>
                    <dd class="mt-1 flex flex-row gap-2 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        Activo
                        <svg class="w-5 h-5 text-green-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                      </svg>
                    </dd>
                    
                </div>
                <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              
               
                    <dt class="text-sm font-medium text-gray-500">
                        Clases Disponibles
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                         ${activePayment.classQuantity}
                    </dd>
                
            </dl>
        </div>
      </div>
            `;
            } else {
                profileCard.innerHTML = `
             <div class="bg-white top-6 w-full overflow-hidden shadow rounded-lg border">
        <div class="px-4 py-5 sm:px-6">
            <h3 class="text-lg leading-6 font-medium text-gray-900">
                Mi Perfil
            </h3>
            <p class="mt-1 max-w-2xl text-sm text-gray-500">
                Informacion Personal y Paquetes Activos.
            </p>
        </div>
        <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl class="sm:divide-y sm:divide-gray-200">
                
                <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-500">
                        Documento
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        ${data.idNumber}
                    </dd>
                </div>
                <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-500">
                        Full name
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        ${data.name}
                    </dd>
                </div>
                <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-500">
                        Email address
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        ${data.email}
                    </dd>
                </div>
                <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-500">
                        Phone number
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        ${data.phone}
                    </dd>
                </div>
                <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-500">
                        Estado
                    </dt>
                    <dd class="mt-1 flex flex-row gap-2 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        Esperando Aprobacion
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="text-yellow-500 size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                        </svg>

                    </dd>
                    
                </div>
                
               
            </dl>
        </div>
      </div>
            `;
            }
       
            
            
            profileUser.append(profileCard);
    
        
    } catch (error) {
        console.error('Error al cargar el perfil:', error);
        // Mostrar un mensaje de error al usuario
        const errorMessage = document.createElement('div');
        errorMessage.textContent = 'Hubo un error al cargar tu perfil. Por favor, inténtalo de nuevo más tarde.';
        profileUser.appendChild(errorMessage);
        window.location.pathname = '/login'
        
    }
}
    })();

    profileUser.addEventListener('click', async e => {
        if(e.target.closest('.add-btn')){
            let confirm = window.confirm('Quieres Agregar una clase a este Instructor?');
            if(confirm){
           const addBtn = e.target.closest('.add-btn');
           const coachId = addBtn.parentElement.parentElement.id;
           console.log(coachId);
             try {
                               const newBill = {
                                   date: dateNow,
                                   coach: coachId,
                                   
                                  }
               
               
                                  const { data } = await axios.post('/api/bills', newBill);
                                  createNotification(false, data)
                                  setTimeout(() => {
                                  notification.innerHTML = '';
                                  }, 3000);
                                  
               
                                  
               
                             } catch (error) {
                                console.log(error);
                                
                             }
                             
        };
           
            
        }
    });


classesContent.addEventListener('click', async e => {

if(e.target.closest('.paid-btn')){
    const paidBtn = e.target.closest('.paid-btn');
    const tableItem = paidBtn.parentElement.parentElement;
    
    const paidIcon = paidBtn.children[0];
    if (!tableItem.classList.contains('paid')){
     await axios.patch(`/api/bills/${tableItem.id}/paid`, { paid: true });
     paidIcon.innerHTML = `
     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="text-green-500 size-8">
     <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
     </svg>
     `;
     tableItem.classList.add('approved');
     }
    
    
}

});

    (async () => {
        try {
            const { data } = await axios.get('/api/bills', {
                withCredentials: true
            });
            
              // Ordenar pagos por fecha (descendente - más reciente primero)
         data.sort((a, b) => new Date(b.date) - new Date(a.date));
        
            
            data.forEach(bills => {
                const tableItem = document.createElement('tr');
                tableItem.id = bills.id
                
                tableItem.classList.add('w-full',  'text-sd', 'text-center', 'rtl:text-right', 'text-gray-500', 'overflow-x-auto');
                tableItem.innerHTML = `
                 <tr class="bg-white border-b">
                 <td class="px-6 py-4">
                        ${bills.date}
                    </td>
                     <td class="px-6 py-4">
                        ${bills.coach.name}
                    </td>
                     <td scope="row" class="flex justify-center px-6 py-4  font-medium  whitespace-nowrap">
                        <button class="paid-btn">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="text-red-500 size-8">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                      </svg>
                   </button>  
                    </td>
                    
                </tr>
                 
                `;
             if(userLoggedIn.rol === 'admin'){
               if(bills.paid){
                tableItem.children[2].children[0].innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="text-green-500 size-8">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                `;
                } else {
                    tableItem.children[2].children[0].innerHTML = `
                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="text-red-500 size-8">
                         <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                         </svg>
                    `;   
                };
                
                
                
            };
                
                classesContent.append(tableItem);
            });
        
            
        } catch (error) {
            console.log(error);
           
            
        };
    
         
        
        })();