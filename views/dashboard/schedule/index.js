import { createNotification } from "../../components/notification.js";

const form = document.querySelector('#form');
const selectDay = document.querySelector('#select-day');
const selectTime = document.querySelector('#select-time');
const selectDiscipline = document.querySelector('#select-discipline');
const selectCoach = document.querySelector('#select-coach');
const inputDate = document.querySelector('#input-date');
const dayTitle = document.querySelector('#day-title');
const dayDate = document.querySelector('#day-date');
const scheduleSection = document.querySelector('#schedule-section')
const scheduleForm = document.querySelector('#schedule-form');
const scheduleList = document.querySelector('#schedule-list');
const filterScheduleList = document.querySelector('#filter-schedule-list');
const inputScheduleDate = document.querySelector('#input-schedule-date');
const scheduleAttendance = document.querySelector('#schedule-attendance');
const attendanceList = document.querySelector('#attendance-list');
const paymentsTable = document.querySelector('#payments-table');
const dateNow = new Date(Date.now()).toISOString().split('T')[0];
const dateNow1 = new Date();
const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
const dayIndex = dateNow1.getDay();
let day = daysOfWeek[dayIndex] ;
const searchInput = document.querySelector('#search-input');




console.log(dateNow1);
inputDate.value = dateNow;

let userLoggedIn = null;
let activePackage = null;
let userPayment = null;
(async () => {
    const {data } = await axios.get('/api/users/logged');
    userLoggedIn = data;
    if(userLoggedIn.rol === 'admin'){
        form.classList.remove('hidden');
        form.classList.add('flex');
        dayTitle.classList.remove('hidden');
    }

    if (userLoggedIn.rol === 'client') {
      paymentsTable.children[0].children[0].children[0].classList.add('hidden');
      paymentsTable.children[0].children[0].children[2].classList.add('hidden');
      paymentsTable.children[0].children[0].children[3].classList.add('hidden');
      
    };
    activePackage = data.payments.filter(({ approved, classQuantity }) => approved === true && classQuantity > 0 );
    console.log(activePackage);
    const activePayment =  data.payments.find(({ approved, classQuantity }) => approved === true && classQuantity > 0 );
    userPayment = activePayment.id
    console.log(userPayment);
    

})();



//Aqui se agregan los horarios
form.addEventListener('submit', async e => {
    e.preventDefault();
    try {
        const newSchedule = {
            dayOfWeek: selectDay.value,
            time: selectTime.value,
            discipline: selectDiscipline.value,
            coach: selectCoach.value,
            
        }

        console.log(newSchedule);
        

        
        const { data } = await axios.post('/api/schedule', newSchedule);
        selectDay.value = '';
        selectTime.value = '';
        selectDiscipline.value = '';
        selectCoach.value = '';
        
        
        createNotification(false, data)
        setTimeout(() => {
            notification.innerHTML = '';
        }, 3000);
       
        
     
    } catch (error) {
        createNotification(true, error.response.data.error);
        setTimeout(() => {
            notification.innerHTML = '';
        }, 3000)
        
        
    }
   
   
});




scheduleSection.addEventListener('click', async e => {
  //Aqui se  agrega el alumno a la clase
  if(e.target.closest('.schedule-btn')){
    
    if(activePackage.length === 0) {
      window.alert('No posees paquete activo, por favor adquiere un paquete para poder agendar tu clase');
    } else {
    let confirm = window.confirm('Deseas agendar esta clase?');
    console.log(confirm);  
    if(confirm) {
      console.log('jeje');
    const scheduleBtn = e.target.closest('.schedule-btn');
   
    const selectedClass = scheduleBtn.parentElement.parentElement.parentElement.parentElement;
  
    console.log(selectedClass.id);

           try {
          const newClass = {
              date: dateNow,
              schedule: selectedClass.id,
              payment: userPayment
              
              
             }
             console.log(newClass);
             

             const { data } = await axios.post('/api/class', newClass);
             
             createNotification(false, data)
             setTimeout(() => {
             notification.innerHTML = '';
             }, 3000);
             
           

        } catch (error) {
           console.log(error);
           
        }
        
    


    }
    
  }
    
}
 // Aqui se ven los alumnos asignados a la clase
  if(e.target.closest('.see-btn')){
    scheduleAttendance.classList.remove('hidden');
    scheduleAttendance.classList.add('flex');
    const title = e.target.closest('.see-btn').parentElement.children[1];
    const time = e.target.closest('.see-btn').parentElement.children[0];
    scheduleAttendance.children[0].children[0].innerHTML = title.innerHTML;
    scheduleAttendance.children[0].children[1].innerHTML = time.innerHTML;
    scheduleAttendance.children[0].children[2].value = dateNow;
    const closeBtn = scheduleAttendance.children[2];
    
    closeBtn.addEventListener('click', e => {
      scheduleAttendance.classList.add('hidden');
      scheduleAttendance.classList.remove('flex');
      location.reload();
    })

    
    
    
    const scheduleId = e.target.closest('.see-btn').parentElement.parentElement.parentElement.parentElement.id;
    
    
    const { data }  = await axios.get('/api/class', {
      withCredentials: true
    });
    console.log(data);
    
    const selectedSchedule = data.filter(({ schedule, date }) => schedule === scheduleId && date === dateNow  );
    console.log(selectedSchedule);
    console.log(dateNow);
    
    
    selectedSchedule.forEach(data => {
      const attendedStudents = document.createElement('tr');
      attendedStudents.id = data.id;
      attendedStudents.classList.add('w-full',  'text-sd', 'text-center', 'rtl:text-right', 'text-gray-500', 'overflow-x-auto')
      attendedStudents.innerHTML = `
 ${userLoggedIn?.rol === 'admin'? (
                                `<tr class="bg-white border-b">
                            <td scope="row" class="flex justify-center px-6 py-4 font-medium text-red-500  whitespace-nowrap">
                                <button class="delete-asist-btn">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                  </svg>
                                </button> 
                            </td>
                            <td class="px-6 py-4">
                                ${data.name}
                            </td>
                            <td class="flex justify-center px-6 md:w-full py-4">
                                <button class="check-asist-btn">
                                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="text-red-500 hover:text-white hover:bg-red-500 size-8">
                                     <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                   </svg>
                                </button>  
                             </td>
                            <td id="" class="px-6 py-4">
                                <button class="load-asist-btn"> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-green-500 hover:text-white hover:bg-green-500">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                                  </svg></button>
                            </td>
                            
                        </tr>`
                             ) : (
                                `
                                <tr class="bg-white border-b">
                            
                            <td class="px-6 py-4">
                                ${data.payments.user.name}
                            </td>
                           
                            
                        </tr>`
                             )}

       
                           
      `
      attendanceList.append(attendedStudents);

      if(data.attended){
      if(userLoggedIn.rol === 'admin'){ 
        
        attendedStudents.children[2].children[0].innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="text-green-500 size-8">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
        `;
        } else {
            attendedStudents.children[2].children[0].innerHTML = `
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="text-red-500 size-8">
                 <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                 </svg>
            `;   
        };} 
      attendanceList.append(attendedStudents);
      
      
    });
    };
});

  



//Aqui vamos a crear la logica para marcar la asistencia, cargar la clase y eliminar en caso de que se requiera
attendanceList.addEventListener('click', async e => {
  //Marcar asistencia 
  if(e.target.closest('.check-asist-btn')){
   const checkBtn = e.target.closest('.check-asist-btn');
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
   //Cargar la clase (reducir en 1 la cantidad de clases disponibles, se puede reducir aunque hayan asistido o no)
  if(e.target.closest('.load-asist-btn')){
    const loadAsistBtn = e.target.closest('.load-asist-btn');
    const paymentId = loadAsistBtn.parentElement.id;
    const list = loadAsistBtn.parentElement.parentElement;
    
    await axios.patch(`/api/payments/${paymentId}/classQuantity`, {  classQuantity: -1});
    list.classList.add('hidden');
    createNotification(false, data)
    setTimeout(() => {
    notification.innerHTML = '';
    }, 3000);
    

  };

  if(e.target.closest('.delete-asist-btn')){
    const deleteBtn = e.target.closest('.delete-asist-btn');
    const tr = deleteBtn.parentElement.parentElement;
    console.log(tr.id);
    
    await axios.delete(`/api/class/${tr.id}`);
    tr.remove();
    }

});

(async () => {
    try {
        const { data } = await axios.get('/api/schedule', {
            withCredentials: true
        });
            
            const monday = data.filter(({ dayOfWeek }) => dayOfWeek === 'monday' );
            const tuesday = data.filter(({ dayOfWeek }) => dayOfWeek === 'tuesday' );
            const wednesday = data.filter(({ dayOfWeek }) => dayOfWeek === 'wednesday' );
            const thursday = data.filter(({ dayOfWeek }) => dayOfWeek === 'thursday' );
            const friday = data.filter(({ dayOfWeek }) => dayOfWeek === 'friday' );
            const saturday = data.filter(({ dayOfWeek }) => dayOfWeek === 'saturday' );
            const sunday = data.filter(({ dayOfWeek }) => dayOfWeek === 'sunday' );

            

            const dayHead = document.createElement('div')
            dayHead.classList.add('max-w-screen-xl',  'flex', 'lg:flex-col', 'px-4', 'py-4', 'mx-auto', 'lg:px-6', 'sm:py-6', 'lg:py-6');
            dayHead.innerHTML = `
            <div class="max-w-3xl mx-auto text-center">
                <h2 id="day-title" class="text-4xl font-extrabold leading-tight tracking-tight text-gray-900">
                ${day}
                </h2>
          
                <div class="mt-4">
                 <p id="day-date" class="inline-flex items-center text-lg font-medium text-primary-600">${dateNow}</p>
                </div>
              </div>
            `;

            scheduleSection.append(dayHead)

       if (day === 'Lunes') {
        monday.forEach(schedule => {
          const scheduleDiv = document.createElement('div');
          scheduleDiv.id = schedule.id;
          scheduleDiv.classList.add('max-w-screen-xl',  'border-b-solid', 'border-b-2', 'border-b-black/50', 'flex', 'lg:flex-col',   'px-4', 'py-4', 'mx-auto', 'lg:px-4', 'sm:py-4', 'lg:py-4');
          scheduleDiv.innerHTML = `
            
          ${userLoggedIn?.rol === 'admin'? (
                               `<div class=" max-w-3xl mx-auto justify-between">
             <div class="-my-4 divide-y divide-gray-200">
               <div class="flex flex-col gap-2 py-4 sm:gap-6 sm:flex-row sm:items-center">
                 <p class="w-32 text-md font-normal text-gray-500 sm:text-right  shrink-0">
                 ${schedule.time}
                 </p>
                 <p class="text-md font-semibold  ">
                 ${schedule.discipline}
                 </p>
                  <p class="w-32 text-md font-normal text-gray-500 sm:text-right  shrink-0">
                 ${schedule.coach}
                 </p>
             </button>
             
             <button class="see-btn inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-center text-white bg-purple-500 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>

             </button>
         </div>  
         </div>
         </div>`
                            ) : (
                               `
                               <div class=" max-w-3xl mx-auto justify-between">
             <div class="-my-4 divide-y divide-gray-200">
               <div class="flex flex-col gap-2 py-4 sm:gap-6 sm:flex-row sm:items-center">
                 <p class="w-32 text-md font-normal text-gray-500 sm:text-right  shrink-0">
                 ${schedule.time}
                 </p>
                 <p class="text-md font-semibold  ">
                 ${schedule.discipline}
                 </p>
                  <p class="w-32 text-md font-normal text-gray-500 sm:text-right  shrink-0">
                 ${schedule.coach}
                 </p>
             
             <button class="schedule-btn inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-center text-white bg-purple-500 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                 Agregar
             </button>
         </div>  
         </div>
         </div>
                               `
                            )}
           
            

           
         `;
        scheduleSection.append(scheduleDiv);
          
            
            
        })
        
       } else if (day === 'Martes') {
        tuesday.forEach(schedule => {
          const scheduleDiv = document.createElement('div');
          scheduleDiv.id = schedule.id;
          scheduleDiv.classList.add('max-w-screen-xl',  'border-b-solid', 'border-b-2', 'border-b-black/50', 'flex', 'lg:flex-col',   'px-4', 'py-4', 'mx-auto', 'lg:px-4', 'sm:py-4', 'lg:py-4');
          scheduleDiv.innerHTML = `
            
          ${userLoggedIn?.rol === 'admin'? (
                               `<div class=" max-w-3xl mx-auto justify-between">
             <div class="-my-4 divide-y divide-gray-200">
               <div class="flex flex-col gap-2 py-4 sm:gap-6 sm:flex-row sm:items-center">
                 <p class="w-32 text-md font-normal text-gray-500 sm:text-right  shrink-0">
                 ${schedule.time}
                 </p>
                 <p class="text-md font-semibold  ">
                 ${schedule.discipline}
                 </p>
                  <p class="w-32 text-md font-normal text-gray-500 sm:text-right  shrink-0">
                 ${schedule.coach}
                 </p>
             </button>
             
             <button class="see-btn inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-center text-white bg-purple-500 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>

             </button>
         </div>  
         </div>
         </div>`
                            ) : (
                               `
                               <div class=" max-w-3xl mx-auto justify-between">
             <div class="-my-4 divide-y divide-gray-200">
               <div class="flex flex-col gap-2 py-4 sm:gap-6 sm:flex-row sm:items-center">
                 <p class="w-32 text-md font-normal text-gray-500 sm:text-right  shrink-0">
                 ${schedule.time}
                 </p>
                 <p class="text-md font-semibold  ">
                 ${schedule.discipline}
                 </p>
                  <p class="w-32 text-md font-normal text-gray-500 sm:text-right  shrink-0">
                 ${schedule.coach}
                 </p>
             
             <button class="schedule-btn inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-center text-white bg-purple-500 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                 Agregar
             </button>
         </div>  
         </div>
         </div>
                               `
                            )}
           
            

           
         `;
        scheduleSection.append(scheduleDiv);
          
            
            
        })
        
       } else if(day === 'Miércoles') {
        wednesday.forEach(schedule => {
          const scheduleDiv = document.createElement('div');
          scheduleDiv.id = schedule.id;
          scheduleDiv.classList.add('max-w-screen-xl',  'border-b-solid', 'border-b-2', 'border-b-black/50', 'flex', 'lg:flex-col',   'px-4', 'py-4', 'mx-auto', 'lg:px-4', 'sm:py-4', 'lg:py-4');
          scheduleDiv.innerHTML = `
            
          ${userLoggedIn?.rol === 'admin'? (
                               `<div class=" max-w-3xl mx-auto justify-between">
             <div class="-my-4 divide-y divide-gray-200">
               <div class="flex flex-col gap-2 py-4 sm:gap-6 sm:flex-row sm:items-center">
                 <p class="w-32 text-md font-normal text-gray-500 sm:text-right  shrink-0">
                 ${schedule.time}
                 </p>
                 <p class="text-md font-semibold  ">
                 ${schedule.discipline}
                 </p>
                  <p class="w-32 text-md font-normal text-gray-500 sm:text-right  shrink-0">
                 ${schedule.coach}
                 </p>
             </button>
             
             <button class="see-btn inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-center text-white bg-purple-500 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>

             </button>
         </div>  
         </div>
         </div>`
                            ) : (
                               `
                               <div class=" max-w-3xl mx-auto justify-between">
             <div class="-my-4 divide-y divide-gray-200">
               <div class="flex flex-col gap-2 py-4 sm:gap-6 sm:flex-row sm:items-center">
                 <p class="w-32 text-md font-normal text-gray-500 sm:text-right  shrink-0">
                 ${schedule.time}
                 </p>
                 <p class="text-md font-semibold  ">
                 ${schedule.discipline}
                 </p>
                  <p class="w-32 text-md font-normal text-gray-500 sm:text-right  shrink-0">
                 ${schedule.coach}
                 </p>
             
             <button class="schedule-btn inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-center text-white bg-purple-500 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                 Agregar
             </button>
         </div>  
         </div>
         </div>
                               `
                            )}
           
            

           
         `;
        scheduleSection.append(scheduleDiv);
          
            
            
        })
        
       } else if(day === 'Jueves') {
        thursday.forEach(schedule => {
          const scheduleDiv = document.createElement('div');
          scheduleDiv.id = schedule.id;
          scheduleDiv.classList.add('max-w-screen-xl',  'border-b-solid', 'border-b-2', 'border-b-black/50', 'flex', 'lg:flex-col',   'px-4', 'py-4', 'mx-auto', 'lg:px-4', 'sm:py-4', 'lg:py-4');
          scheduleDiv.innerHTML = `
            
          ${userLoggedIn?.rol === 'admin'? (
                               `<div class=" max-w-3xl mx-auto justify-between">
             <div class="-my-4 divide-y divide-gray-200">
               <div class="flex flex-col gap-2 py-4 sm:gap-6 sm:flex-row sm:items-center">
                 <p class="w-32 text-md font-normal text-gray-500 sm:text-right  shrink-0">
                 ${schedule.time}
                 </p>
                 <p class="text-md font-semibold  ">
                 ${schedule.discipline}
                 </p>
                  <p class="w-32 text-md font-normal text-gray-500 sm:text-right  shrink-0">
                 ${schedule.coach}
                 </p>
             </button>
             
             <button class="see-btn inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-center text-white bg-purple-500 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>

             </button>
         </div>  
         </div>
         </div>`
                            ) : (
                               `
                               <div class=" max-w-3xl mx-auto justify-between">
             <div class="-my-4 divide-y divide-gray-200">
               <div class="flex flex-col gap-2 py-4 sm:gap-6 sm:flex-row sm:items-center">
                 <p class="w-32 text-md font-normal text-gray-500 sm:text-right  shrink-0">
                 ${schedule.time}
                 </p>
                 <p class="text-md font-semibold  ">
                 ${schedule.discipline}
                 </p>
                  <p class="w-32 text-md font-normal text-gray-500 sm:text-right  shrink-0">
                 ${schedule.coach}
                 </p>
             
             <button class="schedule-btn inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-center text-white bg-purple-500 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                 Agregar
             </button>
         </div>  
         </div>
         </div>
                               `
                            )}
           
            

           
         `;
        scheduleSection.append(scheduleDiv);
          
            
        })
        
       } else if (day === 'Viernes') {
        friday.forEach(schedule => {
            const scheduleDiv = document.createElement('div');
            scheduleDiv.id = schedule.id;
            scheduleDiv.classList.add('max-w-screen-xl',  'border-b-solid', 'border-b-2', 'border-b-black/50', 'flex', 'lg:flex-col',   'px-4', 'py-4', 'mx-auto', 'lg:px-4', 'sm:py-4', 'lg:py-4');
            scheduleDiv.innerHTML = `
              
            ${userLoggedIn?.rol === 'admin'? (
                                 `<div class=" max-w-3xl mx-auto justify-between">
               <div class="-my-4 divide-y divide-gray-200">
                 <div class="flex flex-col gap-2 py-4 sm:gap-6 sm:flex-row sm:items-center">
                   <p class="w-32 text-md font-normal text-gray-500 sm:text-right  shrink-0">
                   ${schedule.time}
                   </p>
                   <p class="text-md font-semibold  ">
                   ${schedule.discipline}
                   </p>
                    <p class="w-32 text-md font-normal text-gray-500 sm:text-right  shrink-0">
                   ${schedule.coach}
                   </p>
               
               
               <button class="see-btn inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-center text-white bg-purple-500 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
 
               </button>
           </div>  
           </div>
           </div>`
                              ) : (
                                 `
                                 <div class=" max-w-3xl mx-auto justify-between">
               <div class="-my-4 divide-y divide-gray-200">
                 <div class="flex flex-col gap-2 py-4 sm:gap-6 sm:flex-row sm:items-center">
                   <p class="w-32 text-md font-normal text-gray-500 sm:text-right  shrink-0">
                   ${schedule.time}
                   </p>
                   <p class="text-md font-semibold  ">
                   ${schedule.discipline}
                   </p>
                    <p class="w-32 text-md font-normal text-gray-500 sm:text-right  shrink-0">
                   ${schedule.coach}
                   </p>
               
               <button class="schedule-btn inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-center text-white bg-purple-500 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                   Agregar
               </button>
           </div>  
           </div>
           </div>
                                 `
                              )}
             
              
 
             
           `;
          scheduleSection.append(scheduleDiv);
            
            
            
        })
        
       } else if(day === 'Sábado') {
        saturday.forEach(schedule => {
          const scheduleDiv = document.createElement('div');
          scheduleDiv.id = schedule.id;
          scheduleDiv.classList.add('max-w-screen-xl',  'border-b-solid', 'border-b-2', 'border-b-black/50', 'flex', 'lg:flex-col',   'px-4', 'py-4', 'mx-auto', 'lg:px-4', 'sm:py-4', 'lg:py-4');
          scheduleDiv.innerHTML = `
            
          ${userLoggedIn?.rol === 'admin'? (
                               `<div class=" max-w-3xl mx-auto justify-between">
             <div class="-my-4 divide-y divide-gray-200">
               <div class="flex flex-col gap-2 py-4 sm:gap-6 sm:flex-row sm:items-center">
                 <p class="w-32 text-md font-normal text-gray-500 sm:text-right  shrink-0">
                 ${schedule.time}
                 </p>
                 <p class="text-md font-semibold  ">
                 ${schedule.discipline}
                 </p>
                  <p class="w-32 text-md font-normal text-gray-500 sm:text-right  shrink-0">
                 ${schedule.coach}
                 </p>
             </button>
             
             <button class="see-btn inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-center text-white bg-purple-500 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>

             </button>
         </div>  
         </div>
         </div>`
                            ) : (
                               `
                               <div class=" max-w-3xl mx-auto justify-between">
             <div class="-my-4 divide-y divide-gray-200">
               <div class="flex flex-col gap-2 py-4 sm:gap-6 sm:flex-row sm:items-center">
                 <p class="w-32 text-md font-normal text-gray-500 sm:text-right  shrink-0">
                 ${schedule.time}
                 </p>
                 <p class="text-md font-semibold  ">
                 ${schedule.discipline}
                 </p>
                  <p class="w-32 text-md font-normal text-gray-500 sm:text-right  shrink-0">
                 ${schedule.coach}
                 </p>
             
             <button class="schedule-btn inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-center text-white bg-purple-500 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                 Agregar
             </button>
         </div>  
         </div>
         </div>
                               `
                            )}
           
            

           
         `;
        
        scheduleSection.append(scheduleDiv);
          
            
        });
        
       }else if(day === 'Domingo') {
        sunday.forEach(schedule => {
          const scheduleDiv = document.createElement('div');
          scheduleDiv.id = schedule.id;
          scheduleDiv.classList.add('max-w-screen-xl',  'border-b-solid', 'border-b-2', 'border-b-black/50', 'flex', 'lg:flex-col',   'px-4', 'py-4', 'mx-auto', 'lg:px-4', 'sm:py-4', 'lg:py-4');
          scheduleDiv.innerHTML = `
            
          ${userLoggedIn?.rol === 'admin'? (
                               `<div class=" max-w-3xl mx-auto justify-between">
             <div class="-my-4 divide-y divide-gray-200">
               <div class="flex flex-col gap-2 py-4 sm:gap-6 sm:flex-row sm:items-center">
                 <p class="w-32 text-md font-normal text-gray-500 sm:text-right  shrink-0">
                 ${schedule.time}
                 </p>
                 <p class="text-md font-semibold  ">
                 ${schedule.discipline}
                 </p>
                  <p class="w-32 text-md font-normal text-gray-500 sm:text-right  shrink-0">
                 ${schedule.coach}
                 </p>
             </button>
             
             <button class="see-btn inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-center text-white bg-purple-500 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>

             </button>
         </div>  
         </div>
         </div>`
                            ) : (
                               `
                               <div class=" max-w-3xl mx-auto justify-between">
             <div class="-my-4 divide-y divide-gray-200">
               <div class="flex flex-col gap-2 py-4 sm:gap-6 sm:flex-row sm:items-center">
                 <p class="w-32 text-md font-normal text-gray-500 sm:text-right  shrink-0">
                 ${schedule.time}
                 </p>
                 <p class="text-md font-semibold  ">
                 ${schedule.discipline}
                 </p>
                  <p class="w-32 text-md font-normal text-gray-500 sm:text-right  shrink-0">
                 ${schedule.coach}
                 </p>
             
             <button class="schedule-btn inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-center text-white bg-purple-500 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                 Agregar
             </button>
         </div>  
         </div>
         </div>
                               `
                            )}
           
            

           
         `;
        
        scheduleSection.append(scheduleDiv);
          
            
        });
        
       };;
    } catch (error) {
       
        console.log('error');
        
    }
    
    })();