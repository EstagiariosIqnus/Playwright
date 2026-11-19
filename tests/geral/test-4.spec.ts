import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  test.setTimeout(50000);
  // CT09 - Edição do nome do robô
  await page.goto('about:blank');
  await page.goto('https://mariameiretreinamento.botvendas.com/login');
  await page.getByRole('textbox', { name: 'Login' }).fill('admin@iqnus.com.br');
  await page.getByRole('textbox', { name: 'Senha' }).click();
  await page.getByRole('textbox', { name: 'Senha' }).fill('Bot@iq587!');
  await page.getByRole('button', { name: 'Entrar' }).click();
  await page.getByText('Loja 01Desconfig.(85) 3034-').click();
  await page.goto('https://mariameiretreinamento.botvendas.com/contexts/contexts');
  await page.getByRole('link', { name: ' Configurações ' }).click();
  await page.getByRole('link', { name: ' Configurações ' }).click();
  await page.getByRole('link', { name: ' Lojas ' }).click();
  await page.getByRole('link', { name: ' Configurações' }).click();
  await page.goto('https://mariameiretreinamento.botvendas.com/shops/edit/general?2=');
  // await page.locator('input[name="botname"]').click();
  await page.getByText('Dados do Robô').click();
  await page.locator('text=Nome robô (Virtual):').locator('..').locator('input').click();
  await page.locator('input[name="botname"]').fill('dknssdygyedvgfsvdyhsvdyhsvdyhuiiiiqoqownhswnajakjakiaiaqiiqqikiznnzbxbzxnznxznzjzjsjsjjsjjjswsedjujejdcjdhddhdjdjdjdjsjsjsjdsjsjsjsjsjsjjsjjsjsjskkmxmmmmmxmxkkxkxkkxkxkxkxkkkkxkx');
  await page.getByRole('button', { name: 'Salvar' }).click();
  // eu testei para ver se tem limite de textos, ele aceita texto infinito

  // CT10 - Formato do WhatsApp do robô
  await page.goto('https://mariameiretreinamento.botvendas.com/shops/edit/general?2=');
  await page.getByRole('textbox', { name: '(11) 96123-' }).click();
  await page.getByRole('textbox', { name: '(11) 96123-' }).fill('(43) 5667-889');
  await page.getByRole('combobox', { name: 'País selecionado' }).click();
  await page.getByRole('option', { name: 'Algeria +' }).click();
  await page.getByRole('button', { name: 'Salvar' }).click();

  await page.goto('https://mariameiretreinamento.botvendas.com/shops/edit/general?2=');
  await page.getByRole('textbox', { name: '23 45 67' }).click();
  await page.getByRole('textbox', { name: '23 45 67' }).fill('43-56');
  await page.getByRole('button', { name: 'Salvar' }).click();
  // await page.getByText('Essa ação não pôde ser').click();
  // await page.getByText('O campo admin whatsapp deve').nth(1).click();

  await page.getByRole('textbox', { name: '23 45 67' }).click();
  await page.getByRole('textbox', { name: '23 45 67' }).fill('85-303-4995');
  await page.getByRole('combobox', { name: 'País selecionado' }).click();
  await page.getByRole('option', { name: 'Brasil +' }).click();
  await page.getByRole('textbox', { name: '(11) 96123-' }).fill('(85) 3034-9950');
  await page.getByRole('button', { name: 'Salvar' }).click();


//   // await expect(page.getByText(/Essa ação não pôde ser/i)).first());
//   await page.getByText('Essa ação não pôde ser').click();
//   // await expect(page.getByText(/O campo cpf cnpj deve ter no/i).first()).toBeVisible();
//   // await expect(page.getByText(/O campo cpf cnpj deve ter no/i).first()).toBeVisible();
//   // await page.getByText('O campo cpf cnpj deve ter no').nth(1).click();
// // ele tem limite de numeros 

// CT11 - Toggle SmartTag
  await page.goto('https://mariameiretreinamento.botvendas.com/shops/edit/general?2=');
  await page.locator('select[name="shop_type"]').selectOption('drugstore');
  await page.getByRole('button', { name: 'Salvar' }).click();
  await page.goto('https://mariameiretreinamento.botvendas.com/shops/edit/general?2=');
  await page.locator('#smarttag_active_toggle').check();
  await page.getByRole('button', { name: 'Salvar' }).click();
  await page.goto('https://mariameiretreinamento.botvendas.com/shops/edit/general?2=');
  await page.locator('#smarttag_active_toggle').uncheck({ force: true });
  await page.getByRole('button', { name: 'Salvar' }).click();
  await page.goto('https://mariameiretreinamento.botvendas.com/shops/edit/general?2=');
  await page.getByRole('heading', { name: ' SmartTag' }).click();
  await page.locator('select[name="shop_type"]').selectOption('clothing store');
  await page.locator('.d-flex > .custom-control').click();
  await page.locator('.d-flex > .custom-control').click({
  });
  await page.locator('input[name="botname"]').fill('');
  await page.getByRole('button', { name: 'Salvar' }).click();
  await page.goto('https://mariameiretreinamento.botvendas.com/shops/edit/general?2=');
  // Não foi possível validar o processamento prático de anexos (áudio, texto e PDF) por ausência de canal de atendimento ativo no ambiente de testesawait page.getByRole('button', { name: 'Salvar' }).click();
  
});
