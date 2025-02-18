#!/usr/bin/env python3
"""
LinkedIn Banner Generator with SVG and JPG export
Requirements:
    pip install pillow cairosvg
"""

import os
from string import Template
import html
import cairosvg
from PIL import Image
import io

class LinkedInBannerGenerator:
    def __init__(self):
        self.svg_template = '''<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1584 396">
  <defs>
    <!-- Simplified background gradient -->
    <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#FFFFFF"/>
      <stop offset="100%" style="stop-color:#F8FAFC"/>
    </linearGradient>

    <!-- Code pattern with increased visibility -->
    <pattern id="codeSnippets" x="0" y="0" width="300" height="100" patternUnits="userSpaceOnUse">
      <text x="10" y="15" fill="#0A66C2" opacity="0.12" font-family="monospace" font-size="14">
        ${code_snippet1}
      </text>
      <text x="20" y="35" fill="#0A66C2" opacity="0.12" font-family="monospace" font-size="14">
        ${code_snippet2}
      </text>
      <text x="10" y="55" fill="#0A66C2" opacity="0.12" font-family="monospace" font-size="14">
        ${code_snippet3}
      </text>
      <!-- Additional code snippets for more coverage -->
      <text x="150" y="25" fill="#0A66C2" opacity="0.12" font-family="monospace" font-size="14">
        class DataPipeline:
      </text>
      <text x="160" y="45" fill="#0A66C2" opacity="0.12" font-family="monospace" font-size="14">
        def transform(self):
      </text>
      <text x="170" y="65" fill="#0A66C2" opacity="0.12" font-family="monospace" font-size="14">
        return processed_data
      </text>
    </pattern>
  </defs>

  <!-- Background -->
  <rect width="1584" height="396" fill="url(#bgGradient)"/>
  <rect width="1584" height="396" fill="url(#codeSnippets)"/>

  <!-- Logo Section with enhanced visibility -->
  <g transform="translate(50,50)">
    <!-- Background highlight for logo -->
    <rect x="-10" y="-10" width="200" height="80" fill="#FFFFFF" opacity="0.9" rx="5"/>
    <text font-family="monospace" font-size="48" fill="#0A66C2">
      <tspan x="0" y="40" font-weight="600">${logo_text}</tspan>
    </text>
    <text font-family="monospace" font-size="20" fill="#0A66C2">
      <tspan x="0" y="70" font-weight="400">${logo_subtitle}</tspan>
    </text>
  </g>

  <!-- Main Content -->
  <g transform="translate(800,80)">
    <!-- Name and Title -->
    <g class="header">
      <text font-family="Inter, system-ui, sans-serif">
        <tspan x="0" y="0" font-size="42" font-weight="600" fill="#0A66C2">
          ${full_name}
        </tspan>
        <tspan x="0" y="45" font-size="24" fill="#666666" font-weight="400">
          ${job_title}
        </tspan>
      </text>
    </g>

    <!-- Expertise Areas with enhanced visibility -->
    <g transform="translate(0,80)">
      <!-- Area 1 -->
      <g transform="translate(0,0)">
        <rect x="0" y="0" width="150" height="34" rx="17" 
              fill="#FFFFFF" stroke="#0A66C2" stroke-width="2"/>
        <text x="75" y="22" text-anchor="middle" 
              font-family="Inter, system-ui, sans-serif" font-size="15" 
              fill="#0A66C2" font-weight="500">
          ${skill_1}
        </text>
      </g>

      <!-- Area 2 -->
      <g transform="translate(170,0)">
        <rect x="0" y="0" width="220" height="34" rx="17" 
              fill="#FFFFFF" stroke="#0A66C2" stroke-width="2"/>
        <text x="110" y="22" text-anchor="middle" 
              font-family="Inter, system-ui, sans-serif" font-size="15" 
              fill="#0A66C2" font-weight="500">
          ${skill_2}
        </text>
      </g>

      <!-- Area 3 -->
      <g transform="translate(410,0)">
        <rect x="0" y="0" width="150" height="34" rx="17" 
              fill="#FFFFFF" stroke="#0A66C2" stroke-width="2"/>
        <text x="75" y="22" text-anchor="middle" 
              font-family="Inter, system-ui, sans-serif" font-size="15" 
              fill="#0A66C2" font-weight="500">
          ${skill_3}
        </text>
      </g>
    </g>

    <!-- Connect section -->
    <g transform="translate(0,180)">
      <text font-family="monospace" font-size="16" font-weight="500">
        <tspan x="0" y="0" fill="#666666">$ connect_with_me</tspan>
        <tspan x="200" y="0" fill="#0A66C2">${website}</tspan>
      </text>
    </g>
  </g>

  <!-- Simple decorative elements -->
  <g class="decorative-elements">
    <path d="M1200 50 Q 1300 100, 1400 50 T 1584 50" 
          stroke="#0A66C2" stroke-width="1" fill="none" opacity="0.2"/>
    <path d="M1200 250 Q 1300 300, 1400 250 T 1584 250" 
          stroke="#0A66C2" stroke-width="1" fill="none" opacity="0.2"/>
  </g>
</svg>
'''
        self.default_code_snippets = [
            "def process_data(df):",
            "    df = clean_data(df)",
            "    return analyze(df)"
        ]

    def escape_xml(self, text):
        """Escape special characters for XML"""
        return html.escape(text, quote=False)

    def generate_banner(self, config):
        """Generate LinkedIn banner with custom configuration"""
        # Set default values
        default_config = {
            'logo_text': '<vgr/>',
            'logo_subtitle': 'engineer',
            'code_snippets': self.default_code_snippets
        }

        # Update with provided config
        merged_config = {**default_config, **config}

        # Escape special characters in all text fields
        template_vars = {
            'full_name': self.escape_xml(merged_config['full_name']),
            'job_title': self.escape_xml(merged_config['job_title']),
            'logo_text': self.escape_xml(merged_config['logo_text']),
            'logo_subtitle': self.escape_xml(merged_config['logo_subtitle']),
            'skill_1': self.escape_xml(merged_config['skill_1']),
            'skill_2': self.escape_xml(merged_config['skill_2']),
            'skill_3': self.escape_xml(merged_config['skill_3']),
            'website': self.escape_xml(merged_config['website']),
            'code_snippet1': self.escape_xml(merged_config['code_snippets'][0]),
            'code_snippet2': self.escape_xml(merged_config['code_snippets'][1]),
            'code_snippet3': self.escape_xml(merged_config['code_snippets'][2])
        }

        # Generate SVG content
        template = Template(self.svg_template)
        svg_content = template.safe_substitute(template_vars)

        # Save to file
        output_path = merged_config.get('output_path', 'linkedin_banner.svg')
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(svg_content)

        return output_path

    def export_to_jpg(self, svg_path, output_path=None):
        """
        Convert SVG to JPG with LinkedIn dimensions
        
        Args:
            svg_path: Path to the SVG file
            output_path: Path for the output JPG file (optional)
        Returns:
            Path to the generated JPG file
        """
        if output_path is None:
            output_path = svg_path.rsplit('.', 1)[0] + '.jpg'

        try:
            # Convert SVG to PNG first (intermediate step)
            png_data = cairosvg.svg2png(
                url=svg_path,
                output_width=1584,
                output_height=396,
                background_color='white'
            )

            # Convert PNG to JPG
            image = Image.open(io.BytesIO(png_data))
            
            # Convert to RGB mode (required for JPEG)
            if image.mode in ('RGBA', 'LA'):
                background = Image.new('RGB', image.size, 'white')
                background.paste(image, mask=image.split()[-1])
                image = background
            
            # Save as JPEG with high quality
            image.save(output_path, 'JPEG', quality=95)
            return output_path

        except Exception as e:
            print(f"Error converting to JPG: {str(e)}")
            print("Please make sure you have the required dependencies installed:")
            print("pip install pillow cairosvg")
            print("For Ubuntu/Debian systems, you might also need:")
            print("sudo apt-get install libcairo2-dev")
            return None

# Example usage
if __name__ == "__main__":
    generator = LinkedInBannerGenerator()
    
    config = {
        'full_name': 'Vinicius Guerra e Ribas',
        'job_title': 'Software Engineer and Data Specialist',
        'skill_1': 'Data Engineering',
        'skill_2': 'Data Science & Analytics',
        'skill_3': 'Python Developer',
        'website': 'viniciusgribas.netlify.app',
        'output_path': 'linkedin_banner.svg'
    }

    # Generate SVG first
    svg_path = generator.generate_banner(config)
    print(f"SVG banner generated: {svg_path}")

    # Convert to JPG
    jpg_path = generator.export_to_jpg(svg_path)
    if jpg_path:
        print(f"JPG banner generated: {jpg_path}")