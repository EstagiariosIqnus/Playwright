import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://mariameiretreinamento.botvendas.com/login');
  await page.getByRole('textbox', { name: 'Login' }).click();
  await page.getByRole('textbox', { name: 'Login' }).fill('admin@iqnus.com.br');
  await page.getByRole('textbox', { name: 'Login' }).press('Enter');
  await page.getByRole('textbox', { name: 'Senha' }).click();
  await page.getByRole('textbox', { name: 'Senha' }).fill('Bot@iq587!');
  await page.getByRole('textbox', { name: 'Senha' }).press('Enter');
  await page.getByText('Loja 01Desconfig.(85) 3034-').click();
  await page.goto('https://mariameiretreinamento.botvendas.com/contexts/contexts');
  await page.getByRole('link', { name: ' Configurações ' }).click();
  await page.getByRole('link', { name: ' Configurações ' }).click();
  await page.getByRole('link', { name: ' Lojas ' }).click();
  await page.getByRole('link', { name: ' Configurações' }).click();
  await page.goto('https://mariameiretreinamento.botvendas.com/shops/edit/general?2=');
  

  await page.getByRole('textbox', { name: '(11) 96123-' }).click();
  await page.getByRole('textbox', { name: '(11) 96123-' }).fill('(43) 5667-889');
  await page.getByRole('combobox', { name: 'País selecionado' }).click();
  await page.getByRole('option', { name: 'Algeria +' }).click();
  await page.getByRole('button', { name: 'Salvar' }).click();
  await page.getByRole('link', { description: 'editar', exact: true }).click();
 
  await page.getByRole('link', { description: 'editar', exact: true }).click();
  await page.getByRole('textbox', { name: '23 45 67' }).click();
  await page.getByRole('textbox', { name: '23 45 67' }).fill('43-56');
  await page.getByRole('button', { name: 'Salvar' }).click();
  await page.getByText('Essa ação não pôde ser').click();
  await page.getByText('O campo admin whatsapp deve').nth(1).click();


  await page.getByRole('textbox', { name: '23 45 67' }).click();
  await page.getByRole('textbox', { name: '23 45 67' }).fill('85-303-4995');
  await page.getByRole('combobox', { name: 'País selecionado' }).click();
  await page.getByRole('option', { name: 'Brasil +' }).click();
  await page.getByRole('textbox', { name: '(11) 96123-' }).fill('(85) 3034-9951');
  await page.getByRole('button', { name: 'Salvar' }).click();

  
});


