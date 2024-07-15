describe('Visualización de Vuelos', () => {
  beforeEach(() => {
    // Iniciar sesión antes de cada prueba
    cy.visit('/auth/login', { timeout: 20000 }); // Aumenta el tiempo de espera a 20 segundos
    cy.get('input[name="email"]').type('edgar_amanta_09@hotmail.com'); // Ingresa un correo válido de prueba
    cy.get('input[name="password"]').type('123456'); // Ingresa una contraseña válida de prueba
    cy.get('form').submit();
    cy.url().should('include', '/dashboard'); // Verifica que se redirija al dashboard después de iniciar sesión
  });

  it('Debe mostrar la lista de vuelos en la página de visualización de vuelos', () => {
    // Navega a la página de visualización de vuelos
    cy.visit('/dashboard/vuelosview');

    // Verifica que estemos en la página de visualización de vuelos
    cy.url().should('include', '/dashboard/vuelosview');

    // Verifica que haya al menos un vuelo listado
    cy.get('ul').find('li').should('have.length.greaterThan', 0);

    // Verifica que los detalles del vuelo (número, destino, hora de salida, estado) estén visibles
    // cy.get('ul li').first().should('contain.text', 'Número de vuelo');
    // cy.get('ul li').first().should('contain.text', 'Destino');
    // cy.get('ul li').first().should('contain.text', 'Hora de salida');
    // cy.get('ul li').first().should('contain.text', 'Estado');

    // Verifica la presencia y funcionalidad del botón "Editar" para un vuelo específico
    // cy.get('ul li').first().find('button').contains('Editar').click();
    // cy.url().should('include', '/dashboard/vuelosedit'); // Verifica que se redirija a la página de edición de vuelos

    // Puedes agregar más aserciones según la funcionalidad específica que desees probar
  });

  // it('Debe permitir cancelar un vuelo desde la página de visualización de vuelos', () => {
  //   // Navega a la página de visualización de vuelos
  //   cy.visit('/dashboard/vuelosview');

  //   // Verifica que estemos en la página de visualización de vuelos
  //   cy.url().should('include', '/dashboard/vuelosview');

  //   // Cancela el primer vuelo de la lista
  //   // cy.get('ul').find('li').first().find('button').contains('Cancelar').should('be.visible').click();



  //   // Verifica que el vuelo haya sido cancelado (puedes verificar un mensaje de éxito o el estado actualizado del vuelo)

  //   // Puedes agregar más aserciones según la funcionalidad específica que desees probar
  // });
});
