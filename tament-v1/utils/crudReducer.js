export default function crudReducer(params) {
  const { state, action, obj } = params;

  switch (action.type) {
    case params.add:
      return {
        ...state,
        [obj]: [...state[obj], action.payload],
      };

    case params.del:
      return {
        ...state,
        [obj]: state[obj].filter((d) => d.id !== action.id),
      };
    case params.update:
      var newstate = { ...state };
      var { id, updatedData } = action.payload;
      var data = newstate[obj].find((d) => d.id == id);
      if (!data) return newstate;
      Object.keys(updatedData).map((key) => {
        data[key] = updatedData[key] ?? data[key];
      });
      params.beforeUpdate && params.beforeUpdate(data,updatedData);
      return newstate;
    default:
      return state;
  }
}
