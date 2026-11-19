// CT07 - Seleção do campo Sexo

import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://roselanematostreinamento.botvendas.com/login');
  await page.getByRole('textbox', { name: 'Login' }).fill('admin@iqnus.com.br');
  await page.getByRole('textbox', { name: 'Senha' }).click();
  await page.getByRole('textbox', { name: 'Senha' }).fill('Bot@iq587!');
  await page.getByRole('button', { name: 'Entrar' }).click();
  await page.getByText('Loja 1Desconfig.(85) 3034-').click();
  await page.goto('https://roselanematostreinamento.botvendas.com/dashboard');
  await page.getByRole('link', { name: ' Clientes ' }).click();
  await page.getByRole('link', { name: ' Cadastros' }).click();
  await page.goto('https://roselanematostreinamento.botvendas.com/clients/3/edit?tab=client');
//   const genero = page.getByRole('textbox' , {
//     name: 'Sexo:'
//   });
  await page.getByLabel('Sexo:').selectOption('1');
  await page.getByRole('button', { name: 'Salvar' }).click();
    await page.goto('https://roselanematostreinamento.botvendas.com/clients/3/edit?tab=client');
  await page.getByLabel('Sexo:').selectOption('2');
  await page.getByRole('button', { name: 'Salvar' }).click();
    await page.goto('https://roselanematostreinamento.botvendas.com/clients/3/edit?tab=client');
  await page.getByText('Sexo: Desconhecido Masculino').click();
  await page.getByLabel('Sexo:').selectOption('9');
  await page.getByRole('button', { name: 'Salvar' }).click();
  await expect(page.getByText(/Cliente atualizado com sucesso|Sucesso!/i).first());
    await page.goto('https://roselanematostreinamento.botvendas.com/clients/3/edit?tab=client');
  await page.getByLabel('Sexo:').selectOption('0');
  await page.getByRole('button', { name: 'Salvar' }).click();
  await expect(page.getByText(/Cliente atualizado com sucesso|Sucesso!/i).first());

});
