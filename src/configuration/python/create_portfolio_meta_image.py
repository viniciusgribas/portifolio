#!/usr/bin/env python3
"""
Meta image generator for portfolio website.
This module creates a LinkedIn-style meta image for social sharing.
"""

# pylint: disable=import-error
from PIL import Image, ImageDraw, ImageFont
import os

# Create base image with LinkedIn-style dimensions
width, height = 1200, 630
image = Image.new("RGB", (width, height), color="#FFFFFF")  # White background
draw = ImageDraw.Draw(image)

# LinkedIn brand colors
linkedin_blue = "#0A66C2"  # LinkedIn primary blue
text_primary = "#000000"   # Black for main text
text_secondary = "#666666" # Gray for secondary text

# Draw blue border/moldure
border_width = 20
draw.rectangle([0, 0, width-1, height-1], outline=linkedin_blue, width=border_width)

# Define fonts
font_title = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 72)
font_name = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 48)
font_role = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 36)
font_tagline = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 32)

# Insert text with LinkedIn light theme colors
draw.text((100, 100), "<VGR>", font=font_title, fill=linkedin_blue)
draw.text((100, 200), "Vinicius Guerra e Ribas", font=font_name, fill=text_primary)
draw.text((100, 280), "Software Developer & Data Specialist", font=font_role, fill=text_secondary)

# Add tagline with highlight box
tagline = "Building Scalable Data Solutions"
tagline_bbox = draw.textbbox((0, 0), tagline, font=font_tagline)
tagline_width = tagline_bbox[2] - tagline_bbox[0]
tagline_x = 100
tagline_y = 380

# Draw highlight box with LinkedIn-style colors
highlight_padding = 20
highlight_box = [
    tagline_x - highlight_padding,
    tagline_y - highlight_padding,
    tagline_x + tagline_width + highlight_padding,
    tagline_y + 40
]
draw.rectangle(highlight_box, fill="#E9F0F8")  # Light blue background
draw.text((tagline_x, tagline_y), tagline, font=font_tagline, fill=text_primary)

# Add subtle separator line
draw.line([(100, 340), (400, 340)], fill=linkedin_blue, width=2)

# Save the image
generated_image_path = os.path.join(os.path.dirname(__file__), '../../../public/assets/meta_image.png')
image.save(generated_image_path)
print(f"Professional LinkedIn-style image generated and saved at: {generated_image_path}")