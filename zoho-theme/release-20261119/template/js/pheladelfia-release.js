/* Pheladelfia Nursery 2026 V2: routing and native catalog cards. */
(function () {
  "use strict";
  if (window.__phReleaseV2) return;
  window.__phReleaseV2 = true;

  function ready() {
    var path = decodeURI(location.pathname).replace(/\/+$/, "").toLowerCase() || "/";
    var route =
      path === "/" || path === "/home" || path === "/index" || path === "/index.html"
        ? "home"
        : path.slice(1);
    var main = document.querySelector("[data-ph-page-body]");
    var fallback = document.querySelector(
      '[data-ph-route="' + route.replace(/[^a-z-]/g, "") + '"]',
    );
    // Some legacy page contexts omit the Home flag or expose an absolute URL.
    // Replace only ordinary page content, never product/cart/checkout layouts.
    if (main && fallback && fallback.content) {
      main.replaceChildren(fallback.content.cloneNode(true));
    }
    if (main) document.body.classList.toggle("is-home", !!main.querySelector(".ph-hero"));
    var fallbacks = document.querySelector("[data-ph-route-fallbacks]");
    if (fallbacks) fallbacks.remove();
    loadCatalog();
    bindCarousel();
  }

  async function loadCatalog() {
    var grid = document.querySelector("[data-ph-best-sellers]");
    if (!grid) return;
    var section = grid.closest("[data-ph-best-section]");
    var status = section.querySelector("[data-ph-catalog-status]");
    var loading = section.querySelector("[data-ph-catalog-loading]");
    var seenPages = new Set();
    var seenProducts = new Set();
    var queue = Array.from(document.querySelectorAll('.ph-cat-grid a[href*="/categories/"]')).map(
      function (link) {
        return link.href;
      },
    );
    var requests = 0;

    async function visit(href) {
      var url = new URL(href, location.href);
      if (url.origin !== location.origin || seenPages.has(url.href) || requests >= 10) return;
      seenPages.add(url.href);
      requests++;
      var controller = new AbortController();
      var timer = setTimeout(function () {
        controller.abort();
      }, 8000);
      try {
        var response = await fetch(url.href, {
          credentials: "same-origin",
          signal: controller.signal,
        });
        if (!response.ok) return;
        // Cards come from category.products and store-product-list.face.
        // No product names, prices, images, or stock are invented here.
        var doc = new DOMParser().parseFromString(await response.text(), "text/html");
        doc.querySelectorAll("[data-ph-product-card]").forEach(function (card) {
          var link = card.querySelector('a[href*="/products/"]');
          if (!link || seenProducts.size >= 8) return;
          var productUrl = new URL(link.getAttribute("href"), url.href);
          if (productUrl.origin !== location.origin) return;
          var key = card.getAttribute("data-ph-product-id") || productUrl.pathname;
          if (seenProducts.has(key)) return;
          seenProducts.add(key);
          var copy = document.importNode(card, true);
          copy.querySelectorAll("[href], [src]").forEach(function (node) {
            ["href", "src"].forEach(function (attribute) {
              var value = node.getAttribute(attribute);
              if (value && !/^(data:|#)/i.test(value))
                node.setAttribute(attribute, new URL(value, url.href).href);
            });
          });
          grid.appendChild(copy);
        });
        doc.querySelectorAll('[data-ph-subcats] a[href*="/categories/"]').forEach(function (link) {
          queue.push(new URL(link.getAttribute("href"), url.href).href);
        });
      } catch (error) {
        // Keep the real collection link available when a catalog request fails.
      } finally {
        clearTimeout(timer);
      }
    }

    while (queue.length && seenProducts.size < 8 && requests < 10) {
      var batch = queue.splice(0, 3);
      await Promise.all(batch.map(visit));
    }
    grid.setAttribute("aria-busy", "false");
    grid.hidden = seenProducts.size === 0;
    if (loading) loading.hidden = true;
    if (status) status.hidden = seenProducts.size > 0;
    var controls = section.querySelector(".ph-carousel-nav");
    if (controls) controls.hidden = seenProducts.size === 0;
  }

  function bindCarousel() {
    var grid = document.querySelector("[data-ph-best-sellers]");
    if (!grid) return;
    var section = grid.closest("[data-ph-best-section]");
    [
      ["[data-ph-carousel-prev]", -1],
      ["[data-ph-carousel-next]", 1],
    ].forEach(function (entry) {
      var button = section.querySelector(entry[0]);
      if (!button) return;
      button.addEventListener("click", function () {
        var rtl = document.documentElement.dir === "rtl" ? -1 : 1;
        var reduced =
          window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        grid.scrollBy({
          left: grid.clientWidth * entry[1] * rtl,
          behavior: reduced ? "auto" : "smooth",
        });
      });
    });
  }

  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", ready, { once: true });
  else ready();
})();
