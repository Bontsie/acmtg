

const editButton = document.getElementsByClassName("editButton");
for (var i=0;i<editButton.length;i++){
    editButton[i].addEventListener('click', function(e){
       window.location.assign('/edit/'+this.value);
    });
    
}


const deleteButton = document.getElementsByClassName("deleteButton");
for (var i=0;i<deleteButton.length;i++){
    deleteButton[i].addEventListener('click', function(e){
        alert("Deleting user " + this.value );
    });
    
}


const cancelButton = document.getElementById("cancelButton");
cancelButton.addEventListener('click', function(e){
    window.location =  "/home";
});