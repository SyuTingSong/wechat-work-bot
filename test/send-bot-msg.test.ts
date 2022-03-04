import createBot from '../src';
// @ts-ignore
import key from './robot-key';

const bot = createBot(key).debug();
const ok = { errcode: 0 };

describe('using easy functions', function () {
  afterEach(
    () =>
      new Promise((resolve) => {
        setTimeout(resolve, 1000);
      })
  );

  test('text', () => {
    expect(bot.text('不错')).resolves.toMatchObject(ok);
  });

  test('markdown', function () {
    expect(bot.markdown('有<font color="warning">警告</font>的文字')).resolves.toMatchObject(ok);
  });

  test('image', function () {
    expect(bot.image(__dirname + '/star.png')).resolves.toMatchObject(ok);
  });

  test('news', function () {
    expect(
      bot.news({
        title: '如何迈向碳中和的未来',
        description: '腾讯今日宣布，计划不晚于2030年实现自身运营及供应链的全面碳中和。',
        url: 'https://www.tencent.com/zh-cn/articles/2201288.html',
        picurl: 'https://static.www.tencent.com/uploads/2022/02/24/0faf421ba355bdd964ba6c57d72db422.png!article.cover',
      })
    );
  });

  test('file', function () {
    expect(bot.file(__dirname + '/abc.txt')).resolves.toMatchObject(ok);
  });

  test('card', async function () {
    try {
      const r = await bot.card({
        card_type: 'text_notice',
        source: {
          icon_url: 'https://wework.qpic.cn/wwpic/252813_jOfDHtcISzuodLa_1629280209/0',
          desc: '企业微信',
          desc_color: 0,
        },
        main_title: {
          title: '欢迎使用企业微信',
          desc: '您的好友正在邀请您加入企业微信',
        },
        emphasis_content: {
          title: '100',
          desc: '数据含义',
        },
        quote_area: {
          type: 1,
          url: 'https://work.weixin.qq.com/?from=openApi',
          appid: 'APPID',
          pagepath: 'PAGEPATH',
          title: '引用文本标题',
          quote_text: 'Jack：企业微信真的很好用~\nBalian：超级好的一款软件！',
        },
        sub_title_text: '下载企业微信还能抢红包！',
        card_action: {
          type: 1,
          url: 'https://work.weixin.qq.com/?from=openApi',
          appid: 'APPID',
          pagepath: 'PAGEPATH',
        },
      });
      expect(r).toMatchObject(ok);
    } catch (e) {}
  });
});
