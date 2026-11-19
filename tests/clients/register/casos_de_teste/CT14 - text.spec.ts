//CT14 - Tooltips informativos:
// não terminado
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

  //Loja favorita
  const iconeInfoLojaFav = page.locator('span.info-icon[data-original-title*="loja favorita"]');
  const textoHtml1 = await iconeInfoLojaFav.getAttribute('data-original-title');
  await iconeInfoLojaFav.hover();
  const tooltipVisivel = page.locator('.tooltip-inner:visible');
  await expect(tooltipVisivel).toBeVisible();
  const textoTela = await tooltipVisivel.innerText();
  console.log('Texto Loja Fav: ', textoTela);
  expect(textoTela.trim()).toBe(textoHtml1?.trim());
  await page.mouse.move(0, 0);
  await expect(page.locator('.tooltip-inner:visible')).toHaveCount(0);

  //loja de compras favorita

  const iconeInfoLojaComprasFav = page.locator('span.info-icon[data-original-title*="Loja de compras favorita"]');
  const textoHtml2 = await iconeInfoLojaComprasFav.getAttribute('data-original-title');
  await iconeInfoLojaComprasFav.hover();
  const tooltipVisivel2 = page.locator('.tooltip-inner:visible');
  await expect(tooltipVisivel2).toBeVisible();
  const textoTela2 = await tooltipVisivel2.innerText();
  console.log('Texto Loja de Compras Fav: ', textoTela2);
  expect(textoTela2.trim()).toBe(textoHtml2?.trim());
  await page.mouse.move(0, 0);
  await expect(page.locator('.tooltip-inner:visible')).toHaveCount(0);
  
  //loja obrigatoria de compras

  const iconeInfoLojaObg = page.locator('span.info-icon[data-original-title*="Loja de faturamento"]');
  const textoHtml3 = await iconeInfoLojaObg.getAttribute('data-original-title');
  await iconeInfoLojaObg.hover();
  const tooltipVisivel3 = page.locator('.tooltip-inner:visible');
  await expect(tooltipVisivel3).toBeVisible();
  const textoTela3 = await tooltipVisivel3.innerText();
  console.log('Texto Loja Obg de compras: ', textoTela3);
  expect(textoTela3.trim()).toBe(textoHtml3?.trim());
  await page.mouse.move(0, 0);
  await expect(page.locator('.tooltip-inner:visible')).toHaveCount(0);
  
  // nivel de pagamento
  const iconeNivelPagamento = page.locator('span.info-icon[data-original-title*="acesso aos pagamentos"]');
  const textoHtml5 = await iconeNivelPagamento.getAttribute('data-original-title');
  await iconeNivelPagamento.hover();
  const tooltipVisivel5 = page.locator('.tooltip-inner:visible');
  await expect(tooltipVisivel5).toBeVisible();
  const textoTela5 = await tooltipVisivel5.innerText();
  console.log('Texto Nivel de Pagamento: ', textoTela5);
  expect(textoTela5.trim()).toBe(textoHtml5?.trim());
  await page.mouse.move(0, 0);
  await expect(page.locator('.tooltip-inner:visible')).toHaveCount(0);


  // prazo de pagamento dias
  const iconePrazoPagamento = page.locator('span.info-icon[data-original-title*="planos de pagamento"]');
  const textoHtml4 = await iconePrazoPagamento.getAttribute('data-original-title');
  await iconePrazoPagamento.hover();
  const tooltipVisivel4 = page.locator('.tooltip-inner:visible');
  await expect(tooltipVisivel4).toBeVisible();
  const textoTela4 = await tooltipVisivel4.innerText();
  console.log('Texto Prazo de Pagamento: ', textoTela4);
  expect(textoTela4.trim()).toBe(textoHtml4?.trim());
  await page.mouse.move(0, 0);
  await expect(page.locator('.tooltip-inner:visible')).toHaveCount(0);

});