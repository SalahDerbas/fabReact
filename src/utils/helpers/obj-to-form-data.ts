export const ObjToFormData = (object: any, form?: FormData, namespace?: string): FormData => {
  const formData = form || new FormData();
  for (let property in object) {
    if (!object.hasOwnProperty(property) || typeof object[property] === 'undefined') continue;

    const formKey = namespace ? `${namespace}[${property}]` : property;
    if (object[property] instanceof Date) formData.append(formKey, object[property].toISOString());
    else if (typeof object[property] === 'object' && !(object[property] instanceof File))
      ObjToFormData(object[property], formData, formKey);
    else formData.append(formKey, object[property]);
  }
  return formData;
};
