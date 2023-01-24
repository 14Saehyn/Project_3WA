const reducer = (state, action) => {
    switch(action.type){
        // case 'INPUT_CHANGE':
        //     return{
        //         ...state,
        //         inputValue:action.payload
        //     }
        // case 'ADD_TASK':
        //     return{
        //         ...state,
        //         tasks:[...state.tasks, {id:state.idValue, label:action.payload, etat:false}],
        //         idValue: state.idValue + 1,
        //         inputValue:""
        //     }
        // case "TOGGLE" :
        //     const result = state.tasks.map((task) => {
        //         if(action.payload.id === task.id){
        //             return {id:action.payload.id, label:action.payload.label, etat:!action.payload.etat}
        //         } 
        //         return task 
        //     })
        //     console.log(action.payload)
        //     console.log(result)
        //     return{
        //         ...state,
        //         tasks:result
        //     }
        // case "REMOVE_TASK":
        //     return{
        //         ...state,
        //         tasks:action.payload
        //     }
        default :
        return state
    }
}

export default reducer