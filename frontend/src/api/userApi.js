export const uploadProfilePic = async (file) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "saksham_preset"); // make this in cloudinary

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/<your-cloud-name>/image/upload",
    { method: "POST", body: data }
  );

  const json = await res.json();
  return json.secure_url;
};

export const updateProfile = async (payload) => {
  console.log("Send this to backend:", payload);
  return true;
};
