// This is a service that will handle the encryption logic
// It will be replaced with your actual backend API calls

import { cloudinaryService } from './cloudinaryService';

interface EncryptResult {
  encryptedImageUrl: string
}

class EncryptService {
  private readonly backendUrl = 'http://127.0.0.1:8000/api'; // Update with your backend URL

  async encryptTextInImage(image: File, text: string): Promise<EncryptResult> {
    try {
      // First upload the image to Cloudinary
      const cloudinaryUrl = await cloudinaryService.uploadImage(image);
      console.log('Image uploaded to Cloudinary:', cloudinaryUrl);

      // Send the Cloudinary URL and text to backend for encoding
      const response = await fetch(`${this.backendUrl}/encode/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image_url: cloudinaryUrl,
          message: text,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to encode message in image');
      }

      const data = await response.json();
      return {
        encryptedImageUrl: data.encoded_image_url,
      };
    } catch (error) {
      console.error('Error in encryption process:', error);
      throw error;
    }
  }
}

export const encryptService = new EncryptService()
