describe('Visualización y cancelación de vuelos', () => {
  beforeEach(() => {
    // Iniciar sesión antes de cada prueba si es necesario
    cy.visit('/auth/login'); // Ajusta la ruta según tu configuración
    cy.get('input[name="email"]').type('edgar_amanta_09@hotmail.com'); // Ingresa tu correo de prueba
    cy.get('input[name="password"]').type('123456'); // Ingresa tu contraseña de prueba
    cy.get('form').submit();
    cy.url().should('include', '/dashboard'); // Verifica que se redirija al dashboard después de iniciar sesión
  });

  it('Debe permitir cancelar un vuelo desde la página de visualización de vuelos', () => {
    // Navega a la página de visualización de vuelos
    cy.visit('/dashboard/vuelosview'); // Ajusta la ruta según tu configuración

    // Verifica que estemos en la página de visualización de vuelos
    cy.url().should('include', '/dashboard/vuelosview');

    // Espera a que se carguen los vuelos (ajusta el tiempo según sea necesario)
    cy.get('ul li').should('have.length.greaterThan', 0);

    // Cancela el primer vuelo de la lista
    cy.get('ul li:first-child').find('button').contains('Cancelar').click();

    // Verifica que el vuelo haya sido cancelado (puedes verificar un mensaje de éxito o el estado actualizado del vuelo)
    cy.contains('Vuelo cancelado exitosamente').should('exist');

    // Puedes agregar más aserciones según la funcionalidad específica que desees probar
  });
});
