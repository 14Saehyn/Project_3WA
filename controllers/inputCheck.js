const inputCheck = (value, max = 255, min = 1) => {
    if(typeof value === "string" || typeof value === "number") {
        const el = value.trim().length;
        // on verifie la length 
        if(el > max || el < min) {
            return false
        }
    } else if(Array.isArray(value)) {
        // si le tableau est vide
        if(value.length === 0) {
            return false
        }
        
        // on verifie chaque valeur du tableau
        value.forEach(element => {
            const e = element.trim().length;
            if(e > max || e < min) {
                return false
            }
        });
    } else if(typeof value === "object") {
        // On fait un tableau avec les key de notre object pour verifier si il y a des données dedans
        if(Object.keys(value).length === 0) {
            return false
        }
        
        // on verifie si une valeur est vide
        for (const key in value) {
            console.log(value[key].value)
            const element = value[key].trim().length;
                if(element > max || element < min) {
                    return false
                }
            }
        }
        return true
    }
const checkInputValue = (data) => {
    if ((typeof data === 'string' || typeof data === 'number') && data.trim().length === 0) {
        return false
    }
    else if(typeof data === "object"){
        if(Object.keys(data).length === 0) {
            return false
        }
        
        // on verifie si une valeur est vide
        for (let key in data) {
            const element = data[key].trim().length;
            console.log(element)
                if(element === 0) {
                    return false
                }
            }
    }
    else if (Array.isArray(data)) {
        data.forEach(info =>{
            if(info.trim().length === 0){
                return false
            }
        })
    }
    return true
}


export  {inputCheck,checkInputValue}
