export const createFormDataRegister = (body) => {
  const formData = new FormData();
  formData.append("name", body.name);
  formData.append("email", body.email);
  formData.append("password", body.password);

  // Assuming avatarURL is a file URI
  if (body.avatarURL) {
    const avatarFile = {
      uri: body.avatarURL.uri,
      name: "avatar.jpg",
      type: "image/jpeg",
    };
    formData.append("avatarURL", avatarFile);
  }

  return formData;
};
