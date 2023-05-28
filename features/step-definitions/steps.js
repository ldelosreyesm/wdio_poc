"use strict";
import { Given, When, Then } from '@wdio/cucumber-framework';

import LoginPage from '../pageobjects/login.page.js';
import SecurePage from '../pageobjects/secure.page.js';

import fs from 'fs';
import { PNG } from 'pngjs'
import  pixelmatch from 'pixelmatch'
import  assert from 'assert'
const pages = {
    login: LoginPage
}

Given('I am on the {string} page', async (page) => {
    await pages[page].open()
});

When('I login with {string} and {string}', async (username, password) => {
    await LoginPage.login(username, password)
});

Then('I should see a flash message saying {string}', async (message) => {
    await expect(SecurePage.flashAlert).toBeExisting();
    await expect(SecurePage.flashAlert).toHaveTextContaining(message);
});

Given('user open index page', async () => {
    console.log(`file://${process.cwd()}/bootstrap/index.html`)
	await browser.url(`file://${process.cwd()}/bootstrap/index.html`)
});

When('user waits {int} senconds', async (mili) => {
    await browser.pause(mili * 1000)
});

Then('take a screenshot', async () => {
    console.log('Captura de pantalla');
    await takeAndSaveSS()
});

Then('compare image diff', async () => {
    await browser.pause(1000)
    // const PNG = require('pngjs').PNG;
    // const pixelmatch = require('pixelmatch');

    const img1 = PNG.sync.read(fs.readFileSync('screenshot_1685287866714.png')); // \wdio_poc\screenshot_1685287866714.png
    const img2 = PNG.sync.read(fs.readFileSync('screenshot_1685287911108.png')); // \wdio_poc\screenshot_1685287911108.png
    const {width, height} = img1;
    const diff = new PNG({width, height});

    let isDiff = pixelmatch(img1.data, img2.data, diff.data, width, height, {threshold: 0.1, includeAA: false});

    console.log('isDiff => ', isDiff)

    fs.writeFileSync('diff.png', PNG.sync.write(diff));
});

Then('compare image equal', async () => {
    await browser.pause(1000)

    const img1 = PNG.sync.read(fs.readFileSync('screenshot_1685287911108.png'));
    const img2 = PNG.sync.read(fs.readFileSync('screenshot_1685287911108.png'));
    const {width, height} = img1;
    const diff = new PNG({width, height});

    let isDiff = pixelmatch(img1.data, img2.data, diff.data, width, height, {threshold: 0.1, includeAA: false});

    console.log('isDiff => ', isDiff)

    fs.writeFileSync('diff.png', PNG.sync.write(diff));
});

const takeAndSaveSS = async function () {
    console.log('Captura de pantalla');
    await browser.pause(1000)
    // Tomar la captura de pantalla
    const screenshot = await browser.takeScreenshot();
    console.log('screenshot =>', screenshot)
    // Generar un nombre único para el archivo
    const timestamp = new Date().getTime();
    const screenshotPath = `screenshot_${timestamp}.png`;
    // Guardar la captura de pantalla en el archivo
    fs.writeFileSync(screenshotPath, screenshot, 'base64');
    // Imprimir la ruta del archivo guardado
    console.log(`Captura de pantalla guardada en: ${screenshotPath}`);
}