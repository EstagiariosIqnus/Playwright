import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://mariameiretreinamento.botvendas.com/login'); 
  await page.getByRole('textbox', { name: 'Login' }).fill('admin@iqnus.com.br');
  await page.getByRole('textbox', { name: 'Senha' }).click();
  await page.getByRole('textbox', { name: 'Senha' }).fill('Bot@iq587!');
  await page.getByRole('textbox', { name: 'Senha' }).press('Enter');
  await page.getByRole('link', { name: ' Lojas ' }).click();
  await page.getByRole('link', { name: ' Configurações' }).click();
  await page.getByText('Loja 01Desconfig.(85) 3034-').click();
  await page.goto('https://mariameiretreinamento.botvendas.com/shops/edit/general?2=');
  await page.getByRole('tab', { name: 'Mensagens automáticas' }).click();
  
    // CT01 – Locked mandatory fields
    // Ele realmente bloqueou
  
//CT02 – Dynamic preview update (Wholesale and Lab discount)
  await page.getByText('A partir de 3 un.: R$ 4,99').click();
  await page.getByText('Preço do clube:R$ 3,99 cada').click();
  await page.getByText('Desc. laboratório:R$ 7,').click();
  await page.getByRole('checkbox', { name: 'Preço de atacado' }).uncheck();

  await page.getByText('Preço do clube:R$ 3,99 cada').click();
  await page.getByText('Desc. laboratório:R$ 7,').click();
  await page.getByRole('checkbox', { name: 'Preço do desconto de laborató' }).uncheck();
  await page.getByText('R$ 6,99 ➡️ R$').click();
  await page.getByRole('checkbox', { name: 'Preço de atacado' }).check();
  await page.getByRole('checkbox', { name: 'Preço de clube de vantagens' }).check();
  await page.getByRole('checkbox', { name: 'Preço do desconto de laborató' }).check();
  await page.locator('body').press('F5');
  await page.getByText('A partir de 3 un.: R$ 4,99').click();
  await page.getByText('Preço do clube:R$ 3,99 cada').click();
  await page.getByText('Desc. laboratório:R$ 7,').click();

  await page.getByRole('button', { name: 'Salvar' }).click();
  await page.locator('body').press('F5');

//   CT03 – Loyalty club price and custom label

  await page.getByText('Preço do clube:R$ 3,99 cada').click();
  await page.getByRole('checkbox', { name: 'Preço de clube de vantagens' }).uncheck();
  await page.getByText('R$ 6,99 ➡️ R$').click();
  await page.getByText('A partir de 3 un.: R$ 4,99').click();
  await page.getByText('Desc. laboratório:R$ 7,').click();
  await page.locator('.d-flex.flex-row.align-items-center.mb-2').click();
  await page.getByRole('checkbox', { name: 'Preço de clube de vantagens' }).check();
  await page.getByRole('textbox', { name: 'Nome do clube de vantagens' }).click();
  await page.getByRole('textbox', { name: 'Nome do clube de vantagens' }).fill('Club Pharma');
  await page.getByRole('textbox', { name: 'Nome do clube de vantagens' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'Nome do clube de vantagens' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'Nome do clube de vantagens' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'Nome do clube de vantagens' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'Nome do clube de vantagens' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'Nome do clube de vantagens' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'Nome do clube de vantagens' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'Nome do clube de vantagens' }).fill('Clube Pharma');
  await page.getByText('Clube Pharma:R$ 3,99 cada').click();
  await page.getByText('Clube Pharma:').click();
  await page.getByRole('button', { name: 'Salvar' }).click();
  await page.locator('body').press('F5');
  await expect(page.getByRole('textbox', { name:'Nome do clube de vantagens'})).toHaveValue('Clube Pharma');

  await page.getByRole('textbox', { name: 'Nome do clube de vantagens' }).click();
  await page.getByRole('textbox', { name: 'Nome do clube de vantagens' }).fill('');
  await page.getByRole('button', { name: 'Salvar' }).click();

  // CT04 – Information tooltip
  // Ele apareceu a mensagem quando passei o mouse pelo cursor
  await page.getByRole('button', { name: 'Salvar' }).click();
  await page.locator('.fa-stack').first().click();
  await page.locator('.fa-stack').first().click();

});