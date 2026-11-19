//CT03 -Validação e máscara do campo CPF/CNPJ:

import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  test.setTimeout(60000);
  await page.goto('https://roselanematostreinamento.botvendas.com/login');
  await page.getByRole('textbox', { name: 'Login' }).fill('admin@iqnus.com.br');
  await page.getByRole('textbox', { name: 'Senha' }).click();
  await page.getByRole('textbox', { name: 'Senha' }).fill('Bot@iq587!');
  await page.getByRole('button', { name: 'Entrar' }).click();
  await page.getByText('Loja 1Desconfig.(85) 3034-').click();
  await page.goto('https://roselanematostreinamento.botvendas.com/dashboard');
  await page.getByRole('link', { name: ' Clientes ' }).click();
  await page.getByRole('link', { name: ' Cadastros' }).click();
  await page.goto('https://roselanematostreinamento.botvendas.com/clients/4/edit?tab=client');
  await page.getByRole('textbox', { name: 'CPF/CNPJ:' }).click();
  await page.getByRole('textbox', { name: 'CPF/CNPJ:' }).fill('000.000.000-00');
  await page.getByRole('button', { name: 'Salvar' }).click();
  await expect(page.getByText(/Cliente atualizado com sucesso|Sucesso!/i).first());
  await page.goto('https://roselanematostreinamento.botvendas.com/clients/4/edit?tab=client');
  await page.getByRole('textbox', { name: 'CPF/CNPJ:' }).click();
  await page.getByRole('textbox', { name: 'CPF/CNPJ:' }).fill('00.000.000/0000-00'); //salvou mesmo com tudo 0
  await page.getByRole('button', { name: 'Salvar' }).click();
  await expect(page.getByText(/Cliente atualizado com sucesso|Sucesso!/i).first());
  await page.goto('https://roselanematostreinamento.botvendas.com/clients/4/edit?tab=client');
  await page.getByRole('textbox', { name: 'CPF/CNPJ:' }).click();
  await page.getByRole('textbox', { name: 'CPF/CNPJ:' }).press('ControlOrMeta+a');
  await page.getByRole('textbox', { name: 'CPF/CNPJ:' }).fill('44.44U.JJJ/JJJJ-10');
  await page.getByRole('button', { name: 'Salvar' }).click();
  await expect(page.getByText(/Cliente atualizado com sucesso|Sucesso!/i).first());
  await page.goto('https://roselanematostreinamento.botvendas.com/clients/4/edit?tab=client');
  await page.getByRole('textbox', { name: 'CPF/CNPJ:' }).click();
  await page.getByRole('textbox', { name: 'CPF/CNPJ:' }).click();
  await page.getByRole('textbox', { name: 'CPF/CNPJ:' }).fill('99.999.999/9999-99');
  await page.getByRole('button', { name: 'Salvar' }).click();
  await expect(page.getByText(/Essa ação não pôde ser/i).first());
  await expect(page.getByText(/CPF inválido ou já cadastrado/i).first());
  // await page.locator('#client').getByText('CPF inválido ou já cadastrado').click();
});
