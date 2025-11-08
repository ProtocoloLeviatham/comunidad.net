document.addEventListener('DOMContentLoaded', () => {
    // 1. Configuración de la Lluvia de Código (Matrix Rain)
    const canvas = document.querySelector('.matrix-rain-canvas');
    const ctx = canvas.getContext('2d');

    // Asegura que el canvas ocupe toda la ventana
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Caracteres Hacking: Binario, Hex, o caracteres especiales/símbolos
    const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+{}|:<>?~';
    const charArray = characters.split('');
    const font_size = 15;
    const columns = canvas.width / font_size; // Número de columnas
    
    // Un array para rastrear la posición Y de cada columna de código
    let drops = [];
    for (let i = 0; i < columns; i++) {
        drops[i] = 1; // Empieza desde la primera fila
    }

    // El color morado deseado
    const purpleColor = '#bb00ff';

    // Función para dibujar la lluvia de código
    function drawRain() {
        // Fondo semi-transparente para el efecto de desvanecimiento
        ctx.fillStyle = 'rgba(17, 17, 17, 0.05)'; 
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Estilo del texto
        ctx.fillStyle = purpleColor; // El color morado
        ctx.font = `${font_size}px 'Roboto Mono', monospace`;

        // Recorre cada columna (drop)
        for (let i = 0; i < drops.length; i++) {
            // Selecciona un carácter al azar
            const text = charArray[Math.floor(Math.random() * charArray.length)];
            
            // Dibuja el carácter en su posición X e Y
            ctx.fillText(text, i * font_size, drops[i] * font_size);

            // Si la gota ha llegado al final de la pantalla (o más allá), la resetea aleatoriamente
            // El 'Math.random() > 0.975' hace que la lluvia sea intermitente y no una sola línea constante
            if (drops[i] * font_size > canvas.height && Math.random() > 0.975) {
                drops[i] = 0; // Vuelve al inicio
            }

            // Incrementa la posición Y de la gota
            drops[i]++;
        }
    }

    // Inicializa el bucle de animación
    setInterval(drawRain, 50); // Velocidad de la lluvia (milisegundos)

    // Ajuste de tamaño al cambiar el tamaño de la ventana (mejor experiencia)
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        drops = [];
        const newColumns = canvas.width / font_size;
        for (let i = 0; i < newColumns; i++) {
            drops[i] = 1;
        }
    });

    // 2. Comportamiento Adicional (Opcional: puedes agregar más interacción aquí)
    
    // Ejemplo: Animación de color en los títulos al pasar el ratón (Hover)
    const titles = document.querySelectorAll('h1, h2, h3');
    titles.forEach(title => {
        title.addEventListener('mouseenter', () => {
            title.style.color = '#00ff41'; // Color neón alternativo
            title.style.transition = 'color 0.2s';
        });
        title.addEventListener('mouseleave', () => {
            // Revertir a los colores definidos en el CSS (morado/verde)
            if(title.tagName === 'H2') {
                 title.style.color = '#00ff41'; // Se mantiene verde
            } else {
                 title.style.color = purpleColor; // Vuelve a morado
            }
        });
    });
});