interface CloudinaryUploadResponse {
    secure_url: string;
}

class CloudinaryService {
    private readonly cloudName = 'dzjjlzdpt'; // You'll need to set this in your Cloudinary settings
    private readonly uploadPreset = 'steganography'; // Replace with your Cloudinary cloud name

    async uploadImage(file: File): Promise<string> {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', this.uploadPreset);

        try {
            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${this.cloudName}/image/upload`,
                {
                    method: 'POST',
                    body: formData,
                }
            );

            if (!response.ok) {
                throw new Error('Failed to upload image to Cloudinary');
            }

            const data: CloudinaryUploadResponse = await response.json();
            return data.secure_url;
        } catch (error) {
            console.error('Error uploading to Cloudinary:', error);
            throw error;
        }
    }
}

export const cloudinaryService = new CloudinaryService(); 