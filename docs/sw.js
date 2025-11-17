(function () {
  const MS_WAIT = 400;
  const CACHE = 'cached';

  let CACHED = ["/", "/css/", "/css/breadcrumbs.css", "/css/conference.css", "/css/day.css", "/css/home.css", "/css/navigation.css", "/css/person.css", "/css/registration.css", "/css/room.css", "/css/session.css", "/css/slot.css", "/css/sponsor.css", "/css/standard.css", "/css/standard_modifications.css", "/css/venue.css", "/day/", "/day/fri.html", "/day/index.html", "/day/sat.html", "/day/thu.html", "/day/wed.html", "/event/", "/event/index.html", "/event/ux-day-graz-2024.html", "/favicon.ico", "/header/", "/header/uxd2017-logo.svg", "/header/uxg-logo.svg", "/impressum.html", "/index.html", "/js/", "/js/standard.js", "/manifest.json", "/material/", "/material/index.html", "/material/introduction-slides.html", "/material/presentation-slides.html", "/material/slot-recording.html", "/material/understanding-long-term-user-behaviour-and-experiences.html", "/navigation/", "/navigation/down-arrow-dark.svg", "/navigation/menu-icon-dark.svg", "/navigation/menu-icon.svg", "/person/", "/person/christina-scharf.html", "/person/christof-pongratz.html", "/person/daniel-thrainer.html", "/person/felix-reichenauer.html", "/person/index.html", "/person/jasmin-sicher.html", "/person/keith-andrews.html", "/person/laurence-short.html", "/person/sarah-hornbanger.html", "/person/seonho-françoise-heo.html", "/person/susanne-hüttner.html", "/person/yannik-rauter.html", "/registerSW.js", "/registration.html", "/registration/", "/registration/reg-button.svg", "/role/", "/role/general-chair.html", "/role/general-chair_18u19q5n5jbx7vwwmwifuu.html", "/role/index.html", "/role/keynote-speaker.html", "/role/keynote-speaker_3fwpqsiam4bdnj5f6pobck.html", "/role/keynote-speaker_alqjqj7rvinwhwps0xo4p.html", "/role/session-chair.html", "/role/session-chair_20zhb1symlikxhbhy6iav2.html", "/role/session-chair_3yt39yfuatafb2eykgid9p.html", "/role/speaker.html", "/role/speaker_1xmxkkvkjfdgwpw6uterzo.html", "/role/speaker_1zbpvqehcbcoobu0rotiaf.html", "/role/speaker_2vw66h0h3ji64kmbz78ar8.html", "/role/speaker_3ebwwcfq9fvktctmn5vwaj.html", "/role/speaker_5ajr7gqrsrj4af7bfwsc1m.html", "/role/track-chair.html", "/role/track-chair_472sc7gbawj9nuszpan7ad.html", "/role/volunteer.html", "/role/volunteer_1amkwz5ledgwf10sgzifi5.html", "/role/volunteer_1hvzvdmlymnkvafn0mvswf.html", "/role/volunteer_2d7g4eaq1ucqhupmdlg51s.html", "/role/volunteer_3vvctkrat8w8ulfgbqku26.html", "/role/web-chair.html", "/role/web-chair_2wudtbdszbaxcdfu7xupqn.html", "/room/", "/room/der-steirer---ground-floor---dining-room.html", "/room/index.html", "/room/inffeldgasse-16b---basement---hs-i11-ick1002h.html", "/room/inffeldgasse-16b---basement---hs-i12-ick1130h.html", "/room/inffeldgasse-16b---basement---hs-i13-ick1120h.html", "/room/inffeldgasse-16b---basement---lobby.html", "/session/", "/session/3d-interaction-cont..html", "/session/3d-interaction.html", "/session/analysis-of-cpu-instructions-power-consumption.html", "/session/closing-keynote.html", "/session/coffee-break_1ymmfhr54s65h494bcugdz.html", "/session/coffee-break_3v2l6oa38ycxfgvkmljpfi.html", "/session/coffee-break_7x2c5eok2ofuso82q579ek.html", "/session/colours-online.html", "/session/conference-opening.html", "/session/designing-connected-content.html", "/session/gala-dinner.html", "/session/haptic-interaction.html", "/session/hci-and-its-societal-impact.html", "/session/hierarchical-visualisations.html", "/session/index.html", "/session/lunch_416vgeh75qoc2q4hmx8rts.html", "/session/lunch_61urocyknqp4xlqdotj4wn.html", "/session/lunch_6hd5oxb7g5k2w64oatezjk.html", "/session/lunch_7h7ps5ipdrp4xmzpoiwmqy.html", "/session/lunch_8fmxpbur8gn9mhu3qg06o.html", "/session/model-based-ui-design-and-testing.html", "/session/modelling-virtual-environments-using-_apple-vision-pro_.html", "/session/multi-dimensional-visualisations.html", "/session/registration.html", "/session/testing-visualisations.html", "/session/usage-studies.html", "/session/web-accessibility.html", "/session/welçome-_breakfäst_-w_-da-sh_-cont.ed_hbgplgp39s5za6h7g75hm.html", "/slot/", "/slot/diary-studies-on-user-behaviour-outside-target-audience.html", "/slot/index.html", "/slot/introduction.html", "/slot/observational-studies.html", "/slot/software-logging.html", "/slot/the-_alt_-tag.html", "/speaker/", "/speaker/index.html", "/sponsor/", "/sponsor/aia-in-ovio.html", "/sponsor/b4.html", "/sponsor/index.html", "/sponsor/sisel-tefik.html", "/sponsor/v-company.html", "/sw.js", "/team.html", "/track/", "/track/index.html", "/track/main-track-of-friday.html", "/track/main-track-of-saturday.html", "/track/main-track-of-thursday.html", "/track/main-track-of-wednesday.html", "/track/secondary-track-of-thursday.html", "/track/secondary-track-of-wednesday.html", "/track/tertiary-track-of-wednesday.html", "/venue/", "/venue/bar---the-dublin-road-irish-pub.html", "/venue/graz-university-of-technology---campus-inffeldgasse.html", "/venue/hotel---das-weitzer.html", "/venue/index.html", "/venue/restaurant---der-steirer.html", ];

  function fileName(url) {
    return url.href.replace(/^.*[\\\/]/, '');
  }

  function basePath(url) {
    return url.pathname.substring(0, url.pathname.lastIndexOf("/"));
  }

  self.addEventListener("install", event => {
    const url = new URL(self.location);

    if (url !== `/${fileName(url)}`) {
      const path = basePath(url);
      CACHED = CACHED.map((f) => `${path}${f}`);
    }
    event.waitUntil(precache());
  });

  self.addEventListener('fetch', event => {
    event.respondWith(
      fromNetwork(event.request, MS_WAIT).catch(function () {
        return fromCache(event.request);
      })
    );
  });

  function precache() {
    return caches.open(CACHE).then(cache => {
      return cache.addAll(CACHED);
    });
  }

  function fromNetwork(request, timeout) {
    return new Promise(function (fulfill, reject) {

      const timeoutId = setTimeout(reject, timeout);

      fetch(request).then(response => {
        clearTimeout(timeoutId);
        fulfill(response);
      }, reject);
    });
  }

  function fromCache(request) {
    return caches.open(CACHE).then(cache => {
      return cache.match(request).then(matching => {
        return matching || Promise.reject('no-match');
      });
    });
  }
})();
