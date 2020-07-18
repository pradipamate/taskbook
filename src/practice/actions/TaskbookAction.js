export const Add = (value) => ({
  type: "ADD_LIST",
  payload: value,
});
export const updated = (value) => ({
  type: "FOR_UPDATED",
  payload: value,
});
export const RemoveItemFromList = (value) => ({
  type: "REMOVE_ITEM_FOM_LIST",
  payload: value,
});

export const ChangeStatus = (value) => ({
  type: "CHANGE_STATUS_TASK",
  payload: value,
});
