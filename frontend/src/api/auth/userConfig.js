const serverUrl = import.meta.env.VITE_SERVER_URL;
export const registerUser = async (formData) => {
  const response = await fetch(`${serverUrl}/api/users/register`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errData = await response.json();
    throw new Error(errData.message || "Failed to register");
  }

  return await response.json();
};
export const logoutUser = async () => {
  const response = await fetch(`${serverUrl}/api/users/logout`, {
    method: "POST", // Make sure to send a POST request to logout
    credentials: "include", // To ensure cookies are sent with the request
  });

  if (!response.ok) {
    const errData = await response.json();
    throw new Error(errData.message || "Failed to logout");
  }

  return await response.json();
};
