window.addEventListener('DOMContentLoaded', () => {
  const video = document.getElementById('main-video');
  const slider = document.getElementById('video-slider');
  const timeDisplay = document.getElementById('video-time');
  const clockDisplay = document.getElementById('clock');
  const panelStart = document.getElementById('panel-start');
  const panelIcon = document.getElementById('panel-icon');
  const panelTop = document.getElementById('panel-top');
  const dots = document.querySelectorAll('.red-dot');
  const waveVideo = document.getElementById('wave-video');


  // 缩放时钟
  function updateClock() {
    const now = new Date();
    const h = now.getHours().toString().padStart(2, '0');
    const m = now.getMinutes().toString().padStart(2, '0');
    const s = now.getSeconds().toString().padStart(2, '0');
    if (clockDisplay) {
      clockDisplay.textContent = `${h}:${m}:${s}`;
    }
  }

  setInterval(updateClock, 1000);
  updateClock();

  // 时间格式化
  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  // 视频播放更新 slider + 左下角时钟
  video.addEventListener('timeupdate', () => {
    if (!isNaN(video.duration)) {
      const percent = (video.currentTime / video.duration) * 100;
      slider.value = percent;
      if (timeDisplay) {
        timeDisplay.textContent = formatTime(video.currentTime);
      }
    }
  });

  // slider 控制视频跳转
  slider.addEventListener('input', () => {
  if (!isNaN(video.duration)) {
    const newTime = (slider.value / 100) * video.duration;
    video.currentTime = newTime;
    if (waveVideo && !isNaN(waveVideo.duration)) {
      waveVideo.currentTime = Math.min(newTime, waveVideo.duration); // 避免超出
    }
  }
});

  // 播放 / 暂停 控制按钮
  panelStart.addEventListener('click', () => {
  if (video.paused) {
    video.play();
    if (waveVideo) waveVideo.play();
    panelStart.classList.remove('paused');
    panelIcon.textContent = '❚❚';
  } else {
    video.pause();
    if (waveVideo) waveVideo.pause();
    panelStart.classList.add('paused');
    panelIcon.textContent = '▶';
  }
});


  // 全屏进入按钮
  const fullscreenButton = document.getElementById('enter-fullscreen');
  if (fullscreenButton) {
    fullscreenButton.addEventListener('click', () => {
      const el = document.documentElement;

      if (el.requestFullscreen) {
        el.requestFullscreen();
      } else if (el.webkitRequestFullscreen) {
        el.webkitRequestFullscreen();
      } else if (el.msRequestFullscreen) {
        el.msRequestFullscreen();
      }

      document.getElementById('fullscreen-overlay').style.display = 'none';
    });
  }

  // 默认提示文字
  const defaultMessage = '<div class="panel-message">Hover over a square to view restaurant info</div>';
  panelTop.innerHTML = defaultMessage;

  

  // mock 的 Excel 数据（NUM = 1~26）
  const dataByNum = {
    "1": {
      NAME: "Uptown Veg",
      ADD: "52 E 125th St, New York, NY 10035",
      FEN: "4.4",
      ABOUT: "Compact cafe offering vegan versions of American comfort food, pastries & bottled juices."
    },
    "2": {
      NAME: "Ginjan Cafe",
      ADD: "85 E 125th St, New York, NY 10035",
      FEN: "4.9",
      ABOUT: "Coffee & tea plus African specialty drinks, crepes & pastries are served in a sprawling space."
    },
    "3": {
      NAME: "Accra Express",
      ADD: "63 E 125th St, New York, NY 10035",
      FEN: "4.4",
      ABOUT: "This time-tested African eatery offers familiar, self-serve fare in simple, compact quarters."
    },
    "4": {
      NAME: "Sisters",
      ADD: "47 E 124th St, New York, NY 10035",
      FEN: "4.1",
      ABOUT: "Bright & cozy standby preparing Caribbean & Southern specialties & a signature pineapple cornbread."
    },
    "5": {
      NAME: "Between The Bun Deli & Cafe",
      ADD: "135 E 125th St, New York, NY 10035",
      FEN: "3.7",
      ABOUT: "//"
    },
    "6": {
      NAME: "Popeyes",
      ADD: "122 E 125th St, New York, NY 10035",
      FEN: "3.5",
      ABOUT: "Louisiana-inspired fast-food chain known for its crispy fried chicken, chicken sandwiches & fries."
    },
    "7": {
      NAME: "China King",
      ADD: "2026 Lexington Ave # 2, New York, NY 10035",
      FEN: "4.2",
      ABOUT: "//"
    },
    "8": {
      NAME: "The Good Good",
      ADD: "1694 Park Ave, New York, NY 10035",
      FEN: "4.8",
      ABOUT: "//"
    },
    "9": {
      NAME: "New Ivoire",
      ADD: "76 E 119th St, New York, NY 10035",
      FEN: "4.1",
      ABOUT: "Unassuming eatery serving traditional African grub such as attiéké, fried fish & plantains."
    },
    "10": {
      NAME: "Armonie",
      ADD: "1649 Park Ave, New York, NY 10035",
      FEN: "4.6",
      ABOUT: "Homey, unpretentious Italian restaurant featuring classic pizza pies along with pasta & sandwiches."
    },
    "11": {
      NAME: "La Marqueta",
      ADD: "1590 Park Ave, New York, NY 10029",
      FEN: "4.3",
      ABOUT: "Vibrant open-air marketplace featuring food vendors, shops & cultural events such as salsa dancing."
    },
    "12": {
      NAME: "Catch It Seafood Box",
      ADD: "1580 Park Ave, New York, NY 10029",
      FEN: "4.2",
      ABOUT: "//"
    },
    "13": {
      NAME: "Pure Confections",
      ADD: "1580 Park Ave Kitchen 3, New York, NY 10029",
      FEN: "5",
      ABOUT: "//"
    },
    "14": {
      NAME: "El Barrio Deli Superette",
      ADD: "1858 Lexington Ave, New York, NY 10029",
      FEN: "4.5",
      ABOUT: "//"
    },
    "15": {
      NAME: "Sam's Famous Pizzeria",
      ADD: "150 E 116th St, New York, NY 10029",
      FEN: "4.2",
      ABOUT: "No-frills, pint-sized pizza joint with slices & pies, plus burgers, sandwiches & breakfast food."
    },
    "16": {
      NAME: "Baskin-Robbins",
      ADD: "147 E 116th St, New York, NY 10029",
      FEN: "3.1",
      ABOUT: "Colorful ice cream parlor chain known for its many flavors plus sorbet & yogurt."
    },
    "17": {
      NAME: "Domino's Pizza",
      ADD: "153 E 116th St, New York, NY 10029",
      FEN: "3.3",
      ABOUT: "Delivery/carryout chain offering a wide range of pizzas & a variety of other dishes & sides."
    },
    "18": {
      NAME: "Super Nice Coffee and Bakery",
      ADD: "156 E 117th St, New York, NY 10035",
      FEN: "4.6",
      ABOUT: "//"
    },
    "19": {
      NAME: "Rosticeria Y Tortilleria Lupita",
      ADD: "1907 Lexington Ave, New York, NY 10035",
      FEN: "4.5",
      ABOUT: "//"
    },
    "20": {
      NAME: "Ocean Deli Corp",
      ADD: "1990 Lexington Ave, New York, NY 10035",
      FEN: "4.6",
      ABOUT: "//"
    },
    "21": {
      NAME: "Teamworkon3 Juice",
      ADD: "2007 Lexington Avenue store Store, 2011 Lexington Ave, New York, NY 10035",
      FEN: "4.4",
      ABOUT: "//"
    },
    "22": {
      NAME: "Thai BKK",
      ADD: "2021 Lexington Ave, New York, NY 10035",
      FEN: "4.1",
      ABOUT: "//"
    },
    "23": {
      NAME: "Alabama Chicken & Burger",
      ADD: "2027 Lexington Ave, E 124th St, New York, NY 10035",
      FEN: "4.5",
      ABOUT: "//"
    },
    "24": {
      NAME: "Jimbo's Hamburger Palace",
      ADD: "2027 Lexington Ave, New York, NY 10035",
      FEN: "4.1",
      ABOUT: "//"
    },
    "25": {
      NAME: "Dallas Chicken & Biscuits",
      ADD: "2027 Lexington Ave, New York, NY 10035",
      FEN: "4",
      ABOUT: "//"
    }
    // 可以继续添加 NUM: 3~26
  };

  

  dots.forEach(dot => {
    dot.addEventListener('mouseenter', () => {
      const num = dot.dataset.id;
      const data = dataByNum[num];
      if (data && panelTop) {
        panelTop.innerHTML = `
          <div class="name-style">${data.NAME}</div>
          <div class="add-style">${data.ADD}</div>
          <div class="fen-style">${data.FEN}</div>
          <div class="about-style">${data.ABOUT}</div>
        `;
      }
    });

    dot.addEventListener('mouseleave', () => {
      if (panelTop) {
        panelTop.innerHTML = defaultMessage;
      }
    });
  });

  
});
