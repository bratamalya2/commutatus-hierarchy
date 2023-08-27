const deleteField = (field, stateVar, setStateVar) => {
  if (!stateVar) return;
  else {
    if (stateVar.includes(field)) {
      setStateVar((curr) => {
        let arr = [...curr];
        arr = arr.filter(
          (item) => JSON.stringify(item) !== JSON.stringify(field)
        );
        return arr;
      });
    } else return;
  }
};

export default deleteField;
