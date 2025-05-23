    uniform mat4 projectionMatrix;
    uniform mat4 viewMatrix;
    uniform mat4 modelMatrix;
    

    attribute vec3 position;
    attribute vec2 uv;

    varying vec2 v_uv;



    void main() {

        vec4 modelPosition = modelMatrix * vec4(position, 1.);
        vec4 viewPosition = viewMatrix * modelPosition;
        vec4 projectedPosition = projectionMatrix * viewPosition;


        gl_Position = projectedPosition;
        v_uv = uv;
    }