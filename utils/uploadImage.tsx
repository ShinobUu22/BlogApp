import { storage } from "@/firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const uploadImage = async (file: File): Promise<string> => {
  if (!file) throw new Error("No file provided");

  // Create a storage reference
  const storageRef = ref(storage, `images/${file.name}`);

  try {
    // Upload the file
    const snapshot = await uploadBytes(storageRef, file);

    // Get the download URL
    const url = await getDownloadURL(snapshot.ref);
    console.log("File available at", url);

    return url;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw new Error("Error uploading image. Please try again.");
  }
};
