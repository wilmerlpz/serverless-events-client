function posts(state = [], action){
    switch (action) {
        case 'CREATE_POST':
            console.log('CREATE_POST  from reducer');
            return state;
            break;
    
        default:
            return state;
    }
}

export default posts;