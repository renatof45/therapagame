var Utils = {
    'PlayersPottoArray': function(json_obj) {
    	var result = [];
        for (var i in json_obj){
            var obj=new Object();
             obj.id=json_obj[i].id;
             obj.pot=json_obj[i].pot;
            result.push(obj);
        }
    	//console.log(result);
        return result;
    },

    'PlayersListtoArray': function(json_obj) {
    	var result = [];
        for (var i in json_obj){
            result.push(json_obj.userId);
        }
    	//console.log(result);
        return result;
    },

    'SortArrayByKey':function(array,key){
    	array.sort(function(a, b) {
                if (a.id < b.id)
                    return -1;
                if (a.id > b.id)
                    return 1;
                return 0;

                });
    	return array;
    }
}
