/**
 * DateTimeFormat tc
 * @author yiminghe@gmail.com
 */

var DateTimeFormat = require('../');
var GregorianCalendar = require('gregorian-calendar');
var zhCn = require('gregorian-calendar/lib/locale/zh_CN');
var Style = DateTimeFormat.Style;
var expect = require('expect.js');

describe('DateTimeFormat', function () {
  describe('format', function () {
    it('works simply', function () {
      var gregorianCalendar = new GregorianCalendar(zhCn);
      gregorianCalendar.set(2013,
        GregorianCalendar.JULY, 9);
      var df = new DateTimeFormat('yyyy-MM-dd');
      expect(df.format(gregorianCalendar)).to.be('2013-07-09');
      df = new DateTimeFormat('yy-MM-dd');
      expect(df.format(gregorianCalendar)).to.be('13-07-09');
    });
    it('getDateTimeInstance works', function () {
      var gregorianCalendar = new GregorianCalendar(zhCn);
      gregorianCalendar.set(2013,
        GregorianCalendar.JULY, 11, 14, 31, 19);
      var df = DateTimeFormat.getDateTimeInstance(Style.FULL, Style.FULL, require('../src/locale/zh_CN'));
      expect(df.format(gregorianCalendar)).to.be('2013年7月11日 星期四 下午02时31分19秒 GMT+0800');
    });
    it('getDateTimeInstance works for midnight', function () {
      var gregorianCalendar = new GregorianCalendar(zhCn);
      gregorianCalendar.set(2013,
        GregorianCalendar.JULY, 11, 0, 31, 19);
      var df = DateTimeFormat.getDateTimeInstance(Style.FULL, Style.FULL, require('../src/locale/zh_CN'));
      expect(df.format(gregorianCalendar)).to.be('2013年7月11日 星期四 上午12时31分19秒 GMT+0800');
    });
    it('getDateTimeInstance works for noon', function () {
      var gregorianCalendar = new GregorianCalendar(zhCn);
      gregorianCalendar.set(2013,
        GregorianCalendar.JULY, 11, 12, 31, 19);
      var df = DateTimeFormat.getDateTimeInstance(Style.FULL, Style.FULL, require('../src/locale/zh_CN'));
      expect(df.format(gregorianCalendar)).to.be('2013年7月11日 星期四 下午12时31分19秒 GMT+0800');
    });
  });

  describe('parse', function () {
    it('zh-cn simply works', function () {
      var gregorianCalendar = new GregorianCalendar(zhCn);
      gregorianCalendar.set(2013,
        GregorianCalendar.JULY, 11, 12, 31, 19);
      var df = DateTimeFormat.getDateTimeInstance(Style.FULL, Style.FULL, require('../src/locale/zh_CN'));
      var str = '2013年7月11日 星期四 下午12时31分19秒 GMT+0800';
      var cal = df.parse(str, {locale:zhCn});
      expect(cal.equals(gregorianCalendar)).to.be.ok();
      expect(df.format(cal)).to.be(str);
    });

    it('en-us works', function () {
      var gregorianCalendar = new GregorianCalendar();
      gregorianCalendar.set(2013, GregorianCalendar.NOVEMBER, 1);
      var df = new DateTimeFormat('yyyy-MM-dd');
      var str = '2013-11-01';
      var cal = df.parse(str);
      expect(cal.equals(gregorianCalendar)).to.be.ok();
      expect(df.format(cal)).to.be(str);
    });

    describe('obeyCount', function () {
      it('works', function () {
        var gregorianCalendar = new GregorianCalendar();
        gregorianCalendar.set(2013, GregorianCalendar.JANUARY, 1);
        var df = new DateTimeFormat('yyyyMMddMMM');
        var str = '20130101Jan';
        var cal = df.parse(str);
        expect(cal.equals(gregorianCalendar)).to.be.ok();
        expect(df.format(cal)).to.be(str);
      });

      it('throw error', function () {
        var gregorianCalendar = new GregorianCalendar();
        gregorianCalendar.set(2013, GregorianCalendar.JANUARY, 1);
        var df = new DateTimeFormat('yyyyMMddMMM');
        var str = '2013011Jan';
        expect(function () {
          df.parse(str);
        }).throwError(/GregorianCalendarFormat parse error/);
      });

      it('allow ignore year', function(){
        const timeFormatter = new DateTimeFormat('HH:mm:ss');
        const value = timeFormatter.parse('17:47:58');
        const string = timeFormatter.format(value);
        expect(string).to.be('17:47:58');
      });
    });
  });
});
