in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uTexture;
uniform vec3 uOriginalColor;
uniform vec3 uTargetColor;
uniform float uTolerance;

void main(void) {
    vec4 c = texture(uTexture, vTextureCoord);

    if (c.rgb == vec3(0.0, 0.0, 0.0)) {
        finalColor = vec4(0.0, 0.0, 0.0, c.a);
    } else {
        finalColor = vec4(uTargetColor, 1);    
    }
}
