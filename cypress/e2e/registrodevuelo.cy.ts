describe('Registro de vuelo', () => {
  beforeEach(() => {
    cy.visit('/auth/login', { timeout: 20000 }); // Aumenta el tiempo de espera a 20 segundos
    cy.get('input[name="email"]').type('edgar_amanta_09@hotmail.com'); // Cambia "usuario@ejemplo.com" por un correo válido de prueba
    cy.get('input[name="password"]').type('123456'); // Cambia "password123" por una contraseña válida de prueba
    cy.get('form').submit();
    cy.url().should('include', '/dashboard'); // Verificar que se redirija al dashboard después de iniciar sesión
  });

  it('Debe navegar a la página de registro de vuelo y mostrar el formulario', () => {
    // Navegar a la página de registro de vuelo desde el dashboard
    cy.visit('/register');

    // Verificar que estamos en la página de registro de vuelo
    cy.url().should('include', '/register');

    // Verificar que el formulario de registro de vuelo esté visible
    cy.get('form').should('be.visible');
  });

  it('Debe permitir registrar un vuelo correctamente', () => {
    // Navegar a la página de registro de vuelo desde el dashboard
    cy.visit('/register');

    // Introducir datos válidos en el formulario
    cy.get('input[name="numero_vuelo"]').type('1234'); // Cambia "ABC123" por un número de vuelo válido de prueba
    cy.get('input[name="destino"]').type('Ciudad de destino'); // Cambia "Ciudad de destino" por un destino válido de prueba
    cy.get('input[name="hora_salida"]').type('2024-07-15T10:00'); // Cambia "2024-07-15T10:00" por una hora de salida válida de prueba
    cy.get('select[name="estado"]').select('Disponible'); // Cambia "En ruta" por un estado válido de prueba

    // Enviar el formulario
    cy.get('form').submit();

    
  });
});
