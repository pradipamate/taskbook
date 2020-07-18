const TaskBook = [];

export default (state = TaskBook, action) => {
    switch (action.type) {
            case 'ADD_LIST':
            return [...state,action.payload];

            case 'REMOVE_ITEM_FOM_LIST':
            const selected = action.payload
            //console.log("sele",selected);
           // console.log("state",state);
             const index = state.findIndex(x => x.id ===selected);
             console.log("index",index);
             state.splice(index, 1);
             return [{...state}];

            case 'FOR_UPDATED':
            var EditData = action.payload;
            const Data = state.find(item => item.id === EditData.id);
            Data.Title = EditData.Title;
            Data.Description = EditData.Description;
            Data.Duedate = EditData.Duedate;
            Data.Priority = EditData.Priority;
            return [...state];

            case 'CHANGE_STATUS_TASK':
            const AllData=state.find(item=>item.id===action.payload);
            AllData.CurrentState = "Done";
            return[...state];
        
            default:
            return state;
    }
}