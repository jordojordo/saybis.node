import puppeteer from 'puppeteer';
import {type Request, type Response} from 'express';

import { sendErrorResponse } from '@src/utils/error';

export const createTransaction = async (req: Request, res: Response) => {
	const { RequestTarget } = req.body;
	let url = '';

	if ( !RequestTarget ) {
		return sendErrorResponse(req, res, 'No url provided', 400)
	} else {
		try {
			if ( RequestTarget.includes('http') ) {
				url = RequestTarget;
			} else {
				url = `https://${  RequestTarget }`;
			}

			const browser = await puppeteer.launch({
				args: [
					'--disable-features=SameSiteByDefaultCookies,CookiesWithoutSameSiteMustBeSecure',
					'--disable-web-security',
				],
			});
			const page = await browser.newPage();

			await page.goto(url);

			const document: any = await page.evaluate(
				() => document.documentElement.innerHTML,
			);

			return res.send(document);
		} catch (e) {
			console.error(e);
			sendErrorResponse(req, res, 'Internal server error.', 500);
		}
	}
};
