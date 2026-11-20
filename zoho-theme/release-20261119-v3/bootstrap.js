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
/* Pheladelfia Nursery 2026 V3: routing and native catalog cards. */
(function () {
    "use strict";
    if (window.__phReleaseV3)
        return;
    window.__phReleaseV3 = true;
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
