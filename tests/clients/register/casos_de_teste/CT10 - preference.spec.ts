//CT10 - Seleção de Loja favorita e Loja de compras favorita:
//CT11 - não dá pq precisaria utilizar da visão do atendente
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
  await page.goto('https://roselanematostreinamento.botvendas.com/clients/3/edit?tab=client');

  const campoLojaFav = page.getByRole('combobox',{
  name: 'Loja favorita:'
  });
  //Selecionando Loja 1
  await campoLojaFav.selectOption({ label: 'Loja 1'}); //loja favorita
  await page.getByRole('button', { name: 'Salvar' }).click();
  await expect(page.getByText(/Sucesso!Cliente atualizado/i).first());
  await page.reload();
  await page.goto('https://roselanematostreinamento.botvendas.com/clients/3/edit?tab=client');
  await expect(campoLojaFav.locator('option:checked')).toHaveText('Loja 1');



//   await page.getByLabel('Loja favorita:').selectOption('1');
  const campoLojaCFav = page.getByRole('combobox', {
    name: 'Loja de compras favorita:'
  });
  await campoLojaCFav.selectOption({ label: 'Loja 1'}); //loja favorita de compras
//   await page.getByLabel('Loja de compras favorita:').selectOption('1');
await page.getByRole('button', { name: 'Salvar' }).click();
  await expect(page.getByText(/Sucesso!Cliente atualizado/i).first());
  await page.reload();
  await page.goto('https://roselanematostreinamento.botvendas.com/clients/3/edit?tab=client');
  await expect(campoLojaCFav.locator('option:checked')).toHaveText('Loja 1');


  const campoLojaObg = page.getByRole('combobox', {
    name: 'Loja obrigatória de compras:'
  });
  await campoLojaObg.selectOption({ label: 'Loja 1'}); //loja obrigatoria de compras
//   await page.getByLabel('Loja obrigatória de compras:').selectOption('1');
  await page.getByRole('button', { name: 'Salvar' }).click();
  await expect(page.getByText(/Sucesso!Cliente atualizado/i).first());
  await page.reload();
  await page.goto('https://roselanematostreinamento.botvendas.com/clients/3/edit?tab=client');
  await expect(campoLojaObg.locator('option:checked')).toHaveText('Loja 1');

 //Selecionando Loja 2
  const campoLojaFav2 = page.getByRole('combobox',{
  name: 'Loja favorita:'
  });
  await campoLojaFav2.selectOption({ label: 'Loja 2'}); //loja favorita 2
  await page.getByRole('button', { name: 'Salvar' }).click();
  await expect(page.getByText(/Sucesso!Cliente atualizado/i).first());
  await page.reload();
  await page.goto('https://roselanematostreinamento.botvendas.com/clients/3/edit?tab=client');
  await expect(campoLojaFav2.locator('option:checked')).toHaveText('Loja 2');



//   await page.getByLabel('Loja favorita:').selectOption('1');
  const campoLojaCFav2 = page.getByRole('combobox', {
    name: 'Loja de compras favorita:'
  });
  await campoLojaCFav2.selectOption({ label: 'Loja 2'}); //loja favorita de compras 2
//   await page.getByLabel('Loja de compras favorita:').selectOption('1');
  await page.getByRole('button', { name: 'Salvar' }).click();
  await expect(page.getByText(/Sucesso!Cliente atualizado/i).first());
  await page.reload();
  await page.goto('https://roselanematostreinamento.botvendas.com/clients/3/edit?tab=client');
  await expect(campoLojaCFav2.locator('option:checked')).toHaveText('Loja 2');


  const campoLojaObg2 = page.getByRole('combobox', {
    name: 'Loja obrigatória de compras:'
  });
  await campoLojaObg2.selectOption({ label: 'Loja 2'}); //loja obrigatoria de compras 2
//   await page.getByLabel('Loja obrigatória de compras:').selectOption('1');
  await page.getByRole('button', { name: 'Salvar' }).click();
  await expect(page.getByText(/Sucesso!Cliente atualizado/i).first());
  await page.reload();
  await page.goto('https://roselanematostreinamento.botvendas.com/clients/3/edit?tab=client');
  await expect(campoLojaObg2.locator('option:checked')).toHaveText('Loja 2');

  //desativando tudo
  await campoLojaObg.selectOption({ label: 'Selecione uma loja'});
  await page.getByRole('button', { name: 'Salvar' }).click();
  await page.goto('https://roselanematostreinamento.botvendas.com/clients/3/edit?tab=client');
  //
  await campoLojaFav.selectOption({ label: 'Selecione uma loja'});
  await page.getByRole('button', { name: 'Salvar' }).click();
  await page.goto('https://roselanematostreinamento.botvendas.com/clients/3/edit?tab=client');
  //
  await campoLojaCFav.selectOption({ label: 'Selecione uma loja'});
  await page.getByRole('button', { name: 'Salvar' }).click();
  await page.goto('https://roselanematostreinamento.botvendas.com/clients/3/edit?tab=client');

});