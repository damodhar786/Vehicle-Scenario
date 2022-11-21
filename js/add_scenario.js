//  Add Scenario 

$("#add").click(function(){

    $("#name-error").hide();
    $("#time-error").hide();

    var scenarioName = $("#scenario-name").val();
    var scenarioTime = $("#scenario-time").val();
    

    if(scenarioName !== '' && scenarioTime !== ''){

        var localData = localStorage.getItem('scenario');

        if(localData !== null && localData !== '' && localData !== 'undefined')
        {
            var dataConvert = JSON.parse(localData);
            var scenario =
                {
                    "scenario_id": dataConvert.length + 1,
                    "scenario_name": scenarioName,
                    "scenario_time": scenarioTime
                };

            dataConvert.push(scenario);
            localStorage.setItem('scenario',JSON.stringify(dataConvert));

            alert("your scenario added");
                $("#scenario-name").val('');
                $("#scenario-time").val('');

            
        }else{

            var scenario = [
                {
                    "scenario_id": 1,
                    "scenario_name": scenarioName,
                    "scenario_time": scenarioTime
                }
            ];

            localStorage.setItem('scenario',JSON.stringify(scenario));
            alert("Your Scenario Added");

                $("#scenario-name").val('');
                $("#scenario-time").val('');
        }
    }else{
        if (scenarioName == '' || scenarioName == null) {
        
            $("#name-error").show();
        }
        if(scenarioTime == '' || scenarioTime == null){
    
            $("#time-error").show();
        }
    }

});

// Reset

$("#reset").click(function(){
    $("#scenario-name").val('');
    $("#scenario-time").val('');

    $("#name-error").hide();
    $("#time-error").hide();
});