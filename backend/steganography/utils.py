from PIL import Image
import numpy as np
import requests
from io import BytesIO
import os
from django.conf import settings

def text_to_binary(text):
    """Convert text to binary string."""
    binary = ''.join(format(ord(char), '08b') for char in text)
    return binary + '00000000'  # Add delimiter

def binary_to_text(binary):
    """Convert binary string to text."""
    # Split binary string into 8-bit chunks
    chunks = [binary[i:i+8] for i in range(0, len(binary), 8)]
    # Convert each chunk to character
    text = ''
    for chunk in chunks:
        if len(chunk) == 8:
            text += chr(int(chunk, 2))
    return text

def encode_message(image_url, message):
    """Encode message into image using LSB steganography."""
    # Download image from URL
    response = requests.get(image_url)
    img = Image.open(BytesIO(response.content))
    
    # Convert image to numpy array
    img_array = np.array(img)
    
    # Convert message to binary
    binary_message = text_to_binary(message)
    
    # Check if image can hold the message
    if len(binary_message) > img_array.size:
        raise ValueError("Message too long for this image")
    
    # Flatten the image array
    flat_img = img_array.flatten()
    
    # Embed the message
    for i in range(len(binary_message)):
        flat_img[i] = (flat_img[i] & 254) | int(binary_message[i])
    
    # Reshape the array back to image dimensions
    img_array = flat_img.reshape(img_array.shape)
    
    # Convert back to image
    encoded_img = Image.fromarray(img_array)
    
    # Save the encoded image
    output_path = os.path.join(settings.MEDIA_ROOT, 'encoded_image.png')
    encoded_img.save(output_path)
    
    return output_path

def decode_message(image_url):
    """Decode message from image using LSB steganography."""
    # Download image from URL
    response = requests.get(image_url)
    img = Image.open(BytesIO(response.content))
    
    # Convert image to numpy array
    img_array = np.array(img)
    
    # Extract LSBs
    binary_message = ''
    flat_img = img_array.flatten()
    
    for i in range(len(flat_img)):
        binary_message += str(flat_img[i] & 1)
        # Check for delimiter
        if binary_message[-8:] == '00000000':
            break
    
    # Convert binary to text
    message = binary_to_text(binary_message[:-8])  # Remove delimiter
    return message 