import { createNotification } from "../../components/notification.js";

const form = document.querySelector('#form');
const nameInput = document.querySelector('#name-input');
const descriptionInput = document.querySelector('#description-input');
const priceInput = document.querySelector('#price-input');
let   quantityInput = document.querySelector('#quantity-input'); 
const packagesList = document.querySelector("#packages-list");
const notification = document.querySelector('#notification');
const payment = document.querySelector('#payment');
const cancelPayBtn = document.querySelector('#cancel-pay-btn');
const selectMethod = document.querySelector('#select-method');
const zelleForm = document.querySelector('#ZellePay');
const pagoMovForm = document.querySelector('#PagoMovilPay');
const cashForm = document.querySelector('#CashPay');
const buyDate = document.querySelector('#buy-date');
const payRef = document.querySelector('.pay-ref');
const amountPay = document.querySelector('.amount-pay');

const dateNow = new Date(Date.now()).toISOString().split('T')[0];

buyDate.value = dateNow;

let userLoggedIn = null;

(async () => {
    const {data } = await axios.get('/api/users/logged');
    userLoggedIn = data;
    if(userLoggedIn.rol === 'admin'){
        form.classList.remove('hidden');
        form.classList.add('flex');
    }

})();




form.addEventListener('submit', async e => {
    e.preventDefault();
    try {
        const newPackage = {
            name: nameInput.value,
            description: descriptionInput.value,
            price: parseInt(priceInput.value),
            classQuantity: parseInt(quantityInput.value),
        }

        
        const { data } = await axios.post('/api/packages', newPackage);
        nameInput.value = '';
        descriptionInput.value = '';
        priceInput.value = '';
        quantityInput.value = '';
        
        createNotification(false, data)
        setTimeout(() => {
            notification.innerHTML = '';
        }, 3000);
        const listItem = document.createElement('li');
        listItem.classList.add('flex', 'flex-row', 'package');
        listItem.innerHTML = `
        <div class="max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow">
                        <div>
                            <h5 class="title mb-2 text-2xl font-bold tracking-tight text-gray-900">${newPackage.name}</h5>
                        </div>
                        <p class="mb-3 font-normal text-gray-700">Descripcion: ${newPackage.description}</p>
                        <p class="mb-3 font-normal text-gray-700"> Costo: $${newPackage.price}</p>
                        <p class="mb-3 font-normal text-gray-700">Cantidad de clases: ${newPackage.classQuantity}</p>
                        <button class="delete-btn inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-purple-500 rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300">
                            Eliminar
                            
                        </button>
                        <button class="edit-btn inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-purple-500 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                            Editar
                            
                        </button>
                        <button class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-purple-500 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                            Adquirir
                           
                        </button>
                    </div>
        `
        packagesList.append(listItem);
        
     
    } catch (error) {
        createNotification(true, error.response.data.error);
        setTimeout(() => {
            notification.innerHTML = '';
        }, 3000)
    }
   
   
});

packagesList.addEventListener('click', async e => {
    // Select delete-btn
  if (e.target.closest(".delete-btn")) {
    const li = e.target.closest(".delete-btn").parentElement.parentElement;
    await axios.delete(`/api/packages/${li.id}`);
    li.remove();
  }

    //Select edit-btn
    if (e.target.closest(".edit-btn")) {
        const editBtn = e.target.closest(".edit-btn");
        const listItem = editBtn.parentElement;
        const nameInput = `${packages.name}`;
       console.log(nameInput);
     
       
      }
    
      //Select buy-btn
      if (e.target.closest(".buy-btn")) {
        const selectedPackage = e.target.closest('.buy-btn').parentElement.parentElement;
        const classQuantitySelected = (selectedPackage.children[0].children[3].id);
        
        const packageId = selectedPackage.id
        const packageName = selectedPackage.children[0].children[0].children[0]; 
        const packagePrice = parseInt(selectedPackage.children[0].children[2].childNodes[1].textContent);
        const bsAmount = payment.children[0].children[1].children[1].children[1].children[0].children[1];
        
        
        
        const getDollar = async () => {
            try {
                bsAmount.innerHTML = `
                <p class="text-md animate-pulse font-bold">Cargando...</p>
                

                `;
              const response = await fetch('https://venecodollar.vercel.app/api/v2/dollar/entity?name=D%C3%B3lar%20Monitor',)
              if (response){
                const dollar = await response.json()
                const dollarPrice = dollar.Data.info.dollar;
                console.log(dollarPrice);
                const packagePriceBs = dollarPrice * packagePrice;
                const formattedPriceBs = packagePriceBs.toFixed(2);
                bsAmount.innerHTML = `<p class="text-md font-bold">${formattedPriceBs}</p>`;
                
                
                
                
              }
            } catch (error) {
              console.error(error.message)
            }
          }
          getDollar();
         
          
        
        
       payment.children[0].children[0].innerHTML = packageName.innerHTML;
       payment.classList.remove('hidden');
       payment.classList.add('flex');
       

    selectMethod.addEventListener('change', async e => {
     
        const selectedMethod = selectMethod.value;

        if (selectedMethod === 'zelle'){
            zelleForm.classList.remove('hidden');
            zelleForm.classList.add('flex');
            pagoMovForm.classList.add('hidden');
            cashForm.classList.add('hidden');
            
            zelleForm.addEventListener('submit', async e => {
                e.preventDefault();
                const formBtn = zelleForm.children[2];
                formBtn.innerHTML = `
                <div role="status">
                <p class="animate-pulse">Procesando pago...</p>
    
                </div>`;
                
                
                try {
                    const newPayment = {
                        date: buyDate.value,
                        method: selectedMethod,
                        ref: zelleForm.children[1].children[0].children[1].value,
                        classQuantity: parseInt(classQuantitySelected),
                        amount: parseFloat(zelleForm.children[1].children[1].children[1].value),
                        package: packageId,
                       }
    
    
                       const { data } = await axios.post('/api/payments', newPayment);
                       createNotification(false, data)
                       setTimeout(() => {
                       notification.innerHTML = '';
                       }, 3000);
                       buyDate.value = '';
                       selectMethod.value = '';
                       payRef.value = '';
                       amountPay.value = '';
    
                     payment.classList.remove('flex');
                     payment.classList.add('hidden');  
    
                  } catch (error) {
                     console.log(error);
                     
                  }
                  
                  
             });
        }
        
        if (selectedMethod === 'pagomovil'){
       
            pagoMovForm.classList.remove('hidden');
            pagoMovForm.classList.add('flex');
            zelleForm.classList.add('hidden');
            cashForm.classList.add('hidden');

            pagoMovForm.addEventListener('submit', async e => {
                e.preventDefault();
                const formBtn = pagoMovForm.children[2];
                formBtn.innerHTML = `
                <div role="status">
                <p class="animate-pulse">Procesando pago...</p>
    
                </div>`;
                
                try {
                    const newPayment = {
                        date: buyDate.value,
                        method: selectedMethod,
                        ref: pagoMovForm.children[1].children[0].children[1].value,
                        classQuantity: parseInt(classQuantitySelected),
                        amount: parseFloat(pagoMovForm.children[1].children[1].children[1].value),
                        package: packageId,
                       }
    
                       const { data } = await axios.post('/api/payments', newPayment);
                       createNotification(false, data)
                       setTimeout(() => {
                       notification.innerHTML = '';
                       }, 3000);
                       buyDate.value = '';
                       selectMethod.value = '';
                       payRef.value = '';
                       amountPay.value = '';
                       payment.classList.remove('flex');
                       payment.classList.add('hidden');
                       
                       
                       
    
                  } catch (error) {
                     console.log(error);
                     
                  }
                  
                  
            });
            
        }

        if (selectedMethod === 'efectivo'){
         
            cashForm.classList.remove('hidden');
            cashForm.classList.add('flex');
            pagoMovForm.classList.add('hidden');
            zelleForm.classList.add('hidden');

            cashForm.addEventListener('submit', async e => {
                e.preventDefault();
                const formBtn = cashForm.children[2];
                formBtn.innerHTML = `
                <div role="status">
                <p class="animate-pulse">Procesando pago...</p>
    
                </div>`;
                try {
                    const newPayment = {
                        date: buyDate.value,
                        method: selectedMethod,
                        ref: 'No',
                        classQuantity: parseInt(classQuantitySelected),
                        amount: parseFloat(cashForm.children[1].children[0].children[1].value),
                        package: packageId,
                       }
    
                       const { data } = await axios.post('/api/payments', newPayment);
                       createNotification(false, data)
                       setTimeout(() => {
                       notification.innerHTML = '';
                       }, 3000);
                       buyDate.value = '';
                       selectMethod.value = '';
                       payRef.value = '';
                       amountPay.value = '';
                       payment.classList.remove('flex');
                       payment.classList.add('hidden');
                       
    
                  } catch (error) {
                     console.log(error);
                     
                  }
                  
                  
             });
            
        }

       

        

        

      
    });

       //Si decide cancelar la compra simplemente le da a cancelar y no ha pasado na'
    cancelPayBtn.addEventListener('click', e => {
        payment.classList.add('hidden');
        payment.classList.remove('flex');
        selectMethod.value = 'none';
        pagoMovForm.classList.add('hidden');
            zelleForm.classList.add('hidden')
            cashForm.classList.add('hidden');
    });




     };

});




(async () => {
    try {
        const { data } = await axios.get('/api/packages', {
            withCredentials: true
        });
         console.log(userLoggedIn);
        data.forEach(packages => {
           
            
            const listItem = document.createElement('li');
            listItem.id = packages.id
            listItem.classList.add('flex', 'flex-row', 'w-72', 'package');
            listItem.innerHTML = `
            <div class="max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow">
                            <div>
                                <h5 class="title mb-2 text-2xl font-bold tracking-tight text-gray-900">${packages.name}</h5>
                            </div>
                            <p class="mb-3 font-normal text-gray-700">Descripcion: ${packages.description}</p>
                            <p class="mb-3 font-normal text-gray-700"><span>Costo: $</span>${packages.price}</p>
                            <p id="${packages.classQuantity}" class="mb-3 font-normal text-gray-700">Cantidad de clases: ${packages.classQuantity}</p>
                             ${userLoggedIn?.rol === 'admin'? (
                                `<button class="delete-btn inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-violet-400 rounded-lg focus:ring-4 focus:outline-none hover:bg-white hover:text-violet-400 focus:ring-blue-300">
                                    Eliminar
                                    </button>
                                <button class="edit-btn inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-violet-400 rounded-lg focus:ring-4 focus:outline-none hover:bg-white hover:text-violet-400 focus:ring-blue-300">
                                    Editar      
                                </button>
                                <button class="buy-btn inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-violet-400 rounded-lg focus:ring-4 focus:outline-none hover:bg-white hover:text-violet-400 focus:ring-blue-300">
                                    Adquirir
                                </button>`
                             ) : (
                                `
                                <button class="buy-btn inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-violet-400 rounded-lg focus:ring-4 focus:outline-none hover:bg-white hover:text-violet-400 focus:ring-blue-300">
                                    Adquirir
                                </button>
                                `
                             )}
                        </div>
            `
            packagesList.append(listItem);
        })
        
    } catch (error) {
        console.log(error);
        
        // window.location.pathname = "/login";
        
    }
    
    })();