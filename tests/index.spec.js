/* eslint no-console:0 */

const DateTimeFormat = require('../');
const GregorianCalendar = require('gregorian-calendar');
const zhCn = require('gregorian-calendar/lib/locale/zh_CN');
const Style = DateTimeFormat.Style;
const expect = require('expect.js');
const logFormat = DateTimeFormat.getDateTimeInstance(Style.FULL, Style.FULL, require('../src/locale/zh_CN'));

describe('DateTimeFormat', () => {
  describe('format', () => {
    it('works simply', () => {
      const gregorianCalendar = new GregorianCalendar(zhCn);
      gregorianCalendar.set(2013,
        GregorianCalendar.JULY, 9);
      let df = new DateTimeFormat('yyyy-MM-dd');
      expect(df.format(gregorianCalendar)).to.be('2013-07-09');
      df = new DateTimeFormat('yy-MM-dd');
      expect(df.format(gregorianCalendar)).to.be('13-07-09');
    });
    it('getDateTimeInstance works', () => {
      const gregorianCalendar = new GregorianCalendar(zhCn);
      gregorianCalendar.set(2013,
        GregorianCalendar.JULY, 11, 14, 31, 19);
      const df = DateTimeFormat.getDateTimeInstance(Style.FULL, Style.FULL, require('../src/locale/zh_CN'));
      expect(df.format(gregorianCalendar)).to.be('2013年7月11日 星期四 下午02时31分19秒 GMT+0800');
    });
    it('getDateTimeInstance works for midnight', () => {
      const gregorianCalendar = new GregorianCalendar(zhCn);
      gregorianCalendar.set(2013,
        GregorianCalendar.JULY, 11, 0, 31, 19);
      const df = DateTimeFormat.getDateTimeInstance(Style.FULL, Style.FULL, require('../src/locale/zh_CN'));
      expect(df.format(gregorianCalendar)).to.be('2013年7月11日 星期四 上午12时31分19秒 GMT+0800');
    });
    it('getDateTimeInstance works for noon', () => {
      const gregorianCalendar = new GregorianCalendar(zhCn);
      gregorianCalendar.set(2013,
        GregorianCalendar.JULY, 11, 12, 31, 19);
      const df = DateTimeFormat.getDateTimeInstance(Style.FULL, Style.FULL, require('../src/locale/zh_CN'));
      expect(df.format(gregorianCalendar)).to.be('2013年7月11日 星期四 下午12时31分19秒 GMT+0800');
    });
  });

  describe('parse', () => {
    it('zh-cn simply works', () => {
      const gregorianCalendar = new GregorianCalendar(zhCn);
      gregorianCalendar.set(2013,
        GregorianCalendar.JULY, 11, 12, 31, 19);
      const df = DateTimeFormat.getDateTimeInstance(Style.FULL, Style.FULL, require('../src/locale/zh_CN'));
      const str = '2013年7月11日 星期四 下午12时31分19秒 GMT+0800';
      const cal = df.parse(str, {locale: zhCn});
      expect(cal.equals(gregorianCalendar)).to.be.ok();
      expect(df.format(cal)).to.be(str);
    });

    it('en-us works', () => {
      const gregorianCalendar = new GregorianCalendar();
      gregorianCalendar.set(2013, GregorianCalendar.NOVEMBER, 1);
      const df = new DateTimeFormat('yyyy-MM-dd');
      const str = '2013-11-01';
      const cal = df.parse(str);
      expect(cal.equals(gregorianCalendar)).to.be.ok();
      expect(df.format(cal)).to.be(str);
    });

    describe('obeyCount', () => {
      it('works', () => {
        const gregorianCalendar = new GregorianCalendar();
        gregorianCalendar.set(2013, GregorianCalendar.JANUARY, 1);
        const df = new DateTimeFormat('yyyyMMddMMM');
        const str = '20130101Jan';
        const cal = df.parse(str);
        expect(cal.equals(gregorianCalendar)).to.be.ok();
        expect(df.format(cal)).to.be(str);
      });

      it('throw error', () => {
        const gregorianCalendar = new GregorianCalendar();
        gregorianCalendar.set(2013, GregorianCalendar.JANUARY, 1);
        const df = new DateTimeFormat('yyyyMMddMMM');
        const str = '2013011Jan';
        expect(() => {
          df.parse(str);
        }).throwError(/GregorianCalendarFormat parse error/);
      });

      it('allow ignore year', () => {
        const timeFormatter = new DateTimeFormat('HH:mm:ss');
        const value = timeFormatter.parse('17:47:58');
        const string = timeFormatter.format(value);
        expect(string).to.be('17:47:58');
      });
    });
  });

  describe('week', () => {
    it('YY works', () => {
      const weekFormatter = new DateTimeFormat('YYYY-w');
      const d = weekFormatter.parse('2016-1', {
        locale: zhCn,
      });
      console.log(logFormat.format(d));
      expect(weekFormatter.format(d)).to.be('2016-1');
    });

    it('yy works', () => {
      const weekFormatter = new DateTimeFormat('YYYY-w');
      const d = weekFormatter.parse('2016-3', {
        locale: zhCn,
      });
      console.log(logFormat.format(d));
      expect(weekFormatter.format(d)).to.be('2016-3');
    });
  });
});
