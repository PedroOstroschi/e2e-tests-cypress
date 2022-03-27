describe('', ()=>{

    beforeEach(()=>{
        cy.visit('alura-fotos.herokuapp.com')
    });

    it('verifica mensagens validação', () =>{
        cy.contains('a', 'Register now').click();
        cy.contains('button', 'Register').click();
        cy.contains('ap-vmessage', 'Email is required!')
            .should('be.visible');
        cy.contains('button', 'Register').click();
        cy.contains('ap-vmessage', 'Password is required!')
            .should('be.visible');
        cy.contains('ap-vmessage', 'User name is required!')
            .should('be.visible');
        cy.contains('ap-vmessage', 'Full name is required!')
            .should('be.visible');
    });

    it('verifica mensagens de email invalido', () =>{
        cy.contains('a', 'Register now').click();
        cy.contains('button', 'Register').click();
        cy.get('input[formcontrolname=email]').type('jaque');
        cy.contains('ap-vmessage', 'Invalid e-mail')
            .should('be.visible');
        
    });

    it('verifica senha menor que 8', ()=>{
        cy.contains('a', 'Register now').click();
        cy.contains('button', 'Register').click();
        cy.get('input[formcontrolname=password]').type('jaque');
        cy.contains('button', 'Register').click();
        cy.contains('ap-vmessage', 'Mininum length is 8')
            .should('be.visible');
    });

    it('faz login de usuário válido', ()=>{
        const senha = '123';
        const nome = 'flavio';
        cy.login(nome, senha);

        cy.contains('a', '(Logout)').should('be.visible');
    });

    it('faz login de usuario invalido', ()=>{
        const senha = '123';
        const nome = 'jacqueline';
        cy.login(nome, senha);

        const errorMessage = 'Invalid user name or password';
        cy.on('window:alert', (str)=>{
            expect(str).to.equal(errorMessage);
        });
    });
});