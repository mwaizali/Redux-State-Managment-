

const ADD_TODO = "ADD_TODO"
const REMOVE_TODO = "REMOVE_TODO"
const TOGGLE_TODO = "TOGGLE_TODO"
const ADD_GOAL = "ADD_GOAL"
const REMOVE_GOAL = "REMOVE_GOAL"




//In this function you create a store 
function  createStore(reducer){


    let state

    const listnears  = []
    
    const getState = () => state
    
    const subcribe = (listnear) => {

        listnears.push(listnear)
    
        return() => {
            listnears = listnears.filter((l) => l !== listnear)
        }
    } 

    //dispatch function take a action and change the state a/c to particular action
    const dispatch = (action) =>{ 
        // console.log(action);
        state = reducer(state,action);
        listnears.forEach(listnear => listnear()); 
    } 

    return{
        getState,
        subcribe,
        dispatch
    }

}


function addtodo_action(todo){
    return{
        type: ADD_TODO,
        todo
    }
}

function removetodo_action(id){
    return{
        type: REMOVE_TODO,
        id
    }
}

function addtoogletodo_action(id){
    return{
        type: TOGGLE_TODO,
        id
    }
}

function addgoal_action(goals){
    return{
        type: ADD_GOAL,
        goals
    }
}

function removegoals_action(id){
    return{
        type: REMOVE_GOAL,
        id
    }
}
// Redux States and action using rudecer function 





//todo reducer function
function todo(state = [], action){

    switch(action.type){
    case ADD_TODO :
        return state.concat([action.todo])
    case REMOVE_TODO:
        return state.filter((todo) => todo.id !== action.id) 
    
    case TOGGLE_TODO:
        return state.map((todo) => todo.id !== action.id ) ? todo :
        Object.assign({},todo, {compelete: !todo.compelete})
    default:
        return state;
    }

}


//goals reducer function
function goals(state = [],action){  

    switch(action.type){
        case ADD_GOAL:
            return state.concat([action.goals])
        case REMOVE_GOAL:
            return state.filter(goals => goals.id !== action.id)
        default:
            return state
    }
     
}


//General reducer function 
function app (state = {},action){

    return{
        todo: todo(state.todo,action),
        goals: goals(state.goals,action)
    }

}



const store = createStore(app);

store.subcribe(() => {

    console.log('The new state is :', store.getState()) 

})

store.dispatch(addgoal_action({
    id: 0,
    name: "Waiz",
    compelete: false

}))

store.dispatch(addtodo_action({ 
    id: 1,
    name: "ALI",
    compelete: true
}))

store.dispatch(addgoal_action({ 
    id: 1,
    name: "talha",
    compelete: false
}))


