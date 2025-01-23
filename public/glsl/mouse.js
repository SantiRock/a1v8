(function(){
// Context
const canvas = document.getElementById('my_canvas');
const bodyElement = document.body;


const gl = canvas.getContext('webgl');
var mouseX = 0;

bodyElement.addEventListener("mousemove", (e) => {
  const rect = bodyElement.getBoundingClientRect() // object
  mouseX = (e.clientX - rect.left) / rect.width;
})

let isTouching = false

bodyElement.addEventListener('touchstar', () => {
  isTouching = true
})


bodyElement.addEventListener("touchmove", (e) => {
  if (isTouching) {
    e.preventDefault();
    const rect = bodyElement.getBoundingClientRect() // object
    mouseX = (e.clientX - rect.left) / rect.width;
  }
});

bodyElement.addEventListener("touchend", () => {
  isTouching = false;
})


// Geometry

const vertices = [
    -1, 1, 0,
    1, 1, 0,
    1, -1, 0,
    -1, -1, 0
];

const indices = [0,1,2, 0,3,2];

const vertex_buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
gl.bindBuffer(gl.ARRAY_BUFFER, null);

const index_buffer = gl.createBuffer();
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index_buffer);
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

// Shaders

const vertexCode = `
  attribute vec3 a_coordinates;
  varying vec2 v_coordinates;

  void main(void) {
    gl_Position = vec4(a_coordinates, 1.);
    v_coordinates = a_coordinates.xy;
  }
`;

const fragmentCode = `
  precision mediump float;
  varying vec2 v_coordinates;
  uniform float u_mouseX;


  void main(void) {
    vec2 st = v_coordinates;

    vec3 color = vec3(st + 1., u_mouseX);
    //color = vec3(st.x - 0.8 + abs(sin(u_time * 0.0005))*0.5 , -st.x - 0.8 + abs(sin(u_mouseX * 0.0005))*0.5, 0.1);

    gl_FragColor = vec4(color, 1.);
  }
`;

const vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader, vertexCode);
gl.compileShader(vertexShader);

const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragmentShader, fragmentCode);
gl.compileShader(fragmentShader);

const program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);
gl.useProgram(program);

if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error('Shader program linking error:', gl.getProgramInfoLog(program));
};

// Variables

gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
const coord = gl.getAttribLocation(program, 'a_coordinates');
gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(coord);
gl.bindBuffer(gl.ARRAY_BUFFER, null);

const uMouseX = gl.getUniformLocation(program, 'u_mouseX');

// Draw

const animate = function() {

    gl.clearColor(0., 0., 0., 1.);
    gl.enable(gl.DEPTH_TEST);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.viewport(0, 0, canvas.width, canvas.height);

    gl.uniform1f(uMouseX, mouseX);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index_buffer);
    gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);

    requestAnimationFrame(animate);
};

animate();

})()





