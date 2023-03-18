export const validateLogin = (info) => {
  const { email, password } = info;
  const errors = {};

  if (!email.trim()) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errors.email = "Email is invalid";
  }

  if (!password.trim()) {
    errors.password = "Password is required";
  }

  return errors;
};

export const validateBlog = (blog) => {
  let error = {};
  if (!blog?.title) {
    error.title = "Provide a title";
  }
  if (!blog?.tags) {
    error.tags = "Provide a tags";
  }
  if (!stripHTML(blog?.body)) {
    error.body = "Provide a body";
  }
  if (!blog.author) {
    error.id = "Provide a id";
  }
  return error;
};

export const stripHTML = (html) => {
  let stripped = html.replace(/(<([^>]+)>)/gi, "");
  return stripped;
};
