/// <reference types = "cypress"/>
//  режим дебагинга в DevTools " setTimeout('debugger;', 3000) "

describe('HW_Kukri',()=>{
beforeEach(()=>{
  cy.visit('https://sanitarskyi-ngx-admin.herokuapp.com/');
  cy.get('[alt="Material Dark Theme"]').click();
  cy.get('span.ng-tns-c141-19').click();
  cy.get('span.ng-tns-c141-23').click();
})

const testData = [
  {
   position: 'bottom-left', expectedResult: 'bottom-left', 
   title: 'top-left title', expectedResultTitle: 'top-left title',
   content: 'success', expectedResultContent: 'success',
   time: '20000', expectedResultTime: '20000',
   toastType: 'success', expectedResultType: 'active',
   color: 'rgb(96, 175, 32)',
   icon: 'checkmark',
   positionToast: { 
    justifycontent: "flex-start",
    alignitems: "flex-end"
  }
  },
  {
    position: 'top-left', expectedResult: 'top-left', 
    title: 'bottom-left title', expectedResultTitle: 'bottom-left title',
    content: 'info', expectedResultContent: 'info',
    time: '20000', expectedResultTime: '20000',
    toastType: 'info', expectedResultType: 'active',
    color: 'rgb(4, 149, 238)',
    icon: 'question-mark',
    positionToast: { 
     justifycontent: "flex-start",
     alignitems: "flex-start"
   }
  },
   {
    position: 'bottom-right', expectedResult: 'bottom-right', 
    title: 'bottom-right title', expectedResultTitle: 'bottom-right title',
    content: 'warning', expectedResultContent: 'warning',
    time: '20000', expectedResultTime: '20000',
    toastType: 'warning', expectedResultType: 'active',
    color: 'rgb(255, 159, 5)',
    icon: 'alert-triangle',
    positionToast: { 
     justifycontent: "flex-end",
     alignitems: "flex-end"
   }
  },
   {
    position: 'top-end', expectedResult: 'top-end', 
    title: 'title', expectedResultTitle: 'title',
    content: 'danger', expectedResultContent: 'danger',
    time: '20000', expectedResultTime: '20000',
    toastType: 'danger', expectedResultType: 'active',
    color: 'rgb(176, 0, 32)',
    icon:'flash',
    positionToast: { 
    justifycontent:  "flex-end",
    alignitems: "flex-start"
   }
  }

] 

testData.forEach(({title, expectedResultTitle, 
  position, expectedResult, 
  content, expectedResultContent,
  time, expectedResultTime,
  toastType, expectedResultType,
  color,
  icon,
  positionToast
}) => {

it(`toast`, () =>  {

  // click button "position"  
  cy.wait(2000) // дуже швидко пробігало і невстигала сторінка прогрузитись
  cy.get('button.select-button[type="button"]').eq(1).click().debug()
   cy.get(`[ng-reflect-value="${position}"]`)
   .click()
  
  
// Fill field title
  cy.get('input[name="title"]')
  .clear()
  .type(title)
  .should('contain.value', expectedResultTitle);

// Fill field content
  cy.get('input[name="content"]')
  .clear()
  .type(content)
  .should('contain.value', expectedResultContent)
// Fill field timeout
  cy.get('input[name="timeout"]')
  .clear()
  .type(time)
  .should('contain.value', expectedResultTime)

// click button "Toast type"    // primary, success, info , warning , danger 
  cy.get('button.select-button[type="button"]').eq(2).click()
  cy.get(`nb-option[ng-reflect-value="${toastType}"]`)
  .click()
     

  // click button 
  cy.get('button.mat-ripple.status-basic')
  .click()
  .should('have.class', 'status-basic' );

  // check color
  cy.get('nb-toast[ng-reflect-toast]')
  .should('have.css', 'border-color', color)
  
  // Check title
  cy.get('span.title.subtitle').should('contain', title)

  // Check content
  cy.get('div.message').should('contain', content)

  // Check icon (намагався сам відловити, не зміг)  cy.get(`g [data-name="${icon}"]`).should('contain', icon)

  // check position (Все що знизу, сам не зміг зробити, зробив як ви показували)
  cy.get('nb-toast[ng-reflect-toast]').then(toast => {
    cy.wrap(toast).parents('.toastr-overlay-container').should('have.css', 'justify-content', positionToast.justifycontent )
    cy.wrap(toast).parents('.toastr-overlay-container').should('have.css', 'align-items', positionToast.alignitems )

    cy.wrap(toast).find(`g[data-name="${icon}"]`).should('exist')
  })

})

})

})
