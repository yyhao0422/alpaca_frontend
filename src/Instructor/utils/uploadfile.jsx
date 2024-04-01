export async function uploadfile(file, key, fileType, token) {
  try {
    const resGetPresignedURL = await fetch(
      `http://127.0.0.1:3000/api/v1/files/upload-presign-url?key=${key}&fileType=${fileType}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    const resData = await resGetPresignedURL.json();

    const presignedURL = resData.data.uploadURL;

    const resUploadImage = await fetch(presignedURL, {
      method: "PUT",
      headers: {
        "Content-Type": fileType,
      },
      body: file,
    });
    if (!resUploadImage.ok) {
      throw new Error("Failed to upload image!");
    }
  } catch (error) {
    return error;
  }
}
