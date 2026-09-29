/*!
 * TopNav —— 可复用顶部导航组件（单文件、一步调用）
 * ---------------------------------------------------------------------
 * 用法（只需两步）：
 *
 *   1) 页面里引入本文件：
 *        <script src="top-nav.js"></script>
 *
 *   2) 一步调用（菜单 / 文案 / Logo / 主题 全在配置里）：
 *        TopNav.mount({
 *          theme:   'dark',                 // 'dark' | 'light'
 *          mountTo: '#topnav',              // 可省；省掉会自动插到页面最顶部
 *          logo:    { type:'text', badge:'P', text:'Podbean', href:'#' }, // 或 type:'image', src:'logo.png'
 *          navLinks:[
 *            { label:'Pricing', href:'#' },
 *            { label:'Podcasting', dropdown:true, columns:[
 *                { title:'Podcast Features', links:[
 *                    { label:'Podcast Hosting', desc:'一句话说明', href:'#' },
 *                    { label:'Podbean AI',      href:'#' }   // 不带 desc 即渲染成“分类”样式
 *                ]}
 *            ]}
 *          ],
 *          search:  { show:true, placeholder:'Search' },
 *          actions:{ login:{ label:'Log in', href:'#' },
 *                    cta:{   label:'Sign up free', href:'#', style:'primary' } } // style:'ghost' 也可
 *        });
 *
 * 换品牌/换配色：不用改代码，覆盖下面的 CSS 变量即可（见 TWN_CSS 顶部）。
 * 依赖：无框架、无图片资源；Logo 可为图片或「徽标+文字」。
 */
(function (global) {
  'use strict';

  /* =====================================================================
   * 组件样式：由 JS 自动注入 <style>，无需手动复制 CSS。
   * 品牌换色改这一组 --twn-* 变量即可。
   * ===================================================================== */
  var TWN_CSS = '\n' +
'.twnav-root{ position:relative; z-index:60; }\n' +
'.twnav,\n' +
'.twnav *{ box-sizing:border-box; margin:0; padding:0; }\n' +
'\n' +
'/* ----- 主题变量：改这里 = 换品牌/换配色 ----- */\n' +
'.twnav{\n' +
'  --twn-pad-y:24px;\n' +
'  --twn-pad-x:32px;\n' +
'  --twn-gap:26px;\n' +
'  --twn-font:"Roboto","PingFang SC","Microsoft YaHei","Helvetica Neue",Arial,sans-serif;\n' +
'  --twn-c-text:#FFFFFF;\n' +
'  --twn-c-link:rgba(255,255,255,.85);\n' +
'  --twn-c-link-hover:#FFFFFF;\n' +
'  --twn-c-accent:#8FC31F;\n' +
'  --twn-c-accent-hover:#428200;\n' +
'  --twn-c-accent-shadow:rgba(143,195,31,.4);\n' +
'  --twn-c-badge-text:#FFFFFF;\n' +
'  --twn-c-search-bg:rgba(255,255,255,.14);\n' +
'  --twn-c-search-brd:rgba(255,255,255,.28);\n' +
'  --twn-c-search-brd-focus:rgba(255,255,255,.6);\n' +
'  --twn-c-search-placeholder:rgba(255,255,255,.65);\n' +
'  --twn-mega-bg:#FFFFFF;\n' +
'  --twn-mega-title:#111111;\n' +
'  --twn-mega-link:#1C1D21;\n' +
'  --twn-mega-desc:#6B7280;\n' +
'  --twn-mega-link-hover-bg:#F4F9EA;\n' +
'  --twn-mega-link-hover-text:#428200;\n' +
'  --twn-mega-shadow:0 26px 60px rgba(0,0,0,.24);\n' +
'  --twn-mega-radius:14px;\n' +
'  --twn-btn-h:40px;\n' +
'  --twn-btn-pad-x:22px;\n' +
'  --twn-btn-font:15px;\n' +
'  --twn-mobile-bg:#FFFFFF;\n' +
'  --twn-mobile-text:#1C1D21;\n' +
'  --twn-mobile-sub:#6B7280;\n' +
'  --twn-mobile-brd:#EEF0F2;\n' +
'}\n' +
'.twnav--light{\n' +
'  --twn-c-text:#1C1D21;\n' +
'  --twn-c-link:rgba(28,29,33,.8);\n' +
'  --twn-c-link-hover:#111111;\n' +
'  --twn-c-search-bg:rgba(28,29,33,.06);\n' +
'  --twn-c-search-brd:rgba(28,29,33,.16);\n' +
'  --twn-c-search-brd-focus:rgba(28,29,33,.5);\n' +
'  --twn-c-search-placeholder:rgba(28,29,33,.5);\n' +
'}\n' +
'\n' +
'/* ----- 导航条本体 ----- */\n' +
'.twnav{\n' +
'  display:flex; align-items:center; gap:var(--twn-gap);\n' +
'  padding:var(--twn-pad-y) var(--twn-pad-x);\n' +
'  font-family:var(--twn-font);\n' +
'  color:var(--twn-c-text);\n' +
'  width:100%;\n' +
'}\n' +
'.twnav a{ color:inherit; }\n' +
'\n' +
'/* Logo */\n' +
'.twnav__logo{ display:flex; align-items:center; gap:10px; text-decoration:none; cursor:pointer; flex-shrink:0; }\n' +
'.twnav__logo img{ height:36px; width:auto; display:block; }\n' +
'.twnav__logo-badge{\n' +
'  width:32px; height:32px; border-radius:9px; background:var(--twn-c-accent);\n' +
'  color:var(--twn-c-badge-text); display:flex; align-items:center; justify-content:center;\n' +
'  font-weight:800; font-size:16px; flex-shrink:0;\n' +
'}\n' +
'.twnav__logo-text{ font-size:20px; font-weight:700; letter-spacing:-.3px; white-space:nowrap; color:var(--twn-c-text); }\n' +
'\n' +
'/* 菜单 */\n' +
'.twnav__nav{ display:flex; }\n' +
'.twnav__links{ display:flex; align-items:center; gap:28px; list-style:none; }\n' +
'.twnav__item{ position:relative; }\n' +
'.twnav__link{\n' +
'  display:inline-flex; align-items:center; gap:5px;\n' +
'  font-family:inherit; font-size:15px; font-weight:500;\n' +
'  color:var(--twn-c-link); text-decoration:none; cursor:pointer;\n' +
'  background:none; border:none; white-space:nowrap; transition:color .2s;\n' +
'}\n' +
'.twnav__link:hover,\n' +
'.twnav__link:focus-visible{ color:var(--twn-c-link-hover); outline:none; }\n' +
'.twnav__caret{ display:inline-flex; opacity:.75; transition:transform .2s; }\n' +
'.twnav__item:hover > .twnav__link .twnav__caret,\n' +
'.twnav__item:focus-within > .twnav__link .twnav__caret{ transform:rotate(180deg); }\n' +
'\n' +
'/* 下拉 mega 菜单 */\n' +
'.twnav__mega{\n' +
'  position:absolute; top:calc(100% + 18px); left:50%; transform:translateX(-50%);\n' +
'  display:none; gap:22px;\n' +
'  min-width:640px; padding:22px 18px;\n' +
'  background:var(--twn-mega-bg); color:var(--twn-mega-link);\n' +
'  border-radius:var(--twn-mega-radius); box-shadow:var(--twn-mega-shadow);\n' +
'  z-index:80;\n' +
'}\n' +
'.twnav__item:first-child > .twnav__mega,\n' +
'.twnav__item:nth-child(2) > .twnav__mega{ left:-20px; transform:none; }\n' +
'.twnav__item:hover > .twnav__mega,\n' +
'.twnav__item:focus-within > .twnav__mega{ display:flex; }\n' +
'.twnav__mega-col{ flex:1; min-width:0; }\n' +
'.twnav__mega-title{ font-size:13px; font-weight:700; color:var(--twn-mega-title); margin:0 0 12px; letter-spacing:-.2px; }\n' +
'.twnav__mega-link{\n' +
'  display:block; padding:7px 9px; border-radius:9px;\n' +
'  color:var(--twn-mega-link); font-size:14px; font-weight:600;\n' +
'  text-decoration:none; line-height:1.35; transition:background .15s;\n' +
'}\n' +
'.twnav__mega-link:hover{ background:var(--twn-mega-link-hover-bg); color:var(--twn-mega-link-hover-text); }\n' +
'.twnav__mega-link p{ margin:2px 0 0; font-size:12px; font-weight:400; color:var(--twn-mega-desc); line-height:1.4; }\n' +
'.twnav__mega-cat{\n' +
'  display:block; padding:6px 9px; border-radius:8px;\n' +
'  color:var(--twn-mega-link); font-size:14px; font-weight:600;\n' +
'  text-decoration:none; transition:background .15s;\n' +
'}\n' +
'.twnav__mega-cat:hover{ background:var(--twn-mega-link-hover-bg); color:var(--twn-mega-link-hover-text); }\n' +
'\n' +
'/* 搜索框 */\n' +
'.twnav__search{ display:flex; align-items:center; margin-left:4px; }\n' +
'.twnav__search input{\n' +
'  width:150px; height:auto;\n' +
'  background:var(--twn-c-search-bg); border:1px solid var(--twn-c-search-brd);\n' +
'  color:var(--twn-c-text); border-radius:50px; outline:none;\n' +
'  padding:8px 34px 8px 14px; font-size:13px; font-family:inherit;\n' +
'  transition:border-color .2s, background .2s;\n' +
'}\n' +
'.twnav__search input::placeholder{ color:var(--twn-c-search-placeholder); }\n' +
'.twnav__search input:focus{ border-color:var(--twn-c-search-brd-focus); background:rgba(255,255,255,.2); }\n' +
'.twnav--light .twnav__search input:focus{ background:rgba(28,29,33,.1); }\n' +
'.twnav__search button{\n' +
'  margin-left:-30px; background:none; border:none; cursor:pointer;\n' +
'  display:inline-flex; align-items:center; padding:4px; color:var(--twn-c-text);\n' +
'}\n' +
'.twnav__search button:hover{ color:var(--twn-c-accent); }\n' +
'\n' +
'/* 右侧操作区 */\n' +
'.twnav__actions{ display:flex; align-items:center; gap:14px; margin-left:auto; }\n' +
'.twnav__login{\n' +
'  color:var(--twn-c-text); font-size:14px; font-weight:600;\n' +
'  text-decoration:none; cursor:pointer; white-space:nowrap; transition:opacity .2s;\n' +
'}\n' +
'.twnav__login:hover{ opacity:.75; }\n' +
'.twnav__btn{\n' +
'  display:inline-flex; align-items:center; justify-content:center;\n' +
'  height:var(--twn-btn-h); padding:0 var(--twn-btn-pad-x);\n' +
'  border-radius:50px; font-size:var(--twn-btn-font); font-weight:600;\n' +
'  cursor:pointer; text-decoration:none; border:none; font-family:inherit;\n' +
'  white-space:nowrap; transition:all .2s;\n' +
'}\n' +
'.twnav__btn--primary{ background:var(--twn-c-accent); color:var(--twn-c-badge-text); }\n' +
'.twnav__btn--primary:hover{ background:var(--twn-c-accent-hover); transform:translateY(-1px); box-shadow:0 8px 18px var(--twn-c-accent-shadow); }\n' +
'.twnav__btn--ghost{ background:transparent; border:1.5px solid rgba(255,255,255,.45); color:var(--twn-c-text); }\n' +
'.twnav__btn--ghost:hover{ background:rgba(255,255,255,.15); border-color:#fff; }\n' +
'.twnav--light .twnav__btn--ghost{ border-color:var(--twn-c-search-brd); }\n' +
'.twnav--light .twnav__btn--ghost:hover{ background:rgba(28,29,33,.06); border-color:var(--twn-c-text); }\n' +
'\n' +
'/* 汉堡按钮 */\n' +
'.twnav__burger{\n' +
'  display:none; margin-left:auto; padding:6px; background:none; border:none; cursor:pointer;\n' +
'  color:var(--twn-c-text);\n' +
'}\n' +
'.twnav__burger svg{ display:block; }\n' +
'\n' +
'/* ----- 移动端抽屉（固定白底，内部颜色独立成深色文字体系） ----- */\n' +
'.twnav-mobile{\n' +
'  display:none;\n' +
'  --twn-c-text:#1C1D21;\n' +
'  --twn-c-search-bg:rgba(28,29,33,.06);\n' +
'  --twn-c-search-brd:rgba(28,29,33,.16);\n' +
'  --twn-c-search-brd-focus:rgba(28,29,33,.5);\n' +
'  --twn-c-search-placeholder:rgba(28,29,33,.5);\n' +
'  background:var(--twn-mobile-bg); color:var(--twn-mobile-text);\n' +
'  padding:6px 20px 22px; border-top:1px solid var(--twn-mobile-brd);\n' +
'  box-shadow:0 24px 44px rgba(0,0,0,.12);\n' +
'  max-height:calc(100vh - 70px); overflow-y:auto;\n' +
'}\n' +
'.twnav-root.open .twnav-mobile{ display:block; }\n' +
'.twnav-mobile .m-link{\n' +
'  display:flex; align-items:center; justify-content:space-between; gap:8px;\n' +
'  padding:13px 2px; font-size:15px; font-weight:500;\n' +
'  color:var(--twn-mobile-text); text-decoration:none;\n' +
'  border-bottom:1px solid var(--twn-mobile-brd); cursor:pointer; font-family:inherit; width:100%; background:none;\n' +
'}\n' +
'.twnav-mobile details{ border-bottom:1px solid var(--twn-mobile-brd); }\n' +
'.twnav-mobile details summary{ list-style:none; }\n' +
'.twnav-mobile details summary::-webkit-details-marker{ display:none; }\n' +
'.twnav-mobile details .m-caret{ transition:transform .2s; display:inline-flex; opacity:.6; }\n' +
'.twnav-mobile details[open] > summary .m-caret{ transform:rotate(180deg); }\n' +
'.twnav-mobile .m-sub{ padding:0 0 12px; }\n' +
'.twnav-mobile .m-grp{ font-size:12px; font-weight:700; color:var(--twn-mega-title); padding:10px 6px 4px; letter-spacing:.3px; }\n' +
'.twnav-mobile .m-sub a,\n' +
'.twnav-mobile .m-sub .m-cat{\n' +
'  display:block; padding:7px 6px; font-size:14px; text-decoration:none;\n' +
'  color:var(--twn-mobile-text); font-weight:400;\n' +
'}\n' +
'.twnav-mobile .m-sub a p{ font-size:12px; color:var(--twn-mobile-sub); margin:1px 0 0; }\n' +
'.twnav-mobile .m-search{ display:flex; align-items:center; padding:14px 0 4px; }\n' +
'.twnav-mobile .m-search input{\n' +
'  flex:1; background:var(--twn-c-search-bg); border:1px solid var(--twn-c-search-brd);\n' +
'  color:var(--twn-c-text); border-radius:50px; padding:10px 16px; font-size:14px; outline:none; font-family:inherit;\n' +
'}\n' +
'.twnav-mobile .m-search input::placeholder{ color:var(--twn-c-search-placeholder); }\n' +
'.twnav-mobile .m-search input:focus{ border-color:var(--twn-c-search-brd-focus); }\n' +
'.twnav-mobile .m-actions{ display:flex; gap:10px; padding:12px 0 4px; }\n' +
'.twnav-mobile .m-actions .twnav__btn{ flex:1; }\n' +
'\n' +
'@media (max-width:900px){\n' +
'  .twnav{ padding:16px 20px; gap:12px; }\n' +
'  .twnav__nav, .twnav__search, .twnav__actions{ display:none; }\n' +
'  .twnav__burger{ display:inline-flex; }\n' +
'}\n';

  /* ============ 渲染工具 ============ */
  function esc(v){
    return String(v == null ? '' : v)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function caretSvg(){ return '<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>'; }
  function searchSvg(){ return '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>'; }
  function burgerSvg(){ return '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>'; }
  function closeSvg(){ return '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>'; }

  function logoHtml(logo){
    if (!logo) return '';
    if (logo.type === 'image'){
      return '<a class="twnav__logo" href="' + esc(logo.href || '#') + '"><img src="' + esc(logo.src) + '" alt="' + esc(logo.alt || 'logo') + '"></a>';
    }
    var badge = logo.badge ? '<span class="twnav__logo-badge">' + esc(logo.badge) + '</span>' : '';
    var text  = logo.text ? '<span class="twnav__logo-text">' + esc(logo.text) + '</span>' : '';
    return '<a class="twnav__logo" href="' + esc(logo.href || '#') + '">' + badge + text + '</a>';
  }

  function megaHtml(columns){
    var cols = (columns || []).map(function(col){
      var inner = '';
      if (col.title) inner += '<div class="twnav__mega-title">' + esc(col.title) + '</div>';
      (col.links || []).forEach(function(l){
        if (l.desc){
          inner += '<a class="twnav__mega-link" href="' + esc(l.href || '#') + '"><span>' + esc(l.label) + '</span><p>' + esc(l.desc) + '</p></a>';
        } else {
          inner += '<a class="twnav__mega-cat" href="' + esc(l.href || '#') + '">' + esc(l.label) + '</a>';
        }
      });
      return '<div class="twnav__mega-col">' + inner + '</div>';
    });
    return '<div class="twnav__mega" role="menu">' + cols.join('') + '</div>';
  }

  function navItemHtml(item){
    if (item.dropdown){
      return '<li class="twnav__item">'
        + '<button type="button" class="twnav__link" aria-haspopup="true" aria-expanded="false">' + esc(item.label)
        + '<span class="twnav__caret">' + caretSvg() + '</span></button>'
        + megaHtml(item.columns)
        + '</li>';
    }
    return '<li class="twnav__item"><a class="twnav__link" href="' + esc(item.href || '#') + '">' + esc(item.label) + '</a></li>';
  }

  function desktopHtml(cfg){
    var links = (cfg.navLinks || []).map(navItemHtml).join('');

    var search = (cfg.search && cfg.search.show !== false)
      ? '<form class="twnav__search" role="search"><input type="text" placeholder="' + esc((cfg.search && cfg.search.placeholder) || 'Search') + '" title="Search"><button type="submit" title="Search" aria-label="Search">' + searchSvg() + '</button></form>'
      : '';

    var actions = '';
    if (cfg.actions){
      var login = cfg.actions.login
        ? '<a class="twnav__login" href="' + esc(cfg.actions.login.href || '#') + '">' + esc(cfg.actions.login.label || 'Log in') + '</a>' : '';
      var cta = '';
      if (cfg.actions.cta){
        var style = cfg.actions.cta.style === 'ghost' ? 'twnav__btn--ghost' : 'twnav__btn--primary';
        cta = '<a class="twnav__btn ' + style + '" href="' + esc(cfg.actions.cta.href || '#') + '">' + esc(cfg.actions.cta.label || 'Sign up free') + '</a>';
      }
      actions = '<div class="twnav__actions">' + login + cta + '</div>';
    }

    return logoHtml(cfg.logo)
      + '<nav class="twnav__nav" aria-label="Main"><ul class="twnav__links">' + links + '</ul></nav>'
      + search
      + actions;
  }

  function mobileHtml(cfg){
    var html = '';

    if (cfg.search && cfg.search.show !== false){
      html += '<div class="m-search"><input type="text" placeholder="' + esc(cfg.search.placeholder || 'Search') + '"></div>';
    }

    (cfg.navLinks || []).forEach(function(item){
      if (!item.dropdown){
        html += '<a class="m-link" href="' + esc(item.href || '#') + '">' + esc(item.label) + '</a>';
        return;
      }
      html += '<details><summary class="m-link"><span>' + esc(item.label) + '</span><span class="m-caret">' + caretSvg() + '</span></summary><div class="m-sub">';
      (item.columns || []).forEach(function(col){
        if (col.title) html += '<div class="m-grp">' + esc(col.title) + '</div>';
        (col.links || []).forEach(function(l){
          html += '<a class="' + (l.desc ? '' : ' m-cat') + '" href="' + esc(l.href || '#') + '">' + esc(l.label)
                + (l.desc ? '<p>' + esc(l.desc) + '</p>' : '') + '</a>';
        });
      });
      html += '</div></details>';
    });

    if (cfg.actions){
      var login = cfg.actions.login
        ? '<a class="twnav__btn twnav__btn--ghost" href="' + esc(cfg.actions.login.href || '#') + '">' + esc(cfg.actions.login.label || 'Log in') + '</a>' : '';
      var cta = cfg.actions.cta
        ? '<a class="twnav__btn twnav__btn--primary" href="' + esc(cfg.actions.cta.href || '#') + '">' + esc(cfg.actions.cta.label || 'Sign up free') + '</a>' : '';
      if (login || cta) html += '<div class="m-actions">' + login + cta + '</div>';
    }

    return html;
  }

  function ensureStyle(){
    if (global.document.getElementById('twnav-style')) return;
    var st = global.document.createElement('style');
    st.id = 'twnav-style';
    st.textContent = TWN_CSS;
    (global.document.head || global.document.documentElement).appendChild(st);
  }

  function bindInteractions(root){
    var header = root.querySelector('.twnav');
    var mobile = root.querySelector('.twnav-mobile');
    var burger = root.querySelector('.twnav__burger');
    if (!header || !mobile || !burger) return;

    function setOpen(open){
      root.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      burger.innerHTML = open ? closeSvg() : burgerSvg();
    }
    burger.addEventListener('click', function(e){
      e.stopPropagation();
      setOpen(!root.classList.contains('open'));
    });
    mobile.addEventListener('click', function(e){
      if (e.target.closest('a')) setOpen(false);
    });
    global.document.addEventListener('click', function(e){
      if (root.classList.contains('open') && !root.contains(e.target)) setOpen(false);
    });
    global.document.addEventListener('keydown', function(e){
      if (e.key === 'Escape' && root.classList.contains('open')) setOpen(false);
    });
    header.querySelectorAll('form').forEach(function(f){
      f.addEventListener('submit', function(ev){ ev.preventDefault(); });
    });
  }

  /**
   * 一步挂载导航。
   * @param {Object} cfg 配置：
   *   theme    : 'dark' | 'light'        默认 'dark'
   *   mountTo  : 选择器字符串或元素      可省，省掉自动插到 <body> 顶部
   *   logo/navLinks/search/actions       见文件顶部注释
   * @returns {HTMLElement} 导航根节点
   */
  function mount(cfg){
    cfg = cfg || {};
    var isLight = cfg.theme === 'light';
    var rootCls = 'twnav-root' + (isLight ? ' twnav-root--light' : '');
    ensureStyle();

    var root;
    if (cfg.mountTo){
      root = typeof cfg.mountTo === 'string' ? global.document.querySelector(cfg.mountTo) : cfg.mountTo;
    }
    if (!root){
      root = global.document.createElement('div');
      root.className = rootCls;
      var body = global.document.body;
      if (body) body.insertBefore(root, body.firstChild);
    } else {
      root.className = rootCls;
    }

    root.innerHTML =
      '<header class="twnav' + (isLight ? ' twnav--light' : '') + '">'
      + desktopHtml(cfg)
      + '<button type="button" class="twnav__burger" aria-label="Menu" aria-expanded="false">' + burgerSvg() + '</button>'
      + '</header>'
      + '<div class="twnav-mobile" aria-hidden="true">' + mobileHtml(cfg) + '</div>';

    bindInteractions(root);
    return root;
  }

  /* 对外暴露 */
  var api = { mount: mount, version: '1.1.0' };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  global.TopNav = api;
})(typeof window !== 'undefined' ? window : this);
