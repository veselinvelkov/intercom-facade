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
    <img style="max-width: 36px; max-height: 36px;" src="https://downloads.intercomcdn.com/i/o/340751/968ef2e734c433100737dc2d/c1d4abe9a147267b45d699d7fa8a6a51.png" alt="" class="intercom-lightweight-app-launcher-custom-icon-open">
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
        maxHeight: "36px",
        maxWidth: "36px",
        transform: "rotate(0deg) scale(1)",
        transition: "transform 0.16s linear 0s, opacity 0.08s linear 0s",
      },
      null,
      logoHtml
    );
    var closeHtml = `
  <svg focusable="false" viewBox="0 0 16 14" width="28" height="25" style="width: 16px;">
    <path
      fill="rgb(255, 255, 255)"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M.116 4.884l1.768-1.768L8 9.232l6.116-6.116 1.768 1.768L8 12.768.116 4.884z"
    />
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

