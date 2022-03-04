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

export type Message = TextMessage | MarkdownMessage | ImageMessage | NewsMessage | FileMessage | CardMessage;

export type TextMessage = {
  msgtype: 'text';
  text: {
    content: string;
    mentioned_list?: string[];
    mentioned_mobile_list?: string[];
  };
};

export type MarkdownMessage = {
  msgtype: 'markdown';
  markdown: {
    content: string;
  };
};

export type ImageMessage = {
  msgtype: 'image';
  image: {
    base64: string;
    md5: string;
  };
};

export type NewsMessage = {
  msgtype: 'news';
  news: {
    articles: Article[];
  };
};

export type FileMessage = {
  msgtype: 'file';
  file: {
    media_id: string;
  };
};

export type CardMessage = {
  msgtype: 'template_card';
  template_card: Card;
};

export type Article = {
  title: string;
  description?: string;
  url: string;
  picurl?: string;
};

export type Card = {
  card_type: 'text_notice';
  source?: {
    icon_url?: string;
    desc?: string;
    desc_color?: CardSourceDescColor;
  };
  main_title: {
    title?: string;
    desc?: string;
  };
  emphasis_content?: {
    title?: string;
    desc?: string;
  };
  quote_area?: {
    type?: CardQuoteAreaType;
    url?: string;
    appid?: string;
    pagepath?: string;
    title?: string;
    quote_text?: string;
  };
  sub_title_text?: string;
  horizontal_content_list?: HorizontalContent[];
  jump_list?: Jump[];
  card_action: {
    type: CardActionType;
    url?: string;
    appid?: string;
    pagepath?: string;
  };
};

export enum CardActionType {
  url = 1,
  miniprogram,
}

export type Media = {
  type: 'image' | 'voice' | 'video' | 'file';
  media_id: string;
};

export type Jump = {
  type?: CardJumpType;
  title: string;
  url?: string;
  appid?: string;
  pagepath?: string;
};

export enum CardJumpType {
  none,
  url,
  miniprogram,
}

export type HorizontalContent = {
  type?: CardHorizontalContentType;
  keyname: string;
  value?: string;
  url?: string;
  media_id?: string;
  userid?: string;
};

export enum CardHorizontalContentType {
  text,
  url,
  attachment,
  mention,
}

export enum CardSourceDescColor {
  gray,
  black,
  red,
  green,
}

export enum CardQuoteAreaType {
  none,
  url,
  miniprogram,
}

export type ResponseBody<T = {}> = {
  errcode: number;
  errmsg: string;
} & T;
