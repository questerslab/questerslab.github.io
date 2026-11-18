// Questers Lab site: small, optional enhancements. Everything works without JS.
(function () {
  var nav = document.getElementById('nav');
  if (nav) addEventListener('scroll', function () { nav.classList.toggle('scrolled', scrollY > 8); }, { passive: true });

  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Quest map: the dotted route draws itself once, a little traveller follows it, stops appear as it passes.
  var map = document.getElementById('map');
  if (map) {
    var drawn = document.getElementById('drawn'), trav = document.getElementById('traveller');
    var stops = [].slice.call(map.querySelectorAll('.stop'));
    var L = drawn.getTotalLength();
    drawn.style.strokeDasharray = L;
    function set(t) {
      drawn.style.strokeDashoffset = L * (1 - t);
      var p = drawn.getPointAtLength(L * t);
      trav.setAttribute('cx', p.x); trav.setAttribute('cy', p.y);
      stops.forEach(function (s) { if (t >= +s.dataset.at - 0.02) s.style.opacity = 1, s.style.transform = 'none'; });
    }
    var ping = document.getElementById('ping'), goal = map.querySelector('.goal');
    function arrive() { [ping, goal].forEach(function (e) { e.classList.remove('on'); void e.getBoundingClientRect(); e.classList.add('on'); }); }
    function play() {
      stops.forEach(function (s, i) { if (i) { s.style.opacity = ''; s.style.transform = ''; } });
      if (reduce) { set(1); return; }
      ping.classList.remove('on'); goal.classList.remove('on');
      var start = null, dur = 3600;
      function step(ts) {
        if (!start) start = ts;
        var x = Math.min(1, (ts - start) / dur), t = x < .5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
        set(t);
        if (x < 1) requestAnimationFrame(step); else arrive();
      }
      requestAnimationFrame(step);
    }
    stops[0].style.opacity = 1; stops[0].style.transform = 'none';
    set(0);
    setTimeout(play, 500);
    document.getElementById('replay').addEventListener('click', play);
  }

  // The trail of quest kinds draws in when it scrolls into view.
  var row = document.querySelector('.trailrow');
  if (row) {
    if ('IntersectionObserver' in window && !reduce) {
      var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { row.classList.add('in'); io.disconnect(); } }); }, { threshold: .35 });
      io.observe(row);
    } else row.classList.add('in');
  }

  // The quiz from the Short.
  var quiz = document.getElementById('quiz');
  if (quiz) {
    var ans = document.getElementById('ans');
    quiz.querySelectorAll('.opt').forEach(function (b) {
      b.addEventListener('click', function () {
        quiz.classList.add('done');
        ans.innerHTML = (b.dataset.v === 'guess'
          ? 'You guessed. One time in 365 you score a point. "I don\'t know" never does, so on a test like this, guessing always wins on average.'
          : 'Honest, and it scores zero every time. A guess sometimes scores a point, so a model trained on tests like this learns to bluff.')
          + ' <button class="again" type="button">Try again</button>';
        ans.querySelector('.again').addEventListener('click', function () { quiz.classList.remove('done'); ans.textContent = ''; });
      });
    });
  }

  // Quest board: ideas from our backlog, shuffled.
  var Q = [
    ['Invisible infrastructure', '#D9A55B', 'What actually happens when you tap "send"?'],
    ['Inside the machine', '#86A89C', 'How is a computer chip made, from sand to phone?'],
    ['How the world moves', '#C47A68', 'How does a parcel find its way to your door?'],
    ['Invisible infrastructure', '#D9A55B', 'How does a city get clean water to your tap?'],
    ['New tech, explained', '#86A89C', 'How does GPS know where you are?'],
    ['Everyday science', '#C47A68', 'Why does a microwave heat the food and not the plate?'],
    ['Inside the machine', '#86A89C', 'Why do batteries wear out?'],
    ['How the world moves', '#C47A68', 'How do airlines keep thousands of flights on schedule?'],
    ['Invisible infrastructure', '#D9A55B', 'How do you restart a power grid from total darkness?'],
    ['New tech, explained', '#86A89C', 'Every AI claims to be the best. Who actually decides?'],
    ['Inside the machine', '#86A89C', 'How does a touchscreen know where your finger is?'],
    ['Everyday science', '#C47A68', 'How are weather forecasts actually made?']
  ];
  var btn = document.getElementById('qnext');
  if (btn) {
    var i = 0, card = document.getElementById('cardq');
    btn.addEventListener('click', function () {
      i = (i + 1) % Q.length;
      document.getElementById('qpillar').textContent = Q[i][0];
      document.getElementById('qdot').style.background = Q[i][1];
      document.getElementById('qtitle').textContent = Q[i][2];
      document.getElementById('qn').textContent = (i + 1) + ' of ' + Q.length;
      card.classList.remove('flip'); void card.offsetWidth; card.classList.add('flip');
    });
  }

  // Brand kit: click a colour to copy it.
  var toast = document.getElementById('toast');
  document.querySelectorAll('.sw').forEach(function (b) {
    b.addEventListener('click', function () {
      var hex = b.dataset.hex;
      (navigator.clipboard ? navigator.clipboard.writeText(hex) : Promise.reject()).then(
        function () { toast.textContent = 'Copied ' + hex; }, function () { toast.textContent = hex; }
      ).then(function () { toast.classList.add('show'); clearTimeout(toast._h); toast._h = setTimeout(function () { toast.classList.remove('show'); }, 1400); });
    });
  });
})();
