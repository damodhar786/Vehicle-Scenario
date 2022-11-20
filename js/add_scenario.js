
$("#add").click(function(){
    
    let scenarioName = $("#scenario-name").val();
    let scenarioTime = $("#scenario-time").val();

    if (scenarioName == '' || scenarioName == null) {
        alert("No value");  
        $('.error').text("Please Enter the value");
        return false;
    }
    if(scenarioTime == '' || scenarioTime == null){
        $('.error').text("Please Enter the value");
        return false;   
    }
    else{
        alert("no value111");
        $('.error').text("Please Enter the value");
        return false;
    }
});