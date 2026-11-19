//CT08 - Campos Opcionais/Fiscais (Cód. no ERP, Nome fantasia, CNAE, Inscrição estadual):

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
  await page.goto('https://roselanematostreinamento.botvendas.com/clients/4/edit?tab=client');

  await page.getByRole('textbox', { name: 'CPF/CNPJ:' }).click();
  await page.getByRole('textbox', { name: 'CPF/CNPJ:' }).press('ControlOrMeta+a');
  await page.getByRole('textbox', { name: 'CPF/CNPJ:' }).fill('10.652.875/0001-21');
  const btnPesquisarCnpj = page.locator('button[data-original-title="Pesquisar CNPJ"]');
  await btnPesquisarCnpj.hover();
  await btnPesquisarCnpj.click();
  await page.getByRole('textbox', { name: 'CNAE:' }).click();
  await page.getByRole('textbox', { name: 'CNAE:' }).fill('44.44-4/44'); //deixou salvar com numero aleatorio
  await page.getByRole('button', { name: 'Salvar' }).click();
  await expect(page.getByText('Sucesso!Cliente atualizado').first());
  await page.goto('https://roselanematostreinamento.botvendas.com/clients/3/edit?tab=client');
  await page.getByRole('textbox', { name: 'CNAE:' }).click();
  await page.getByRole('textbox', { name: 'CNAE:' }).press('ControlOrMeta+a');
  await page.getByRole('textbox', { name: 'CNAE:' }).fill('00.00-0/00'); //deixou salvar com tudo 0
  await page.getByRole('button', { name: 'Salvar' }).click();
  await expect(page.getByText('Sucesso!Cliente atualizado').first());
  await page.goto('https://roselanematostreinamento.botvendas.com/clients/3/edit?tab=client');
  await page.getByRole('textbox', { name: 'Inscrição estadual:' }).click();
  await page.getByRole('textbox', { name: 'Inscrição estadual:' }).fill('000.000.000.000.00'); //deixou salvar com tudo 0
  await page.getByRole('button', { name: 'Salvar' }).click();
  await expect(page.getByText('Sucesso!Cliente atualizado').first());
  await page.goto('https://roselanematostreinamento.botvendas.com/clients/3/edit?tab=client');
  await page.getByRole('textbox', { name: 'Inscrição estadual:' }).click();
  await page.getByRole('textbox', { name: 'Inscrição estadual:' }).press('ControlOrMeta+a');
  await page.getByRole('textbox', { name: 'Inscrição estadual:' }).fill('999.999.'); //deixou salvar com menos caracteres
  await page.getByRole('button', { name: 'Salvar' }).click();
  await expect(page.getByText('Sucesso!Cliente atualizado').first());
  await page.locator('[id="4"]').getByRole('cell', { name: '  ' }).click();
  await page.goto('https://roselanematostreinamento.botvendas.com/clients/3/edit?tab=client');
  await page.getByRole('textbox', { name: 'Inscrição estadual:' }).click();
  await page.getByRole('textbox', { name: 'Inscrição estadual:' }).fill('0'); //permitiu salvar com um só caractere
  await page.getByRole('button', { name: 'Salvar' }).click();
  await expect(page.getByText('Sucesso!Cliente atualizado').first());
  await page.goto('https://roselanematostreinamento.botvendas.com/clients/3/edit?tab=client');
  await page.getByRole('textbox', { name: 'CNAE:' }).click();
  await page.getByRole('textbox', { name: 'CNAE:' }).fill(''); //deixou salvar com numero aleatorio
  await page.getByRole('button', { name: 'Salvar' }).click();
  await expect(page.getByText('Sucesso!Cliente atualizado').first());
  await page.goto('https://roselanematostreinamento.botvendas.com/clients/3/edit?tab=client');

});