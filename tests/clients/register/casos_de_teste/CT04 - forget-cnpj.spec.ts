//CT04 - Botão de busca por CPF/CNPJ (Lupa):

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
  await page.getByRole('textbox', { name: 'CPF/CNPJ:' }).fill('18.717.132/0001-02');
  await page.getByRole('textbox', { name: 'CPF/CNPJ:' }).click();
  await page.getByRole('textbox', { name: 'CPF/CNPJ:' }).press('ControlOrMeta+a');
  await page.getByRole('textbox', { name: 'CPF/CNPJ:' }).fill('76.803.621/0001-75'); //esse é oq deu certo
  const btnPesquisarCnpj = page.locator('button[data-original-title="Pesquisar CNPJ"]');
  await btnPesquisarCnpj.hover();
  await btnPesquisarCnpj.click();
  // await page.getByRole('button', { description: 'Pesquisar CNPJ', exact: true }).click();
  await page.getByRole('button', { name: 'OK' }).click();
  await page.locator('.align-items-end > div:nth-child(3)').first().click();
  await page.getByRole('textbox', { name: 'CPF/CNPJ:' }).click();
  await page.getByRole('textbox', { name: 'CPF/CNPJ:' }).press('ControlOrMeta+a');
  await page.getByRole('textbox', { name: 'CPF/CNPJ:' }).fill('17.860.178/0001-05');
  await page.getByRole('button', { description: 'Pesquisar CNPJ', exact: true }).click();
  await page.getByRole('textbox', { name: 'E-mail:' }).click();
  await page.getByRole('textbox', { name: 'Nome fantasia:' }).click();
  await page.getByRole('button', { name: 'Salvar' }).click();
  await page.getByText('Cliente atualizado com').click();
});