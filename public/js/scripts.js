

const editButton = document.getElementsByClassName("editButton");
for (var i=0;i<editButton.length;i++){
    editButton[i].addEventListener('click', function(e){
       window.location.assign('/edit/'+this.value);
    });
    
}




const cancelButton = document.getElementById("cancelButton");
cancelButton.addEventListener('click', function(e){
    window.location =  "/home";
});

function validate (){
    

}

