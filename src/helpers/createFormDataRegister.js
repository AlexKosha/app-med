export const createFormDataRegister = (newUser) => {
  const formData = new FormData();
  formData.append("name", newUser.name);
  formData.append("email", newUser.email);
  formData.append("password", newUser.password);

  if (newUser.avatarSource) {
    formData.append("avatar_url", newUser.avatarSource.uri);
    // avatarURL
  }

  return formData;
};
