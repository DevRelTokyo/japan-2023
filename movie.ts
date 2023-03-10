import fs from 'fs';
import path from 'path';
import { createCanvas, registerFont, loadImage } from 'canvas';
import axios from 'axios';
import { promisify } from 'util';

const sessions = require('./_data/sessions.json');
const people = require('./_data/speakers.json');

const size = { width: 1920, height: 1080 };
const current = process.cwd();

type TypePerson = {
	id: string
	type: string
	name_ja: string
	title_ja: string
	url: string
	twitter: string
	github: string
	facebook: string
	linkedin: string
	profile_ja: string
	company_ja: string
	photo?: string
}

type TypeSession = {
	audience_level: string
	break: string
	category_en: string
	category_ja: string
	conference: string
	day: string
	description_en: string
	description_ja: string
	duration: string
	end_datetime: string
	end_time: string
	first_speaker: string
	first_speaker_name: string
	id: string
	material_url: string
	publish_confirmed: string
	second_speaker: string
	second_speaker_name: string
	show: string
	speakers: string
	start_datetime: string
	start_time: string
	title_en: string
	title_ja: string
	track: string
	video_url: string
	youtube: string
}

export const generateOgImage = async (session: TypeSession): Promise<Buffer> => {
	const speaker = people.find((p: TypePerson) => p.id === session.first_speaker);
  // font を登録
  const font = path.resolve(current, 'fonts/NotoSansJP-Bold.otf');
  registerFont(font, { family: 'NotoSansJP' });

  // canvas を作成
  const { width, height } = size;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // 元になる画像を読み込む
  const src = path.resolve(current, '../template.jpeg');
  const image = await loadImage(fs.readFileSync(src));
  // 元の画像を canvas にセットする
  ctx.drawImage(image, 0, 0, width, height);
	ctx.save();
	ctx.scale(1, 1);
	const imageSize = 588;
  const circle = imageSize/2;
  ctx.arc(width / 2, height / 2, circle, 0, Math.PI*2, false);
  ctx.clip();
	
	const personSource = (await axios.get(speaker.photo, { responseType: 'arraybuffer' })).data;
	const person = await loadImage(personSource);
	ctx.drawImage(person, 0, 0, 400, 400, width / 2 - imageSize / 2, height / 2 - imageSize / 2, imageSize, imageSize);
	
  ctx.restore();
	ctx.beginPath();
  ctx.fillStyle = "rgb(60,60,60)";
	const boxWidth = 1400;
  ctx.fillRect(width / 2 - boxWidth / 2, 710, boxWidth, 135);
  ctx.closePath();

	ctx.font = "50px 'NotoSansJP'";
  ctx.fillStyle = "rgb(255,255,255)";
	ctx.beginPath();
  const textWidth = ctx.measureText( speaker.name_ja ).width;
  ctx.fillText(speaker.name_ja, width / 2 - textWidth / 2, 760);
	const title = getTitle(speaker);
  let companyWidth = ctx.measureText( title ).width;
	if (companyWidth > 1200) {
		ctx.font = "35px 'NotoSansJP'";
		companyWidth = ctx.measureText( title ).width;
	}
  ctx.fillText(title, width / 2 - companyWidth / 2, 825);

	ctx.font = "50px 'NotoSansJP'";
  ctx.fillStyle = "rgb(0, 0, 0)";
	ctx.beginPath();
  let sessionWidth = ctx.measureText( session.title_ja ).width;
	if (sessionWidth > 1800) {
		ctx.font = "35px 'NotoSansJP'";
		sessionWidth = ctx.measureText( session.title_ja ).width;
	}
  ctx.fillText(session.title_ja, width / 2 - sessionWidth / 2, 950);

	ctx.font = "80px 'NotoSansJP'";
  ctx.fillStyle = "rgb(0, 0, 0)";
	ctx.beginPath();
	const time = `🕒 ${session.start_time}`;
  ctx.fillText(time, 100, 305);
	return canvas.toBuffer();
}

const getTitle = (speaker: TypePerson): string => {
	if (speaker.title_ja !== '' && speaker.company_ja !== '') {
		return `${speaker.title_ja}@${speaker.company_ja}`;
	}
	if (speaker.title_ja !== '') {
		return speaker.title_ja;
	}
	return speaker.company_ja;
}

const generate = async (sessions: any[]) => {
	for (const session of sessions) {
		try {
			const img = await generateOgImage(session);
			fs.writeFileSync(path.resolve(current, `../images/${session.conference}/`, `${session.id}.jpg`), img);
		} catch (e) {
			console.log(e);
		}
		// process.exit(0);
	}
};
(async () => {
	await generate(sessions.filter((session: any) => session.first_speaker != '' && session.conference === 'japan' && session.category_en !== 'workshop'));
})();
