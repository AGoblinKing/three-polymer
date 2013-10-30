POLYTHREE = {
    bindAttrib: function(from, target, name) {
        from[name] && (target[name] = from[name]);
        
        Object.defineProperty(from, name, {
            set: function(value) {
                // should do hasOwnProperty...
                target.needsUpdate = true;
                target[name] = value;
            },
            get: function() {
                return target[name];
            }
        });
    }
};