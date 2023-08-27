const editField = (field, superFieldProperty, setStateVar, setSubStateVar) => {
  if (superFieldProperty && setSubStateVar) {
    setSubStateVar((curr) => {
      return curr.map((obj) => {
        if (obj[superFieldProperty].id !== field.id) return obj;
        else {
          return {
            ...obj,
            [superFieldProperty]: field,
          };
        }
      });
    });
  }
  setStateVar((curr) => {
    return curr.map((obj) => {
      if (obj.id !== field.id) return obj;
      else return field;
    });
  });
};

export default editField;
