// Edit Scenario

var url = new URL(window.location.href );
var scenarioParam = url.searchParams.get("scenario_id");
// alert(scenarioParam);

var scenarioLocalData = localStorage.getItem('scenario');
scenarioLocalData = JSON.parse(scenarioLocalData);

$.each(scenarioLocalData, function(index,value){
    if(value.scenario_id == scenarioParam){
        $("#scenario-name").val(value.scenario_name);
        $("#scenario-time").val(value.scenario_time);
    }
});


function updateScenario(){

    $("#name-error").hide();
    $("#time-error").hide();

    var scenarioName = $("#scenario-name").val();
    var scenarioTime = $("#scenario-time").val();
    

    var tempLocalData = scenarioLocalData;

    if(scenarioName !== '' && scenarioTime !== ''){

        $.each(scenarioLocalData, function(index,value){
            if(value.scenario_id == scenarioParam){
              tempLocalData[index]['scenario_name'] = scenarioName;  
              tempLocalData[index]['scenario_time'] = scenarioTime;  
            }
        });
        localStorage.setItem('scenario',JSON.stringify(tempLocalData));

        alert("Scenario updated successfully");

    }else{
        if (scenarioName == '' || scenarioName == null) {
        
            $("#name-error").show();
        }
        if(scenarioTime == '' || scenarioTime == null){
    
            $("#time-error").show();
        }
    }

}

// Reset

$("#reset").click(function(){
    $("#scenario-name").val('');
    $("#scenario-time").val('');

    $("#name-error").hide();
    $("#time-error").hide();
});