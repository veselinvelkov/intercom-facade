  (function (settings) {
    var appId = settings.app_id !== "undefined" ? settings.app_id : "";
    if (!appId) {
      return;
    }
    var backgroundColor =
      typeof settings.background_color !== "undefined"
        ? settings.background_color
        : "#333333";
    var buildElement = function (classes, id = null, innerHTML = null) {
      var element = document.createElement("div");
      Object.keys(classes).forEach(function (key) {
        element.style[key] = classes[key];
      });
      if (id) {
        element.setAttribute("id", id);
      }
      element.innerHTML = innerHTML;
      return element;
    };
    var loadChat = function (open) {
      if (!window.Intercom) {
        var w = window;
        var ic = w.Intercom;
        if (typeof ic === "function") {
          ic("reattach_activator");
          ic("update", window.intercomSettings);
        } else {
          var d = document;
          var i = function () {
            i.c(arguments);
          };
          i.q = [];
          i.c = function (args) {
            i.q.push(args);
          };
          w.Intercom = i;
          var l = function () {
            var s = d.createElement("script");
            s.type = "text/javascript";
            s.async = true;
            s.src = "https://widget.intercom.io/widget/" + appId + "/";
            var x = d.getElementsByTagName("script")[0];
            x.parentNode.insertBefore(s, x);
          };
        }
        l();
      }
      if (open) {
        logo.style.opacity = "0";
        close.style.opacity = "1";
        close.style.transform = "rotate(0deg)";
        window.Intercom("show");
      }
      var counter = 0;
      var interval = setInterval(function () {
        counter++;
        if (window.Intercom.booted) {
          if (document.querySelector("#intercom-facade-btn") !== null) {
            document.querySelector("#intercom-facade-btn").remove();
          }
          clearInterval(interval);
        } else if (counter > 10) {
          clearInterval(interval);
        }
      }, 1000);
      return true;
    };
    var logoHtml = `
  <svg
    height="32px"
    width="28px"
    focusable="false"
    aria-hidden="true"
    viewBox="0 0 28 32">
    <path
      fill="rgb(255, 255, 255)"
      d="M28,32 C28,32 23.2863266,30.1450667 19.4727818,28.6592 L3.43749107,28.6592 C1.53921989,28.6592 0,27.0272 0,25.0144 L0,3.6448 C0,1.632 1.53921989,0 3.43749107,0 L24.5615088,0 C26.45978,0 27.9989999,1.632 27.9989999,3.6448 L27.9989999,22.0490667 L28,22.0490667 L28,32 Z M23.8614088,20.0181333 C23.5309223,19.6105242 22.9540812,19.5633836 22.5692242,19.9125333 C22.5392199,19.9392 19.5537934,22.5941333 13.9989999,22.5941333 C8.51321617,22.5941333 5.48178311,19.9584 5.4277754,19.9104 C5.04295119,19.5629428 4.46760991,19.6105095 4.13759108,20.0170667 C3.97913051,20.2124916 3.9004494,20.4673395 3.91904357,20.7249415 C3.93763774,20.9825435 4.05196575,21.2215447 4.23660523,21.3888 C4.37862552,21.5168 7.77411059,24.5386667 13.9989999,24.5386667 C20.2248893,24.5386667 23.6203743,21.5168 23.7623946,21.3888 C23.9467342,21.2215726 24.0608642,20.9827905 24.0794539,20.7254507 C24.0980436,20.4681109 24.0195551,20.2135019 23.8614088,20.0181333 Z"
      />
  </svg>
  `;
    var logo = buildElement(
      {
        display: "flex",
        WebkitBoxAlign: "center",
        alignItems: "center",
        WebkitBoxPack: "center",
        justifyContent: "center",
        position: "absolute",
        top: "0px",
        bottom: "0px",
        width: "100%",
        transform: "rotate(0deg) scale(1)",
        transition: "transform 0.16s linear 0s, opacity 0.08s linear 0s",
      },
      null,
      logoHtml
    );
    var closeHtml = `
<svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="100" height="100" fill="white"/>
<rect width="100" height="100" fill="#004BFF"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M11 30.9991C11 19.9531 19.9538 11 30.9991 11H71.0009C82.0462 11 91 19.9538 91 30.9991V54.9993C91 66.0452 82.0455 75.0001 71.0009 75.0001H61.4724L54.5783 88.7889C53.9006 90.1443 52.5158 91 51.0003 91C49.4849 91 48.1001 90.1442 47.4224 88.7889L40.5283 75.0001H30.9998C19.9538 75.0001 11.0007 66.0456 11.0007 54.9993L11 30.9991ZM30.9991 18.9989C24.3716 18.9989 18.999 24.3716 18.999 30.9991V54.9993C18.999 61.6275 24.3716 66.9994 30.9991 66.9994H42.9993C44.5147 66.9994 45.8996 67.8559 46.5772 69.2105L50.9997 78.0553L55.4221 69.2105C56.0997 67.8558 57.4845 66.9994 59 66.9994H71.0002C77.6277 66.9994 83.0003 61.6275 83.0003 54.9993V30.9991C83.0003 24.3716 77.6277 18.9989 71.0002 18.9989H30.9991Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M31 35.167C31 32.8658 32.7913 31 35.0005 31H66.9995C69.2087 31 71 32.8658 71 35.167C71 37.4682 69.2087 39.3333 66.9995 39.3333H35.0005C32.7913 39.3333 31 37.4682 31 35.167V35.167Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M31 51.0001C31 48.6987 32.7641 46.8334 34.9398 46.8334H48.7269C50.9026 46.8334 52.6667 48.6987 52.6667 51.0001C52.6667 53.3015 50.9026 55.1668 48.7269 55.1668H34.9398C32.7641 55.1668 31 53.3015 31 51.0001V51.0001Z" fill="white"/>
</svg>
  `;
    var close = buildElement(
      {
        display: "flex",
        WebkitBoxAlign: "center",
        alignItems: "center",
        WebkitBoxPack: "center",
        justifyContent: "center",
        position: "absolute",
        top: "0px",
        bottom: "0px",
        width: "100%",
        transition: "transform 0.16s linear 0s, opacity 0.08s linear 0s",
        opacity: "0",
        transform: "rotate(-30deg)",
      },
      null,
      closeHtml
    );
    var launcher = buildElement({
      position: "absolute",
      top: "0px",
      left: "0px",
      width: "60px",
      height: "60px",
      borderRadius: "50%",
      cursor: "pointer",
      transformOrigin: "center",
      overflowX: "hidden",
      overflowY: "hidden",
      WebkitBackfaceVisibility: "hidden",
      WebkitFontSmoothing: "antialiased",
    });
    var region = buildElement({
      fontFamily:
        "intercom-font, 'Helvetica Neue', 'Apple Color Emoji', Helvetica, Arial, sans-serif",
      fontSize: "100%",
      fontStyle: "normal",
      letterSpacing: "normal",
      fontStretch: "normal",
      fontVariantLigatures: "normal",
      fontVariantCaps: "normal",
      fontVariantEastAsian: "normal",
      fontVariantPosition: "normal",
      fontWeight: "normal",
      textAlign: "left",
      textDecorationLine: "none",
      textDecorationStyle: "initial",
      textDecorationColor: "initial",
      textDecoration: "none",
      textIndent: "0px",
      textShadow: "none",
      textTransform: "none",
      boxSizing: "content-box",
      WebkitTextEmphasisStyle: "none",
      WebkitTextEmphasisColor: "initial",
      WebkitFontSmoothing: "antialiased",
      lineHeight: 1,
    });
    var wrapper = buildElement(
      {
        zIndex: 2147483004,
        position: "fixed",
        bottom: "20px",
        display: "block",
        right: "20px",
        width: "60px",
        height: "60px",
        borderRadius: "50%",
        boxShadow:
          "rgba(0, 0, 0, 0.0588235) 0px 1px 6px 0px, rgba(0, 0, 0, 0.156863) 0px 2px 32px 0px",
        backgroundColor: backgroundColor,
      },
      "intercom-facade-btn"
    );
    launcher.append(logo);
    launcher.append(close);
    region.append(launcher);
    region.addEventListener("click", function () {
      loadChat(true);
      localStorage.setItem('intercom-triggered', 'triggered');
    });
    region.addEventListener("mouseenter", function () {
      loadChat(false);
    });
    wrapper.append(region);
    document.querySelector("body").append(wrapper);
    if (typeof settings.custom_launcher_selector !== "undefined") {
      document
        .querySelectorAll(settings.custom_launcher_selector)
        .forEach(function (el) {
          el.addEventListener("click", function (e) {
            e.preventDefault();
            loadChat(true);
          });
        });
    }
    function checkIntercomState(){
        if (localStorage.getItem(`intercom-triggered`) !== null) {
            loadChat(false);
        }}
        checkIntercomState();
  })(window.intercomSettings)

