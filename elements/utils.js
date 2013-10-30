POLYTHREE = {
    convert: function(targetValue, value) {
        if(value.slice(0,2) === "0x") {
            return parseInt(value.slice(2), 16);   
        }
        switch(typeof targetValue) {
            case "number": 
                value = parseFloat(value);
                break;
            case "boolean":
                value = value === "true";
                break;  
        }
        
        return value;
    },
    bindAttrib: function(from, target, name) {
        from[name] && (target[name] = POLYTHREE.convert(target[name], from[name]));
        
        
        // this is going to overwrite the existing property, no good.
        // Should probably look at using "name"Changed events
        // Though then they can diverge ... Object.observe? maybe?
        // or... I could setup the setters/getters to look at some property
        // and set that later
        Object.defineProperty(from, name, {
            set: function(value) {
                if(target.hasOwnProperty("needsUpdate")) {
                   target.needsUpdate = true; 
                }
                
                target[name] = POLYTHREE.convert(target[name], value);
            },
            get: function() {
                return target[name];
            }
        });
    }
};