// This is a service that will handle the decryption logic
// It will be replaced with your actual backend API calls

import { cloudinaryService } from './cloudinaryService';

interface DecryptResult {
  decryptedText: string
}

class DecryptService {
  private readonly backendUrl = 'http://127.0.0.1:8000/api'; // Update with your backend URL

  async decryptImageToText(image: File): Promise<DecryptResult> {
    try {
      // First upload the image to Cloudinary
      const cloudinaryUrl = await cloudinaryService.uploadImage(image);
      console.log('Image uploaded to Cloudinary:', cloudinaryUrl);

      // Send the Cloudinary URL to backend for decoding
      const response = await fetch(`${this.backendUrl}/decode/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image_url: cloudinaryUrl,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to decode message from image');
      }

      const data = await response.json();
      return {
        decryptedText: data.message,
      };
    } catch (error) {
      console.error('Error in decryption process:', error);
      throw error;
    }
  }
}

export const decryptService = new DecryptService()
