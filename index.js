    //Row actions HTML
        const todoForm = document.getElementById('todoForm');
        const title = document.getElementById('title');
        const description = document.querySelector('#description');
        const addBtn = document.getElementById('add');
        const divAlert = document.getElementById('alert');
        const table = document.getElementById('table');
    //Modal actions HTML
        const editTitle = document.getElementById('modal-title');
        editTitle.setAttribute('placeholder','Edit text');
        const editDescription = document.getElementById('modal-description');
        const editCompleted = document.getElementById('modal-completed');
        const editAlert = document.getElementById('modal-alert');
        const editBtn = document.getElementById('modal-btn');
    //key varialble for rows. 
        let key = 1;
        let keyEdit = 2.1;
        var completedClick = 0;
    //remove row function
    function rmvBtnRow (id){     
      localStorage.removeItem(`rowInfo${id}`);
      document.getElementById(id).remove();
    }
    //add to storage function 
    function addToStorage (rowId){  
        console.log(title.value , description.value);
    	    let rowInfo = {
            	rowKey : rowId,
            	rowTitle : title.value ,
            	rowDescription : description.value,
            	rowCompleted : 0
            }
        localStorage.setItem(`rowInfo${rowId}`, JSON.stringify(rowInfo));
    }
    //Add row function
	function addList() {
		if(title.value === '' || description.value === ''){
	    divAlert.classList.remove('d-none');
	    divAlert.innerText = 'Title and description are required';
	 	} else{
        localStorage.setItem('lenghtStorage', key);     
	 	divAlert.classList.add('d-none');
	 	const insertRow = table.insertRow();
	 	insertRow.setAttribute('id',key);
	 	insertRow.innerHTML = `<tr>
              <td class = 'title-${key}'>
                ${title.value}
              </td>
              <td class = 'description-${key}'>
                ${description.value}
              </td>
              <td class="text-center">
              </td>
              <td class="text-right">       
              </td>		
            </tr>`;
            

        const checkBoxNone = document.createElement('button');
        checkBoxNone.classList.add('btn','btn-secondary','mb-1');
        checkBoxNone.setAttribute('id',key);
        checkBoxNone.setAttribute('state','0');
        checkBoxNone.innerHTML = '<i class="fa fa-check"></i>';
        let checkBoxColumn = insertRow.children[2];
        checkBoxColumn.appendChild(checkBoxNone); 
        checkBoxNone.onclick = function(){
            let btnId = checkBoxNone.getAttribute('id');
            let btnIdStorage = JSON.parse(localStorage.getItem(`rowInfo${btnId}`));
            console.log(btnIdStorage['rowCompleted'],btnIdStorage['rowTitle'],btnIdStorage['rowDescription']);
            let completeInfoRow = {
                rowKey: btnIdStorage['rowKey'],
                rowTitle : btnIdStorage['rowTitle'],
                rowDescription : btnIdStorage['rowDescription'],
                rowCompleted: 0
            }
            let state = checkBoxNone.getAttribute('state');
            if (state == 0) {
            completeInfoRow['rowCompleted'] = 1;
            checkBoxNone.classList.remove('btn-secondary');
            checkBoxNone.classList.add('btn-success');
            localStorage.setItem(`rowInfo${btnId}`, JSON.stringify(completeInfoRow))
            checkBoxNone.setAttribute('state','1'); 
            } else {
            completeInfoRow['rowCompleted'] = 0;
            localStorage.setItem(`rowInfo${btnId}`, JSON.stringify(completeInfoRow))
            checkBoxNone.classList.remove('btn-success');
            checkBoxNone.classList.add('btn-secondary');
            checkBoxNone.setAttribute('state','0');
            }
            

        }
       
       	const rmvBtn = document.createElement('button');
		rmvBtn.classList.add('btn','btn-danger', 'mb-1', 'ml-1');
		rmvBtn.innerHTML = '<i class="fa fa-trash"></i>';
		const btnRight = insertRow.children[3];                                                              
        btnRight.appendChild(rmvBtn);
        
        rmvBtn.onclick = function(){
            let newLenghtStorage = localStorage.getItem('lenghtStorage');
            localStorage.setItem('lenghtStorage',newLenghtStorage);
        	rmvBtnRow(insertRow.getAttribute('id'));
            }
            addToStorage(key);
        todoForm.reset();
        key++;
	 	}
    }
	//Function modal save button
	
		// editBtn.onclick = function(){
            
		// 	//Function button edit row. 
		// }
    addBtn.onclick = addList;

    document.addEventListener("DOMContentLoaded", function(){
        let updateKey = localStorage.getItem('lenghtStorage');
        if (updateKey == undefined) {
            key = 1;
        }else{
            for(let index =1; index <= updateKey; index++){
                let updateRow = JSON.parse(localStorage.getItem(`rowInfo${index}`));
                if (updateRow == null) {
                continue;    
                }
                let storageRow = table.insertRow();
                storageRow.setAttribute('id', updateRow['rowKey']);
                storageRow.innerHTML = `<tr>
                <td class = 'title-${updateRow['rowKey']}'>
                    ${updateRow['rowTitle']}
                </td>
                <td class = 'description-${key}'>
                    ${updateRow['rowDescription']}
                </td>
                <td class="text-center">
                </td>
                <td class="text-right">       
                </td>		
                </tr>`;
                //Create buttons
                let storageCompletedBtn = document.createElement('button');
                storageCompletedBtn.innerHTML = `<i class= "fa fa-check"></i>`;
                storageCompletedBtn.setAttribute('id',updateRow['keyRow']);
                if (updateRow['rowCompleted'] === 1) {
                    storageCompletedBtn.classList.add('btn','btn-success','mb-1');    
                    } else {
                    storageCompletedBtn.classList.add('btn','btn-secondary','mb-1');    
                    }    
                storageCompletedBtn.setAttribute('state',updateRow['rowCompleted']);
                storageRow.children[2].appendChild(storageCompletedBtn);
                
                storageCompletedBtn.onclick = function(){
                let storageId = storageCompletedBtn.getAttribute('id');   
                let stateCompleted = storageCompletedBtn.getAttribute('state');
                if (stateCompleted == 0) {
                storageCompletedBtn.classList.add('btn-success');    
                storageCompletedBtn.classList.remove('btn-secondary');
                storageCompletedBtn.setAttribute('state',1);
                updateRow['rowCompleted'] = 1;
                localStorage.setItem(`rowInfo${updateRow['rowKey']}`,JSON.stringify (updateRow));
                // localStorage.setItem(updateRow['row'])    
                } else {
                storageCompletedBtn.classList.remove('btn-success');    
                storageCompletedBtn.classList.add('btn-secondary');
                storageCompletedBtn.setAttribute('state',0);
                updateRow['rowCompleted'] = 0; 
                localStorage.setItem(`rowInfo${updateRow['rowKey']}`,JSON.stringify (updateRow));
                }
                }
                
                let storageRemoveBtn = document.createElement('button');
                storageRemoveBtn.classList.add('btn','btn-danger','mb-1');
                storageRemoveBtn.innerHTML = `<i class= "fa fa-trash"></i>`;
                storageRow.children[3].appendChild(storageRemoveBtn);
                
                storageRemoveBtn.onclick = function(){
                console.log(updateRow['rowKey']);
                document.getElementById(updateRow['rowKey']).remove();
                localStorage.removeItem(`rowInfo${updateRow['rowKey']}`);
                  
                }

            }
        }
        key = ++updateKey;
        console.log(updateKey);
        console.log(key);
    });

//Proceso, estoy buscando la manera en seleccionar el row al clickear
//el edit Btn correspondiente.

