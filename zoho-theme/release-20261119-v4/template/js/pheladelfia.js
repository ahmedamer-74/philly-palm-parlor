(function () {
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/* Pheladelfia Nursery 2026 V4: routing and native catalog cards. */
(function () {
    "use strict";
    if (window.__phReleaseV4)
        return;
    window.__phReleaseV4 = true;
    function ready() {
        var path = decodeURI(location.pathname).replace(/\/+$/, "").toLowerCase() || "/";
        var route = path === "/" || path === "/home" || path === "/index" || path === "/index.html"
            ? "home"
            : path.slice(1);
        var main = document.querySelector("[data-ph-page-body]");
        var fallback = document.querySelector('[data-ph-route="' + route.replace(/[^a-z-]/g, "") + '"]');
        // Some legacy page contexts omit the Home flag or expose an absolute URL.
        // Replace only ordinary page content, never product/cart/checkout layouts.
        if (main && fallback && fallback.content) {
            main.replaceChildren(fallback.content.cloneNode(true));
        }
        if (main)
            document.body.classList.toggle("is-home", !!main.querySelector(".ph-hero"));
        var fallbacks = document.querySelector("[data-ph-route-fallbacks]");
        if (fallbacks)
            fallbacks.remove();
        loadCatalog();
        bindCarousel();
    }
    function loadCatalog() {
        return __awaiter(this, void 0, void 0, function () {
            function visit(href) {
                return __awaiter(this, void 0, void 0, function () {
                    var url, controller, timer, response, doc, _a, _b, error_1;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                url = new URL(href, location.href);
                                if (url.origin !== location.origin || seenPages.has(url.href) || requests >= 10)
                                    return [2 /*return*/];
                                seenPages.add(url.href);
                                requests++;
                                controller = new AbortController();
                                timer = setTimeout(function () {
                                    controller.abort();
                                }, 8000);
                                _c.label = 1;
                            case 1:
                                _c.trys.push([1, 4, 5, 6]);
                                return [4 /*yield*/, fetch(url.href, {
                                        credentials: "same-origin",
                                        signal: controller.signal,
                                    })];
                            case 2:
                                response = _c.sent();
                                if (!response.ok)
                                    return [2 /*return*/];
                                _b = (_a = new DOMParser()).parseFromString;
                                return [4 /*yield*/, response.text()];
                            case 3:
                                doc = _b.apply(_a, [_c.sent(), "text/html"]);
                                doc.querySelectorAll("[data-ph-product-card]").forEach(function (card) {
                                    var link = card.querySelector('a[href*="/products/"]');
                                    if (!link || seenProducts.size >= 8)
                                        return;
                                    var productUrl = new URL(link.getAttribute("href"), url.href);
                                    if (productUrl.origin !== location.origin)
                                        return;
                                    var key = card.getAttribute("data-ph-product-id") || productUrl.pathname;
                                    if (seenProducts.has(key))
                                        return;
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
                                return [3 /*break*/, 6];
                            case 4:
                                error_1 = _c.sent();
                                return [3 /*break*/, 6];
                            case 5:
                                clearTimeout(timer);
                                return [7 /*endfinally*/];
                            case 6: return [2 /*return*/];
                        }
                    });
                });
            }
            var grid, section, status, loading, seenPages, seenProducts, queue, requests, batch, controls;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        grid = document.querySelector("[data-ph-best-sellers]");
                        if (!grid)
                            return [2 /*return*/];
                        section = grid.closest("[data-ph-best-section]");
                        status = section.querySelector("[data-ph-catalog-status]");
                        loading = section.querySelector("[data-ph-catalog-loading]");
                        seenPages = new Set();
                        seenProducts = new Set();
                        queue = Array.from(document.querySelectorAll('.ph-cat-grid a[href*="/categories/"]')).map(function (link) {
                            return link.href;
                        });
                        requests = 0;
                        _a.label = 1;
                    case 1:
                        if (!(queue.length && seenProducts.size < 8 && requests < 10)) return [3 /*break*/, 3];
                        batch = queue.splice(0, 3);
                        return [4 /*yield*/, Promise.all(batch.map(visit))];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 1];
                    case 3:
                        grid.setAttribute("aria-busy", "false");
                        grid.hidden = seenProducts.size === 0;
                        if (loading)
                            loading.hidden = true;
                        if (status)
                            status.hidden = seenProducts.size > 0;
                        controls = section.querySelector(".ph-carousel-nav");
                        if (controls)
                            controls.hidden = seenProducts.size === 0;
                        return [2 /*return*/];
                }
            });
        });
    }
    function bindCarousel() {
        var grid = document.querySelector("[data-ph-best-sellers]");
        if (!grid)
            return;
        var section = grid.closest("[data-ph-best-section]");
        [
            ["[data-ph-carousel-prev]", -1],
            ["[data-ph-carousel-next]", 1],
        ].forEach(function (entry) {
            var button = section.querySelector(entry[0]);
            if (!button)
                return;
            button.addEventListener("click", function () {
                var rtl = document.documentElement.dir === "rtl" ? -1 : 1;
                var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
                grid.scrollBy({
                    left: grid.clientWidth * entry[1] * rtl,
                    behavior: reduced ? "auto" : "smooth",
                });
            });
        });
    }
    if (document.readyState === "loading")
        document.addEventListener("DOMContentLoaded", ready, { once: true });
    else
        ready();
})();

})();

/* Existing storefront behavior. */
if (!window.__phJsOnce) {
window.__phJsOnce = true;
(function () {
  function ready(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }

  function qs(sel, root) {
    return (root || document).querySelector(sel);
  }

  function qsa(sel, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(sel));
  }

  function cartHeaders() {
    var headers = { "Content-Type": "application/json", "x-zs-cart-cookie-httponly": "true" };
    if (window.zsUtils && zsUtils.getCSRFHeader) {
      Object.assign(headers, zsUtils.getCSRFHeader());
    }
    return headers;
  }

  function cartItemsFrom(data) {
    if (!data) return [];
    if (data.payload && data.payload.items) return data.payload.items;
    if (data.cart_details && data.cart_details.items) return data.cart_details.items;
    return [];
  }

  function updateCartBadge(data) {
    var items = cartItemsFrom(data);
    var count = items.reduce(function (sum, item) {
      return sum + (parseInt(item.quantity, 10) || 1);
    }, 0);
    if (!count && data && data.payload) {
      count = Number(data.payload.count || data.payload.cart_count || data.payload.total_count || 0);
    }
    var badge = qs("[data-ph-cart-count]");
    var link = qs("[data-ph-cart-link]") || qs("a[href='/cart']");
    if (!badge && link) {
      badge = document.createElement("span");
      badge.className = "ph-cart-count";
      badge.setAttribute("data-ph-cart-count", "");
      link.appendChild(badge);
    }
    if (badge) {
      badge.hidden = !count;
      badge.textContent = count ? String(count) : "";
    }
    var ids = {};
    items.forEach(function (item) {
      if (item.variant_id) ids[String(item.variant_id)] = true;
    });
    qsa("[data-ph-size-chip]").forEach(function (chip) {
      chip.classList.toggle("is-in-cart", !!ids[chip.getAttribute("data-ph-variant-id")]);
    });
    return count;
  }

  function refreshCartBadge() {
    return fetch("/storefront/api/v1/cart", {
      credentials: "same-origin",
      headers: cartHeaders()
    }).then(function (res) { return res.json(); }).then(updateCartBadge).catch(function () { return 0; });
  }

  function esc(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function cartPayload(data) {
    return (data && (data.payload || data.cart_details)) || {};
  }

  function itemSize(item) {
    var option = ((item && item.options) || []).filter(function (entry) {
      return entry && entry.value;
    })[0];
    return option ? option.value : "";
  }

  function itemTitle(item) {
    var name = (item && item.name) || "Specimen";
    var size = itemSize(item);
    if (size) {
      name = name.replace(" - " + size, "").replace(size, "").replace(/\s+-\s*$/, "").trim();
    }
    return name || "Specimen";
  }

  function itemPhotoUrl(item) {
    var image = item && item.images && item.images[0];
    return (image && isRealSrc(image.url)) ? hdImageUrl(image.url) : "";
  }

  function renderCartDrawer(data) {
    var host = qs("[data-ph-drawer-items]");
    var foot = qs("[data-ph-drawer-foot]");
    var sub = qs("[data-ph-drawer-subtotal]");
    var checkout = qs("[data-ph-drawer-checkout]");
    if (!host) return data;
    var payload = cartPayload(data);
    var items = payload.items || [];
    updateCartBadge(data);
    if (!items.length) {
      host.innerHTML = '<div class="ph-drawer-empty"><p>Your selection is empty.</p><a class="ph-btn" href="/all-collections">Browse collections</a></div>';
      if (foot) foot.hidden = true;
      return data;
    }
    host.innerHTML = items.map(function (item) {
      var photo = itemPhotoUrl(item);
      var size = itemSize(item);
      var bits = [];
      if (size) bits.push(size);
      if (item.sku) bits.push(item.sku);
      return (
        '<article class="ph-drawer-item" data-ph-drawer-row data-zs-product-variant-id="' + esc(item.variant_id || "") + '" data-zs-product-wrapper-lineitem-id="' + esc(item.line_item_id || "") + '">' +
          '<div class="ph-drawer-photo"' + (photo ? ' style="background-image:url(\'' + esc(photo) + '\')"' : "") + "></div>" +
          "<div>" +
            '<a class="ph-drawer-name" href="' + esc(item.url || "/cart") + '">' + esc(itemTitle(item)) + "</a>" +
            (bits.length ? '<p class="ph-drawer-meta">' + esc(bits.join(" · ")) + "</p>" : "") +
            '<div class="ph-drawer-row">' +
              '<div class="ph-qty-box">' +
                '<button type="button" class="ph-qty-btn" data-ph-drawer-minus aria-label="Decrease quantity">−</button>' +
                '<input class="ph-qty" data-zs-quantity type="number" min="1"' + (lineStockMax(item) !== null ? ' max="' + lineStockMax(item) + '"' : '') + ' value="' + esc(item.quantity || 1) + '" aria-label="Quantity">' +
                '<button type="button" class="ph-qty-btn" data-ph-drawer-plus aria-label="Increase quantity">+</button>' +
              "</div>" +
              '<div class="ph-drawer-price">' + esc(money(item.total_price != null ? item.total_price : item.selling_price)) + "</div>" +
            "</div>" +
            '<button type="button" class="ph-drawer-remove" data-ph-drawer-remove>Remove</button>' +
          "</div>" +
        "</article>"
      );
    }).join("");
    if (foot) foot.hidden = false;
    if (sub) sub.textContent = money(payload.sub_total);
    if (checkout) checkout.href = payload.checkout_url || "/checkout";
    return data;
  }

  function loadCartDrawer() {
    return fetch("/storefront/api/v1/cart", {
      credentials: "same-origin",
      headers: cartHeaders()
    }).then(function (res) { return res.json(); }).then(renderCartDrawer).catch(function () {});
  }

  function openCartDrawer() {
    var drawer = qs("[data-ph-drawer]");
    if (!drawer) return;
    drawer.classList.add("is-open");
    document.body.classList.add("ph-drawer-open");
    loadCartDrawer();
  }

  function closeCartDrawer() {
    var drawer = qs("[data-ph-drawer]");
    if (!drawer) return;
    drawer.classList.remove("is-open");
    document.body.classList.remove("ph-drawer-open");
  }

  function lineStockMax(item) {
    if (!item || item.is_stock_managed === false) return null;
    var stock = Number(item.stock_available);
    if (!isFinite(stock)) return null;
    if (item.is_out_of_stock || item.is_available_for_purchase === false) return 0;
    return Math.max(0, Math.floor(stock));
  }

  function capLineQty(qty, next) {
    var value = Math.max(1, parseInt(next, 10) || 1);
    if (qty && qty.hasAttribute("max")) {
      var max = parseInt(qty.getAttribute("max"), 10);
      if (isFinite(max)) {
        if (max < 1) return null;
        value = Math.min(value, max);
      }
    }
    return value;
  }

  function changeDrawerQty(row, next) {
    var qty = qs("[data-zs-quantity]", row);
    var variantId = row.getAttribute("data-zs-product-variant-id");
    var lineId = row.getAttribute("data-zs-product-wrapper-lineitem-id");
    if (!qty || !variantId) return;
    var capped = capLineQty(qty, next);
    if (capped === null) return;
    qty.value = String(capped);
    var body = { product_variant_id: variantId, quantity: qty.value };
    if (lineId) body.line_item_id = lineId;
    fetch("/storefront/api/v1/cart", {
      method: "PUT",
      headers: cartHeaders(),
      credentials: "same-origin",
      body: JSON.stringify(body)
    }).then(function (res) { return res.json(); }).then(function (data) {
      if (data && (data.payload || data.cart_details)) renderCartDrawer(data);
      else loadCartDrawer();
    }).catch(loadCartDrawer);
  }

  function removeDrawerRow(row) {
    var variantId = row.getAttribute("data-zs-product-variant-id");
    var lineId = row.getAttribute("data-zs-product-wrapper-lineitem-id");
    if (!variantId) return;
    var url = "/storefront/api/v1/cart?product_variant_id=" + encodeURIComponent(variantId);
    if (lineId) url += "&line_item_id=" + encodeURIComponent(lineId);
    fetch(url, {
      method: "DELETE",
      headers: cartHeaders(),
      credentials: "same-origin"
    }).then(loadCartDrawer).catch(loadCartDrawer);
  }

  function bindCartDrawer() {
    if (!qs("[data-ph-drawer]")) return;
    qsa("[data-ph-cart-link], [data-ph-open-cart]").forEach(function (el) {
      el.addEventListener("click", function (event) {
        event.preventDefault();
        openCartDrawer();
      });
    });
    qsa("[data-ph-drawer-close]").forEach(function (el) {
      el.addEventListener("click", closeCartDrawer);
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeCartDrawer();
    });
    var host = qs("[data-ph-drawer-items]");
    if (!host) return;
    host.addEventListener("click", function (event) {
      var row = event.target.closest("[data-ph-drawer-row]");
      if (!row) return;
      var qty = qs("[data-zs-quantity]", row);
      var current = parseInt((qty && qty.value) || "1", 10);
      if (event.target.closest("[data-ph-drawer-minus]")) changeDrawerQty(row, current - 1);
      if (event.target.closest("[data-ph-drawer-plus]")) changeDrawerQty(row, current + 1);
      if (event.target.closest("[data-ph-drawer-remove]")) removeDrawerRow(row);
    });
    host.addEventListener("change", function (event) {
      if (!event.target || !event.target.hasAttribute("data-zs-quantity")) return;
      var row = event.target.closest("[data-ph-drawer-row]");
      if (row) changeDrawerQty(row, parseInt(event.target.value || "1", 10));
    });
  }

  function realImages(list) {
    return (list || []).filter(function (image) {
      return image && image.url && !image.is_placeholder_image && image.url.indexOf("no-preview-image") === -1;
    });
  }

  function isRealSrc(src) {
    if (!src) return false;
    var value = String(src);
    return value.indexOf("no-preview-image") === -1
      && value.indexOf("unsplash") === -1
      && value.indexOf("zcstock-images") === -1
      && value.indexOf("zfcommerce/stock-images") === -1
      && value.indexOf("/stock-images/") === -1;
  }

  function hdImageUrl(url, size) {
    if (!url) return "";
    var value = String(url).replace(/&amp;/g, "&").replace(/\/(original|\d{2,4}x\d{2,4})\/?(?=\?|$)/i, "");
    if (!isRealSrc(value)) return value;
    var sized = size || "1600x1600";
    var match = value.match(/^(https?:\/\/[^/?#]+)?(\/(?:product-images|category-images)\/[^/?#]+\.(?:jpe?g|png|webp|gif)\/\d+)/i);
    if (match) return (match[1] || "") + match[2] + "/" + sized;
    return value;
  }

  function upgradeStoreImages(root) {
    qsa("img", root || document).forEach(function (img) {
      var src = img.getAttribute("src") || "";
      var hd = hdImageUrl(src);
      if (hd && hd !== src) img.setAttribute("src", hd);
    });
    qsa("[style*='background-image']", root || document).forEach(function (el) {
      var bg = el.style.backgroundImage || "";
      var found = bg.match(/url\(['"]?([^'")]+)['"]?\)/);
      if (!found) return;
      var hd = hdImageUrl(found[1]);
      if (hd && hd !== found[1]) el.style.backgroundImage = "url('" + hd + "')";
    });
    qsa("[data-ph-real-photo]", root || document).forEach(function (el) {
      var src = el.getAttribute("data-ph-real-photo") || "";
      var hd = hdImageUrl(src);
      if (hd && hd !== src) el.setAttribute("data-ph-real-photo", hd);
    });
  }

  function isImageUrl(url) {
    return /^data:image\//i.test(url) || /(?:product|category)-images\//i.test(url) || /\.(?:jpe?g|png|webp|gif|avif|svg)(?:[/?#]|$)/i.test(url);
  }

  function setPhoto(el, url) {
    if (!el || !url || !isRealSrc(url) || !isImageUrl(url)) return;
    el.style.backgroundImage = "url('" + hdImageUrl(url) + "')";
  }

  function hasPhoto(el) {
    var bg = (el && el.style && el.style.backgroundImage) || "";
    return !!(bg && bg !== "none" && bg.indexOf("unsplash") === -1);
  }

  function firstRealUrl(data) {
    var found = "";
    function walk(node, depth) {
      if (found || !node || depth > 7) return;
      if (Array.isArray(node)) {
        node.forEach(function (item) { walk(item, depth + 1); });
        return;
      }
      if (typeof node !== "object") return;
      if (node.url && isRealSrc(node.url) && isImageUrl(node.url) && !node.is_placeholder_image) {
        found = hdImageUrl(node.url);
        return;
      }
      ["images", "products", "payload", "sub_categories", "variants", "category"].forEach(function (key) {
        if (node[key]) walk(node[key], depth + 1);
      });
    }
    walk(data, 0);
    return found;
  }

  function photoCacheGet() {
    try {
      var cache = JSON.parse(sessionStorage.getItem("phCatPhotosV2") || "{}");
      Object.keys(cache).forEach(function (key) {
        cache[key] = hdImageUrl(cache[key]);
      });
      return cache;
    } catch (err) { return {}; }
  }

  function photoCacheSet(cache) {
    try { sessionStorage.setItem("phCatPhotosV2", JSON.stringify(cache)); } catch (err) {}
  }

  function photoFromHtml(html) {
    var urls = String(html || "").match(/https?:[^"'\\\s<>]+(?:product-images|category-images)[^"'\\\s<>]*/gi) || [];
    var i;
    for (i = 0; i < urls.length; i++) {
      var url = urls[i].replace(/&amp;/g, "&");
      if (isRealSrc(url)) return hdImageUrl(url);
    }
    return "";
  }

  // The storefront API ignores category_id and returns every product.
  function productsInCategory(data, id) {
    var list = (data && data.payload && data.payload.products) || [];
    return list.filter(function (item) { return String(item.category_id || "") === String(id); });
  }

  function loadCatPhoto(id, href) {
    var cache = photoCacheGet();
    if (cache[id]) return Promise.resolve(cache[id]);
    function remember(url) {
      if (url) {
        cache[id] = url;
        photoCacheSet(cache);
      }
      return url || "";
    }
    var pageUrl = href && href.indexOf("/categories/") === 0 ? href : "/categories/" + id;
    return fetch("/storefront/api/v1/products?category_id=" + encodeURIComponent(id), { credentials: "same-origin" }).then(function (res) {
      return res.json();
    }).then(function (data) {
      var url = firstRealUrl(productsInCategory(data, id));
      if (url) return remember(url);
      return fetch(pageUrl, { credentials: "same-origin" }).then(function (res) { return res.text(); }).then(function (html) {
        return remember(photoFromHtml(html));
      });
    }).catch(function () {
      return fetch(pageUrl, { credentials: "same-origin" }).then(function (res) { return res.text(); }).then(function (html) {
        return remember(photoFromHtml(html));
      }).catch(function () { return ""; });
    });
  }

  function fillFileSlots() {
    var slots = qsa("[data-ph-file-slot]");
    if (!slots.length) return;
    function tryNames(names) {
      var exts = [".jpg", ".jpeg", ".png", ".webp", ".JPG", ".PNG"];
      var queue = [];
      names.forEach(function (name) {
        name = (name || "").trim();
        if (!name) return;
        exts.forEach(function (ext) {
          queue.push("/" + encodeURIComponent(name + ext).replace(/%2F/g, "/"));
          queue.push("/" + name + ext);
        });
      });
      return queue.reduce(function (prev, url) {
        return prev.then(function (found) {
          if (found) return found;
          return fetch(url, { credentials: "same-origin" }).then(function (res) {
            var type = (res.headers.get("content-type") || "").toLowerCase();
            return (res.ok && type.indexOf("image/") === 0) ? url : "";
          }).catch(function () { return ""; });
        });
      }, Promise.resolve(""));
    }
    slots.forEach(function (el) {
      if (hasPhoto(el)) return;
      var names = (el.getAttribute("data-ph-file-names") || "").split(/\s+/);
      tryNames(names).then(function (url) {
        if (url && isRealSrc(url)) setPhoto(el, url);
      });
    });
  }

  function fillPagePhotos() {
    var hosts = qsa("[data-ph-page-content]:not([data-ph-home-content])");
    var slots = qsa("[data-ph-page-photo]");
    var urls = [];
    hosts.forEach(function (host) {
      qsa("img", host).forEach(function (img) {
        var src = img.currentSrc || img.getAttribute("src") || "";
        if (!isRealSrc(src)) return;
        urls.push(src);
        img.setAttribute("data-ph-used-in-slot", "true");
      });
      var text = (host.textContent || "").replace(/\s+/g, "");
      var leftover = qsa("img", host).filter(function (img) { return !img.getAttribute("data-ph-used-in-slot"); });
      if (!text && !leftover.length) host.classList.add("is-empty");
    });
    slots.forEach(function (el, index) {
      if (urls[index]) setPhoto(el, urls[index]);
    });
    qsa("[data-ph-used-in-slot]").forEach(function (img) {
      img.style.display = "none";
    });
  }

  function fillMissingCatPhotos() {
    qsa("[data-ph-cat-photo]").forEach(function (el) {
      if (hasPhoto(el)) return;
      var marked = qs("[data-ph-real-photo]", el);
      if (marked && isRealSrc(marked.getAttribute("data-ph-real-photo"))) {
        setPhoto(el, marked.getAttribute("data-ph-real-photo"));
        return;
      }
      var id = el.getAttribute("data-ph-cat-photo") || "";
      var card = el.closest("a[href], [data-ph-cat-id]");
      var href = (card && (card.getAttribute("href") || "")) || "";
      if (!id) return;
      loadCatPhoto(id, href).then(function (url) {
        if (url) setPhoto(el, url);
      });
    });
  }

  function fillImgList(host, images, alt) {
    if (!host) return;
    host.innerHTML = "";
    images.forEach(function (image, index) {
      var img = document.createElement("img");
      img.src = hdImageUrl(image.url);
      img.alt = image.alternate_text || alt || "";
      img.setAttribute("data-zs-image", "");
      if (index > 0) img.className = "ph-gallery-more";
      host.appendChild(img);
    });
  }

  function fillProductImages() {
    var product = window.zs_product;
    var images = realImages(product && product.images);
    if (product && !images.length) {
      var variants = product.variants || [];
      variants.forEach(function (variant) {
        images = images.concat(realImages(variant.images));
      });
    }
    if (images.length) {
      qsa("[data-ph-gallery]").forEach(function (gal) {
        if (gal.hasAttribute("data-ph-product-gallery")) {
          if (!gal.querySelector("img[src*='product-images']")) {
            var list = qs("[data-ph-product-images]", gal) || qs("[data-ph-main-image]", gal) || gal;
            fillImgList(list, images, product.name);
          }
          enhanceProductGallery(gal);
          return;
        }
        if (gal.querySelector("img[src*='product-images']")) return;
        var list = qs("[data-ph-product-images]", gal) || gal;
        fillImgList(list, images, product.name);
      });
    } else {
      qsa("[data-ph-product-gallery]").forEach(enhanceProductGallery);
    }
    var category = window.zs_category;
    var byCategory = {};
    ((category && category.products) || []).forEach(function (item) {
      var photos = realImages(item.images);
      if (item.category_id && photos.length) byCategory[item.category_id] = photos[0].url;
    });
    qsa("[data-ph-cat-photo]").forEach(function (el, index) {
      var sub = ((category && category.sub_categories) || [])[index] || {};
      var id = el.getAttribute("data-ph-cat-photo") || sub.id || sub.category_id || "";
      if (id) {
        el.setAttribute("data-ph-cat-photo", id);
        var card = el.closest("[data-ph-cat-id], a.ph-product-card");
        if (card && !card.getAttribute("data-ph-cat-id")) card.setAttribute("data-ph-cat-id", id);
      }
      var marked = qs("[data-ph-real-photo]", el);
      var url = (marked && marked.getAttribute("data-ph-real-photo")) || byCategory[id] || "";
      if (url) setPhoto(el, url);
    });

    var products = (category && category.products) || [];
    products.forEach(function (item) {
      var card = qs("[data-ph-product-id='" + item.product_id + "']");
      if (!card) return;
      var photos = realImages(item.images);
      var gal = qs("[data-ph-gallery]", card);
      if (gal && photos.length && !gal.querySelector("img[src*='product-images']")) {
        var list = qs("[data-ph-product-images]", gal) || gal;
        fillImgList(list, photos, item.name);
      }
      var source = qs("[data-ph-option-source]", card);
      var ids = [];
      if (source && source.textContent.trim()) {
        ids = source.textContent.trim().split(/\s+/);
      } else {
        (item.attributes || []).forEach(function (attribute) {
          (attribute.options || []).forEach(function (option) {
            if (option.id) ids.push(String(option.id));
          });
        });
        (item.variants || []).forEach(function (variant) {
          (variant.options || []).forEach(function (option) {
            if (option.id) ids.push(String(option.id));
          });
        });
      }
      if (ids.length) card.setAttribute("data-ph-options", ids.join(" "));
    });
  }

  function stripNoise(root) {
    if (!root || !root.childNodes) return;
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
    var doomed = [];
    var node;
    while ((node = walker.nextNode())) {
      var value = node.nodeValue || "";
      if (/^[nN\s]+$/.test(value) && /[nN]/.test(value)) {
        doomed.push(node);
        continue;
      }
      if (/\/template\/[a-f0-9]{16,}/i.test(value) && !/\.(svg|png|jpe?g|css|js|webp)/i.test(value)) {
        doomed.push(node);
      }
    }
    doomed.forEach(function (textNode) {
      if (textNode.parentNode) textNode.parentNode.removeChild(textNode);
    });
    qsa("a[href], img[src]", root).forEach(function (el) {
      var v = el.getAttribute("href") || el.getAttribute("src") || "";
      if (/\/template\/[a-f0-9]+\/?$/i.test(v) && !/\.(svg|png|jpe?g|webp|ico)/i.test(v) && v.indexOf("/canvas/") === -1) {
        el.style.display = "none";
      }
    });
  }

  function tidyCategoryCatalog() {
    var cat = window.zs_category;
    var subCards = qsa(".ph-category-grid .ph-product-card");
    var hasSubs = subCards.length > 0 || !!(cat && cat.sub_categories && cat.sub_categories.length);
    var subGroup = qs("[data-ph-subcats]") || qs(".ph-cat-group");
    var productGrid = qs("[data-ph-product-grid]");
    if (subGroup && !hasSubs) subGroup.hidden = true;
    if (hasSubs && productGrid) productGrid.hidden = true;
  }

  function markCurrentNav() {
    var path = (location.pathname || "/").replace(/\/+$/, "") || "/";
    qsa(".ph-nav-list a").forEach(function (link) {
      var href = (link.getAttribute("href") || "").replace(/\/+$/, "") || "/";
      if (href === path || (href !== "/" && path.indexOf(href) === 0)) {
        link.setAttribute("aria-current", "page");
      }
    });
  }

  function enhanceProductGallery(gal) {
    if (!gal) return;
    var imgs = qsa("img", gal).filter(function (img) { return isRealSrc(img.currentSrc || img.src); });
    if (!imgs.length) return;
    var mainHost = qs("[data-ph-main-image]", gal);
    var thumbs = qs("[data-ph-thumbs]", gal) || qs("[data-ph-thumbs]");
    if (!mainHost) return;
    var urls = [];
    imgs.forEach(function (img) {
      var src = img.currentSrc || img.src;
      if (src && urls.indexOf(src) === -1) urls.push(src);
    });
    var sourceList = qs("[data-ph-product-images]", gal);
    if (sourceList && sourceList !== mainHost) sourceList.style.display = "none";
    var alt = (imgs[0] && imgs[0].alt) || "";
    mainHost.innerHTML = "";
    var main = document.createElement("img");
    main.src = hdImageUrl(urls[0], "original");
    main.alt = alt;
    mainHost.appendChild(main);
    if (!thumbs) return;
    thumbs.innerHTML = "";
    urls.forEach(function (src, index) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "ph-thumb" + (index === 0 ? " is-active" : "");
      var thumb = document.createElement("img");
      thumb.src = hdImageUrl(src);
      thumb.alt = "";
      btn.appendChild(thumb);
      btn.addEventListener("click", function () {
        main.src = hdImageUrl(src, "original");
        qsa(".ph-thumb", thumbs).forEach(function (el) { el.classList.remove("is-active"); });
        btn.classList.add("is-active");
      });
      thumbs.appendChild(btn);
    });
  }

  function money(amount) {
    var num = Number(amount);
    if (!isFinite(num)) return "";
    var symbol = (window.zs_currency && (zs_currency.symbol || zs_currency.currency_symbol)) || "AED ";
    return String(symbol).trim() + " " + Math.round(num).toLocaleString("en-US");
  }

  function productVariants() {
    return (window.zs_product && zs_product.variants) || [];
  }

  function findVariant(id) {
    return productVariants().filter(function (variant) {
      return String(variant.variant_id) === String(id);
    })[0] || null;
  }

  function findVariantByOptions(selected) {
    var wanted = (selected || []).map(String).sort().join();
    if (!wanted) return null;
    return productVariants().filter(function (variant) {
      var ids = (variant.options || []).map(function (option) { return String(option.id); }).sort().join();
      return ids === wanted;
    })[0] || null;
  }

  function variantStockCap(variant) {
    if (!variant || variant.is_stock_managed === false) return null;
    var stock = Number(variant.stock_available);
    return isFinite(stock) ? Math.floor(stock) : null;
  }

  function variantIsUnavailable(variant) {
    if (!variant) return true;
    if (variant.is_available_for_purchase === false || variant.hide_add_to_cart) return true;
    if (variant.is_out_of_stock) return true;
    var stock = variantStockCap(variant);
    return stock !== null && stock <= 0;
  }

  function clampQty(qty) {
    if (!qty) return 1;
    var min = parseInt(qty.getAttribute("min") || "1", 10);
    if (!isFinite(min) || min < 1) min = 1;
    var next = parseInt(qty.value || String(min), 10);
    if (!isFinite(next) || next < min) next = min;
    if (qty.hasAttribute("max")) {
      var max = parseInt(qty.getAttribute("max"), 10);
      if (isFinite(max) && max >= min) next = Math.min(next, max);
    }
    qty.value = String(next);
    return next;
  }

  function applyVariant(variant, options) {
    if (!variant) return;
    options = options || {};
    var button = qs("[data-zs-add-to-cart]");
    if (button) button.setAttribute("data-zs-product-variant-id", variant.variant_id);
    var price = qs("[data-ph-price]");
    if (price && !variant.hide_price && (variant.selling_price || variant.selling_price === 0)) {
      price.setAttribute("data-zs-selling-price", variant.selling_price);
      price.textContent = money(variant.selling_price);
    }
    var size = ((variant.options || [])[0] && variant.options[0].value) || "";
    var sizeLabel = qs("[data-ph-size-label]");
    if (sizeLabel) sizeLabel.textContent = size ? "· " + size : "";
    var sku = qs("[data-ph-sku]");
    if (sku) sku.textContent = variant.sku ? "SKU " + variant.sku : "";
    var specSize = qs("[data-ph-spec-size]");
    if (specSize) specSize.textContent = size || "—";
    var specSku = qs("[data-ph-spec-sku]");
    if (specSku) specSku.textContent = variant.sku || "—";
    var stock = variantStockCap(variant);
    var unavailable = variantIsUnavailable(variant);
    var stockEl = qs("[data-ph-stock]");
    var specStock = qs("[data-ph-spec-stock]");
    var stockText = unavailable ? "Out of stock" : (stock > 0 ? stock + " in nursery" : "Available");
    if (stockEl) {
      stockEl.hidden = false;
      stockEl.className = "ph-stock" + (unavailable ? " is-oos" : (stock > 0 && stock <= 3 ? " is-low" : ""));
      stockEl.textContent = stockText;
    }
    if (specStock) specStock.textContent = unavailable ? "Out of stock" : (stock > 0 ? stock + " NOS" : "Available");
    if (button) {
      button.disabled = unavailable;
      button.textContent = unavailable ? "Out of stock" : "Add to selection";
    }
    var qty = qs(".ph-product-page [data-zs-quantity]");
    if (qty) {
      if (stock !== null && stock > 0) {
        qty.disabled = false;
        qty.setAttribute("max", String(stock));
      } else if (unavailable) {
        qty.disabled = true;
        qty.setAttribute("max", "1");
        qty.value = "1";
      } else {
        qty.disabled = false;
        qty.removeAttribute("max");
      }
      clampQty(qty);
    }
    qsa("[data-zs-wishlist-element]").forEach(function (el) {
      el.setAttribute("data-zs-wishlist-variant-id", variant.variant_id);
    });
    qsa("[data-ph-size-chip]").forEach(function (chip) {
      var on = String(chip.getAttribute("data-ph-variant-id")) === String(variant.variant_id);
      chip.classList.toggle("is-active", on);
      chip.setAttribute("aria-pressed", on ? "true" : "false");
    });
    qsa("[data-zs-attribute-select]").forEach(function (sel) {
      (variant.options || []).forEach(function (option) {
        if (Array.from(sel.options).some(function (choice) { return String(choice.value) === String(option.id); })) {
          sel.value = String(option.id);
        }
      });
    });
    var pick = qs("[data-ph-variant-pick]");
    if (pick) pick.value = variant.variant_id;
    if (options.updateUrl !== false) {
      try {
        var url = new URL(location.href);
        url.searchParams.set("variant", variant.variant_id);
        history.replaceState({}, "", url.pathname + "?" + url.searchParams.toString());
      } catch (err) {}
    }
  }

  function ensureSizeChips() {
    var host = qs("[data-ph-size-chips]");
    var variants = productVariants();
    if (!host || !variants.length) return;
    if (!host.children.length) {
      variants.forEach(function (variant) {
        var chip = document.createElement("button");
        chip.type = "button";
        chip.className = "ph-size-chip";
        chip.setAttribute("data-ph-size-chip", "");
        chip.setAttribute("data-ph-variant-id", variant.variant_id);
        chip.textContent = ((variant.options || [])[0] && variant.options[0].value) || variant.sku || "Size";
        host.appendChild(chip);
      });
    }
    qsa("[data-ph-size-chip]").forEach(function (chip) {
      var variant = findVariant(chip.getAttribute("data-ph-variant-id"));
      var blocked = variantIsUnavailable(variant);
      chip.classList.toggle("is-oos", blocked);
      chip.disabled = blocked;
      chip.setAttribute("aria-disabled", blocked ? "true" : "false");
    });
  }

  function bindProductBuy() {
    qsa("[data-zs-variants] option[data-ph-option-ids]").forEach(function (opt) {
      var ids = (opt.getAttribute("data-ph-option-ids") || "").trim().split(/\s+/).filter(Boolean);
      opt.setAttribute("data-zs-attributes", JSON.stringify(ids));
    });
    var button = qs("[data-zs-add-to-cart]");
    var hidden = qs("[data-zs-variants]");
    ensureSizeChips();
    function resolveVariant(updateUrl) {
      var pick = qs("[data-ph-variant-pick]");
      var variant = null;
      if (pick && pick.value) variant = findVariant(pick.value);
      if (!variant) {
        var selected = qsa("[data-zs-attribute-select]").map(function (sel) { return sel.value; }).filter(Boolean);
        variant = findVariantByOptions(selected);
      }
      if (!variant && hidden && button) {
        var selected = [];
        qsa("[data-zs-attribute-select]").forEach(function (sel) {
          if (sel.value) selected.push(String(sel.value));
        });
        selected.sort();
        Array.from(hidden.options).forEach(function (opt) {
          var ids = [];
          try { ids = JSON.parse(opt.getAttribute("data-zs-attributes") || "[]"); } catch (err) { ids = []; }
          ids = (ids || []).map(String).sort();
          if (selected.length && ids.join() === selected.join() && opt.value && opt.value !== "-1") {
            variant = findVariant(opt.value) || { variant_id: opt.value };
          }
        });
      }
      if (variant) applyVariant(variant, { updateUrl: updateUrl !== false });
      else if (button) button.removeAttribute("data-zs-product-variant-id");
    }
    var wanted = new URLSearchParams(location.search).get("variant");
    qsa("[data-ph-size-chip]").forEach(function (chip) {
      chip.addEventListener("click", function () {
        var variant = findVariant(chip.getAttribute("data-ph-variant-id"));
        if (!variant || variantIsUnavailable(variant)) return;
        applyVariant(variant);
      });
    });
    qsa("[data-zs-attribute-select], [data-ph-variant-pick]").forEach(function (sel) {
      sel.addEventListener("change", function () { resolveVariant(true); });
    });
    var qty = qs(".ph-product-page [data-zs-quantity]");
    var minus = qs(".ph-product-page [data-ph-qty-minus]");
    var plus = qs(".ph-product-page [data-ph-qty-plus]");
    if (qty && minus) {
      minus.addEventListener("click", function () {
        qty.value = String(Math.max(1, parseInt(qty.value || "1", 10) - 1));
      });
    }
    if (qty && plus) {
      plus.addEventListener("click", function () {
        if (qty.disabled) return;
        var current = parseInt(qty.value || "1", 10);
        var max = qty.hasAttribute("max") ? parseInt(qty.getAttribute("max"), 10) : current;
        if (!isFinite(max)) max = current;
        qty.value = String(Math.min(max, current + 1));
        clampQty(qty);
      });
    }
    if (qty) {
      qty.addEventListener("input", function () { clampQty(qty); });
      qty.addEventListener("change", function () { clampQty(qty); });
    }
    qsa("[data-zs-attribute-select] option").forEach(function (choice) {
      if (!choice.value) return;
      var matches = productVariants().filter(function (variant) {
        return (variant.options || []).some(function (option) { return String(option.id) === String(choice.value); });
      });
      if (matches.length && matches.every(variantIsUnavailable)) choice.disabled = true;
    });
    if (wanted && findVariant(wanted)) applyVariant(findVariant(wanted), { updateUrl: false });
    else {
      resolveVariant(false);
      var chosen = findVariant(button && button.getAttribute("data-zs-product-variant-id"));
      if (variantIsUnavailable(chosen)) {
        var open = productVariants().filter(function (variant) { return !variantIsUnavailable(variant); })[0];
        if (open) applyVariant(open, { updateUrl: false });
      }
    }
    if (button) {
      button.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();
        resolveVariant();
        var variantId = button.getAttribute("data-zs-product-variant-id");
        var err = qs("[data-theme-error]");
        if (!variantId) {
          if (err) {
            err.style.display = "block";
            err.textContent = "Select a size first.";
          }
          var size = qs("[data-zs-attribute-select], [data-ph-variant-pick]");
          if (size) size.focus();
          return;
        }
        if (err) {
          err.style.display = "none";
          err.textContent = "";
        }
        var qtyEl = qs("[data-zs-quantity]");
        if (variantIsUnavailable(findVariant(variantId))) {
          button.disabled = true;
          button.textContent = "Out of stock";
          return;
        }
        var note = qs("[data-ph-buy-ok]");
        var variant = findVariant(variantId);
        var sizeLabel = ((variant && variant.options && variant.options[0]) && variant.options[0].value) || "Size";
        button.disabled = true;
        fetch("/storefront/api/v1/cart", {
          method: "POST",
          headers: cartHeaders(),
          credentials: "same-origin",
          body: JSON.stringify({
            product_variant_id: variantId,
            quantity: String(variantIsUnavailable(variant) ? 0 : clampQty(qtyEl))
          })
        }).then(function (res) { return res.json(); }).then(function (data) {
          var ok = data && ((data.payload && data.payload.items) || (data.cart_details && data.cart_details.items) || data.status_code === "0" || data.status_message === "success");
          button.disabled = variantIsUnavailable(variant);
          if (ok) {
            updateCartBadge(data);
            renderCartDrawer(data);
            openCartDrawer();
            if (note) {
              note.hidden = false;
              note.textContent = sizeLabel + " added to your selection.";
            }
            return;
          }
          if (err) {
            err.style.display = "block";
            err.textContent = (data.error && data.error.message) || (data.cart_details && data.cart_details.message) || "Could not add this specimen.";
          }
        }).catch(function () {
          button.disabled = variantIsUnavailable(findVariant(variantId));
          if (err) {
            err.style.display = "block";
            err.textContent = "Could not add this specimen.";
          }
        });
      });
    }
  }

  function collectSizeOptions() {
    var seen = {};
    var options = [];
    function add(id, name) {
      var label = (name || id || "").trim();
      var key = label.toLowerCase();
      if (!id || seen[id] || seen[key]) return;
      seen[id] = true;
      seen[key] = true;
      options.push({ id: String(id), name: label });
    }
    qsa("[data-ph-filter='attribute']").forEach(function (input) {
      add(input.getAttribute("data-ph-id"), (input.nextElementSibling && input.nextElementSibling.textContent) || "");
    });
    var products = ((window.zs_category && zs_category.products) || []).concat(window.zs_product ? [zs_product] : []);
    products.forEach(function (item) {
      var fromAttrs = false;
      (item.attributes || []).forEach(function (attribute) {
        if (!/size/i.test(attribute.name || "")) return;
        fromAttrs = true;
        (attribute.options || []).forEach(function (option) {
          add(option.id, option.value || option.name);
        });
      });
      if (fromAttrs) return;
      (item.variants || []).forEach(function (variant) {
        (variant.options || []).forEach(function (option) {
          add(option.id, option.value || option.name);
        });
      });
    });
    return options;
  }

  function bindFilters() {
    var host = qs("[data-ph-filters]");
    if (!host) return;
    qsa(".ph-filter-group", host).forEach(function (group) {
      if (group.getAttribute("data-ph-size-host") !== null) return;
      var type = group.getAttribute("data-ph-filter-type") || "";
      var hasOpt = qs(".ph-filter-opt, .ph-filter-list a", group);
      if (!hasOpt || type === "colours") group.style.display = "none";
      if (type === "category" && qs("[data-ph-filter-group='species']")) group.style.display = "none";
    });
    var sizeHost = qs("[data-ph-size-host]");
    var sizeBox = qs("[data-ph-size-options]");
    if (sizeHost && sizeBox && !sizeBox.children.length) {
      collectSizeOptions().forEach(function (option) {
        var label = document.createElement("label");
        label.className = "ph-filter-opt";
        label.innerHTML = '<input type="checkbox" data-ph-filter="attribute" data-ph-id="' + option.id + '"><span>' + option.name + "</span>";
        sizeBox.appendChild(label);
      });
      if (sizeBox.children.length) sizeHost.hidden = false;
    }
    qsa("[data-ph-filter='category']").forEach(function (input) {
      input.addEventListener("change", function () {
        if (!input.checked) return;
        var id = input.getAttribute("data-ph-id");
        var link = qs("[data-ph-cat-id='" + id + "']");
        if (link && link.href) {
          window.location.href = link.href;
          return;
        }
        window.location.href = "/categories/" + id;
      });
    });
    qsa("[data-ph-product-card]").forEach(function (card) {
      var source = qs("[data-ph-option-source]", card);
      if (source && source.textContent.trim()) {
        card.setAttribute("data-ph-options", source.textContent.trim());
      }
    });
    function apply() {
      var ids = qsa("[data-ph-filter='attribute']:checked").map(function (input) {
        return input.getAttribute("data-ph-id");
      });
      qsa("[data-ph-product-card]").forEach(function (card) {
        var opts = (card.getAttribute("data-ph-options") || "").split(/\s+/).filter(Boolean);
        var ok = !ids.length || ids.some(function (id) { return opts.indexOf(id) >= 0; });
        card.style.display = ok ? "" : "none";
      });
    }
    host.addEventListener("change", function (event) {
      if (event.target && event.target.getAttribute("data-ph-filter") === "attribute") apply();
    });
    apply();
  }

  function variantFromUrl(url) {
    try {
      return new URL(url, location.origin).searchParams.get("variant") || "";
    } catch (err) {
      return "";
    }
  }

  function bindCart() {
    var root = qs("[data-cart-items]");
    if (!root) return;

    function updateRow(row) {
      var qty = qs("[data-zs-quantity]", row);
      var variantId = row.getAttribute("data-zs-product-variant-id");
      var lineId = row.getAttribute("data-zs-product-wrapper-lineitem-id");
      if (!variantId || !qty) return;
      var cappedQty = capLineQty(qty, qty.value);
      if (cappedQty === null) return;
      qty.value = String(cappedQty);
      var body = { product_variant_id: variantId, quantity: String(cappedQty) };
      if (lineId) body.line_item_id = lineId;
      fetch("/storefront/api/v1/cart", {
        method: "PUT",
        headers: cartHeaders(),
        credentials: "same-origin",
        body: JSON.stringify(body)
      }).then(function () { window.location.reload(); });
    }

    function removeRow(row) {
      var variantId = row.getAttribute("data-zs-product-variant-id");
      var lineId = row.getAttribute("data-zs-product-wrapper-lineitem-id");
      if (!variantId) return;
      var url = "/storefront/api/v1/cart?product_variant_id=" + encodeURIComponent(variantId);
      if (lineId) url += "&line_item_id=" + encodeURIComponent(lineId);
      fetch(url, {
        method: "DELETE",
        headers: cartHeaders(),
        credentials: "same-origin"
      }).then(function () { window.location.reload(); });
    }

    fetch("/storefront/api/v1/cart", {
      credentials: "same-origin",
      headers: cartHeaders()
    }).then(function (res) { return res.json(); }).then(function (data) {
      var payload = data.payload || data.cart_details || {};
      var items = payload.items || [];
      var rows = qsa("[data-ph-cart-row]", root);
      items.forEach(function (item) {
        var row = rows.filter(function (el) {
          var url = el.getAttribute("data-ph-item-url") || "";
          return variantFromUrl(url) === String(item.variant_id) || url.indexOf(item.variant_id) >= 0;
        })[0] || rows[items.indexOf(item)];
        if (!row) return;
        row.setAttribute("data-zs-product-id", item.product_id || "");
        row.setAttribute("data-zs-product-variant-id", item.variant_id || "");
        row.setAttribute("data-zs-product-wrapper-lineitem-id", item.line_item_id || "");
        var qty = qs("[data-zs-quantity]", row);
        if (qty) {
          qty.setAttribute("data-zs-product-id", item.product_id || "");
          qty.setAttribute("data-zs-product-variant-id", item.variant_id || "");
          qty.setAttribute("data-zs-product-lineitem-id", item.line_item_id || "");
          var lineMax = lineStockMax(item);
          if (lineMax !== null) qty.setAttribute("max", String(lineMax));
          qty.value = item.quantity;
        }
        var del = qs("[data-zs-delete]", row);
        if (del) {
          del.setAttribute("data-zs-product-id", item.product_id || "");
          del.setAttribute("data-zs-product-variant-id", item.variant_id || "");
          del.setAttribute("data-zs-product-lineitem-id", item.line_item_id || "");
        }
        var photo = (item.images && item.images[0] && item.images[0].url) || "";
        if (photo && photo.indexOf("no-preview-image") === -1) setPhoto(qs("[data-ph-cart-photo]", row), photo);
        var meta = qs("[data-ph-cart-meta]", row);
        if (meta) {
          var bits = [];
          if (item.sku) bits.push(item.sku);
          (item.options || []).forEach(function (option) {
            if (option.value) bits.push(option.value);
          });
          meta.textContent = bits.join(" · ");
        }
        var unit = qs("[data-ph-cart-unit]", row);
        if (unit && (item.selling_price || item.selling_price === 0)) {
          unit.textContent = (payload.symbol || "AED") + item.selling_price;
        }
      });
    });

    root.addEventListener("click", function (event) {
      var row = event.target.closest("[data-ph-cart-row]");
      if (!row) return;
      var qty = qs("[data-zs-quantity]", row);
      if (event.target.closest("[data-ph-qty-minus]") && qty) {
        qty.value = Math.max(1, parseInt(qty.value || "1", 10) - 1);
        updateRow(row);
      }
      if (event.target.closest("[data-ph-qty-plus]") && qty) {
        var raised = capLineQty(qty, parseInt(qty.value || "1", 10) + 1);
        if (raised === null) return;
        qty.value = String(raised);
        updateRow(row);
      }
      if (event.target.closest("[data-ph-remove]")) removeRow(row);
    });
    root.addEventListener("change", function (event) {
      if (event.target && event.target.hasAttribute("data-zs-quantity")) {
        var row = event.target.closest("[data-ph-cart-row]");
        if (row) updateRow(row);
      }
    });
  }

  function bindHero() {
    var root = document.querySelector("[data-ph-hero]");
    if (!root || root.getAttribute("data-ph-hero-ready")) return;
    root.setAttribute("data-ph-hero-ready", "true");
    var slides = root.querySelectorAll("[data-ph-slide]");
    var dots = root.querySelectorAll("[data-ph-hero-dot]");
    var sources = root.querySelectorAll("[data-ph-hero-source]");
    var kicker = root.querySelector("[data-ph-hero-kicker]");
    var title = root.querySelector("[data-ph-hero-title]");
    var lead = root.querySelector("[data-ph-hero-lead]");
    var primary = root.querySelector("[data-ph-hero-primary]");
    if (!slides.length) return;
    var index = 0;
    var timer = 0;
    var delay = 6500;
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    function textOf(source, name) {
      var node = source.querySelector("[data-" + name + "]");
      return node ? node.textContent : "";
    }
    function show(next) {
      index = (next + slides.length) % slides.length;
      for (var i = 0; i < slides.length; i++) {
        var on = i === index;
        slides[i].classList.toggle("is-active", on);
        if (dots[i]) {
          dots[i].classList.toggle("is-active", on);
          if (on) dots[i].setAttribute("aria-current", "true");
          else dots[i].removeAttribute("aria-current");
        }
      }
      var source = sources[index];
      if (source && title) {
        if (kicker) kicker.textContent = textOf(source, "kicker");
        title.textContent = textOf(source, "title");
        if (lead) lead.textContent = textOf(source, "lead");
        if (primary) {
          primary.textContent = textOf(source, "label");
          primary.setAttribute("href", source.getAttribute("data-href") || "#collections");
        }
      }
    }
    function play() {
      if (timer) clearInterval(timer);
      timer = 0;
      if (reduce) return;
      timer = setInterval(function () { show(index + 1); }, delay);
    }
    var prev = root.querySelector("[data-ph-hero-prev]");
    var nextBtn = root.querySelector("[data-ph-hero-next]");
    if (prev) prev.addEventListener("click", function () { show(index - 1); play(); });
    if (nextBtn) nextBtn.addEventListener("click", function () { show(index + 1); play(); });
    for (var d = 0; d < dots.length; d++) {
      dots[d].addEventListener("click", function () {
        show(parseInt(this.getAttribute("data-ph-hero-dot"), 10) || 0);
        play();
      });
    }
    root.addEventListener("mouseenter", function () { if (timer) clearInterval(timer); timer = 0; });
    root.addEventListener("mouseleave", play);
    root.addEventListener("focusin", function () { if (timer) clearInterval(timer); timer = 0; });
    root.addEventListener("focusout", function (event) {
      if (!root.contains(event.relatedTarget)) play();
    });
    show(0);
    play();
  }

  ready(function () {
    if (window.__phThemeBound) return;
    window.__phThemeBound = true;
    bindHero();
    stripNoise(document.body);
    upgradeStoreImages(document.body);
    markCurrentNav();
    tidyCategoryCatalog();
    fillProductImages();
    fillPagePhotos();
    fillFileSlots();
    fillMissingCatPhotos();
    bindProductBuy();
    bindFilters();
    bindCart();
    bindCartDrawer();
    refreshCartBadge();
    var toggle = qs("[data-ph-menu-toggle]");
    var nav = qs("[data-ph-nav]");
    if (toggle && nav) {
      toggle.addEventListener("click", function () {
        nav.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", nav.classList.contains("is-open") ? "true" : "false");
      });
    }
  });
})();


(function () {
  if (!document.querySelector(".theme-portal-form-container")) return;
  var pageCss = "html,body{background:#f7f4ec!important;color:#1b3022!important;font-family:Montserrat,Trebuchet MS,sans-serif!important}" +
    ".theme-header{background:#fff;border-bottom:1px solid rgba(27,48,34,.08);padding:10px 0 6px}" +
    ".theme-logo-parent{text-align:center}" +
    ".theme-logo-parent img,img[data-zs-logo]{height:108px!important;width:auto!important;max-width:280px!important;object-fit:contain;mix-blend-mode:multiply;background:transparent!important}" +
    ".theme-site-name,.theme-site-name-caption,.theme-responsive-goback{display:none!important}" +
    ".theme-portal-form-container{max-width:460px;margin:36px auto 72px;background:#fff;border:1px solid rgba(27,48,34,.1);box-shadow:0 12px 40px rgba(27,48,34,.06);padding:8px 28px 22px}" +
    ".signin-iframe{width:100%!important;min-height:230px;border:0;background:#fff}" +
    ".theme-noaccount-signup{text-align:center;color:#324a36;font-size:13px}" +
    ".theme-noaccount-signup span{display:block;margin:8px 0}" +
    ".theme-noaccount-signup a{color:#1b3022;font-weight:700;letter-spacing:.1em;text-transform:uppercase;font-size:12px;text-decoration:none}" +
    ".theme-noaccount-signup a:hover{color:#c39b3e}";
  var style = document.createElement("style");
  style.id = "ph-portal-page";
  style.textContent = pageCss;
  document.head.appendChild(style);
  var frameCss = "html,body,.bg_one,.signin_container,.signin_box{background:#fff!important;color:#1b3022!important;font-family:Montserrat,Trebuchet MS,sans-serif!important}" +
    ".signin_head,.service_name,.titlename,.username,.hellouser,#headtitle,#trytitle{color:#1b3022!important}#headtitle{font-weight:700;font-size:22px;letter-spacing:.04em}" +
    ".textbox{border:1px solid #d7d0c4!important;border-radius:0!important;color:#1b3022!important;background:#fff!important;font-family:Montserrat,Trebuchet MS,sans-serif!important}" +
    ".btn.blue,#nextbtn,button.btn{background:#c39b3e!important;border:0!important;color:#1b3022!important;border-radius:0!important;font-weight:700!important;letter-spacing:.08em;text-transform:uppercase}" +
    "a,.bluetext{color:#1b3022!important}" +
    "a:hover,.bluetext:hover{color:#c39b3e!important}";
  function paint(frame) {
    try {
      var doc = frame.contentDocument;
      if (!doc || !doc.head || doc.getElementById("ph-portal-frame")) return;
      var s = doc.createElement("style");
      s.id = "ph-portal-frame";
      s.textContent = frameCss;
      doc.head.appendChild(s);
    } catch (err) {}
  }
  var frame = document.querySelector("iframe");
  if (!frame) return;
  paint(frame);
  frame.addEventListener("load", function () { paint(frame); });
})();


(function () {
  var grid = document.querySelector("[data-ph-subcat-grid]");
  if (grid) {
    var products = [].slice.call(document.querySelectorAll('a[href*="/products/"]'));
    [].slice.call(grid.querySelectorAll("[data-ph-cat-id]")).forEach(function (card) {
      var heading = card.querySelector("h3,.ph-h3");
      var name = ((heading ? heading.textContent : card.textContent) || "").split("|")[0].trim().toLowerCase();
      if (!name) return;
      var match = products.filter(function (a) {
        return a !== card && (a.textContent || "").toLowerCase().indexOf(name) >= 0;
      })[0];
      if (!match) return;
      card.setAttribute("href", match.getAttribute("href"));
      var more = card.querySelector(".ph-more");
      if (more) more.textContent = "View specimen";
    });
    return;
  }
  if (location.pathname.indexOf("/categories/") < 0) return;
  var only = [].slice.call(document.querySelectorAll('.ph-product-grid a[href*="/products/"]'));
  if (only.length === 1) location.replace(only[0].getAttribute("href"));
})();

/* Language switch (English / Arabic), cookie-bar spacing and sign-in page layout. */
(function () {
  var KEY = "ph_lang";
  var AR = {
    "Premium Palms & Trees — Grown in the UAE": "نخيل وأشجار فاخرة — مزروعة في الإمارات",
    "Agricultural LLC": "الزراعية ذ.م.م",
    "Account": "حسابي",
    "Shop palms": "تسوّق النخيل",
    "Exclusive of 5% VAT · Delivered across the UAE": "غير شامل ضريبة القيمة المضافة 5% · توصيل لجميع أنحاء الإمارات",
    "Growing premium palms, trees and shrubs in Abu Dhabi since 2004 — and creating landscapes across the UAE.": "نزرع النخيل والأشجار والشجيرات الفاخرة في أبوظبي منذ 2004، وننسّق الحدائق في جميع أنحاء الإمارات.",
    "Shop": "المتجر",
    "Company": "الشركة",
    "About us": "من نحن",
    "My account": "حسابي",
    "Visit & contact": "الزيارة والتواصل",
    "Pheladelfia Agricultural LLC. All rights reserved.": "فلادلفيا الزراعية ذ.م.م. جميع الحقوق محفوظة.",
    "Prices in AED, excluding 5% VAT.": "الأسعار بالدرهم الإماراتي، وغير شاملة ضريبة القيمة المضافة 5%.",
    "Search palms, trees, shrubs…": "ابحث عن النخيل والأشجار والشجيرات…",
    "Your cart": "سلتك",
    "Pheladelfia home": "فلادلفيا — الرئيسية",
    "Pheladelfia Agricultural LLC": "فلادلفيا الزراعية ذ.م.م",
    "Previous": "السابق",
    "Next": "التالي",
    "From our nursery": "من مشتلنا",
    "Explore our plants": "اكتشف نباتاتنا",
    "Loading plants…": "جارٍ تحميل النباتات…",
    "Browse collections": "تصفّح المجموعات",
    "PHELADELFIA AGRICULTURAL LLC": "فلادلفيا الزراعية ذ.م.م",
    "Pheladelfia Agricultural": "فلادلفيا الزراعية",
    "Pheladelfia": "فلادلفيا",
    "All categories": "جميع الفئات",
    "Outdoor": "خارجي",
    "Indoor": "داخلي",
    "Search": "بحث",
    "What are you looking for?": "عمّ تبحث؟",
    "Inquire": "استفسار",
    "Sign in": "تسجيل الدخول",
    "Register": "إنشاء حساب",
    "Wishlist": "قائمة الأمنيات",
    "Your selection": "اختياراتك",
    "Open menu": "فتح القائمة",
    "Main": "القائمة الرئيسية",
    "Collections": "المجموعات",
    "All collections": "جميع المجموعات",
    "Browse every collection": "تصفّح جميع المجموعات",
    "Outdoor Plants": "النباتات الخارجية",
    "Indoor & Decor": "النباتات الداخلية والديكور",
    "Garden & Nursery Supply": "مستلزمات الحدائق والمشتل",
    "Palm Trees": "النخيل",
    "Trees": "الأشجار",
    "Rare & Ancient Trees": "الأشجار النادرة والمعمّرة",
    "Rare and Ancient Trees": "الأشجار النادرة والمعمّرة",
    "Large, Rare & Ancient Trees": "الأشجار الكبيرة النادرة والمعمّرة",
    "Large, Rare and Ancient Trees": "الأشجار الكبيرة النادرة والمعمّرة",
    "Cacti & Succulents": "الصباريات والعصاريات",
    "Cacti and Succulents": "الصباريات والعصاريات",
    "Shrubs & Ground Cover": "الشجيرات ونباتات التغطية الأرضية",
    "Shrubs and Ground Cover": "الشجيرات ونباتات التغطية الأرضية",
    "Climbers": "المتسلقات",
    "Indoor Plants": "النباتات الداخلية",
    "Indoor Ornamental Plants": "نباتات الزينة الداخلية",
    "Indoor Ornamentals": "نباتات الزينة الداخلية",
    "Fresh Flowers": "الزهور الطبيعية",
    "Fresh Flowers & Bouquets": "الزهور الطبيعية وباقات الورد",
    "Artificial Plants": "نباتات اصطناعية",
    "Garden Supply": "مستلزمات الحدائق",
    "Fertilizers & Soil": "الأسمدة والتربة",
    "Fertilizers & Soil Amendments": "الأسمدة والمصلحات الزراعية",
    "Seeds & Planting Stock": "البذور والتقاوي",
    "Tools & Equipment": "الأدوات والمعدات",
    "Art & Sculptures": "القسم الفني والمنحوتات",
    "Washingtonia robusta": "واشنطونيا روبوستا",
    "Direct Use Purchases": "مشتريات للاستخدام المباشر",
    "Small Tools & Consumables": "أدوات ومواد استهلاكية",
    "Home": "الرئيسية",
    "About": "من نحن",
    "Nursery": "المشتل",
    "Blog": "المدونة",
    "Journal": "المدونة",
    "Contact": "تواصل معنا",
    "Where Nature": "حيث تصبح الطبيعة",
    "Becomes Legacy": "إرثًا خالدًا",
    "Where Nature Becomes Legacy": "حيث تصبح الطبيعة إرثًا خالدًا",
    "Exceptional Botanical Assets for Landscapes of Lasting Value": "أصول نباتية استثنائية لمناظر طبيعية ذات قيمة دائمة",
    "A premium nursery in the UAE": "مشتل متميز في دولة الإمارات",
    "Abu Dhabi | Since 2004": "أبوظبي | منذ 2004",
    "Visit the nursery": "زيارة المشتل",
    "Established in Abu Dhabi": "تأسست في أبوظبي",
    "1.5M ft²": "1.5 مليون قدم²",
    "Specialist nursery footprint in Al Ajban": "مساحة مشتل متخصص في العجبان",
    "UAE & GCC": "الإمارات ودول الخليج",
    "Regional project and supply reach": "امتداد إقليمي للمشاريع والتوريد",
    "Continental Sourcing": "توريد من عدة قارات",
    "Europe, Asia and the Middle East": "أوروبا وآسيا والشرق الأوسط",
    "Specimen Focused Expertise": "خبرة متخصصة في العينات النباتية",
    "Mature trees, palms and architectural plants": "أشجار ناضجة ونخيل ونباتات معمارية",
    "Project Scaled Capability": "قدرات بحجم المشاريع",
    "From individual statement pieces to large planting programmes": "من القطع المميزة الفردية إلى برامج الزراعة الكبيرة",
    "Management-System Certification": "شهادات أنظمة الإدارة",
    "Achieved Internationally Recognised Certifications": "حاصلون على شهادات معترف بها دوليًا",
    "Featured collections": "المجموعات المميزة",
    "Outdoor": "خارجي",
    "Indoor": "داخلي",
    "Sculptures": "المنحوتات",
    "Palms, trees, rare specimens, shrubs and climbers for landscapes of scale.": "نخيل وأشجار وعينات نادرة وشجيرات ومتسلقات للمناظر الطبيعية الكبيرة.",
    "Ornamental plants, fresh flowers and artificial greenery for interiors.": "نباتات زينة وزهور طبيعية ونباتات اصطناعية للديكور الداخلي.",
    "Sculptures and art pieces for gardens and landmark projects.": "منحوتات وقطع فنية للحدائق والمشاريع.",
    "Explore outdoor plants": "استكشف النباتات الخارجية",
    "Explore indoor plants": "استكشف النباتات الداخلية",
    "View sculptures": "عرض المنحوتات",
    "View collections": "عرض المجموعات",
    "Previous slide": "الشريحة السابقة",
    "Next slide": "الشريحة التالية",
    "Outdoor and indoor collections": "مجموعات النباتات الخارجية والداخلية",
    "Plants and trees selected to bring life and beauty to your spaces.": "نباتات وأشجار تضيف الحياة والجمال إلى مساحاتك.",
    "Global Sourcing Network": "شبكة توريد عالمية",
    "Selected at origin. Linked to Pheladelfia Nursery, Abu Dhabi.": "مختارة من بلد المنشأ ومرتبطة بمشتل فلادلفيا في أبوظبي.",
    "Every origin on this map connects to our nursery in Al Ajban, Abu Dhabi — where stock is received, grown on and prepared for project delivery.": "كل مصدر على هذه الخريطة مرتبط بمشتلنا في العجبان، أبوظبي — حيث يتم استلام النباتات ورعايتها وتجهيزها لتسليم المشاريع.",
    "Mediterranean & Europe": "البحر المتوسط وأوروبا",
    "Spain · Italy · The Netherlands · Greece · Turkey": "إسبانيا · إيطاليا · هولندا · اليونان · تركيا",
    "GCC & Middle East": "الخليج والشرق الأوسط",
    "Saudi Arabia · Jordan · Egypt · Qatar · Bahrain · Oman · Syria · Lebanon": "السعودية · الأردن · مصر · قطر · البحرين · عُمان · سوريا · لبنان",
    "Africa": "أفريقيا",
    "Morocco · South Africa": "المغرب · جنوب أفريقيا",
    "Asia": "آسيا",
    "China · Thailand · Vietnam · Japan · Malaysia": "الصين · تايلاند · فيتنام · اليابان · ماليزيا",
    "South America": "أمريكا الجنوبية",
    "Brazil · Paraguay": "البرازيل · باراغواي",
    "+971 2 555 1662 · nursery@pheladelfia.com · Farm No. 563 & 564, Al Ajban, Muwailih, Abu Dhabi": "+971 2 555 1662 · nursery@pheladelfia.com · مزرعة رقم 563 و564، العجبان، مويلح، أبوظبي",
    "Key Clients & Project Stakeholders": "أبرز العملاء وشركاء المشاريع",
    "Presidential Court": "ديوان الرئاسة",
    "ADNOC": "أدنوك",
    "Abu Dhabi Municipality": "بلدية أبوظبي",
    "Dubai Municipality": "بلدية دبي",
    "Aldar": "الدار",
    "Nakheel": "نخيل",
    "DAMAC": "داماك",
    "Modon": "مدن",
    "Silal": "سلال",
    "Al Naboodah": "النابودة",
    "Rixos": "ريكسوس",
    "Al Fattan": "الفتان",
    "Subtotal": "المجموع الفرعي",
    "Exclusive of 5% VAT · Held at Al Ajban nursery": "غير شامل ضريبة القيمة المضافة 5% · محفوظة في مشتل العجبان",
    "Continue to checkout": "متابعة إلى الدفع",
    "View full selection": "عرض كامل الاختيارات",
    "Close selection": "إغلاق",
    "Abu Dhabi · Since 2004": "أبوظبي · منذ 2004",
    "Farm No. 563 & 564, Al Ajban, Muwailih, Abu Dhabi": "مزرعة رقم 563 و564، العجبان، مويلح، أبوظبي",
    "Explore": "استكشف",
    "Catalog": "الكتالوج",
    "Send an inquiry": "أرسل استفسارًا",
    "Instagram": "إنستغرام",
    "Facebook": "فيسبوك",
    "LinkedIn": "لينكدإن",
    "TikTok": "تيك توك",
    "Snapchat": "سناب شات",
    "Pinterest": "بنترست",
    "Connect sales": "تواصل مع المبيعات",
    "Since 2004 · Where Nature Becomes Legacy": "منذ 2004 · حيث تصبح الطبيعة إرثًا خالدًا",
    "Pheladelfia Agricultural is an Abu Dhabi-based horticultural business specialising in mature trees, rare botanical specimens, architectural plants and project-scale landscape supply. The nursery extends across more than 1.5 million square feet in Al Ajban.": "فلادلفيا الزراعية شركة بستنة مقرها أبوظبي، متخصصة في الأشجار الناضجة والعينات النباتية النادرة والنباتات المعمارية وتوريد المناظر الطبيعية على مستوى المشاريع. يمتد المشتل على مساحة تزيد عن 1.5 مليون قدم مربع في العجبان.",
    "Our role extends beyond plant supply. We work with developers, landscape architects, consultants, contractors and institutional clients to identify the right specimen for the right setting.": "يتجاوز دورنا توريد النباتات؛ إذ نعمل مع المطورين ومهندسي المناظر الطبيعية والاستشاريين والمقاولين والجهات المؤسسية لاختيار العينة المناسبة للمكان المناسب.",
    "3 Continents": "3 قارات",
    "Sourcing Europe, Asia and the Middle East": "توريد من أوروبا وآسيا والشرق الأوسط",
    "Capability and stewardship": "القدرة والمسؤولية",
    "From cultivation to climate-responsive landscapes": "من الزراعة إلى مناظر طبيعية متوافقة مع المناخ",
    "Selected for more than species and size. Every selection is considered in relation to architectural character, spatial scale, user experience, climate suitability and long-term landscape performance.": "نختار لما هو أبعد من النوع والحجم؛ فكل اختيار يُدرس وفق الطابع المعماري والمقياس المكاني وتجربة المستخدم وملاءمة المناخ والأداء طويل الأمد للمنظر الطبيعي.",
    "Specimen-focused expertise covers mature trees, palms and architectural plants, from individual statement pieces to large planting programmes. Grow-to-order programmes and specimen documentation are managed from Abu Dhabi: specimen code, botanical and common name, origin, height, trunk dimensions and availability.": "تشمل خبرتنا المتخصصة الأشجار الناضجة والنخيل والنباتات المعمارية، من القطع المميزة الفردية إلى برامج الزراعة الكبيرة. وتُدار برامج الزراعة حسب الطلب وتوثيق العينات من أبوظبي: رمز العينة، والاسم العلمي والشائع، والمنشأ، والارتفاع، وأبعاد الجذع، والتوفر.",
    "The same standard covers climate-responsive selection, local cultivation and acclimatisation, water-aware planting, long-lived botanical assets, biodiversity, human wellbeing and stewardship of the landscapes we supply.": "ويشمل المعيار نفسه الاختيار المتوافق مع المناخ، والزراعة والأقلمة المحلية، والزراعة المرشِّدة للمياه، والأصول النباتية طويلة العمر، والتنوع البيولوجي، ورفاهية الإنسان، والعناية بالمناظر الطبيعية التي نوردها.",
    "Certifications": "الشهادات",
    "Begin with the right botanical material": "ابدأ بالمادة النباتية المناسبة",
    "The Nursery": "المشتل",
    "The nursery": "المشتل",
    "The Operational Heart of Pheladelfia": "القلب التشغيلي لفلادلفيا",
    "More than 1.5 million square feet in Al Ajban, Abu Dhabi.": "أكثر من 1.5 مليون قدم مربع في العجبان، أبوظبي.",
    "Curation. Cultivation. Delivery.": "انتقاء. زراعة. تسليم.",
    "Located in Al Ajban, Abu Dhabi, Pheladelfia's specialist nursery is where plants are propagated, grown, received, inspected, organised and prepared for project requirements.": "يقع مشتل فلادلفيا المتخصص في العجبان بأبوظبي، وفيه يتم إكثار النباتات وزراعتها واستلامها وفحصها وتنظيمها وتجهيزها وفق متطلبات المشاريع.",
    "It also provides the controlled space necessary for imported material to adapt to local environmental conditions before final selection and delivery.": "كما يوفر المساحة المضبوطة اللازمة لتتأقلم النباتات المستوردة مع الظروف البيئية المحلية قبل الاختيار النهائي والتسليم.",
    "Botanical Curation": "الانتقاء النباتي",
    "Selected for species, height, trunk character, canopy balance, climatic suitability and long-term landscape performance.": "تُختار وفق النوع والارتفاع وطابع الجذع وتوازن التاج وملاءمة المناخ والأداء طويل الأمد.",
    "Nursery Cultivation": "الزراعة في المشتل",
    "Propagated, grown, received, inspected and acclimatised across more than 1.5 million square feet.": "إكثار وزراعة واستلام وفحص وأقلمة على مساحة تزيد عن 1.5 مليون قدم مربع.",
    "Project Logistics": "الخدمات اللوجستية للمشاريع",
    "Quality control, technical coordination, import and export, and establishment guidance.": "مراقبة الجودة والتنسيق الفني والاستيراد والتصدير وإرشادات الغرس.",
    "Arrange a nursery visit": "رتّب زيارة للمشتل",
    "Visit our nursery, share your planting schedule or speak with our team.": "زر مشتلنا، أو شاركنا جدول الزراعة، أو تحدّث مع فريقنا.",
    "Farm No. 563 & 564": "مزرعة رقم 563 و564",
    "Al Ajban, Muwailih": "العجبان، مويلح",
    "Abu Dhabi": "أبوظبي",
    "Name": "الاسم",
    "Email": "البريد الإلكتروني",
    "Contact Number": "رقم التواصل",
    "Type of Inquiry": "نوع الاستفسار",
    "Specimen supply": "توريد عينات",
    "Grow to order": "زراعة حسب الطلب",
    "Nursery visit": "زيارة المشتل",
    "Project consultation": "استشارة مشروع",
    "Message": "الرسالة",
    "Submit Inquiry": "إرسال الاستفسار",
    "Collection": "المجموعة",
    "Species and sub-collections": "الأنواع والمجموعات الفرعية",
    "View specimens": "عرض العينات",
    "View specimen": "عرض العينة",
    "View species": "عرض الأنواع",
    "View collection": "عرض المجموعة",
    "Parent collection": "مجموعة رئيسية",
    "Living collections": "مجموعات حيّة",
    "Nursery support": "دعم المشتل",
    "Botanical parents from the Books catalog": "الفئات النباتية الرئيسية من كتالوجنا",
    "Each card is a Zoho Books category. Species such as Washingtonia robusta sit underneath their parent, then open into sized specimens.": "كل بطاقة تمثل فئة من الكتالوج. تندرج الأنواع مثل واشنطونيا روبوستا تحت فئتها الرئيسية، ثم تتفرع إلى عينات بمقاسات مختلفة.",
    "Architectural palms. Open this collection to reach species such as Washingtonia robusta.": "نخيل معماري. افتح هذه المجموعة للوصول إلى أنواع مثل واشنطونيا روبوستا.",
    "Shade, avenue and specimen trees for lasting landscape structure.": "أشجار ظل وشوارع وعينات مميزة لهيكل منظر طبيعي يدوم.",
    "Heritage olives and monumental specimens with documented character.": "زيتون تراثي وعينات ضخمة ذات طابع موثّق.",
    "Sculptural desert forms, including yucca and monumental cacti.": "أشكال صحراوية نحتية، منها اليوكا والصبار الضخم.",
    "Interior specimens for hospitality, residences and workplace landscapes.": "عينات داخلية للفنادق والمساكن وبيئات العمل.",
    "Mass planting, edges and ground plane for complete schemes.": "زراعة كثيفة وحواف وتغطية أرضية لمخططات متكاملة.",
    "Vertical greening for walls, pergolas and architectural screens.": "تخضير عمودي للجدران والعرائش والواجهات المعمارية.",
    "Cut flowers and arrangements for events and hospitality.": "زهور مقطوفة وتنسيقات للمناسبات والضيافة.",
    "These parents stay off the homepage signature row. They remain available here for project supply.": "هذه الفئات غير معروضة في الصفحة الرئيسية، لكنها متاحة هنا لتوريد المشاريع.",
    "Botanical forms for controlled or interior settings.": "أشكال نباتية للأماكن المغلقة والداخلية.",
    "Propagation material and grow-to-order stock.": "مواد إكثار ومخزون يُزرع حسب الطلب.",
    "Soil and nutrition for establishment and aftercare.": "تربة وتغذية للغرس والعناية اللاحقة.",
    "Landscape art for destination public realm.": "فنون المناظر الطبيعية للأماكن العامة.",
    "Nursery tools, consumables and direct purchases.": "أدوات المشتل والمواد الاستهلاكية والمشتريات المباشرة.",
    "Every category in the Pheladelfia online store, from palms and specimen trees to indoor plants, garden supply and art. Open a collection to see its species and sized specimens.": "جميع فئات متجر فلادلفيا الإلكتروني، من النخيل والأشجار المميزة إلى النباتات الداخلية ومستلزمات الحدائق والفنون. افتح أي مجموعة لعرض أنواعها وعيناتها بمقاساتها المختلفة.",
    "Categories": "الفئات",
    "WASHINGTONIA ROBUSTA": "واشنطونيا روبوستا",
    "Size": "المقاس",
    "Select Size": "اختر المقاس",
    "Add to selection": "أضف إلى اختياراتك",
    "View selection": "عرض الاختيارات",
    "Inquire about this specimen": "استفسر عن هذه العينة",
    "Request a quote": "اطلب عرض سعر",
    "Stock held at Farm 563 & 564, Al Ajban, Abu Dhabi": "المخزون متوفر في المزرعة 563 و564، العجبان، أبوظبي",
    "Clear-trunk (CT) heights, priced per specimen": "ارتفاعات الجذع الصافي (CT)، والسعر لكل عينة",
    "Landscape trade lists and project quotes on request": "قوائم أسعار التجارة وعروض المشاريع عند الطلب",
    "Exclusive of 5% VAT · Sold as NOS": "غير شامل ضريبة القيمة المضافة 5% · يباع بالقطعة",
    "Available": "متوفر",
    "Out of stock": "غير متوفر",
    "Select a size first.": "اختر المقاس أولًا.",
    "Could not add this specimen.": "تعذّرت إضافة هذه العينة.",
    "Specimen": "عينة",
    "Summary": "الملخص",
    "Keep browsing": "متابعة التصفح",
    "Search Products": "البحث عن المنتجات",
    "Don't have an account?": "ليس لديك حساب؟",
    "Sign Up": "إنشاء حساب",
    "Sign In": "تسجيل الدخول",
    "Forgot Password": "نسيت كلمة المرور؟",
    "Menu": "القائمة",
    "Close menu": "إغلاق القائمة",
    "Show sub-menu": "عرض القائمة الفرعية",
    "Social media": "وسائل التواصل الاجتماعي",
    "Pheladelfia Agricultural LLC": "فلادلفيا الزراعية ذ.م.م",
    "All rights reserved": "جميع الحقوق محفوظة",
    "Welcome back": "مرحبًا بعودتك",
    "Sign in to follow your selections, quotations and orders.": "سجّل الدخول لمتابعة اختياراتك وعروض الأسعار وطلباتك.",
    "Back to the store": "العودة إلى المتجر",
    "Explore collections": "تصفّح المجموعات",
    "About Pheladelfia": "عن فلادلفيا",
    "Mature trees, rare botanical specimens and architectural plants for landscapes of lasting value, selected at origin and prepared at our nursery in Al Ajban, Abu Dhabi.": "أشجار ناضجة وعينات نباتية نادرة ونباتات معمارية لمناظر طبيعية ذات قيمة دائمة، نختارها من بلد المنشأ ونجهّزها في مشتلنا بالعجبان، أبوظبي.",
    "Our story": "قصتنا",
    "More than plant supply": "أكثر من مجرد توريد نباتات",
    "Considered selection": "اختيار مدروس",
    "Grow-to-order and documentation": "الزراعة حسب الطلب والتوثيق",
    "Climate-responsive stewardship": "مسؤولية متوافقة مع المناخ",
    "How we work": "كيف نعمل",
    "Also in the Books catalog": "متوفر أيضًا في كتالوجنا",
    "Back to collections": "العودة إلى المجموعات",
    "Details": "التفاصيل",
    "Species": "النوع",
    "SKU": "رمز المنتج",
    "Unit": "الوحدة",
    "NOS": "قطعة",
    "Availability": "التوفر",
    "Results for the term": "نتائج البحث عن",
    "Abu Dhabi nursery · Est. 2004": "مشتل أبوظبي · تأسس 2004",
    "Premium Palms & Trees,": "نخيل وأشجار فاخرة،",
    "Grown in the UAE": "مزروعة في الإمارات",
    "Specimen palms, native trees and flowering shrubs — acclimatized in our Abu Dhabi nursery and delivered ready to plant across the Emirates.": "نخيل وعينات وأشجار محلية وشجيرات مزهرة — متأقلمة في مشتلنا بأبوظبي وجاهزة للزراعة في جميع أنحاء الإمارات.",
    "Shop Plants": "تسوّق النباتات",
    "Browse Palms": "تصفّح النخيل",
    "Since 2004": "منذ 2004",
    "Two decades of growing": "عقدان من الزراعة",
    "UAE-adapted plants": "نباتات متكيفة مع مناخ الإمارات",
    "Acclimatized in Abu Dhabi": "متأقلمة في أبوظبي",
    "Delivery across the UAE": "توصيل في جميع أنحاء الإمارات",
    "All seven Emirates": "الإمارات السبع",
    "Landscaping services": "خدمات تنسيق الحدائق",
    "Design to maintenance": "من التصميم إلى الصيانة",
    "Shop by category": "تسوّق حسب الفئة",
    "Everything for a thriving landscape": "كل ما يحتاجه منظر طبيعي مزدهر",
    "Browse our nursery by plant type — every item grown or selected for the UAE climate.": "تصفّح مشتلنا حسب نوع النبات — كل صنف مُزرع أو مختار ليناسب مناخ الإمارات.",
    "Fan, date & specimen palms": "نخيل مروحية وتمر وعينات",
    "Palms": "النخيل",
    "Shade & native trees": "أشجار الظل والأشجار المحلية",
    "Heritage & monumental specimens": "عينات تراثية وضخمة",
    "Flowering shrubs & ground covers": "شجيرات مزهرة ونباتات تغطية أرضية",
    "For homes, offices & hotels": "للمنازل والمكاتب والفنادق",
    "Planters, soil & care": "أصيص وتربة وعناية",
    "Pots & Supplies": "أصص ومستلزمات",
    "Best sellers": "الأكثر مبيعًا",
    "Our most-loved plants": "أكثر نباتاتنا شعبية",
    "Our services": "خدماتنا",
    "Beyond the nursery": "ما بعد المشتل",
    "We design, build and care for landscapes for commercial and public clients across the UAE.": "نصمم وننفذ ونعتني بالمناظر الطبيعية لعملاء تجاريين وعامّين في جميع أنحاء الإمارات.",
    "Landscaping Design & Installation": "تصميم وتنفيذ تنسيق الحدائق",
    "From concept to planting — villas, compounds and public spaces.": "من الفكرة إلى الزراعة — فلل ومجمعات ومساحات عامة.",
    "Learn more": "اعرف المزيد",
    "Grounds Maintenance": "صيانة المساحات الخضراء",
    "Scheduled care that keeps landscapes healthy all year.": "عناية مجدولة تحافظ على صحة المناظر الطبيعية على مدار العام.",
    "Interior Plant Maintenance": "صيانة النباتات الداخلية",
    "Living interiors for offices, hotels and malls.": "ديكورات حية للمكاتب والفنادق والمراكز التجارية.",
    "Why Pheladelfia": "لماذا فلادلفيا",
    "Rooted in the Emirates for over 20 years": "جذورنا في الإمارات لأكثر من 20 عامًا",
    "Locally acclimatized": "متأقلمة محليًا",
    "Every plant is hardened in our Abu Dhabi nursery to thrive in UAE heat, wind and soil.": "كل نبتة تُقوّى في مشتلنا بأبوظبي لتزدهر في حرارة الإمارات ورياحها وتربتها.",
    "Wide variety": "تشكيلة واسعة",
    "From rare specimen palms to native Ghaf and ground covers — hundreds of species in stock.": "من نخيل العينات النادر إلى الغاف المحلي ونباتات التغطية — مئات الأنواع متوفرة.",
    "Experienced team": "فريق ذو خبرة",
    "Horticulturists and landscape engineers with 20+ years of regional experience.": "بستانيون ومهندسو مناظر طبيعية بخبرة إقليمية تتجاوز 20 عامًا.",
    "Large-scale capacity": "قدرة على نطاق واسع",
    "Thousands of mature palms ready to supply government and developer projects.": "آلاف النخيل الناضج جاهزة لتوريد مشاريع حكومية ومشاريع مطورين.",
    "10% off your first order": "خصم 10% على طلبك الأول",
    "Use code GREEN10 at checkout for 10% off your first order.": "استخدم الرمز GREEN10 عند الدفع للحصول على خصم 10% على طلبك الأول.",
    "Shop now": "تسوّق الآن",
    "Testimonials": "آراء عملائنا",
    "Trusted by developers, hotels & homeowners": "موثوقون من المطورين والفنادق وأصحاب المنازل",
    "“Pheladelfia supplied over a thousand Washingtonia palms for our community on time and in excellent condition. Their team made a complex logistics job look easy.”": "«ورّدت فلادلفيا أكثر من ألف نخلة واشنطونيا لمجتمعنا في موعدها وبحالة ممتازة. جعل فريقهم مهمة لوجستية معقدة تبدو سهلة.»",
    "Khalid Al Mansoori": "خالد المنصوري",
    "Project Director, Real Estate Developer": "مدير مشاريع، مطور عقاري",
    "“We've used their grounds maintenance for three years. The gardens have never looked better, and reporting is always clear.”": "«نستخدم خدماتهم في صيانة المساحات الخضراء منذ ثلاث سنوات. لم تبدُ الحدائق أفضل من أي وقت مضى، والتقارير واضحة دائمًا.»",
    "Sarah Thompson": "سارة تومسون",
    "Facilities Manager, Hotel Group": "مديرة مرافق، مجموعة فنادق",
    "“Beautiful, healthy plants that actually survive our summer. The advice on choosing the right palms was invaluable.”": "«نباتات جميلة وصحية تنجو فعلًا من صيفنا. ونصيحتهم في اختيار النخيل المناسب كانت لا تُقدّر بثمن.»",
    "Mariam Al Hosani": "مريم الحوسني",
    "Villa owner, Abu Dhabi": "مالكة فيلا، أبوظبي",
    "Newsletter": "النشرة البريدية",
    "Seasonal planting tips & offers": "نصائح موسمية للزراعة وعروض",
    "One calm email a month. No spam.": "بريد واحد هادئ شهريًا. بدون إزعاج.",
    "Email address": "البريد الإلكتروني",
    "Subscribe": "اشترك",
    "Two decades of growing the green heart of the Emirates.": "عقدان من زراعة القلب الأخضر للإمارات.",
    "From a single nursery to a UAE landscaping partner": "من مشتل واحد إلى شريك تنسيق حدائق في الإمارات",
    "Pheladelfia Agricultural LLC began in 2004 with a simple belief: plants for the UAE should be grown in the UAE. Our Abu Dhabi nursery acclimatizes every palm, tree and shrub to local heat, soil and water so it thrives from the day it is planted.": "بدأت فلادلفيا الزراعية ذ.م.م عام 2004 بقناعة بسيطة: نباتات الإمارات يجب أن تُزرع في الإمارات. يقوم مشتلنا في أبوظبي بتأقلمة كل نخلة وشجرة وشجيرة مع الحرارة والتربة والمياه المحلية لتزدهر منذ يوم زراعتها.",
    "Today we supply developers, contractors, hotels and government entities, and our landscaping and maintenance teams care for gardens, parks and interiors across all seven Emirates — supported by our branch in Dubai.": "اليوم نورد المطورين والمقاولين والفنادق والجهات الحكومية، وتهتم فرقنا في تنسيق الحدائق والصيانة بالحدائق والمنتزهات والديكورات الداخلية في الإمارات السبع — بدعم من فرعنا في دبي.",
    "Nursery: Al Wathba, Abu Dhabi": "المشتل: الوثبة، أبوظبي",
    "Branch: Al Quoz, Dubai": "الفرع: القوز، دبي",
    "Founded in Abu Dhabi": "تأسست في أبوظبي",
    "Plants in the nursery": "نباتات في المشتل",
    "Projects delivered": "مشاريع منجزة",
    "Emirates served": "إمارات نخدمها",
    "What drives us": "ما يحركنا",
    "Mission & vision": "الرسالة والرؤية",
    "Our mission": "رسالتنا",
    "To provide healthy, locally acclimatized plants and dependable landscaping services that make UAE communities greener, cooler and more beautiful.": "توفير نباتات صحية متأقلمة محليًا وخدمات تنسيق حدائق موثوقة تجعل مجتمعات الإمارات أكثر اخضرارًا واعتدالًا وجمالًا.",
    "Our vision": "رؤيتنا",
    "To be the most trusted name in UAE horticulture — championing native species and water-wise landscapes for a sustainable future.": "أن نكون الاسم الأكثر ثقة في البستنة الإماراتية — روادًا في الأنواع المحلية والمناظر المقتصدة في المياه لمستقبل مستدام.",
    "Visit our nursery": "زوروا مشتلنا",
    "Services": "الخدمات",
    "Our Services": "خدماتنا",
    "Complete landscape solutions for developers, contractors, hotels and government entities.": "حلول متكاملة للمناظر الطبيعية للمطورين والمقاولين والفنادق والجهات الحكومية.",
    "Service 01": "الخدمة 01",
    "Our design team turns plans into living landscapes: concept and planting design, softscape and hardscape installation, irrigation networks, lighting and large-specimen palm transplanting. We deliver for developers, contractors, hotels and government entities.": "يحوّل فريق التصميم لدينا المخططات إلى مناظر طبيعية حية: تصميم المفهوم والزرع، وتنفيذ الأعمال اللينة والصلبة، وشبكات الري، والإضاءة، ونقل النخيل كبير العينات. ننفذ للمطورين والمقاولين والفنادق والجهات الحكومية.",
    "Concept & planting design": "تصميم المفهوم والزرع",
    "Irrigation & lighting": "الري والإضاءة",
    "Specimen palm transplanting": "نقل نخيل العينات",
    "Contact us": "تواصل معنا",
    "See our projects": "شاهدوا مشاريعنا",
    "Service 02": "الخدمة 02",
    "Trained crews provide pruning, palm trimming, fertilization, pest control, irrigation checks and lawn care on flexible annual contracts — with clear reporting for facility managers.": "تقدم طواقم مدربة خدمات التقليم وتقليم النخيل والتسميد ومكافحة الآفات وفحص الري والعناية بالمروج بعقود سنوية مرنة — مع تقارير واضحة لمديري المرافق.",
    "Annual maintenance contracts": "عقود صيانة سنوية",
    "Palm trimming & pest control": "تقليم النخيل ومكافحة الآفات",
    "Irrigation audits": "فحص أنظمة الري",
    "Service 03": "الخدمة 03",
    "We design, supply and maintain indoor planting schemes — regular visits for watering, cleaning, feeding and plant rotation so your interiors always look their best.": "نصمم ونورد ونعتني بمخططات الزرع الداخلي — زيارات منتظمة للسقي والتنظيف والتغذية وتدوير النباتات لتبدو ديكوراتكم الداخلية في أفضل حال دائمًا.",
    "Plant & planter supply": "توريد النباتات والأصيص",
    "Weekly care visits": "زيارات عناية أسبوعية",
    "Seasonal rotation": "تدوير موسمي",
    "Projects": "المشاريع",
    "Projects & Gallery": "المشاريع والمعرض",
    "A selection of landscapes we have supplied, built and maintained.": "مجموعة مختارة من المناظر الطبيعية التي وردناها ونفذناها واعتنينا بها.",
    "Public realm": "المساحات العامة",
    "Corniche Boulevard Planting": "زراعة كورنيش بوليفارد",
    "Municipal client · Abu Dhabi": "عميل بلدي · أبوظبي",
    "Hospitality": "الضيافة",
    "Heritage Resort Courtyards": "أفنية منتجع تراثي",
    "5-star hotel · Dubai": "فندق 5 نجوم · دبي",
    "Residential": "سكني",
    "Private Villa Garden": "حديقة فيلا خاصة",
    "Residential · Emirates Hills": "سكني · تلال الإمارات",
    "Supply": "توريد",
    "Washingtonia Supply — 1,200 palms": "توريد واشنطونيا — 1,200 نخلة",
    "Master developer · Yas Island": "مطور رئيسي · جزيرة ياس",
    "Interior": "داخلي",
    "Corporate HQ Interiors": "ديكورات المقر الرئيسي",
    "Office tower · ADGM": "برج مكاتب · أبوظبي العالمي",
    "Maintenance": "صيانة",
    "City Park Maintenance": "صيانة منتزه المدينة",
    "Annual contract · Abu Dhabi": "عقد سنوي · أبوظبي",
    "Date Palm Avenue": "شارع النخيل",
    "Mosque grounds · Al Ain": "أراضي مسجد · العين",
    "Sustainability": "الاستدامة",
    "Native Ghaf Grove": "بستان غاف محلي",
    "Sustainability park · Sharjah": "منتزه استدامة · الشارقة",
    "Mediterranean Terrace": "شرفة متوسطية",
    "Penthouse · Saadiyat": "بنتهاوس · السعديات",
    "Shop the plants": "تسوّق النباتات",
    "Questions about a plant, an order or a project? We're happy to help.": "أسئلة حول نبتة أو طلب أو مشروع؟ يسعدنا المساعدة.",
    "Send us a message": "أرسل لنا رسالة",
    "Full name": "الاسم الكامل",
    "Phone": "الهاتف",
    "Subject": "الموضوع",
    "Plant enquiry": "استفسار عن نبتة",
    "Existing order": "طلب قائم",
    "Landscaping project": "مشروع تنسيق حدائق",
    "Maintenance contract": "عقد صيانة",
    "Send message": "أرسل الرسالة",
    "Call us": "اتصل بنا",
    "Opening hours": "ساعات العمل",
    "Sat–Thu 8am–6pm · Friday closed": "السبت–الخميس 8ص–6م · الجمعة مغلق",
    "Locations": "المواقع",
    "Chat on WhatsApp": "محادثة عبر واتساب",
    "Interactive map will appear here": "ستظهر الخريطة التفاعلية هنا"
  };
  var BILINGUAL = /^(.*[A-Za-z].*?)\s*\|\s*([\u0600-\u06FF][^|]*)$/;
  var SIZE = /^(\d+(?:\.\d+)?-\d+(?:\.\d+)?) MTR CT$/;

  function readLang() {
    var v = "";
    try { v = localStorage.getItem(KEY) || ""; } catch (e) {}
    if (!v) {
      var m = document.cookie.match(/(?:^|; )ph_lang=([^;]+)/);
      if (m) v = m[1];
    }
    return v === "en" ? "en" : "ar";
  }

  function writeLang(v) {
    try { localStorage.setItem(KEY, v); } catch (e) {}
    document.cookie = KEY + "=" + v + "; path=/; max-age=31536000; SameSite=Lax";
  }

  var lang = readLang();
  var html = document.documentElement;
  html.setAttribute("lang", lang);
  html.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
  html.classList.toggle("ph-ar", lang === "ar");

  function arabicFor(text) {
    var key = String(text || "").replace(/\s+/g, " ").trim();
    if (!key || !/[A-Za-z]/.test(key)) return null;
    if (Object.prototype.hasOwnProperty.call(AR, key)) return AR[key];
    var pair = key.match(BILINGUAL);
    if (pair) return pair[2].trim();
    var size = key.match(SIZE);
    if (size) return size[1] + " م جذع صافي";
    if (/ added to your selection\.$/.test(key)) return key.replace(/ added to your selection\.$/, " أُضيف إلى اختياراتك.");
    return null;
  }

  function swapText(node) {
    var raw = node.nodeValue;
    var ar = arabicFor(raw);
    if (ar === null) return;
    node.nodeValue = raw.match(/^\s*/)[0] + ar + raw.match(/\s*$/)[0];
  }

  var ATTRS = ["placeholder", "aria-label", "title", "alt"];
  function swapAttrs(el) {
    for (var i = 0; i < ATTRS.length; i++) {
      var v = el.getAttribute(ATTRS[i]);
      if (!v) continue;
      var ar = arabicFor(v);
      if (ar !== null) el.setAttribute(ATTRS[i], ar);
    }
    if (el.tagName === "INPUT" && /^(submit|button)$/i.test(el.type || "") && el.value) {
      var val = arabicFor(el.value);
      if (val !== null) el.value = val;
    }
  }

  var SKIP = { SCRIPT: 1, STYLE: 1, NOSCRIPT: 1, TEXTAREA: 1, CODE: 1, SVG: 1 };
  function skipped(el) {
    return SKIP[el.tagName] || SKIP[String(el.tagName).toUpperCase()] || el.hasAttribute("data-ph-no-translate");
  }

  function translate(scope) {
    if (lang !== "ar" || !scope) return;
    if (scope.nodeType === 3) {
      if (scope.parentNode && scope.parentNode.nodeType === 1 && skipped(scope.parentNode)) return;
      swapText(scope);
      return;
    }
    if (scope.nodeType !== 1 || skipped(scope)) return;
    if (scope.closest && scope.closest("[data-ph-no-translate]")) return;
    swapAttrs(scope);
    var walker = document.createTreeWalker(scope, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT, {
      acceptNode: function (n) {
        if (n.nodeType === 1 && skipped(n)) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    var n;
    var texts = [];
    while ((n = walker.nextNode())) {
      if (n.nodeType === 3) texts.push(n);
      else swapAttrs(n);
    }
    texts.forEach(swapText);
  }

  function translateTitle() {
    if (lang !== "ar") return;
    document.title = document.title.split("|").map(function (part) {
      var ar = arabicFor(part);
      return ar === null ? part.trim() : ar;
    }).join(" | ");
  }

  function watchChanges() {
    if (lang !== "ar" || !window.MutationObserver || !document.body) return;
    var queue = [];
    var queued = false;
    function flush() {
      queued = false;
      var list = queue;
      queue = [];
      list.forEach(translate);
    }
    new MutationObserver(function (records) {
      records.forEach(function (r) {
        if (r.type === "characterData") queue.push(r.target);
        for (var i = 0; i < r.addedNodes.length; i++) queue.push(r.addedNodes[i]);
      });
      if (!queued && queue.length) {
        queued = true;
        (window.requestAnimationFrame || window.setTimeout)(flush);
      }
    }).observe(document.body, { childList: true, subtree: true, characterData: true });
  }

  function bindToggles(scope) {
    var list = (scope || document).querySelectorAll("[data-ph-lang-toggle]");
    for (var i = 0; i < list.length; i++) {
      if (list[i].__phBound) continue;
      list[i].__phBound = true;
      list[i].addEventListener("click", function (event) {
        event.preventDefault();
        writeLang(lang === "ar" ? "en" : "ar");
        location.reload();
      });
    }
  }

  function markCurrentLinks() {
    var path = location.pathname.replace(/\/+$/, "") || "/";
    var links = document.querySelectorAll(".ph-nav-list > li > a");
    for (var i = 0; i < links.length; i++) {
      var href = (links[i].getAttribute("href") || "").replace(/\/+$/, "") || "/";
      if (href === path) links[i].setAttribute("aria-current", "page");
    }
  }

  function watchMessageBar() {
    if (!document.body) return;
    function bar() {
      var list = document.querySelectorAll(".zpdark-section");
      for (var i = 0; i < list.length; i++) {
        var el = list[i];
        if (/removeBanner/.test(el.innerHTML) && el.offsetHeight > 0 && getComputedStyle(el).position === "fixed") return el;
      }
      return null;
    }
    function update() {
      var el = bar();
      document.body.classList.toggle("ph-has-msgbar", !!el);
      document.body.style.setProperty("--ph-msgbar", el ? el.offsetHeight + "px" : "0px");
    }
    update();
    if (window.MutationObserver) new MutationObserver(update).observe(document.body, { childList: true });
  }

  var CARET = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>';

  function setupDrawer() {
    var nav = document.querySelector("[data-ph-nav]");
    var toggle = document.querySelector("[data-ph-menu-toggle]");
    if (!nav || !toggle) return;
    function sync() {
      var open = nav.classList.contains("is-open");
      document.body.classList.toggle("ph-nav-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    }
    function close() {
      nav.classList.remove("is-open");
      sync();
    }
    toggle.addEventListener("click", sync);
    var closers = document.querySelectorAll("[data-ph-menu-close]");
    for (var i = 0; i < closers.length; i++) closers[i].addEventListener("click", close);
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && nav.classList.contains("is-open")) close();
    });
    nav.addEventListener("click", function (event) {
      if (event.target.closest("a[href]") && nav.classList.contains("is-open")) close();
    });
    var drops = nav.querySelectorAll(".ph-nav-list > li.ph-drop:not(.ph-drop-mega)");
    for (var j = 0; j < drops.length; j++) {
      (function (li) {
        var link = li.querySelector(":scope > a");
        if (!link || li.querySelector(":scope > .ph-sub-toggle")) return;
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "ph-sub-toggle";
        btn.setAttribute("aria-expanded", "false");
        btn.setAttribute("aria-label", "Show sub-menu");
        btn.innerHTML = CARET;
        link.insertAdjacentElement("afterend", btn);
        btn.addEventListener("click", function () {
          var open = li.classList.toggle("is-expanded");
          btn.setAttribute("aria-expanded", open ? "true" : "false");
        });
      })(drops[j]);
    }
    if (window.matchMedia) {
      var desktop = window.matchMedia("(min-width: 981px)");
      var onChange = function (m) { if (m.matches) close(); };
      if (desktop.addEventListener) desktop.addEventListener("change", onChange);
      else if (desktop.addListener) desktop.addListener(onChange);
    }
  }

  function fillYear() {
    var list = document.querySelectorAll("[data-ph-year]");
    for (var i = 0; i < list.length; i++) list[i].textContent = String(new Date().getFullYear());
  }

  function start() {
    bindToggles();
    setupDrawer();
    markCurrentLinks();
    fillYear();
    watchMessageBar();
    translate(document.body);
    translateTitle();
    watchChanges();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
}
