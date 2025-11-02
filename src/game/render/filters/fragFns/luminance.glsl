// Perceptual brightness weights for RGB channels
const vec3 channelPerceptualBrightness = vec3(0.3, 0.6, 0.1);

// Calculate perceptual luminance of a color
float luminance(vec3 color) {
    return color.r * channelPerceptualBrightness.r +
           color.g * channelPerceptualBrightness.g +
           color.b * channelPerceptualBrightness.b;
}

// Determines if a color is not black based on perceptual luminance
float isNotBlack(vec4 color, float blackPoint) {
    float lum = luminance(color.rgb);
    return step(blackPoint, lum);
}