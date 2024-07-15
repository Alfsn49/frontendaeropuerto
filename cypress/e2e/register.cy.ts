
describe('Register Page', () => {
  beforeEach(() => {
    cy.visit('/auth/register', { timeout: 20000 }); // Aumenta el tiempo de espera a 20 segundos
  });

  it('Debe navegar a la página de registro de sesión y mostrar el formulario de login', () => {
    // Verificar que estamos en la página de login
    cy.url().should('include', '/auth/register');

    // Verificar que el formulario de login esté visible
    cy.get('form').should('be.visible');
  });

  it('Debe redirigir al usuario al login page luego de registrarse', () => {
    // Introducir datos válidos en el formulario
    cy.get('input[name="username"]').type('user_example1@hotmail.com');

    cy.get('input[name="email"]').type('user_example1@hotmail.com'); // Cambia "usuario@ejemplo.com" por un correo válido de prueba

    cy.get('input[name="password"]').type('123456'); // Cambia "password123" por una contraseña válida de prueba

    cy.get('input[name="confirmPassword"]').type('123456'); // Cambia "password123" por una contraseña válida de prueba

    // Enviar el formulario
    cy.get('form').submit();

    // Verificar que se redirija al dashboard
    cy.url().should('include', '/auth/login');

    
  });
});
