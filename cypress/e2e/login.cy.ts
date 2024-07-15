// describe('Login Page', () => {
//   beforeEach(() => {
//     cy.visit('/auth/login', { timeout: 20000 }); // Aumenta el tiempo de espera a 20 segundos
//   });

//   it('Debe navegar a la página de inicio de sesión y mostrar el formulario de login', () => {
//     // Verificar que estamos en la página de login
//     cy.url().should('include', '/auth/login');

//     // Verificar que el formulario de login esté visible
//     cy.get('form').should('be.visible');

//     // Introducir datos en el formulario
//     cy.get('input[name="email"]').type('usuario@ejemplo.com'); // Cambia "email" por el nombre correcto del campo de email
//     cy.get('input[name="password"]').type('password123'); // Cambia "password" por el nombre correcto del campo de contraseña

//     // Enviar el formulario
//     cy.get('form').submit();

//     // Verificar que se muestre el mensaje de error
//     cy.get('.bg-red-500').should('be.visible').and('contain.text', 'No user found'); // Ajusta el selector y el texto según lo que esperes ver como mensaje de error

//     // Verificar que no se haya redirigido a /dashboard
//     cy.url().should('not.include', '/dashboard');
//   });
// });

describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('/auth/login', { timeout: 20000 }); // Aumenta el tiempo de espera a 20 segundos
  });

  it('Debe navegar a la página de inicio de sesión y mostrar el formulario de login', () => {
    // Verificar que estamos en la página de login
    cy.url().should('include', '/auth/login');

    // Verificar que el formulario de login esté visible
    cy.get('form').should('be.visible');
  });

  it('Debe redirigir al usuario al dashboard después de iniciar sesión con credenciales válidas', () => {
    // Introducir datos válidos en el formulario
    cy.get('input[name="email"]').type('edgar_amanta_09@hotmail.com'); // Cambia "usuario@ejemplo.com" por un correo válido de prueba
    cy.get('input[name="password"]').type('123456'); // Cambia "password123" por una contraseña válida de prueba

    // Enviar el formulario
    cy.get('form').submit();

    // Verificar que se redirija al dashboard
    cy.url().should('include', '/dashboard');

    // Verificar elementos específicos en la página del dashboard si es necesario
    cy.contains('h1', 'Bienvenido al Dashboard').should('be.visible');
    cy.contains('button', 'Cerrar sesión').should('be.visible');
  });
});
