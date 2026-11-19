

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

  //Nome Razão Social
  const campoNome = page.getByRole('textbox' , {
    name: 'Nome/Razão Social:'
  });
  const nomeOriginal = await campoNome.inputValue();
  const nomeNovo = `Maria-${Date.now()}`;
  console.log('Nome Original: ' ,nomeOriginal);
  console.log('Nome Novo: ', nomeNovo);
  await campoNome.fill(nomeNovo);
  await page.getByRole('button', { name: 'Salvar' }).click();
//   await expect(page.getByText(/Sucesso!Cliente atualizado/i).first()).toBeVisible();
  await expect(page.getByText(nomeNovo, { exact: true })).toBeVisible();
  await page.reload();
  await expect(page.getByText(nomeNovo, { exact: true })).toBeVisible();
  await page.goto('https://roselanematostreinamento.botvendas.com/clients/4/edit?tab=client');
  await page.getByRole('textbox', { name: 'Nome/Razão social:' }).click();
  await page.getByRole('textbox', { name: 'Nome/Razão social:' }).fill('Cliente-');
  await page.getByRole('textbox', { name: 'Nome/Razão social:' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Nome/Razão social:' }).fill('Cliente-M');
  await page.getByRole('textbox', { name: 'Nome/Razão social:' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Nome/Razão social:' }).fill('Cliente-Maria');
  await page.getByRole('button', { name: 'Salvar' }).click();
//   await expect(page.getByText(/Sucesso!Cliente atualizado/i).first()).toBeVisible();


//Nome fantasia
  await page.goto('https://roselanematostreinamento.botvendas.com/clients/4/edit?tab=client');
//   const campoFantasia = page.getByRole('textbox' , {
//     name: 'Nome fantasia:'
//   });
  const campoFantasia = page.locator('#trade_name');
  const nomeFantOriginal = await campoFantasia.inputValue();
  const numberAleatorio = Math.floor(1000 + Math.random() * 9000);
  const nomeFnovo = `Empresa_${numberAleatorio}`;
  console.log('Nome Fantasia Original: ', nomeFantOriginal);
  console.log('Nome Fantasia novo: ', nomeFnovo);
  await campoFantasia.fill(nomeFnovo);
  await page.getByRole('button', { name: 'Salvar' }).click();
//   await page.getByText('Sucesso!Cliente atualizado').click();
  await page.goto('https://roselanematostreinamento.botvendas.com/clients/4/edit?tab=client');
  await expect(campoFantasia).toHaveValue(nomeFnovo); 
  await page.reload();
  await expect(campoFantasia).toHaveValue(nomeFnovo);
  await page.goto('https://roselanematostreinamento.botvendas.com/clients/4/edit?tab=client');
  await page.getByRole('textbox', { name: 'Nome fantasia:' }).click();
  await page.getByRole('textbox', { name: 'Nome fantasia:' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Nome fantasia:' }).fill('E');
  await page.getByRole('textbox', { name: 'Nome fantasia:' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Nome fantasia:' }).fill('Empresa ');
  await page.getByRole('textbox', { name: 'Nome fantasia:' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Nome fantasia:' }).fill('Empresa M');
  await page.getByRole('textbox', { name: 'Nome fantasia:' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Nome fantasia:' }).fill('Empresa Maria');
  await page.getByRole('button', { name: 'Salvar' }).click();
//   await expect(page.getByText(/Sucesso!Cliente atualizado/i).first()).toBeVisible();
  
  //Genero
  await page.goto('https://roselanematostreinamento.botvendas.com/clients/4/edit?tab=client');
  const campoGenero = page.getByRole('combobox' , {
    name: 'Sexo:'
  });
  const escolhaOriginal = await campoGenero.inputValue();
  // const escolhaOriginal = (await campoGenero.locator('option:checked').innerText()).trim();
  await campoGenero.selectOption('2');
  const escolhaNova = (await campoGenero.locator('option:checked').innerText()).trim();
  console.log('Escolha Antiga: ', escolhaOriginal.trim());
  console.log('Escolha Nova: ', escolhaNova.trim());
  await campoGenero.selectOption(escolhaNova);
  await page.getByRole('button', { name: 'Salvar' }).click();
  await page.goto('https://roselanematostreinamento.botvendas.com/clients/4/edit?tab=client');
  await expect(campoGenero).toHaveValue('2');
  await page.reload();
  await expect(campoGenero).toHaveValue('2'); 
  await page.goto('https://roselanematostreinamento.botvendas.com/clients/4/edit?tab=client');
  await page.getByLabel('Sexo:').selectOption('0');
  await page.getByRole('button', { name: 'Salvar' }).click();
//   await expect(page.getByText(/Sucesso!Cliente atualizado/i).first()).toBeVisible();

});