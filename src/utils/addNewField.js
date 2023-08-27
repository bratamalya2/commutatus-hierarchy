const addNewField = (field, stateVar, setStateVar) => {
  if (!stateVar) {
    setStateVar([{ ...field }]);
  } else {
    setStateVar((curr) => [...curr, field]);
  }
};

export default addNewField;
