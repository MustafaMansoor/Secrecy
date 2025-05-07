from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
import json
import os
from .utils import encode_message, decode_message
import requests
from django.conf import settings
from PIL import Image
import base64
from io import BytesIO
import cloudinary
import cloudinary.uploader
import cloudinary.api

# Configure Cloudinary
cloudinary.config(
    cloud_name=settings.CLOUDINARY['cloud_name'],
    api_key=settings.CLOUDINARY['api_key'],
    api_secret=settings.CLOUDINARY['api_secret']
)

@csrf_exempt
@require_http_methods(["POST"])
def encode(request):
    try:
        data = json.loads(request.body)
        image_url = data.get('image_url')
        message = data.get('message')
        
        if not image_url or not message:
            return JsonResponse({'error': 'Both image_url and message are required'}, status=400)
        
        # Encode the message in the image
        encoded_image_path = encode_message(image_url, message)
        
        # Upload to Cloudinary
        try:
            upload_result = cloudinary.uploader.upload(
                encoded_image_path,
                folder="steganography",
                resource_type="image"
            )
            cloudinary_url = upload_result['secure_url']
            
            # Clean up the local file
            os.remove(encoded_image_path)
            
            return JsonResponse({
                'success': True,
                'encoded_image_url': cloudinary_url
            })
        except Exception as upload_error:
            return JsonResponse({'error': f'Failed to upload to Cloudinary: {str(upload_error)}'}, status=500)
        
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

@csrf_exempt
@require_http_methods(["POST"])
def decode(request):
    try:
        # Check if the request contains a file
        if 'image' in request.FILES:
            image_file = request.FILES['image']
            # Save the uploaded file temporarily
            temp_path = os.path.join(settings.MEDIA_ROOT, 'temp_image.png')
            with open(temp_path, 'wb+') as destination:
                for chunk in image_file.chunks():
                    destination.write(chunk)
            # Decode the message from the local file
            message = decode_message(temp_path)
            # Clean up the temporary file
            os.remove(temp_path)
        else:
            # Handle URL-based decoding
            data = json.loads(request.body)
            image_url = data.get('image_url')
            
            if not image_url:
                return JsonResponse({'error': 'Either image file or image_url is required'}, status=400)
            
            # Decode the message from the image URL
            message = decode_message(image_url)
        
        return JsonResponse({
            'success': True,
            'message': message
        })
        
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500) 