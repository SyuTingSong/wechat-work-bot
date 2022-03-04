/**
 * wechat-work-bot: a wechat-work group robot library.
 * Copyright (C) <2022>  <TingSong Syu>
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public
 * License along with this library; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301
 * USA
 */

import type { RequestFunction } from 'bent';
import bent from 'bent';
import { stringify } from 'querystring';
import FormData from 'form-data';
import fs from 'fs';
import type { Article, Card, Media, Message, ResponseBody } from './WechatWorkBotMessages';
import crypto from 'crypto';

export type WechatWorkBotOption = {
  key: string;
};

export default class WechatWorkBot {
  public readonly key: string;
  private readonly poster: RequestFunction<any>;

  private debugMode = false;

  constructor(options: WechatWorkBotOption) {
    this.key = options.key;
    this.poster = bent('POST', 'https://qyapi.weixin.qq.com/cgi-bin/webhook', 'json');
  }

  public debug(enable: boolean = true) {
    this.debugMode = enable;
    return this;
  }

  public send<T = {}>(msg: Message): Promise<ResponseBody<T>> {
    return this.poster(`/send?${stringify({ key: this.key, debug: this.debugMode ? 1 : 0 })}`, msg);
  }

  public async upload(
    file: string | NodeJS.ReadableStream | Buffer,
    options?: {
      filename?: string;
      contentType?: string;
    }
  ) {
    if (typeof file === 'string') {
      if (!fs.existsSync(file)) {
        throw new Error(`file not found: ${file}`);
      }
      file = fs.createReadStream(file);
    }
    const formData = new FormData();
    formData.append('media', file, options);
    return (await this.poster(
      `/upload_media?${stringify({
        key: this.key,
        type: 'file',
        debug: this.debugMode ? 1 : 0,
      })}`,
      formData,
      formData.getHeaders()
    )) as Promise<ResponseBody<Media>>;
  }

  public text(content: string, mentioned_list?: string[], mentioned_mobile_list?: string[]) {
    return this.send({
      msgtype: 'text',
      text: {
        content,
        mentioned_list,
        mentioned_mobile_list,
      },
    });
  }

  public markdown(content: string) {
    return this.send({
      msgtype: 'markdown',
      markdown: {
        content,
      },
    });
  }

  public image(file: string | Buffer | NodeJS.ReadableStream) {
    let image: Buffer;
    if (typeof file === 'string') {
      image = fs.readFileSync(file);
    } else if (Buffer.isBuffer(file)) {
      image = file;
    } else if (file.readable && typeof file.read === 'function') {
      const data = file.read();
      if (typeof data === 'string') {
        image = Buffer.from(data);
      } else {
        image = data;
      }
    }

    return this.send({
      msgtype: 'image',
      image: {
        base64: image.toString('base64'),
        md5: crypto.createHash('md5').update(image).digest('hex'),
      },
    });
  }

  public news(articles: Article | Article[]) {
    if (!Array.isArray(articles)) {
      articles = [articles];
    }

    return this.send({
      msgtype: 'news',
      news: {
        articles,
      },
    });
  }

  public async file(
    file: string | Buffer | NodeJS.ReadableStream,
    options?: { filename?: string; contentType?: string }
  ) {
    const up = await this.upload(file, options);
    return this.send({
      msgtype: 'file',
      file: {
        media_id: up.media_id,
      },
    });
  }

  public card(card: Card) {
    return this.send({
      msgtype: 'template_card',
      template_card: card,
    });
  }
}
